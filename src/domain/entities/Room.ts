export class Room {
  constructor(
    public readonly id: string,
    public name: string,
    public capacity: number,
    public numberOfBeds: number,
    public stars: number,
    public pricePerNight: number,
    public availability: Availability[]
  ) {}
}

export interface Availability {
  date: Date;
  isAvailable: boolean;
}
