/* eslint-disable jest/expect-expect, jest/no-done-callback */
import request from 'supertest'
import mongoose from 'mongoose'

import app, { apiPrefix } from '../src/app.js'
import { connectToDatabase, closeDatabaseConnection } from '../src/config.js'
import { CarModel, CarDocument } from '../src/cars/index.js'

const validCarsBody = [
  {
    brand: 'Lamborghini',
    model: 'Aventador',
    makeYear: 2021,
    color: 'blue',
    price: 335249,
  },
  {
    brand: 'Bugatti',
    model: 'Veyron',
    makeYear: 2021,
    color: 'white',
    price: 1900000,
  },
  {
    brand: 'Rolls-Royce',
    model: 'Cullinan',
    makeYear: 2020,
    color: 'navi blue',
    price: 333000,
  },
  {
    brand: 'Porsche',
    model: '911',
    makeYear: 2016,
    color: 'red',
    price: 111231,
  },
  {
    brand: 'Lamborghini',
    model: 'Aventador',
    makeYear: 2019,
    color: 'silver',
    price: 300000,
  },
]

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

const carsRoute = `${apiPrefix}/cars`

beforeAll(async () => {
  await connectToDatabase('testdb')
})

afterEach((done) => {
  CarModel.deleteMany({}, done)
})

afterAll(async () => {
  await closeDatabaseConnection()
})

describe('POST /cars', () => {
  validCarsBody.forEach((test, index) => {
    it(`should return 200 - test index: ${index}`, (done) => {
      request(app)
        .post(carsRoute)
        .send(test)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done)
    })
  })

  invalidCarsBody.forEach((test, index) => {
    it(`should return 400 - test index: ${index}`, (done) => {
      request(app)
        .post(carsRoute)
        .send(test)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400, done)
    })
  })
})

describe('GET /cars', () => {
  let insertedCars: CarDocument[]
  beforeEach(async () => {
    insertedCars = await CarModel.insertMany(validCarsBody)
  })

  it('should return 200', async () => {
    const res = await request(app).get(carsRoute)
    expect(res.status).toEqual(200)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.body['meta']['total_items']).toEqual(validCarsBody.length)
  })

  it('should list limit query work', async () => {
    const res = await request(app).get(carsRoute).query({
      offset: 0,
      limit: 2,
    })
    expect(res.status).toEqual(200)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.body['items'].length).toEqual(2)
  })

  it('should get an existing Car', async () => {
    const car = insertedCars[0]
    const res = await request(app).get(`${carsRoute}/${car._id.toString()}`)

    expect(res.status).toEqual(200)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.body).toEqual(JSON.parse(JSON.stringify(car)))
  })

  it('should fail to get non-existing Car', async () => {
    const newId = new mongoose.Types.ObjectId()
    const res = await request(app).get(`${carsRoute}/${newId.toString()}`)

    expect(res.status).toEqual(404)
    expect(res.headers['content-type']).toMatch(/json/)
  })
})

describe('PUT /cars', () => {
  let insertedCars: CarDocument[]
  beforeEach(async () => {
    insertedCars = await CarModel.insertMany(validCarsBody)
  })

  it('should partially update a Car', async () => {
    const car = insertedCars[0]
    const color = 'color-not-discovered'
    const res = await request(app)
      .put(`${carsRoute}/${car._id.toString()}`)
      .send({
        color,
      })

    expect(res.status).toEqual(200)
    expect(res.headers['content-type']).toMatch(/json/)
    expect(res.body['color']).not.toEqual(car.color)
    expect(res.body['color']).toEqual(color)
  })
})
