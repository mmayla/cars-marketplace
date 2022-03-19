import { JSONSchemaType } from 'ajv'

import type { Car } from './types'

export const postSchema: JSONSchemaType<Car> = {
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
