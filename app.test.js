const supertest = require('supertest');
const mongoose = require('mongoose');
const axios = require('axios');
const app = require('./app');

const usersRouter = require('./controllers/users');
const accountsRouter = require('./controllers/accounts');

const loginRouter = require('./auth/login');

let loginToken;
describe('app', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(
      'mongodb+srv://gzardiashvili:AzHPq4mWG2Sn3d0O@cluster0.tpboq.mongodb.net/budgetify?retryWrites=true&w=majority'
    );

    await axios
      .post('http://localhost:3000/login', {
        email: 'example@gmail.com',
        password: '12345678',
      })
      .then(function (response) {
        loginToken = response.data.token;
        console.log(`1111111111111111111- ${loginToken}`);
      });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  describe('login', () => {
    it('login user', async () => {
      console.log(`2222222222222- ${loginToken}`);

      const response = await supertest(app.use('/login', loginRouter))
        .post('/login')
        .send({
          email: 'example@gmail.com',
          password: '12345678',
        });
      expect(response.status).toBe(200);
      expect(response.body.role).toBe('admin');
    });
  });

  describe('users', () => {
    it('GET user', async () => {
      const response = await supertest(app.use('/users', usersRouter))
        .get('/users/6238ad6549a03610de6fdccc')
        .set('Authorization', `${loginToken}`);
      expect(response.status).toBe(200);
      expect(response.body.firstName).toEqual('Mariam');
    });
  });

  describe('accounts', () => {
    it('GET account', async () => {
      const response = await supertest(app.use('/accounts', accountsRouter))
        .get('/accounts/6239c2f1850f32169565f5fe')
        .set('Authorization', `${loginToken}`);
      expect(response.status).toBe(200);
      expect(response.body.title).toEqual('Added from account POST');
    });

    it('POST account', async () => {
      const response = await supertest(app.use('/accounts', accountsRouter))
        .post('/accounts')
        .set('Authorization', `${loginToken}`)
        .send({
          UserId: '2',
          title: 'Added while testing account POST',
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
          category: 'category',
          currency: 'USD',
          availableAmount: 20000,
          dateOfCreation:
            'Sun Mar 06 2022 17:04:52 GMT+0400 (Georgia Standard Time)',
          dateOfUpdate:
            'Sun Mar 06 2022 17:04:52 GMT+0400 (Georgia Standard Time)',
        });
      expect(response.status).toBe(200);
      expect(response.body.title).toEqual('Added while testing account POST');
    });

    it('PUT account', async () => {
      const response = await supertest(app.use('/accounts', accountsRouter))
        .put('/accounts/6239c2f1850f32169565f5fe')
        .set('Authorization', `${loginToken}`)
        .send({
          UserId: '2',
          title: 'Updated while testing account PUT',
          description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
          category: 'category',
          currency: 'USD',
          availableAmount: 20000,
          dateOfCreation:
            'Sun Mar 06 2022 17:04:52 GMT+0400 (Georgia Standard Time)',
          dateOfUpdate:
            'Sun Mar 06 2022 17:04:52 GMT+0400 (Georgia Standard Time)',
        });
      expect(response.status).toBe(200);
      expect(response.body.title).toEqual('Updated while testing account PUT');
    });

    it('DELETE account', async () => {
      const response = await supertest(app.use('/accounts', accountsRouter))
        .delete('/accounts/6239c116a4b0de25e042221f')
        .set('Authorization', `${loginToken}`);

      expect(response.status).toBe(204);
    });
  });
});
