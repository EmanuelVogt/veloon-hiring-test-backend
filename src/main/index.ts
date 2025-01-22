import express from "express";
import { RoomsController } from "../infrastructure/http/controllers/RoomsController";
import { BookingsController } from "../infrastructure/http/controllers/BookingsController";
import { ListAvailableRoomsUseCase } from "../application/use-cases/ListAvailableRoomsUseCase";
import { CreateBookingUseCase } from "../application/use-cases/CreateBookingUseCase";

const app = express();
app.use(express.json());

const listAvailableRoomsUseCase = new ListAvailableRoomsUseCase();
const createBookingUseCase = new CreateBookingUseCase();

const roomsController = new RoomsController(listAvailableRoomsUseCase);
const bookingsController = new BookingsController(createBookingUseCase);

app.get("/", async (req, res) => {
  await roomsController.list(req, res)
});

app.get("/rooms", async (req, res) => {
  await roomsController.list(req, res)
});

app.post("/bookings", async (req, res) => {
  await bookingsController.create(req, res)
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});