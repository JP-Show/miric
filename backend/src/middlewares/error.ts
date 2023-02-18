import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../helpers/api-error'

export function errorMiddleware(
  error: Error & Partial<ApiError>, // it's adding error plus ApiError, because ApiError have StatusCodes but when use throw new Error, if we don't use Partial, Error throw a undefined StatusCodes.
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error)
  const statusCodes = error.statusCode ?? 500
  const message = error.statusCode ? error.message : 'internal server error'
  return res.status(statusCodes).json({ message })
}
