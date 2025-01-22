import { Room } from "../entities/Room";

export interface IRoomRepository {
  findAll(): Promise<Room[]>;
  findById(id: string): Promise<Room | undefined>;
  filterAvailableRooms(filter?: {
    date?: Date;
    minStars?: number;
    maxPrice?: number;
  }): Promise<Room[]>;
  create(room: Room): Promise<void>;
  update(room: Room): Promise<void>;
  delete(id: string): Promise<void>;
}