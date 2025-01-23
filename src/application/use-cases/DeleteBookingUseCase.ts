import { IBookingRepository } from "../../domain/repositories/IBookingRepository";
import { IRoomRepository } from "../../domain/repositories/IRoomRepository";

export class DeleteBookingUseCase {
  constructor(
    private bookingRepository: IBookingRepository,
    private roomRepository?: IRoomRepository
  ) {}

  async execute(id: string): Promise<void> {
    const booking = await this.bookingRepository.findById(id);
    if (!booking) {
      throw new Error("Booking not found");
    }

    if (this.roomRepository) {
      const room = booking.room;
      room.availability.forEach((avail) => {
        if (avail.date >= booking.startDate && avail.date < booking.endDate) {
          avail.isAvailable = true;
        }
      });

      await this.roomRepository.update(room);
    }

    await this.bookingRepository.delete(id);
  }
}
