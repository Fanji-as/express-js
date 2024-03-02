import { errorHandler } from "./exceptions/handler.js";
import { notFoundErrorHandler } from "./exceptions/handler.js";
import router from "./routes/api/index.js";
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

app.use(express.json());
app.use(router);

app.use(notFoundErrorHandler);

app.use(errorHandler);

app.listen(process.env.PORT);
