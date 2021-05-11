const request = require('supertest');

const app = require('../src/app');

describe('Users', function () {
  it('create user and respond with success', () => {
    const data = {
      email: 'test@test.com',
      password: '123password'
    }
    request(app)
      .post('/user')
      .send(data)
      .expect(201)
      .end(error => {
        if(error) return done(error);
      })
  });
});
