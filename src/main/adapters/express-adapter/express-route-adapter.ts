import { Controller } from '../../../presentation/protocols/Controller'
import { Request, Response } from 'express'

export const adapterRoute = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const req = {
      ...(request.body || {}),
      ...(request.params || {}),
      ...(request.query || {})
    }
    const httpResponse = await controller.handle(req)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
