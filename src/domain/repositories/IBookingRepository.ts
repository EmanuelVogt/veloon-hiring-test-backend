import { Booking } from "../entities/Booking";

export interface IBookingRepository {
  create(booking: Booking): Promise<void>;
  findAll(): Promise<Booking[]>;
  findById(id: string): Promise<Booking | undefined>;
  update(booking: Booking): Promise<void>;
  delete(id: string): Promise<void>;
}