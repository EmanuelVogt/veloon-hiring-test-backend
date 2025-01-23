// tests/application/use-cases/VerifyBookingAvailabilityUseCase.spec.ts

import { describe, it, expect, beforeEach } from "vitest";
import { VerifyBookingAvailabilityUseCase } from "../../../src/application/use-cases/VerifyBookingAvailabilityUseCase";
import { InMemoryRoomRepository } from "../../../src/infrastructure/repositories/InMemoryRoomRepository";
import { InMemoryBookingRepository } from "../../../src/infrastructure/repositories/InMemoryBookingRepository";
import { Room, Availability, Reviews } from "../../../src/domain/entities/Room";
import { Booking } from "../../../src/domain/entities/Booking";

describe("VerifyBookingAvailabilityUseCase", () => {
  let roomRepository: InMemoryRoomRepository;
  let bookingRepository: InMemoryBookingRepository;
  let verifyBookingAvailabilityUseCase: VerifyBookingAvailabilityUseCase;
  let room: Room;

  beforeEach(async () => {
    roomRepository = new InMemoryRoomRepository();
    bookingRepository = new InMemoryBookingRepository(roomRepository);
    verifyBookingAvailabilityUseCase = new VerifyBookingAvailabilityUseCase(bookingRepository, roomRepository);

    // Initialize a room with availability
    room = new Room(
      "1",
      "Quarto Single",
      1,
      1,
      3,
      100,
      "https://example.com/image1.jpg",
      ["https://example.com/image1a.jpg"],
      [
        { date: new Date("2025-01-20"), isAvailable: true },
        { date: new Date("2025-01-21"), isAvailable: true },
        { date: new Date("2025-01-22"), isAvailable: true },
        { date: new Date("2025-01-23"), isAvailable: true },
      ],
      []
    );

    await roomRepository.create(room);
    await bookingRepository.clear(); // Ensure no bookings exist before each test
  });

  it("should return true and create booking when room is available for all dates", async () => {
    const startDate = new Date("2025-01-20");
    const endDate = new Date("2025-01-22"); // Dates: 20,21

    const result = await verifyBookingAvailabilityUseCase.execute(new Date(startDate), new Date(endDate), room);

    expect(result).toBe(true);

    // Check room availability updated
    const updatedRoom = await roomRepository.findById("1");
    expect(updatedRoom).toBeDefined();
    expect(updatedRoom!.availability.find(avail => avail.date.toDateString() === "Mon Jan 20 2025")?.isAvailable).toBe(false);
    expect(updatedRoom!.availability.find(avail => avail.date.toDateString() === "Tue Jan 21 2025")?.isAvailable).toBe(true);
    expect(updatedRoom!.availability.find(avail => avail.date.toDateString() === "Wed Jan 22 2025")?.isAvailable).toBe(true);

    // Check booking created
    const bookings = await bookingRepository.findAll();
    expect(bookings.length).toBe(1);
    const booking = bookings[0];
    expect(booking.room.id).toBe("1");
    expect(booking.startDate.toDateString()).toBe("Sun Jan 19 2025");
    expect(booking.endDate.toDateString()).toBe("Tue Jan 21 2025");
  });

  it("should return false and not create booking when room is unavailable on any date", async () => {
    // Set room unavailable on 2025-01-21
    const unavailableDate = new Date("2025-01-21");
    const availability = room.availability.find(avail => avail.date.toDateString() === unavailableDate.toDateString());
    if (availability) {
      availability.isAvailable = false;
      await roomRepository.update(room);
    }

    const startDate = new Date("2025-01-20");
    const endDate = new Date("2025-01-22"); // Dates: 20,21

    const result = await verifyBookingAvailabilityUseCase.execute(new Date(startDate), new Date(endDate), room);

    expect(result).toBe(false);

    const updatedRoom = await roomRepository.findById("1");
    expect(updatedRoom).toBeDefined();
    expect(updatedRoom!.availability.find(avail => avail.date.toDateString() === "Mon Jan 20 2025")?.isAvailable).toBe(false);
    expect(updatedRoom!.availability.find(avail => avail.date.toDateString() === "Tue Jan 21 2025")?.isAvailable).toBe(true);
    expect(updatedRoom!.availability.find(avail => avail.date.toDateString() === "Wed Jan 22 2025")?.isAvailable).toBe(true);

    const bookings = await bookingRepository.findAll();
    expect(bookings.length).toBe(0);
  });

  it("should return false when room has no availability data for the date", async () => {
    const startDate = new Date("2025-01-19"); // No availability
    const endDate = new Date("2025-01-20");

    const result = await verifyBookingAvailabilityUseCase.execute(new Date(startDate), new Date(endDate), room);

    expect(result).toBe(false);

    // Check no booking created
    const bookings = await bookingRepository.findAll();
    expect(bookings.length).toBe(0);
  });

  it("should return false when startDate is equal to endDate", async () => {
    const startDate = new Date("2025-01-20");
    const endDate = new Date("2025-01-20"); // No booking dates

    const result = await verifyBookingAvailabilityUseCase.execute(new Date(startDate), new Date(endDate), room);

    expect(result).toBe(false);

    // Check no booking created
    const bookings = await bookingRepository.findAll();
    expect(bookings.length).toBe(0);
  });

  it("should return false when startDate is after endDate", async () => {
    const startDate = new Date("2025-01-23");
    const endDate = new Date("2025-01-22"); // Invalid range

    const result = await verifyBookingAvailabilityUseCase.execute(new Date(startDate), new Date(endDate), room);

    expect(result).toBe(false);

    // Check no booking created
    const bookings = await bookingRepository.findAll();
    expect(bookings.length).toBe(0);
  });

  it("should not modify room availability when booking fails", async () => {
    // Make room unavailable on 2025-01-21
    const unavailableDate = new Date("2025-01-21");
    const availability = room.availability.find(avail => avail.date.toDateString() === unavailableDate.toDateString());
    if (availability) {
      availability.isAvailable = false;
      await roomRepository.update(room);
    }

    const startDate = new Date("2025-01-20");
    const endDate = new Date("2025-01-22"); // Dates: 20,21

    const result = await verifyBookingAvailabilityUseCase.execute(new Date(startDate), new Date(endDate), room);

    expect(result).toBe(false);

    // Verify room availability remains unchanged
    const updatedRoom = await roomRepository.findById("1");
    expect(updatedRoom).toBeDefined();
    expect(updatedRoom!.availability.find(avail => avail.date.toDateString() === "Mon Jan 20 2025")?.isAvailable).toBe(false);
    expect(updatedRoom!.availability.find(avail => avail.date.toDateString() === "Tue Jan 21 2025")?.isAvailable).toBe(true);
    expect(updatedRoom!.availability.find(avail => avail.date.toDateString() === "Wed Jan 22 2025")?.isAvailable).toBe(true);
  });
});
