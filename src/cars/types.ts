import { Document, Types } from 'mongoose'

export interface Car {
  brand: string
  model: string
  makeYear: number
  color: string
  price: number
}

export type CarDocument = Document<unknown, unknown, Car> &
  Car & {
    _id: Types.ObjectId
  }
