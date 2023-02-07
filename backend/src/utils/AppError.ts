export class AppError {
  message: string = ''
  statusCode: number = 0

  constructor(message: string, statusCode: number) {
    this.message = message
    this.statusCode = statusCode
  }
}
