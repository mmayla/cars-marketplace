import { Request, Response, NextFunction } from 'express'
import Ajv, { JSONSchemaType } from 'ajv'

interface Car {
  brand: string
  model: string
  makeYear: number
  color: string
  price: number
}

const postSchema: JSONSchemaType<Car> = {
  type: 'object',
  properties: {
    brand: {
      type: 'string',
    },
    model: {
      type: 'string',
    },
    makeYear: {
      type: 'integer',
    },
    color: {
      type: 'string',
    },
    price: {
      type: 'number',
    },
  },
  required: ['brand', 'model', 'makeYear', 'color', 'price'],
  additionalProperties: false,
}

export const getCars = (req: Request, res: Response): void => {
  console.log(req.headers)
  res.json({
    test: 'Hello my first cars',
  })
}

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

export const postCars = (req: Request, res: Response): void => {
  console.log(req.headers)
  res.json({
    test: 'post cars',
  })
}
