import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("Sprint 6 - GET /jobs com Filtros (Opcional)", () => {
  beforeAll(async () => {
    await request(app)
      .post("/jobs")
      .send({
        title: "Frontend Developer",
        company: "Tech Inc",
        location: "SP",
        isOpen: true,
      });
    await request(app)
      .post("/jobs")
      .send({
        title: "Backend Node",
        company: "Acta",
        location: "RJ",
        isOpen: false,
      });
    await request(app)
      .post("/jobs")
      .send({
        title: "Fullstack",
        company: "Tech Inc",
        location: "MG",
        isOpen: true,
      });
  });

  it("should filter jobs by isOpen status", async () => {
    const response = await request(app).get("/jobs?isOpen=true");
    expect(response.status).toBe(200);
    expect(response.body.every((job: any) => job.isOpen === true)).toBe(true);
  });

  it("should filter jobs by false isOpen status", async () => {
    const response = await request(app).get("/jobs?isOpen=false");
    expect(response.status).toBe(200);
    expect(response.body.every((job: any) => job.isOpen === false)).toBe(true);
  });

  it("should search jobs by title or company", async () => {
    const response = await request(app).get("/jobs?search=Tech Inc");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(2);
    expect(
      response.body.some((job: any) => job.title === "Frontend Developer"),
    ).toBe(true);
  });
});
