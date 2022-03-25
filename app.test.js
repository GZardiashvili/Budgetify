const supertest = require('supertest');
const mongoose = require('mongoose');
const axios = require('axios');
const app = require('./app');
require('dotenv').config();

const accForTest = {
  UserId: '1',
  title: 'Added while testing account POST',
  description: 'Will delete after test finishs.',
  category: 'for testing',
  currency: 'USD',
  availableAmount: 1000,
  dateOfCreation: 'Sun Mar 06 2022 17:04:52 GMT+0400 (Georgia Standard Time)',
  dateOfUpdate: 'Sun Mar 06 2022 17:04:52 GMT+0400 (Georgia Standard Time)',
};
const updatedAcc = {
  UserId: '2',
  title: 'Updated while testing account PUT',
  description: 'Updated successfully.',
  category: 'new',
  currency: 'USD',
  availableAmount: 20000,
  dateOfCreation: 'Sun Mar 06 2022 17:04:52 GMT+0400 (Georgia Standard Time)',
  dateOfUpdate: 'Sun Mar 06 2022 17:04:52 GMT+0400 (Georgia Standard Time)',
};

let loginToken;
let testUrl = process.env.TEST_URI;

describe('app', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(testUrl);

    await axios
      .post('http://localhost:3000/login', {
        email: 'root@gmail.com',
        password: 'toor',
      })
      .then(function (response) {
        loginToken = response.data.token;
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('login', () => {
    it('login user', async () => {
      const response = await supertest(app).post('/login').send({
        email: 'root@gmail.com',
        password: 'toor',
      });
      expect(response.status).toBe(200);
      expect(response.body.role).toBe('admin');
    });
  });

  describe('users', () => {
    it('GET user', async () => {
      const response = await supertest(app)
        .get('/users/623ae9167fd84eca70ca8566')
        .set('Authorization', `${loginToken}`);
      expect(response.status).toBe(200);
      expect(response.body.firstName).toEqual('root');
    });
  });

  describe('accounts', () => {
    it('GET account with invalid id', async () => {
      const response = await supertest(app)
        .get('/accounts/6239c2f1850f32169565f5fe')
        .set('Authorization', `${loginToken}`);
      expect(response.status).toBe(404);
    });

    it('POST account', async () => {
      const response = await supertest(app)
        .post('/accounts')
        .set('Authorization', `${loginToken}`)
        .send(accForTest);
      expect(response.status).toBe(200);
      expect(response.body.title).toEqual('Added while testing account POST');
    });

    it('GET all accounts', async () => {
      const response = await supertest(app)
        .get('/accounts')
        .set('Authorization', `${loginToken}`);
      expect(response.status).toBe(200);
      expect(response.body[0].title).toBe('Added while testing account POST');
      expect(response.body.length).toBe(1);
    });

    it('PUT account', async () => {
      const id = await supertest(app)
        .get('/accounts/')
        .set('Authorization', `${loginToken}`);

      const accId = id.body[0].id;

      const response = await supertest(app)
        .put(`/accounts/${accId}`)
        .set('Authorization', `${loginToken}`)
        .send(updatedAcc);
      expect(response.status).toBe(200);
      expect(response.body.title).toEqual('Updated while testing account PUT');
    });

    it('DELETE account', async () => {
      const id = await supertest(app)
        .get('/accounts/')
        .set('Authorization', `${loginToken}`);

      const accId = id.body[0].id;

      const response = await supertest(app)
        .delete(`/accounts/${accId}`)
        .set('Authorization', `${loginToken}`);

      expect(response.status).toBe(204);
    });
  });
});
