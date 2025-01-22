import { describe, it, expect } from "vitest";
import { Booking } from "../../src/domain/entities/Booking";
import { Room } from "../../src/domain/entities/Room";

describe("Booking Entity", () => {
  it("should create a booking with given properties", () => {
    const room = new Room("1", "Quarto Single", 1);
    const startDate = new Date("2023-01-01");
    const endDate = new Date("2023-01-05");
    const booking = new Booking("abc", room, startDate, endDate);

    expect(booking.id).toBe("abc");
    expect(booking.room).toBe(room);
    expect(booking.startDate).toEqual(startDate);
    expect(booking.endDate).toEqual(endDate);
  });
});