import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { v4 as uuid } from "uuid";
import emailService from './email-service.js'
import bcrypt from "bcrypt"
import {
	emailValidation,
	resetPasswordValidation
} from "../validation/user-validation.js";

const emailResetPassword = async (request) => {
	const user = validate(emailValidation, request.body);

	const userIsExist = await prismaClient.user.findUnique({
		where: {
			email: user.email
		},
		select: {
			id: true,
			email: true,
			verified: true
		}
	});

	if (!userIsExist || userIsExist?.verified == false) {
		throw new ResponseError(400, "Incorrect email");
	}

	const expire = new Date()
	expire.setHours(expire.getHours() + 1)
	expire.toISOString()

	const recordToken = await prismaClient.token.create({
		data: {
			token: uuid(),
			expire: expire,
			user_id: userIsExist.id
		},
		select: {
			token: true
		}
	})

	const link = `${process.env.HOST}/api/users/reset-password/${recordToken.token}`
	emailService.sendEmail(userIsExist.email, link)

	return 'Reset Password sent successfully'
}

const resetPassword = async (request) => {
	const user = validate(resetPasswordValidation, request.body);
	const token = request.params.token

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

	user.password = await bcrypt.hash(user.password, 10);

	await prismaClient.$transaction(async (prisma) => {
		await prisma.user.update({
			where: {
				id: existingToken.user_id
			},
			data: user
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

	return 'Password reset successfully'
}

export default {
	emailResetPassword,
	resetPassword
}