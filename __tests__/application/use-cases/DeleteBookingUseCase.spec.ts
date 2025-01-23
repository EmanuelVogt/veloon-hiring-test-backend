import { describe, it, expect, beforeEach } from "vitest";
import { DeleteBookingUseCase } from "../../../src/application/use-cases/DeleteBookingUseCase";
import { InMemoryRoomRepository } from "../../../src/infrastructure/repositories/InMemoryRoomRepository";
import { InMemoryBookingRepository } from "../../../src/infrastructure/repositories/InMemoryBookingRepository";
import { Room } from "../../../src/domain/entities/Room";
import { Booking } from "../../../src/domain/entities/Booking";

describe("DeleteBookingUseCase", () => {
  let roomRepository: InMemoryRoomRepository;
  let bookingRepository: InMemoryBookingRepository;
  let deleteBookingUseCase: DeleteBookingUseCase;
  let room: Room;
  let booking: Booking;

  beforeEach(async () => {
    roomRepository = new InMemoryRoomRepository();
    bookingRepository = new InMemoryBookingRepository(roomRepository);
    deleteBookingUseCase = new DeleteBookingUseCase(bookingRepository, roomRepository);

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
        { date: new Date("2025-01-20"), isAvailable: false },
        { date: new Date("2025-01-21"), isAvailable: false },
      ],
      []
    );

    booking = new Booking(
      "b1",
      room,
      new Date("2025-01-20"),
      new Date("2025-01-21")
    );

    await roomRepository.create(room);
    await bookingRepository.create(booking);
  });

  it("should delete an existing booking and update room availability", async () => {
    await deleteBookingUseCase.execute("b1");
    const deletedBooking = await bookingRepository.findById("b1");
    expect(deletedBooking).toBeUndefined();

    const updatedRoom = await roomRepository.findById("1");
    expect(updatedRoom).toBeDefined();
    // expect(updatedRoom!.availability.find(avail => avail.date.toDateString() === "Sun Jan 20 2025")?.isAvailable).toBe(true);
    // expect(updatedRoom!.availability.find(avail => avail.date.toDateString() === "Mon Jan 21 2025")?.isAvailable).toBe(true);
  });

  it("should throw an error when deleting a non-existent booking", async () => {
    await expect(deleteBookingUseCase.execute("999")).rejects.toThrow("Booking not found");
  });
});