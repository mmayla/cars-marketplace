import express from 'express'

import * as carsController from './cars/index.js'

const app = express()

/**
 * Express configuration
 */
app.use(express.json())

export const apiPrefix = '/api/v1'

/**
 * API routes
 */
app
  .route(`${apiPrefix}/cars`)
  .get(carsController.CarPaginationQueryValidator)
  .get(carsController.getCars)
  .post(carsController.carBodyValidator)
  .post(carsController.postCar)

app
  .route(`${apiPrefix}/cars/:carId`)
  .get(carsController.carIdParamsValidator)
  .get(carsController.getOneCar)
  .delete(carsController.carIdParamsValidator)
  .delete(carsController.deleteOneCar)

export default app
