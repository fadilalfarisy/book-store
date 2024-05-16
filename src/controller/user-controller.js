import userService from "../service/user-service.js";
import resetPasswordService from "../service/resetPassword-service.js"

const register = async (req, res, next) => {
	try {
		const result = await userService.register(req);
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}

const login = async (req, res, next) => {
	try {
		const result = await userService.login(req);
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}

const getAllUsers = async (req, res, next) => {
	try {
		const result = await userService.getAllUsers();
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}

const deleteUser = async (req, res, next) => {
	try {
		const result = await userService.deleteUser(req);
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}

const confirm = async (req, res, next) => {
	try {
		const result = await userService.confirm(req)
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e)
	}
}

const refreshToken = async (req, res, next) => {
	try {
		const result = await userService.refreshToken(req)
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e)
	}
}

const emailResetPassword = async (req, res, next) => {
	try {
		const result = await resetPasswordService.emailResetPassword(req)
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e)
	}
}

const resetPassword = async (req, res, next) => {
	try {
		const result = await resetPasswordService.resetPassword(req)
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e)
	}
}

export default {
	register,
	login,
	getAllUsers,
	deleteUser,
	confirm,
	refreshToken,
	emailResetPassword,
	resetPassword
}
