
import { Booking } from "../../domain/entities/Booking";
import { rooms } from "./rooms";

const room1 = rooms.find(room => room.id === "1");
const room2 = rooms.find(room => room.id === "2");

export const bookings: Booking[] = [
  new Booking(
    "b1",
    room1!,
    new Date("2025-01-20"),
    new Date("2025-01-21")
  ),
  new Booking(
    "b2",
    room2!,
    new Date("2025-01-21"),
    new Date("2025-01-22")
  )
];
