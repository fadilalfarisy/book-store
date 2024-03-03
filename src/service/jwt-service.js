import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const createAccessToken = ({ id, role }) => {
	return jwt.sign(
		{ id, role },
		process.env.ACCESS_TOKEN,
		{ expiresIn: process.env.MAX_AGE_ACCESS_TOKEN }
	);
}

const createRefreshToken = ({ id }) => {
	return jwt.sign(
		{ id },
		process.env.REFRESH_TOKEN,
		{ expiresIn: process.env.MAX_AGE_REFRESH_TOKEN }
	);
}

const verifyAccessToken = (token) => {
	const [error, decoded] = jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
		if (error) return [error, null]
		return [null, decoded]
	})

	return [error, decoded]
}

const verifyRefreshToken = (token) => {
	const [error, decoded] = jwt.verify(token, process.env.REFRESH_TOKEN, (error, decoded) => {
		if (error) return [error, null]
		return [null, decoded]
	})

	return [error, decoded]
}

export {
	createAccessToken,
	createRefreshToken,
	verifyAccessToken,
	verifyRefreshToken
}