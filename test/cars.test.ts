/* eslint-disable jest/expect-expect, jest/no-done-callback */
import request from 'supertest'
import app, { apiPrefix } from '../src/app.js'
import { connectToDatabase, closeDatabaseConnection } from '../src/config.js'

const validCarsBody = [
  {
    brand: 'Lamborghini',
    model: 'Aventador',
    makeYear: 2020,
    color: 'blue',
    price: 335249,
  },
]

beforeAll(async () => {
  await connectToDatabase()
})

afterAll(async () => {
  await closeDatabaseConnection()
})

const invalidCarsBody = [
  {
    brand: '', // empty
    model: 'Aventador',
    makeYear: 2020,
    color: 'blue',
    price: 335249,
  },
  {
    brand: 'Lamborghini',
    model: '', // empty
    makeYear: 2020,
    color: 'blue',
    price: 335249,
  },
  {
    brand: 'Lamborghini',
    model: 'Aventador',
    makeYear: 5, // wrong year
    color: 'blue',
    price: 335249,
  },
  {
    brand: 'Lamborghini',
    model: 'Aventador',
    makeYear: 2020,
    color: 4, // not a string
    price: 335249,
  },
  {
    brand: 'Lamborghini',
    model: 'Aventador',
    makeYear: 2020,
    color: 'blue',
    price: -45, // negative price
  },
]

describe('POST /cars', () => {
  validCarsBody.forEach((test) => {
    it('should return 200', (done) => {
      request(app)
        .post(`${apiPrefix}/cars`)
        .send(test)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
  })

  invalidCarsBody.forEach((test) => {
    it('should return 400', (done) => {
      request(app)
        .post(`${apiPrefix}/cars`)
        .send(test)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done)
    })
  })
})
