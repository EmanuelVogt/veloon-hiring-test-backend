// src/application/use-cases/CreateBookingUseCase.ts

import { IBookingRepository } from "../../domain/repositories/IBookingRepository";
import { IRoomRepository } from "../../domain/repositories/IRoomRepository";
import { Booking } from "../../domain/entities/Booking";
import { v4 as uuid4 } from 'uuid';

interface CreateBookingInput {
  roomId: string;
  startDate: Date;
  endDate: Date;
}

export class CreateBookingUseCase {
  constructor(
    private bookingRepository: IBookingRepository,
    private roomRepository: IRoomRepository
  ) {}

  async execute(input: CreateBookingInput): Promise<Booking> {
    const room = await this.roomRepository.findById(input.roomId);
    if (!room) {
      throw new Error("Room not found");
    }

    const currentDate = new Date(input.startDate);
    const endDate = new Date(input.endDate);

    while (currentDate < endDate) {
      const availability = room.availability.find(
        (avail) => avail.date.toDateString() === currentDate.toDateString()
      );
      if (!availability || !availability.isAvailable) {
        throw new Error(`Room is not available on ${currentDate.toDateString()}`);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    room.availability.forEach((avail) => {
      if (avail.date >= input.startDate && avail.date < input.endDate) {
        avail.isAvailable = false;
      }
    });

    await this.roomRepository.update(room);

    const booking = new Booking(
      uuid4(),
      room,
      input.startDate,
      input.endDate
    );

    await this.bookingRepository.create(booking);
    return booking;
  }
}
