import { describe, it, expect, beforeEach } from "vitest";
import { FindBookingUseCase } from "../../../src/application/use-cases/FindBookingUseCase";
import { InMemoryRoomRepository } from "../../../src/infrastructure/repositories/InMemoryRoomRepository";
import { Room } from "../../../src/domain/entities/Room";

describe("FindBookingUseCase", () => {
  let roomRepository: InMemoryRoomRepository;
  let findBookingUseCase: FindBookingUseCase;
  let room: Room;

  beforeEach(async () => {
    roomRepository = new InMemoryRoomRepository();
    findBookingUseCase = new FindBookingUseCase(roomRepository);

    room = new Room(
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

    await roomRepository.create(room);
  });

  it("should return the room when it exists", async () => {
    const foundRoom = await findBookingUseCase.execute("1");
    expect(foundRoom).toBeInstanceOf(Room);
    expect(foundRoom.id).toBe("1");
    expect(foundRoom.name).toBe("Quarto Single");
  });

  it("should return false when the room does not exist", async () => {
    const foundRoom = await findBookingUseCase.execute("999");
    expect(foundRoom).toBe(false);
  });
});