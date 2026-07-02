import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("Sprint 4 - PATCH /jobs/:id (com Zod e opcionais)", () => {
  let jobId: string;

  beforeAll(async () => {
    const createRes = await request(app).post("/jobs").send({
      title: "Dev Para Atualizar",
      company: "Empresa A",
      location: "Local A",
      isOpen: true,
      description: "Descricao Antiga",
    });
    jobId = createRes.body.id;
  });

  it("should partially update the job including optional description", async () => {
    const response = await request(app).patch(`/jobs/${jobId}`).send({
      title: "Título Atualizado",
      isOpen: false,
      description: "Descricao Nova",
    });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Título Atualizado");
    expect(response.body.description).toBe("Descricao Nova");
    expect(response.body.isOpen).toBe(false);
  });

  it("should return 400 if trying to send invalid types (Zod)", async () => {
    const response = await request(app).patch(`/jobs/${jobId}`).send({
      isOpen: "not a boolean",
    });
    expect(response.status).toBe(400);
  });
});
