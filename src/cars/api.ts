import { Request, Response } from 'express'
import { CarModel } from './model.js'

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
    res.status(400).json({
      error: error,
    })
  }
}

export const postCars = async (req: Request, res: Response) => {
  try {
    const car = new CarModel(req.body)
    await car.save()
    res.json(car)
  } catch (error) {
    res.status(400).json({
      error: error,
    })
  }
}
