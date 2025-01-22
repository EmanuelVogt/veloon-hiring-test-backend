import { Request, Response } from "express";
import { ListAvailableRoomsUseCase } from "../../../application/use-cases/ListAvailableRoomsUseCase";

export class RoomsController {
  constructor(private listAvailableRoomsUseCase: ListAvailableRoomsUseCase) {}

  async list(req: Request, res: Response) {
    try {
      const rooms = await this.listAvailableRoomsUseCase.execute();
      return res.json(rooms);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
