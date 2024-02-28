import dotenv from "dotenv";
import express from "express";
import router from "./routes/api/index.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(router);

app.listen(process.env.PORT);
