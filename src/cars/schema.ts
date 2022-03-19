import { JSONSchemaType } from 'ajv'

import type { Car } from './types'

export const carPropertiesSchema: JSONSchemaType<Car> = {
  type: 'object',
  properties: {
    brand: {
      type: 'string',
      minLength: 1,
    },
    model: {
      type: 'string',
      minLength: 1,
    },
    makeYear: {
      type: 'integer',
      minimum: 1800,
    },
    color: {
      type: 'string',
      minLength: 1,
    },
    price: {
      type: 'number',
      minimum: 0,
    },
  },
  required: ['brand', 'model', 'makeYear', 'color', 'price'],
  additionalProperties: false,
}

export const carPartialPropertiesSchema: JSONSchemaType<Partial<Car>> = {
  type: 'object',
  properties: {
    brand: {
      type: 'string',
      minLength: 1,
      nullable: true,
    },
    model: {
      type: 'string',
      minLength: 1,
      nullable: true,
    },
    makeYear: {
      type: 'integer',
      minimum: 1800,
      nullable: true,
    },
    color: {
      type: 'string',
      minLength: 1,
      nullable: true,
    },
    price: {
      type: 'number',
      minimum: 0,
      nullable: true,
    },
  },
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
