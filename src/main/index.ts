import express from "express";
import bodyParser from "body-parser";

import { ListAvailableRoomsUseCase } from "../application/use-cases/ListAvailableRoomsUseCase";
import { CreateBookingUseCase } from "../application/use-cases/CreateBookingUseCase";
import { InMemoryRoomRepository } from "../infrastructure/repositories/InMemoryRoomRepository";
import { InMemoryBookingRepository } from "../infrastructure/repositories/InMemoryBookingRepository";
import { DeleteBookingUseCase } from "../application/use-cases/DeleteBookingUseCase";
import { adapterRoute } from "./adapters/express-adapter/express-route-adapter";
import { ListRoomsController } from "../presentation/http/controllers/ListRoomsController";
import { CreateBookingController } from "../presentation/http/controllers/CreateBookingController";
import { DeleteBookingController } from "../presentation/http/controllers/DeleteBookingController";
import cors from "cors";
import { FindBookingUseCase } from "../application/use-cases/FindBookingUseCase";
import { VerifyBookingAvailabilityUseCase } from "../application/use-cases/VerifyBookingAvailabilityUseCase";
import { FindRoomByIdUseCase } from "../application/use-cases/FindRoomByIdUseCase";
import { FindRoomByIdController } from "../presentation/http/controllers/FindRoomByIdController";

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const roomRepository = new InMemoryRoomRepository();
const bookingRepository = new InMemoryBookingRepository(roomRepository);

const listAvailableRoomsUseCase = new ListAvailableRoomsUseCase(roomRepository);
const createBookingUseCase = new CreateBookingUseCase(
  bookingRepository,
  roomRepository
);
const deleteBookingUseCase = new DeleteBookingUseCase(bookingRepository);
const findBookingUseCase = new FindBookingUseCase(roomRepository);
const verifyBookingAvailabilityUseCase = new VerifyBookingAvailabilityUseCase(
  bookingRepository,
  roomRepository
);
const findRoomByIdUseCase = new FindRoomByIdUseCase(roomRepository);

app.get(
  "/rooms",
  adapterRoute(new ListRoomsController(listAvailableRoomsUseCase))
);
app.get(
  "/room/:id",
  adapterRoute(new FindRoomByIdController(findRoomByIdUseCase))
);
app.post(
  "/bookings",
  adapterRoute(
    new CreateBookingController(
      createBookingUseCase,
      findBookingUseCase,
      verifyBookingAvailabilityUseCase
    )
  )
);
app.delete(
  "/bookings/:id",
  adapterRoute(new DeleteBookingController(deleteBookingUseCase))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
