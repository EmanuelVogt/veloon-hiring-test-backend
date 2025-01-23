import { Room } from "../../domain/entities/Room";

export const rooms: Room[] = [
  new Room(
    "1",
    "Quarto Single",
    1,
    1,
    3,
    100,
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=60",
    [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&auto=format&fit=crop&q=60",
    ],
    [
      { date: new Date("2025-01-24"), isAvailable: false },
      { date: new Date("2025-01-25"), isAvailable: false },
      { date: new Date("2025-01-26"), isAvailable: false },
    ],
    [ // Avaliações adicionadas
      {
        user: "Ana Silva",
        pictureUrl: "https://randomuser.me/api/portraits/women/44.jpg",
        comment: "Quarto muito confortável e bem localizado!",
        date: new Date("2025-01-27"),
      },
      {
        user: "Bruno Costa",
        pictureUrl: "https://randomuser.me/api/portraits/men/46.jpg",
        comment: "Excelente atendimento da equipe. Recomendo!",
        date: new Date("2025-01-28"),
      },
    ]
  ),
  new Room(
    "2",
    "Quarto Duplo",
    2,
    2,
    4,
    150,
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop&q=60",
    [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=60",
    ],
    [
      { date: new Date("2025-01-20"), isAvailable: false },
      { date: new Date("2025-01-21"), isAvailable: false },
      { date: new Date("2025-01-22"), isAvailable: false },
    ],
    [ // Avaliações adicionadas
      {
        user: "Carlos Mendes",
        pictureUrl: "https://randomuser.me/api/portraits/men/52.jpg",
        comment: "Ótimo espaço para famílias. Superou minhas expectativas!",
        date: new Date("2025-01-23"),
      },
      {
        user: "Daniela Rocha",
        pictureUrl: "https://randomuser.me/api/portraits/women/65.jpg",
        comment: "Ambiente limpo e agradável. Voltarei com certeza.",
        date: new Date("2025-01-24"),
      },
    ]
  ),
  new Room(
    "3",
    "Suíte Família",
    4,
    3,
    5,
    250,
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60",
    [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&auto=format&fit=crop&q=60",
    ],
    [
      { date: new Date("2025-01-20"), isAvailable: false },
      { date: new Date("2025-01-21"), isAvailable: false },
      { date: new Date("2025-01-22"), isAvailable: false },
    ],
    [ // Avaliações adicionadas
      {
        user: "Eduardo Lima",
        pictureUrl: "https://randomuser.me/api/portraits/men/33.jpg",
        comment: "Espaço perfeito para nossa família. Muito bem equipado!",
        date: new Date("2025-01-25"),
      },
      {
        user: "Fernanda Alves",
        pictureUrl: "https://randomuser.me/api/portraits/women/47.jpg",
        comment: "Ambiente espaçoso e confortável. Adorei!",
        date: new Date("2025-01-26"),
      },
    ]
  ),
];
