import { Request, Response, NextFunction } from 'express'
import Ajv from 'ajv'

import { postSchema } from './schema.js'

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
