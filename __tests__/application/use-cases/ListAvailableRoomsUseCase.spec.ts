import { describe, it, expect, beforeEach } from "vitest";
import { ListAvailableRoomsUseCase } from "../../../src/application/use-cases/ListAvailableRoomsUseCase";
import { InMemoryRoomRepository } from "../../../src/infrastructure/repositories/InMemoryRoomRepository";
import { Room } from "../../../src/domain/entities/Room";

describe("ListAvailableRoomsUseCase", () => {
  let roomRepository: InMemoryRoomRepository;
  let listAvailableRoomsUseCase: ListAvailableRoomsUseCase;
  let room1: Room;
  let room2: Room;
  let room3: Room;

  beforeEach(async () => {
    roomRepository = new InMemoryRoomRepository();

    room1 = new Room(
      "1",
      "Quarto Single",
      1,
      1,
      3,
      100,
      "https://example.com/image1.jpg",
      ["https://example.com/image1a.jpg"],
      [
        { date: new Date("2025-01-20"), isAvailable: true },
        { date: new Date("2025-01-21"), isAvailable: true },
      ],
      []
    );

    room2 = new Room(
      "2",
      "Quarto Duplo",
      2,
      2,
      4,
      150,
      "https://example.com/image2.jpg",
      ["https://example.com/image2a.jpg"],
      [
        { date: new Date("2025-01-20"), isAvailable: true },
        { date: new Date("2025-01-21"), isAvailable: false },
      ],
      []
    );

    room3 = new Room(
      "3",
      "Suíte Família",
      4,
      3,
      5,
      300,
      "https://example.com/image3.jpg",
      ["https://example.com/image3a.jpg"],
      [
        { date: new Date("2025-01-20"), isAvailable: true },
        { date: new Date("2025-01-21"), isAvailable: true },
      ],
      []
    );

    await roomRepository.create(room1);
    await roomRepository.create(room2);
    await roomRepository.create(room3);

    listAvailableRoomsUseCase = new ListAvailableRoomsUseCase(roomRepository);
  });

  it("should list all available rooms without filters", async () => {
    const rooms = await listAvailableRoomsUseCase.execute({});
    expect(rooms.length).toBe(6);
  });

  it("should filter available rooms by date", async () => {
    const filter = { date: new Date("2025-01-21") };
    const rooms = await listAvailableRoomsUseCase.execute(filter);
    expect(rooms.length).toBe(2);
    expect(rooms.find(r => r.id === "2")).toBeUndefined();
  });

  it("should filter available rooms by minStars", async () => {
    const filter = { minStars: 4 };
    const rooms = await listAvailableRoomsUseCase.execute(filter);
    expect(rooms.length).toBe(4);
  });

  it("should filter available rooms by maxPrice", async () => {
    const filter = { maxPrice: 150 };
    const rooms = await listAvailableRoomsUseCase.execute(filter);
    expect(rooms.length).toBe(4);
  });

  it("should apply multiple filters", async () => {
    const filter = { date: new Date("2025-01-21"), minStars: 4, maxPrice: 200 };
    const rooms = await listAvailableRoomsUseCase.execute(filter);
    expect(rooms.length).toBe(0);
  });

  it("should return empty list when no rooms match the filters", async () => {
    const filter = { date: new Date("2025-01-21"), minStars: 5, maxPrice: 100 };
    const rooms = await listAvailableRoomsUseCase.execute(filter);
    expect(rooms.length).toBe(0);
  });
});