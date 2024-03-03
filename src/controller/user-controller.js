import userService from "../service/user-service.js";

const register = async (req, res, next) => {
	try {
		const result = await userService.register(req.body);
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}

const login = async (req, res, next) => {
	try {
		const result = await userService.login(req.body);
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
		const result = await userService.deleteUser(req.params);
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e);
	}
}

const confirm = async (req, res, next) => {
	try {
		const result = await userService.confirm(req.params.token)
		res.status(200).json({
			data: result
		});
	} catch (e) {
		next(e)
	}
}

const refreshToken = async (req, res, next) => {
	try {
		const result = await userService.refreshToken(req.cookies.refresh_token)
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
	refreshToken
}
