import { IRoomRepository } from "../../domain/repositories/IRoomRepository";
import { Room } from "../../domain/entities/Room";

export class FindBookingUseCase {
  constructor(
    private roomRepository: IRoomRepository
  ) {}

  async execute(roomId: string): Promise<Room | boolean> {
    const room = await this.roomRepository.findById(roomId);
    if (!room) {
      return false
    }

    return room
  }
}
