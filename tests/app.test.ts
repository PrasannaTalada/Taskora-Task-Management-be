import request from "supertest";
import app from "../src/app.js";

describe("app", () => {
  it("GET / returns the welcome message", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Welcome to Taskora Backend" });
  });

  it("GET /health returns 200 with a timestamp", async () => {
    const res = await request(app).get("/health");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Server is running");
    expect(Number.isNaN(Date.parse(res.body.timestamp))).toBe(false);
  });

  it("returns 404 for unknown routes", async () => {
    const res = await request(app).get("/does-not-exist");

    expect(res.status).toBe(404);
  });
});
