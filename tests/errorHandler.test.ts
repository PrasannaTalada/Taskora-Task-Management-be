import type { NextFunction, Request, Response } from "express";
import { AppError, errorHandler } from "../src/middleware/errorHandler.js";

const invoke = (err: Error): { status: number; body: Record<string, unknown> } => {
  let status = 0;
  let body: Record<string, unknown> = {};

  const res = {
    status(code: number) {
      status = code;
      return res;
    },
    json(payload: Record<string, unknown>) {
      body = payload;
      return res;
    },
  } as unknown as Response;

  errorHandler(err, {} as Request, res, {} as NextFunction);

  return { status, body };
};

describe("errorHandler", () => {
  it("uses the status code of an AppError", () => {
    const { status, body } = invoke(new AppError("Not found", 404));

    expect(status).toBe(404);
    expect(body).toEqual({ success: false, message: "Not found" });
  });

  it("falls back to 500 for generic errors", () => {
    const { status, body } = invoke(new Error("boom"));

    expect(status).toBe(500);
    expect(body).toEqual({ success: false, message: "boom" });
  });

  it("exposes the stack in development", () => {
    const previous = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";

    const { body } = invoke(new Error("boom"));

    expect(body.stack).toEqual(expect.any(String));

    process.env.NODE_ENV = previous;
  });
});
