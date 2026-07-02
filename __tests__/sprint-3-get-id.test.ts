import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("Sprint 3 - GET /jobs/:id", () => {
  it("should return 404 if the job does not exist", async () => {
    const response = await request(app).get("/jobs/fake-id-123");
    expect(response.status).toBe(404);
  });

  it("should return the job when valid ID is provided", async () => {
    // Primeiro, cria um job para garantir que ele existe
    const createRes = await request(app).post("/jobs").send({
      title: "Dev Get",
      company: "Test Company",
      location: "Local",
      isOpen: true,
    });

    const createdJob = createRes.body;
    expect(createRes.status).toBe(201); // Se falhar aqui, o sprint 2 está quebrado

    // Agora tenta buscar ele
    const response = await request(app).get(`/jobs/${createdJob.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdJob.id);
    expect(response.body.title).toBe("Dev Get");
  });
});
