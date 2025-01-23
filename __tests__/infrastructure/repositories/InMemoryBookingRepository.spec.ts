import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryRoomRepository } from "../../../src/infrastructure/repositories/InMemoryRoomRepository";
import { InMemoryBookingRepository } from "../../../src/infrastructure/repositories/InMemoryBookingRepository";
import { Booking } from "../../../src/domain/entities/Booking";
import { Room } from "../../../src/domain/entities/Room";

describe("InMemoryBookingRepository", () => {
  let roomRepository: InMemoryRoomRepository;
  let bookingRepository: InMemoryBookingRepository;
  let room1: Room;
  let room2: Room;

  beforeEach(() => {
    roomRepository = new InMemoryRoomRepository();
    bookingRepository = new InMemoryBookingRepository(roomRepository);

    room1 = new Room(
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

    room2 = new Room(
      "2",
      "Quarto Duplo",
      2,
      2,
      4,
      150,
      "https://example.com/image2.jpg",
      ["https://example.com/image2a.jpg"],
      [
        { date: new Date("2025-01-20"), isAvailable: true },
        { date: new Date("2025-01-21"), isAvailable: false }, // Unavailable on this date
      ],
      []
    );

    roomRepository.create(room1);
    roomRepository.create(room2);

    const booking1 = new Booking(
      "b1",
      room1,
      new Date("2025-01-20"),
      new Date("2025-01-21")
    );

    const booking2 = new Booking(
      "b2",
      room2,
      new Date("2025-01-21"),
      new Date("2025-01-22")
    );

    bookingRepository.create(booking1);
    bookingRepository.create(booking2);
  });

  it("should load initial bookings from bookings.ts", async () => {
    const bookings = await bookingRepository.findAll();
    expect(bookings.length).toBe(2);

    const booking1 = bookings.find(b => b.id === "b1");
    expect(booking1).toBeDefined();
    expect(booking1?.room.id).toBe("1");
    expect(booking1?.startDate.toISOString()).toBe(new Date("2025-01-20").toISOString());
    expect(booking1?.endDate.toISOString()).toBe(new Date("2025-01-21").toISOString());

    const booking2 = bookings.find(b => b.id === "b2");
    expect(booking2).toBeDefined();
    expect(booking2?.room.id).toBe("2");
    expect(booking2?.startDate.toISOString()).toBe(new Date("2025-01-21").toISOString());
    expect(booking2?.endDate.toISOString()).toBe(new Date("2025-01-22").toISOString());
  });

  it("should create a new booking", async () => {
    const newBooking = new Booking(
      "b3",
      room1,
      new Date("2025-01-22"),
      new Date("2025-01-23")
    );

    await bookingRepository.create(newBooking);
    const bookings = await bookingRepository.findAll();
    expect(bookings.length).toBe(3);
    expect(bookings.find(b => b.id === "b3")).toEqual(newBooking);
  });

  it("should find a booking by ID", async () => {
    const booking = await bookingRepository.findById("b1");
    expect(booking).toBeDefined();
    expect(booking?.room.id).toBe("1");
  });

  it("should return undefined for non-existent booking", async () => {
    const booking = await bookingRepository.findById("999");
    expect(booking).toBeUndefined();
  });

  it("should update an existing booking", async () => {
    const booking = await bookingRepository.findById("b1");
    expect(booking).toBeDefined();
    booking!.endDate = new Date("2025-01-22");
    await bookingRepository.update(booking!);
    const updatedBooking = await bookingRepository.findById("b1");
    expect(updatedBooking?.endDate.toISOString()).toBe(new Date("2025-01-22").toISOString());
  });

  it("should throw an error when updating a non-existent booking", async () => {
    const fakeBooking = new Booking(
      "999",
      room1,
      new Date("2025-01-20"),
      new Date("2025-01-21")
    );

    await expect(bookingRepository.update(fakeBooking)).rejects.toThrow("Booking not found");
  });

  it("should throw an error when deleting a non-existent booking", async () => {
    await expect(bookingRepository.delete("999")).rejects.toThrow("Booking not found");
  });
});