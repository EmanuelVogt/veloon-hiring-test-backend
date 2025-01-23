// src/application/use-cases/VerifyBookingAvailabilityUseCase.ts

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
    const currentDate = new Date(startDate);
    const finalDate = new Date(endDate);

    if (currentDate >= finalDate) {
      return false;
    }

    while (currentDate < finalDate) {
      const availability = room.availability.find(
        (avail) => avail.date.toDateString() === currentDate.toDateString()
      );

      if (!availability || !availability.isAvailable) {
        return false;
      }

      currentDate.setDate(currentDate.getDate() + 1);
    }

    room.availability.forEach((avail) => {
      if (avail.date >= startDate && avail.date < endDate) {
        avail.isAvailable = false;
      }
    });

    await this.roomRepository.update(room);

    const booking = new Booking(
      uuid4(),
      room,
      new Date(startDate),
      new Date(endDate)
    );

    await this.bookingRepository.create(booking);

    return true;
  }
}
