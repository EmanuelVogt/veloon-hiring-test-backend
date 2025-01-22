// src/infrastructure/repositories/InMemoryBookingRepository.ts

import { IBookingRepository } from "../../domain/repositories/IBookingRepository";
import { Booking } from "../../domain/entities/Booking";
import { bookings as initialBookings } from "../fake-data/bookings";
import { IRoomRepository } from "../../domain/repositories/IRoomRepository";

export class InMemoryBookingRepository implements IBookingRepository {
  private bookings: Booking[] = [];
  private roomRepository: IRoomRepository;

  constructor(roomRepository: IRoomRepository) {
    this.roomRepository = roomRepository;
    this.loadBookings();
  }

  private  loadBookings(): void {
    initialBookings.forEach(async booking => {
      const room = await this.roomRepository.findById(booking.room.id);
      if (room) {
        this.bookings.push(new Booking(
          booking.id,
          room,
          new Date(booking.startDate),
          new Date(booking.endDate)
        ));
      } else {
        console.warn(`Room with ID ${booking.room.id} not found for booking ${booking.id}`);
      }
    });
  }

  async create(booking: Booking): Promise<void> {
    this.bookings.push(booking);
  }

  async findAll(): Promise<Booking[]> {
    return this.bookings;
  }

  async findById(id: string): Promise<Booking | undefined> {
    return this.bookings.find(booking => booking.id === id);
  }

  async update(updatedBooking: Booking): Promise<void> {
    const index = this.bookings.findIndex(booking => booking.id === updatedBooking.id);
    if (index !== -1) {
      this.bookings[index] = updatedBooking;
    } else {
      throw new Error("Booking not found");
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
      this.bookings.splice(index, 1);
    } else {
      throw new Error("Booking not found");
    }
  }
}
