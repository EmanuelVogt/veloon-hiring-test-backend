export class Room {
  constructor(
    public readonly id: string,
    public name: string,
    public capacity: number,
    public numberOfBeds: number,
    public stars: number,
    public pricePerNight: number,
    public imageUrl: string,
    public images: string[],
    public availability: Availability[],
    public reviews: Reviews[]
  ) {}
}

export interface Availability {
  date: Date;
  isAvailable: boolean;
}

export interface Reviews {
  user: string
  pictureUrl: string
  comment: string
  date: Date
}