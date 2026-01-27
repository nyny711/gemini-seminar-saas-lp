import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as seminarModule from "./seminar";
import * as sendgridModule from "./sendgrid";

// Mock the database and email functions
vi.mock("./seminar", () => ({
  createSeminarRegistration: vi.fn().mockResolvedValue({ insertId: 1 }),
}));

vi.mock("./sendgrid", () => ({
  sendEmail: vi.fn().mockResolvedValue(true),
}));

function createTestContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("seminar.submitRegistration", () => {
  it("successfully registers a seminar participant", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const testInput = {
      company: "テスト株式会社",
      name: "山田太郎",
      position: "セールスマネージャー",
      email: "test@example.com",
      phone: "090-1234-5678",
      challenge: "見積作成に時間がかかる",
    };

    const result = await caller.seminar.submitRegistration(testInput);

    expect(result).toEqual({ success: true, message: "Registration completed" });
    expect(seminarModule.createSeminarRegistration).toHaveBeenCalledWith({
      companyName: testInput.company,
      name: testInput.name,
      position: testInput.position,
      email: testInput.email,
      phone: testInput.phone,
      challenge: testInput.challenge,
    });
    expect(sendgridModule.sendEmail).toHaveBeenCalledTimes(2);
  });

  it("handles registration without optional challenge field", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const testInput = {
      company: "テスト株式会社",
      name: "山田太郎",
      position: "セールスマネージャー",
      email: "test@example.com",
      phone: "090-1234-5678",
    };

    const result = await caller.seminar.submitRegistration(testInput);

    expect(result).toEqual({ success: true, message: "Registration completed" });
    expect(seminarModule.createSeminarRegistration).toHaveBeenCalledWith(
      expect.objectContaining({
        challenge: null,
      })
    );
  });

  it("validates required fields", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const invalidInput = {
      company: "",
      name: "山田太郎",
      position: "セールスマネージャー",
      email: "test@example.com",
      phone: "090-1234-5678",
    };

    await expect(caller.seminar.submitRegistration(invalidInput as any)).rejects.toThrow();
  });

  it("validates email format", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const invalidInput = {
      company: "テスト株式会社",
      name: "山田太郎",
      position: "セールスマネージャー",
      email: "invalid-email",
      phone: "090-1234-5678",
    };

    await expect(caller.seminar.submitRegistration(invalidInput as any)).rejects.toThrow();
  });
});
