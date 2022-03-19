import { Request, Response } from 'express'
import { CarModel } from './model.js'

export const getOneCar = async (req: Request, res: Response) => {
  const { carId } = req.params

  try {
    const car = await CarModel.findOne({
      _id: carId,
    })
    if (car) {
      res.json(car)
    } else {
      res.status(404).json({
        message: `Car with ${carId} not found`,
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    })
  }
}

export const getCars = async (req: Request, res: Response) => {
  const offset = Number(req.query.offset) || 0
  const limit = Number(req.query.limit) || 100
  try {
    const count = await CarModel.count()
    const totalPages = Math.ceil(count / limit)
    const currentPage = Math.ceil(offset / limit)

    const cars = await CarModel.find()
      .skip(offset)
      .limit(limit)
      .sort({ brand: 1 })
    res.json({
      meta: {
        offset: offset,
        total_items: count,
        total_pages: totalPages,
        page_number: currentPage,
      },
      items: cars,
    })
  } catch (error) {
    res.status(500).json({
      error: error,
    })
  }
}

export const postCar = async (req: Request, res: Response) => {
  try {
    const car = new CarModel(req.body)
    await car.save()
    res.json(car)
  } catch (error) {
    res.status(500).json({
      error: error,
    })
  }
}

export const deleteOneCar = async (req: Request, res: Response) => {
  const { carId } = req.params
  try {
    const car = await CarModel.findOneAndRemove({
      _id: carId,
    })

    if (car) {
      res.json(car)
    } else {
      res.status(404).json({
        message: `Car with ${carId} not found`,
      })
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    })
  }
}
