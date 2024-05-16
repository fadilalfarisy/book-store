import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();

publicRouter.post('/api/users/register', userController.register);
publicRouter.post('/api/users/login', userController.login);
publicRouter.get('/api/users/confirm/:token', userController.confirm);
publicRouter.get('/api/users/refresh', userController.refreshToken);

publicRouter.post('/api/users/reset-password', userController.emailResetPassword)
publicRouter.post('/api/users/reset-password/:token', userController.resetPassword)


export {
    publicRouter
}
