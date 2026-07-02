import { Router } from "express";
import {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob
 } from "../controllers/jobController.js";

 export const jobRoutes = Router();

 jobRoutes.get("/", getAllJobs);
 jobRoutes.get("/:id", getJobById);
 jobRoutes.post("/", createJob);
 jobRoutes.patch("/:id", updateJob);
 jobRoutes.delete("/:id", deleteJob);