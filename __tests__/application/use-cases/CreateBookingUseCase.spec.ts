// tests/application/use-cases/CreateBookingUseCase.spec.ts

import { describe, it, expect, beforeEach } from "vitest";
import { CreateBookingUseCase } from "../../../src/application/use-cases/CreateBookingUseCase";
import { InMemoryRoomRepository } from "../../../src/infrastructure/repositories/InMemoryRoomRepository";
import { InMemoryBookingRepository } from "../../../src/infrastructure/repositories/InMemoryBookingRepository";
import { Room } from "../../../src/domain/entities/Room";
import { Booking } from "../../../src/domain/entities/Booking";

describe("CreateBookingUseCase", () => {
  let roomRepository: InMemoryRoomRepository;
  let bookingRepository: InMemoryBookingRepository;
  let createBookingUseCase: CreateBookingUseCase;
  let room: Room;

  beforeEach(async () => {
    roomRepository = new InMemoryRoomRepository();
    bookingRepository = new InMemoryBookingRepository(roomRepository);
    createBookingUseCase = new CreateBookingUseCase(
      bookingRepository,
      roomRepository
    );

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
      ],
      []
    );

    await roomRepository.create(room);
  });

  it("should create a booking successfully", async () => {
    const input = {
      room,
      startDate: new Date("2025-01-20"),
      endDate: new Date("2025-01-21"),
    };

    const booking = await createBookingUseCase.execute(input);
    expect(booking).toBeInstanceOf(Booking);
    expect(booking.id).toBeDefined();
    expect(booking.room.id).toBe("1");
    expect(booking.startDate.toDateString()).toBe("Sun Jan 19 2025");
    expect(booking.endDate.toDateString()).toBe("Mon Jan 20 2025");

    const bookings = await bookingRepository.findAll();
    expect(bookings.length).toBe(1);
  });

  it("should throw an error when booking a non-existent room", async () => {
    const nonExistentRoom = new Room(
      "999",
      "Quarto Inexistente",
      2,
      2,
      4,
      150,
      "https://example.com/image999.jpg",
      ["https://example.com/image999a.jpg"],
      [
        { date: new Date("2025-01-22"), isAvailable: true },
        { date: new Date("2025-01-23"), isAvailable: true },
      ],
      []
    );

    const input = {
      room: nonExistentRoom,
      startDate: new Date("2025-01-22"),
      endDate: new Date("2025-01-23"),
    };

    await expect(createBookingUseCase.execute(input)).rejects.toThrow(
      "Room not found"
    );
  });

  it("should throw an error when room repository update fails", async () => {
    roomRepository.update = async () => {
      throw new Error("Update failed");
    };

    const input = {
      room,
      startDate: new Date("2025-01-20"),
      endDate: new Date("2025-01-21"),
    };

    await expect(createBookingUseCase.execute(input)).rejects.toThrow(
      "Update failed"
    );
  });
});
