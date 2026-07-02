import express, {type Request, type Response } from "express";
import { z } from "zod";
import { randomUUID } from "crypto";
import type { Job } from "../types.js";

export let jobs: Job[] = [];

const createJobSchema = z.object({
  title: z.string({message: "O título é obrigatório"}),
  company: z.string({message: "A empresa é obrigatória"}),
  location: z.string({message: "A localização é obrigatória"}),
  isOpen: z.boolean({message: "O status da vaga é obrigatório"}),
  description: z.string().optional()
});

export const updateJobSchema = createJobSchema.partial();

export const getAllJobs = (req: Request, res: Response) => {
  const { isOpen, search } = req.query;
  let filteredJobs = jobs;

  if (isOpen !== undefined) {
    const isstatusOpen = isOpen === "true";
    filteredJobs = filteredJobs.filter((job) => job.isOpen === isstatusOpen);
  }

  if (typeof search === "string" && search.trim() !== "") {
    const searchTerm = search.toLowerCase();
    filteredJobs = filteredJobs.filter((job) => {
      const matchTitle = job.title.toLowerCase().includes(searchTerm);
      const matchCompany = job.company.toLowerCase().includes(searchTerm);
      return matchTitle || matchCompany;
    });
  }

  res.status(200).json(filteredJobs)
};

export const createJob = (req: Request, res: Response) => {
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
};

export const getJobById = (req: Request, res: Response) => {
  const { id } = req.params;
  const job = jobs.find((j) => j.id ===id);
  
  if (!job) {
    res.status(404).json({ error: 'Vaga não encontrada' });
    return;
  }
  
  res.status(200).json(job);
};

export const updateJob = (req: Request, res: Response) => {
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
};

export const deleteJob = (req: Request, res: Response) => {
  const { id } = req.params;
    const jobIndex = jobs.findIndex((j) => j.id === id);

    if (jobIndex === -1) {
        res.status(404).json({error: 'Vaga não encontrada'});
        return;
    }

    jobs.splice(jobIndex, 1);

    res.status(204).send();
}