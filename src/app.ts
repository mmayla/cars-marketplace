import express from 'express'

import * as carsController from './controllers/cars.js'

const app = express()

/**
 * Express configuration
 */
app.use(express.json())
app.set('PORT', process.env.PORT || 3000)

export const apiPrefix = '/api/v1'

/**
 * API routes
 */
app
  .route(`${apiPrefix}/cars`)
  .get(carsController.getCars)
  .post(carsController.postCarsValidator)
  .post(carsController.postCars)

export default app
