import { Room } from "../../domain/entities/Room";

export const rooms: Room[] = [
  new Room(
    "1",
    "Quarto Single",
    1,
    1,
    3,
    100,
    [
      { date: new Date("2025-01-20"), isAvailable: true },
      { date: new Date("2025-01-21"), isAvailable: true },
      { date: new Date("2025-01-22"), isAvailable: true },
    ]
  ),
  new Room("2", "Quarto Duplo", 2, 2, 4, 150, [
    { date: new Date("2025-01-20"), isAvailable: true },
    { date: new Date("2025-01-21"), isAvailable: false },
    { date: new Date("2025-01-22"), isAvailable: true },
  ]),
  new Room("3", "Suíte Família", 4, 3, 5, 250, [
    { date: new Date("2025-01-20"), isAvailable: true },
    { date: new Date("2025-01-21"), isAvailable: true },
    { date: new Date("2025-01-22"), isAvailable: true },
  ]),
];
