import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("Sprint 5 - DELETE /jobs/:id", () => {
  let jobId: string;

  beforeAll(async () => {
    const createRes = await request(app).post("/jobs").send({
      title: "Dev Para Deletar",
      company: "Empresa",
      location: "Local",
      isOpen: true,
    });
    jobId = createRes.body.id;
  });

  it("should return 404 if trying to delete non-existent job", async () => {
    const response = await request(app).delete("/jobs/id-ficticio");
    expect(response.status).toBe(404);
  });

  it("should delete the job successfully", async () => {
    // Executa o Delete
    const deleteRes = await request(app).delete(`/jobs/${jobId}`);

    // Status pode ser 200 (OK) com objeto removido ou 204 (No Content)
    // Vamos aceitar 200 ou 204.
    expect([200, 204]).toContain(deleteRes.status);

    // Garante que não existe mais ao tentar buscar no Sprint 3
    const getRes = await request(app).get(`/jobs/${jobId}`);
    expect(getRes.status).toBe(404);
  });
});
