import express from "express";
import cookieParser from "cookie-parser";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { blogRouter, blogCategoryRouter, bookRouter, bookCategoryRouter, companyRouter, userRouter } from "../route/private-api.js";
import { documentation } from "../docs/setup.js";

export const web = express();
web.use(express.json());

web.use(documentation)
web.use(cookieParser())

web.use(publicRouter);
web.use('/api/users', userRouter);
web.use('/api/company', companyRouter);
web.use('/api/books/categories', bookCategoryRouter);
web.use('/api/books', bookRouter);
web.use('/api/blogs/categories', blogCategoryRouter);
web.use('/api/blogs', blogRouter);

web.use(errorMiddleware);
