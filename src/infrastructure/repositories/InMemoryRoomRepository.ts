import { IRoomRepository } from "../../domain/repositories/IRoomRepository";
import { Room } from "../../domain/entities/Room";
import { rooms as initialRooms } from "../fake-data/rooms";

export class InMemoryRoomRepository implements IRoomRepository {
  private rooms: Room[] = [];

  constructor() {
    this.loadRooms();
  }

  private loadRooms(): void {
    this.rooms = initialRooms.map(
      (room) =>
        new Room(
          room.id,
          room.name,
          room.capacity,
          room.numberOfBeds,
          room.stars,
          room.pricePerNight,
          room.availability.map((avail) => ({ ...avail }))
        )
    );
  }

  async findAll(): Promise<Room[]> {
    return this.rooms;
  }

  async findById(id: string): Promise<Room | undefined> {
    return this.rooms.find((room) => room.id === id);
  }

  async filterAvailableRooms(filter?: {
    date?: Date;
    minStars?: number;
    maxPrice?: number;
  }): Promise<Room[]> {
    let availableRooms = this.rooms;

    if (filter?.date) {
      availableRooms = availableRooms.filter((room) =>
        room.availability.some(
          (avail) =>
            avail.date.toDateString() === filter.date!.toDateString() &&
            avail.isAvailable
        )
      );
    }

    if (filter?.minStars) {
      availableRooms = availableRooms.filter(
        (room) => room.stars >= filter.minStars!
      );
    }

    if (filter?.maxPrice) {
      availableRooms = availableRooms.filter(
        (room) => room.pricePerNight <= filter.maxPrice!
      );
    }

    return availableRooms;
  }

  async create(room: Room): Promise<void> {
    this.rooms.push(room);
  }

  async update(updatedRoom: Room): Promise<void> {
    const index = this.rooms.findIndex((room) => room.id === updatedRoom.id);
    if (index !== -1) {
      this.rooms[index] = updatedRoom;
    } else {
      throw new Error("Room not found");
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.rooms.findIndex((room) => room.id === id);
    if (index !== -1) {
      this.rooms.splice(index, 1);
    } else {
      throw new Error("Room not found");
    }
  }
}
