export class ForbiddenError extends Error {
  constructor () {
    super('Credentials provided already in use')
    this.name = 'ForbiddenError'
  }
}
