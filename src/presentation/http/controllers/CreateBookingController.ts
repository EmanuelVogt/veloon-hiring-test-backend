import { CreateBookingUseCase } from "../../../application/use-cases/CreateBookingUseCase";
import { badRequest, ok, serverError } from "../../helpers/http";
import { Controller } from "../../protocols/Controller";
import { HttpResponse } from "../../protocols/http";

export class CreateBookingController implements Controller {
  constructor(
    private createBookingUseCase: CreateBookingUseCase,
  ) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      const { roomId, startDate, endDate } = req.body;

      if (!roomId || !startDate || !endDate) {
        return badRequest(new Error("Missing required fields"))
      }

      const booking = await this.createBookingUseCase.execute({
        roomId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });

      return ok(booking);
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
