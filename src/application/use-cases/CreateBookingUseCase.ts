import { IBookingRepository } from "../../domain/repositories/IBookingRepository";
import { IRoomRepository } from "../../domain/repositories/IRoomRepository";
import { Booking } from "../../domain/entities/Booking";
import { v4 as uuid4 } from "uuid";
import { Room } from "../../domain/entities/Room";

interface CreateBookingInput {
  room: Room;
  startDate: Date;
  endDate: Date;
}

export class CreateBookingUseCase {
  constructor(
    private bookingRepository: IBookingRepository,
    private roomRepository: IRoomRepository
  ) {}

  async execute(input: CreateBookingInput): Promise<Booking | boolean> {

    await this.roomRepository.update(input.room);

    const booking = new Booking(uuid4(), input.room, input.startDate, input.endDate);

    await this.bookingRepository.create(booking);
    return booking;
  }
}
