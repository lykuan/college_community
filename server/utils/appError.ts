import { NextFunction, Request, Response } from "express"

export default class AppError extends Error {
  readonly name: string
  readonly status: number
  readonly message: string
  readonly isOperational: boolean
  constructor(name: string, status: number, message: string) {
    super(message)
    this.message = message
    this.status = status
    this.name = name

    this.isOperational = true
  }
}

export const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { name, message, status } = err
  status = status || 500
  message = message || "something went wrong."
  res
    .status(status)
    .send({ errorType: name, ErrorMessage: message, errorStatus: status })
}
