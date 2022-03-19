import type { Model } from 'mongoose'
import mongoose from 'mongoose'

const { Schema, model } = mongoose

import type { Car } from './types'

interface CarModel extends Model<Car> {
  createOne(car: CarModel): boolean
}

export const CarSchema = new Schema<Car, CarModel>({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  makeYear: {
    type: Number,
    min: 1800,
  },
  color: String,
  price: {
    type: Number,
    min: 0,
  },
})

export const CarModel = model<Car, CarModel>('Car', CarSchema)
