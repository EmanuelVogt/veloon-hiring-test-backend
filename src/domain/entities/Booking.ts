import { Room } from "./Room";

export class Booking {
  constructor(
    public readonly id: string,
    public room: Room,
    public startDate: Date,
    public endDate: Date,
  ) {}
}