import { IBookingRepository } from "../../domain/repositories/IBookingRepository";
import { IRoomRepository } from "../../domain/repositories/IRoomRepository";
import { Booking } from "../../domain/entities/Booking";
import { v4 as uuid4 } from "uuid";
import { Room } from "../../domain/entities/Room";

export class VerifyBookingAvailabilityUseCase {
  constructor(
    private bookingRepository: IBookingRepository,
    private roomRepository: IRoomRepository
  ) {}

  async execute(startDate: Date, endDate: Date, room: Room): Promise<boolean> {
    while (startDate < endDate) {
      const availability = room.availability.find(
        (avail) => avail.date.toDateString() === startDate.toDateString()
      );

      if (!availability || !availability.isAvailable) {
        return false;
      }

      startDate.setDate(startDate.getDate() + 1);
    }

    room.availability.forEach((avail) => {
      if (avail.date >= startDate && avail.date < endDate) {
        avail.isAvailable = false;
      }
    });

    await this.roomRepository.update(room);

    const booking = new Booking(uuid4(), room, startDate, endDate);

    await this.bookingRepository.create(booking);
    return true;
  }
}
