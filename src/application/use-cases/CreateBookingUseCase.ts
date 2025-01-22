import { Booking } from "../../domain/entities/Booking";
import { Room } from "../../domain/entities/Room";
import { randomUUID } from "crypto";

export class CreateBookingUseCase {
  private bookings: Booking[] = [];
  private rooms: Room[] = [
    new Room("1", "Quarto Single", 1),
    new Room("2", "Quarto Duplo", 2),
    new Room("3", "Suíte Família", 4),
  ];

  async execute(input: {
    roomId: string;
    startDate: Date;
    endDate: Date;
  }): Promise<Booking> {
    const room = this.rooms.find((r) => r.id === input.roomId);
    if (!room) {
      throw new Error("Room not found");
    }

    const newBooking = new Booking(
      randomUUID(),
      room,
      input.startDate,
      input.endDate
    );

    this.bookings.push(newBooking);
    return newBooking;
  }

  // Expor para fins didáticos
  getAllBookings(): Booking[] {
    return this.bookings;
  }
}
