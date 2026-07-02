import express, { type Request, type Response } from "express";
import { jobRoutes } from "./routes/jobRoutes.js";

export const app = express();
app.use(express.json());

app.use("/jobs", jobRoutes);
