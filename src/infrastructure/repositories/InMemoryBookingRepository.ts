// src/infrastructure/repositories/InMemoryBookingRepository.ts

import { IBookingRepository } from "../../domain/repositories/IBookingRepository";
import { Booking } from "../../domain/entities/Booking";
import { IRoomRepository } from "../../domain/repositories/IRoomRepository";

export class InMemoryBookingRepository implements IBookingRepository {
  private bookings: Booking[] = [];

  constructor(private roomRepository: IRoomRepository) {}

  async findAll(): Promise<Booking[]> {
    return this.bookings;
  }

  async findById(id: string): Promise<Booking | undefined> {
    return this.bookings.find((booking) => booking.id === id);
  }

  async create(booking: Booking): Promise<void> {
    this.bookings.push(booking);
  }

  async update(booking: Booking): Promise<void> {
    const index = this.bookings.findIndex((b) => b.id === booking.id);
    if (index === -1) {
      throw new Error("Booking not found");
    }
    this.bookings[index] = booking;
  }

  async delete(id: string): Promise<void> {
    const index = this.bookings.findIndex((b) => b.id === id);
    if (index === -1) {
      throw new Error("Booking not found");
    }
    this.bookings.splice(index, 1);
  }

  async clear(): Promise<void> {
    this.bookings = [];
  }
}
