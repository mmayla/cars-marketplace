import express from 'express'
import type { Request, Response, NextFunction } from 'express'

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
  .all(carsController.carIdParamsValidator)
  .get(carsController.getOneCar)
  .put(carsController.carPartialBodyValidator)
  .put(carsController.updateOneCar)
  .delete(carsController.deleteOneCar)

/**
 * Error handlers
 */
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  console.error(err.stack)
  res.status(500).json({
    message: 'Internal server error.',
  })
})

export default app
