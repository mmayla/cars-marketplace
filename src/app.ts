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
  .get(carsController.getCarsValidator)
  .get(carsController.getCars)
  .post(carsController.postCarsValidator)
  .post(carsController.postCars)

export default app
