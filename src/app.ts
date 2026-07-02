import express, { type Request, type Response } from "express";
import { z } from 'zod';
import { randomUUID } from "crypto";
import type { Job } from "./types.js";

export const app = express();
app.use(express.json());

export let jobs: Job[] = [];

const createJobSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  company: z.string().min(1, "A empresa é obrigatória"),
  location: z.string().min(1, "A localização é obrigatória"),
  isOpen: z.boolean().default(true),
  description: z.string().optional()
});

app.post("/jobs", (req: Request, res: Response) => {
    try {

        const validatedData = createJobSchema.parse(req.body);

        const newId = randomUUID();
        const newJob: Job = {
            id: newId,
            createdAt: new Date(),
            ...validatedData
        };

        jobs.push(newJob);

        res.status(201).json(newJob);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
            return;
        }
        res.status(500).json({ error: 'Erro interno do servidor'});
    }
});


app.get("/jobs", (req: Request, res: Response) => {
    res.json([]);
});

app.get("/jobs/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const job = jobs.find((j) => j.id ===id);

    if (!job) {
        res.status(404).json({ error: 'Vaga não encontrada' });
        return;
    }

    res.status(200).json(job);
});

export const updateJobSchema = createJobSchema.partial();

app.patch("/jobs/:id", (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const jobIndex = jobs.findIndex((j) => j.id === id);
        const existingJob = jobs[jobIndex];

        if (!existingJob) {
            res.status(404).json({ error: 'Vaga não encontrada'});
            return;
        }

        const validatedData = updateJobSchema.parse(req.body);

        const updateJobs: Job = {
            ...existingJob,
            ...validatedData
        } as Job;

        jobs[jobIndex] = updateJobs;
        
        res.status(200).json(updateJobs);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ errors: error.issues });
            return;
        }
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.delete("/jobs/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const jobIndex = jobs.findIndex((j) => j.id === id);

    if (jobIndex === -1) {
        res.status(404).json({error: 'Vaga não encontrada'});
        return;
    }

    jobs.splice(jobIndex, 1);

    res.status(204).send();
});
