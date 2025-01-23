import { ListAvailableRoomsUseCase } from "../../../application/use-cases/ListAvailableRoomsUseCase";
import { Controller } from "../../protocols/Controller";
import { HttpResponse } from "../../protocols/http";
import { badRequest, ok, serverError } from "../../helpers/http";

export class ListRoomsController implements Controller {
  constructor(private listAvailableRoomsUseCase: ListAvailableRoomsUseCase) {}

  async handle(req: any): Promise<HttpResponse> {
    try {
      const { date, minStars, maxPrice } = req.query;

      const filter: any = {};

      if (date) {
        const parsedDate = new Date(date as string);
        if (isNaN(parsedDate.getTime())) {
          return badRequest(new Error("Invalid date format"));
        }
        filter.date = parsedDate;
      }

      if (minStars) {
        const parsedMinStars = Number(minStars);
        if (isNaN(parsedMinStars) || parsedMinStars < 0) {
          return badRequest(new Error("Invalid minStars value"));
        }
        filter.minStars = parsedMinStars;
      }

      if (maxPrice) {
        const parsedMaxPrice = Number(maxPrice);
        if (isNaN(parsedMaxPrice) || parsedMaxPrice < 0) {
          return badRequest(new Error("Invalid maxPrice value"));
        }
        filter.maxPrice = parsedMaxPrice;
      }

      const rooms = await this.listAvailableRoomsUseCase.execute(filter);
      return ok(rooms);
    } catch (error: any) {
      return serverError(error);
    }
  }
}
