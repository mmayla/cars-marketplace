import { Request, Response, NextFunction } from 'express'
import Ajv from 'ajv'

import { carSchema, carPaginationSchema, carIdSchema } from './schema.js'

export const carBodyValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const ajv = new Ajv()
  const validate = ajv.compile(carSchema)
  if (validate(req.body)) {
    next()
  } else {
    res.json({
      error: validate.errors,
    })
  }
}

export const CarPaginationQueryValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const ajv = new Ajv({ coerceTypes: true })
  const validate = ajv.compile(carPaginationSchema)
  if (validate(req.query)) {
    next()
  } else {
    res.json({
      error: validate.errors,
    })
  }
}

export const carIdParamsValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const ajv = new Ajv({ coerceTypes: true })
  const validate = ajv.compile(carIdSchema)
  if (validate(req.params)) {
    next()
  } else {
    res.json({
      error: validate.errors,
    })
  }
}
