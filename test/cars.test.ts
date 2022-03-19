/* eslint-disable jest/expect-expect, jest/no-done-callback */
import request from 'supertest'
import app, { apiPrefix } from '../src/app.js'

describe('GET /users', () => {
  it('should return 200', (done) => {
    request(app)
      .get(`${apiPrefix}/cars`)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})
