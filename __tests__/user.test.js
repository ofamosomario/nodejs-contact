const request = require('supertest');
import app from '../src/app'

// Testing all users end point.
it('get all users' , done => {
  request(app)
    .app('/users')
    .expect(400);
})
