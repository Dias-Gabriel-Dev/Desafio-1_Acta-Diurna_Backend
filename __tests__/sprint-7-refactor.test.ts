import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("Sprint 7 - Refatoração e Organização (Opcional)", () => {
  it("should keep all routes working after refactoring into Routers and Controllers", async () => {
    // A refatoração não deve quebrar a API
    const response = await request(app).get("/jobs");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});
