import { FindRoomByIdUseCase } from "../../../application/use-cases/FindRoomByIdUseCase";
import { badRequest, ok, serverError } from "../../helpers/http";
import { Controller } from "../../protocols/Controller";
import { HttpResponse } from "../../protocols/http";

export class FindRoomByIdController implements Controller {
  constructor(private findRoomByIdUseCase: FindRoomByIdUseCase) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      const { id } = req;
      if (!id) {
        return badRequest(new Error("Missing required fields"));
      }

      const room = await this.findRoomByIdUseCase.execute(id);

      return ok(room);
    } catch (error) {
      console.log(error);
      return serverError(error as Error);
    }
  }
}
