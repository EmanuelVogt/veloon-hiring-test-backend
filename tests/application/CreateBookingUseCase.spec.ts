import { describe, it, expect } from "vitest";
import { CreateBookingUseCase } from "../../src/application/use-cases/CreateBookingUseCase";

describe("CreateBookingUseCase", () => {
  it("should create a booking", async () => {
    const useCase = new CreateBookingUseCase();
    const booking = await useCase.execute({
      roomId: "1",
      startDate: new Date("2023-01-01"),
      endDate: new Date("2023-01-05"),
    });

    expect(booking.id).toBeDefined();
    expect(booking.room.id).toBe("1");
  });

  it("should throw if room does not exist", async () => {
    const useCase = new CreateBookingUseCase();
    await expect(() =>
      useCase.execute({
        roomId: "999",
        startDate: new Date("2023-01-01"),
        endDate: new Date("2023-01-05"),
      })
    ).rejects.toThrow("Room not found");
  });
});
