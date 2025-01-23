import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryRoomRepository } from "../../../src/infrastructure/repositories/InMemoryRoomRepository";
import { Room } from "../../../src/domain/entities/Room";

describe("InMemoryRoomRepository", () => {
  let repository: InMemoryRoomRepository;

  beforeEach(() => {
    repository = new InMemoryRoomRepository();
  });

  it("should find all rooms", async () => {
    const rooms = await repository.findAll();
    expect(rooms.length).toBe(3);
  });

  it("should find a room by ID", async () => {
    const room = await repository.findById("1");
    expect(room).toBeDefined();
    expect(room?.name).toBe("Quarto Single");
    expect(room?.imageUrl).toBeDefined();
    expect(room?.images.length).toBeGreaterThan(0);
    expect(room?.reviews.length).toBeGreaterThanOrEqual(0);
  });

  it("should return undefined for non-existent room", async () => {
    const room = await repository.findById("999");
    expect(room).toBeUndefined();
  });

  it("should create a new room", async () => {
    const newRoom = new Room(
      "4",
      "Quarto Deluxe",
      2,
      2,
      4,
      200,
      "https://example.com/image4.jpg",
      [
        "https://example.com/image4a.jpg",
        "https://example.com/image4b.jpg",
      ],
      [
        { date: new Date("2025-01-23"), isAvailable: true },
        { date: new Date("2025-01-24"), isAvailable: true },
      ],
      [] // Initial reviews can be empty
    );

    await repository.create(newRoom);
    const rooms = await repository.findAll();
    expect(rooms.length).toBe(4);
    expect(rooms.find(r => r.id === "4")).toEqual(newRoom);
  });

  it("should update an existing room", async () => {
    const room = await repository.findById("1");
    expect(room).toBeDefined();
    room!.pricePerNight = 120;
    room!.imageUrl = "https://example.com/updated-image1.jpg";
    room!.images.push("https://example.com/image1c.jpg");
    await repository.update(room!);
    const updatedRoom = await repository.findById("1");
    expect(updatedRoom?.pricePerNight).toBe(120);
    expect(updatedRoom?.imageUrl).toBe("https://example.com/updated-image1.jpg");
    expect(updatedRoom?.images).toContain("https://example.com/image1c.jpg");
  });

  it("should throw an error when updating a non-existent room", async () => {
    const fakeRoom = new Room(
      "999",
      "Room Not Found",
      1,
      1,
      3,
      100,
      "https://example.com/image999.jpg",
      ["https://example.com/image999a.jpg"],
      [],
      []
    );

    await expect(repository.update(fakeRoom)).rejects.toThrow("Room not found");
  });

  it("should delete an existing room", async () => {
    await repository.delete("1");
    const rooms = await repository.findAll();
    expect(rooms.length).toBe(2);
    expect(rooms.find(r => r.id === "1")).toBeUndefined();
  });

  it("should throw an error when deleting a non-existent room", async () => {
    await expect(repository.delete("999")).rejects.toThrow("Room not found");
  });
});