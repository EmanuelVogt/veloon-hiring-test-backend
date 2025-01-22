import { IRoomRepository } from "../../domain/repositories/IRoomRepository";
import { Room } from "../../domain/entities/Room";

interface ListAvailableRoomsInput {
  date?: Date;
  minStars?: number;
  maxPrice?: number;
}

export class ListAvailableRoomsUseCase {
  constructor(private roomRepository: IRoomRepository) {}

  async execute(input: ListAvailableRoomsInput): Promise<Room[]> {
    const rooms = await this.roomRepository.filterAvailableRooms(input);
    return rooms;
  }
}