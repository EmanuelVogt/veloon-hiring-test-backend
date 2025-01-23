import { IRoomRepository } from "../../domain/repositories/IRoomRepository";
import { Room } from "../../domain/entities/Room";

export class FindRoomByIdUseCase {
  constructor(private roomRepository: IRoomRepository) {}

  async execute(id: string): Promise<Room | false> {
    const room = await this.roomRepository.findById(id);
    return room || false
   }
}