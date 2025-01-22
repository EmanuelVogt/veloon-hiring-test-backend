import { Room } from "../../domain/entities/Room";

export class ListAvailableRoomsUseCase {
  private readonly rooms: Room[] = [
    new Room("1", "Quarto Single", 1),
    new Room("2", "Quarto Duplo", 2),
    new Room("3", "Suíte Família", 4),
  ];

  async execute(): Promise<Room[]> {
    return this.rooms;
  }
}
