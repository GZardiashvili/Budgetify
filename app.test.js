const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('./app');

const usersRouter = require('./controllers/users');
const accountsRouter = require('./controllers/accounts');

const loginRouter = require('./auth/login');

// app.use('/users', auth, adminGuard, usersRouter);
// app.use('/login', loginRouter);

describe('app', () => {
  beforeAll(async () => {
    await mongoose.disconnect();
    await mongoose.connect(
      'mongodb+srv://gzardiashvili:AzHPq4mWG2Sn3d0O@cluster0.tpboq.mongodb.net/budgetify?retryWrites=true&w=majority'
    );
    // const cred = {
    //   email: 'example@gmail.com',
    //   password: '12345678',
    // };

    // fetch('http://localhost:3000/login', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     email: 'example@gmail.com',
    //     password: '12345678',
    //   }),
    // })
    //   .then(function (response) {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     return Promise.reject(response);
    //   })
    //   .then(function (data) {
    //     console.log(data);
    //   })
    //   .catch(function (error) {
    //     console.warn('Something went wrong.', error);
    //   });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
  describe('login', () => {
    it('login user', async () => {
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
      const response = await supertest(app.use('/users', usersRouter)).get(
        '/users/6238ad6549a03610de6fdccc'
      );
      expect(response.status).toBe(200);
      expect(response.body.firstName).toEqual('Mariam');
    });
  });

  describe('accounts', () => {
    it('GET account', async () => {
      const response = await supertest(
        app.use('/accounts', accountsRouter)
      ).get('/accounts/6239c116a4b0de25e042221f');
      expect(response.status).toBe(200);
      expect(response.body.title).toEqual('Added from account POST');
    });

    it('POST account', async () => {
      const response = await supertest(app.use('/accounts', accountsRouter))
        .post('/accounts')
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
      const response = await supertest(
        app.use('/accounts', accountsRouter)
      ).delete('/accounts/6239c328af3d22a60dcc1924');

      expect(response.status).toBe(204);
    });
  });
});
