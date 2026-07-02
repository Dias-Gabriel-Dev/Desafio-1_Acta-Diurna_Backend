import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("Sprint 2 - POST /jobs (com Zod, createdAt e description)", () => {
  it("should create a new job when data is valid", async () => {
    const newJob = {
      title: "Desenvolvedor Node.js",
      company: "Acta Diurna",
      location: "Remoto",
      isOpen: true,
      description: "Vaga para backend",
    };

    const response = await request(app).post("/jobs").send(newJob);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("createdAt"); // Opcional implementado!
    expect(response.body.title).toBe(newJob.title);
    expect(response.body.description).toBe(newJob.description); // Opcional implementado!
  });

  it("should return 400 if required fields are missing (Validação Zod)", async () => {
    const invalidJob = {
      title: "Desenvolvedor Node.js",
    };

    const response = await request(app).post("/jobs").send(invalidJob);
    expect(response.status).toBe(400);
  });

  it("should return 400 if isOpen is not a boolean (Validação Zod)", async () => {
    const invalidJob = {
      title: "Desenvolvedor",
      company: "Acta Diurna",
      location: "Remoto",
      isOpen: "true",
    };

    const response = await request(app).post("/jobs").send(invalidJob);
    expect(response.status).toBe(400);
  });
});
