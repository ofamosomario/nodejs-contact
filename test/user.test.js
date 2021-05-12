const request = require('supertest');
import app from '../src/app'
import db from '../src/config/database'

let token;

beforeAll((done) => {
  request(app)
    .post('/users')
    .send({
      username: 'test@test.com',
      password: '123password',
    })
    .end((err, res) => {
      token = res.body.token;
      done();
    });

  done();
});

describe('Users', function () {

  it('log in an user with token' , async(done) => {

    var data = {
      email: 'test@test.com',
      password: '123password'
    }

    const res = await request(app)
      .post('/users')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(data)

    expect(res.body).toHaveProperty('token')

    done();

  });

  it('create user and respond with success', async(done) => {

    var data = {
      email: 'test2@test.com',
      password: '123password'
    }

    const res = await request(app)
      .post('/users')
      .set('Accept', 'application/json')
      .send(data)

      expect(res.body).toHaveProperty('token')

      done();
  });

  it('create user with a duplicate email address should fail', async(done) => {
    const res = await request(app)
      .post('/users')
      .set('Accept', 'application/json')
      .send({ email: "test@test.com" })
      .expect(400)

      done();
  });

  it('update user without token should return error', async (done) => {

    var data = {
      email: 'test@test.com',
      password: '123password'
    }

    const res = await request(app)
      .put('/users')
      .set('Accept', 'application/json')
      .set('Authentication', '')
      .send(data)

    expect(res.body).toHaveProperty('error')
    done();

  });

  afterAll(async () => {
    await db.sequelize.close()
  })

});
