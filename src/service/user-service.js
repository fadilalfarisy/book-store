import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import emailService from './email-service.js'
import { createAccessToken, createRefreshToken, verifyRefreshToken } from "./jwt-service.js";
import {
	deleteUserValidation,
	loginUserValidation,
	registerUserValidation,
} from "../validation/user-validation.js";

const register = async (request) => {
	const user = validate(registerUserValidation, request);

	const userIsExist = await prismaClient.user.findUnique({
		where: {
			email: user.email
		},
		select: {
			email: true,
			verified: true
		}
	});

	if (userIsExist) {
		if (userIsExist.verified == true) {
			throw new ResponseError(400, "Email already exists");
		}
		if (userIsExist.verified == false) {
			user.password = await bcrypt.hash(user.password, 10);

			const [recordUser, recordToken] = await prismaClient.$transaction(async prisma => {
				const recordUser = await prisma.user.update({
					where: {
						email: user.email
					},
					data: user,
					select: {
						id: true,
						email: true,
						username: true,
						verified: true,
						role: true
					}
				})

				const expire = new Date()
				expire.setHours(expire.getHours() + 1)
				expire.toISOString()

				const recordToken = await prisma.token.create({
					data: {
						token: uuid(),
						expire: expire,
						user_id: recordUser.id
					},
					select: {
						token: true
					}
				})

				return [recordUser, recordToken]
			})

			const link = `${process.env.HOST}/api/users/confirm/${recordToken.token}`
			await emailService.confirmationEmail(user.email, link)

			return recordUser
		}
	}

	user.password = await bcrypt.hash(user.password, 10);

	const [recordUser, recordToken] = await prismaClient.$transaction(async prisma => {
		const recordUser = await prisma.user.create({
			data: user,
			select: {
				id: true,
				email: true,
				username: true,
				verified: true,
				role: true
			}
		});

		const expire = new Date()
		expire.setHours(expire.getHours() + 1)
		expire.toISOString()

		const recordToken = await prisma.token.create({
			data: {
				token: uuid(),
				expire: expire,
				user_id: recordUser.id
			},
			select: {
				token: true
			}
		})

		return [recordUser, recordToken]
	})

	const link = `${process.env.HOST}/api/users/confirm/${recordToken.token}`
	emailService.confirmationEmail(user.email, link)

	return recordUser
}

const login = async (request) => {
	const user = validate(loginUserValidation, request)

	const userIsExist = await prismaClient.user.findFirst({
		where: {
			AND: [
				{
					email: user.email
				},
				{
					verified: true
				},
			],
		}
	})

	if (!userIsExist) {
		throw new ResponseError(400, "Incorrect email or password");
	}

	const passwordIsValid = await bcrypt.compare(user.password, userIsExist.password)
	if (!passwordIsValid) {
		throw new ResponseError(400, "Incorrect email or password");
	}

	const accessToken = createAccessToken({
		id: userIsExist.id,
		role: userIsExist.role
	})
	const refreshToken = createRefreshToken({
		id: userIsExist.id
	})

	delete userIsExist.password;

	return {
		...userIsExist,
		access_token: accessToken,
		refresh_token: refreshToken
	}
}

const getAllUsers = async () => {
	return await prismaClient.user.findMany({
		select: {
			id: true,
			email: true,
			username: true,
			verified: true,
			role: true
		}
	})
}

const deleteUser = async (request) => {
	const user = validate(deleteUserValidation, request)

	const userIsExist = await prismaClient.user.deleteMany({
		where: {
			id: user.id
		},
	})

	if (userIsExist.count == 0) {
		throw new ResponseError(400, "User not found");
	}

	return 'User deleted successfully'
}


const confirm = async (request) => {
	const token = request

	const existingToken = await prismaClient.token.findFirst({
		where: {
			AND: [
				{
					token: token
				},
				{
					expire: {
						gt: new Date().toISOString()
					}
				}
			]
		},
		select: {
			id: true,
			user_id: true
		}
	})

	if (!existingToken) {
		throw new ResponseError(400, "token is expired");
	}

	await prismaClient.$transaction(async (prisma) => {
		await prisma.user.update({
			where: {
				id: existingToken.user_id
			},
			data: {
				verified: true
			},
			select: {
				id: true,
				email: true,
				username: true,
				verified: true,
				role: true
			}
		})

		await prisma.token.deleteMany({
			where: {
				AND: [
					{
						id: existingToken.id,
					},
					{
						expire: {
							lte: new Date().toISOString()
						}
					}
				]
			}
		})
	})

	return 'Email verified successfully'
}

const refreshToken = async (request) => {
	const [error, decoded] = verifyRefreshToken(request)

	if (error) {
		throw new ResponseError(401, "Unauthorized");
	}
	const user = await prismaClient.user.findUnique({
		where: {
			id: decoded.id
		},
		select: {
			id: true,
			role: true
		}
	})

	const accessToken = createAccessToken({
		id: user.id,
		role: user.role
	})

	return { access_token: accessToken }
}

export default {
	register,
	login,
	getAllUsers,
	deleteUser,
	confirm,
	refreshToken
}