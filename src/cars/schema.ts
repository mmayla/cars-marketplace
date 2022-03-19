import { JSONSchemaType } from 'ajv'

import type { Car } from './types'

export const carSchema: JSONSchemaType<Car> = {
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

export const carPaginationSchema: JSONSchemaType<{
  offset?: number
  limit?: number
}> = {
  type: 'object',
  properties: {
    offset: {
      type: 'integer',
      minimum: 0,
      nullable: true,
    },
    limit: {
      type: 'integer',
      minimum: 0,
      maximum: 500,
      nullable: true,
    },
  },
  additionalProperties: false,
}

export const carIdSchema: JSONSchemaType<{
  carId: string
}> = {
  type: 'object',
  properties: {
    carId: {
      type: 'string',
      minLength: 24,
      maxLength: 24,
    },
  },
  required: ['carId'],
  additionalProperties: false,
}
