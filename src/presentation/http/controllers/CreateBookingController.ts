import { CreateBookingUseCase } from "../../../application/use-cases/CreateBookingUseCase";
import { FindBookingUseCase } from "../../../application/use-cases/FindBookingUseCase";
import { VerifyBookingAvailabilityUseCase } from "../../../application/use-cases/VerifyBookingAvailabilityUseCase";
import { Room } from "../../../domain/entities/Room";
import { badRequest, ok, serverError } from "../../helpers/http";
import { Controller } from "../../protocols/Controller";
import { HttpResponse } from "../../protocols/http";

export class CreateBookingController implements Controller {
  constructor(
    private createBookingUseCase: CreateBookingUseCase,
    private findBookingUseCase: FindBookingUseCase,
    private verifyBookingAvailabilityUseCase: VerifyBookingAvailabilityUseCase
  ) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      const { roomId, startDate, endDate } = req;
      if (!roomId || !startDate || !endDate) {
        return badRequest(new Error("Missing required fields"));
      }
      const room = await this.findBookingUseCase.execute(roomId);
      if (!room) {
        return badRequest(new Error("No room was find"));
      }

      const verify = this.verifyBookingAvailabilityUseCase.execute(
        new Date(startDate),
        new Date(endDate),
        room as Room
      );

      if (!verify) {
        return badRequest(new Error("No days available"));
      }

      const booking = await this.createBookingUseCase.execute({
        room: room as Room,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      });

      return ok(booking);
    } catch (error) {
      console.log(error);
      return serverError(error as Error);
    }
  }
}
