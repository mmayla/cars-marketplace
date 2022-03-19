import { Request, Response, NextFunction } from 'express'
import Ajv from 'ajv'

import { postSchema, getSchema } from './schema.js'

export const postCarsValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const ajv = new Ajv()
  const validate = ajv.compile(postSchema)
  if (validate(req.body)) {
    next()
  } else {
    res.json({
      error: validate.errors,
    })
  }
}

export const getCarsValidator = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const ajv = new Ajv({ coerceTypes: true })
  const validate = ajv.compile(getSchema)
  if (validate(req.query)) {
    next()
  } else {
    res.json({
      error: validate.errors,
    })
  }
}
