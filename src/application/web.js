import express from "express";
import cookieParser from "cookie-parser";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { bookRouter, companyRouter, userRouter } from "../route/private-api.js";
import { documentation } from "../docs/setup.js";

export const web = express();
web.use(express.json());

web.use(documentation)
web.use(cookieParser())

web.use(publicRouter);
web.use(userRouter);
web.use(companyRouter);
web.use(bookRouter);

web.use(errorMiddleware);
