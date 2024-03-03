import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();

publicRouter.post('/api/users/register', userController.register);
publicRouter.post('/api/users/login', userController.login);
publicRouter.get('/api/users/confirm/:token', userController.confirm);
publicRouter.get('/api/users/refresh', userController.refreshToken);

export {
    publicRouter
}
