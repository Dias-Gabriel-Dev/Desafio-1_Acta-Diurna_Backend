import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";

describe("Jobs API - Sprint 1", () => {
  it("GET /jobs should return an empty array initially", async () => {
    const response = await request(app).get("/jobs");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
