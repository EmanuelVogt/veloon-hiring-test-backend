import { DeleteBookingUseCase } from "../../../application/use-cases/DeleteBookingUseCase";
import { badRequest, noContent, serverError } from "../../helpers/http";
import { Controller } from "../../protocols/Controller";
import { HttpResponse } from "../../protocols/http";

export class DeleteBookingController implements Controller {
  constructor(private deleteBookingUseCase: DeleteBookingUseCase) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      const { id } = req.params;

      if (!id) {
        return badRequest(new Error("Booking ID is required"));
      }

      await this.deleteBookingUseCase.execute(id);

      return noContent();
    } catch (error) {
      return serverError(error as Error);
    }
  }
}
