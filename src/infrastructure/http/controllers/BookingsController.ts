import { Request, Response } from "express";
import { CreateBookingUseCase } from "../../../application/use-cases/CreateBookingUseCase";

export class BookingsController {
  constructor(private createBookingUseCase: CreateBookingUseCase) {}

  async create(req: Request, res: Response) {
    try {
      const { roomId, startDate, endDate } = req.body;
      const booking = await this.createBookingUseCase.execute({
        roomId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });
      return res.status(201).json(booking);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}