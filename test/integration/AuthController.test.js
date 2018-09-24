const request = require('supertest');

let model = {
  token: 'tokenforuser',
  email: 'test@test.com',
  password: 'test'
}

let adminModel = {
  token: 'tokenforadmin',
  email: 'admin@admin.com',
  password: 'admin'
}

describe('AuthController', () => {
  describe('Admin Signin', () => {
    it('should return admin token', async () => {
        let res = await request('http://localhost:1337')
          .post('/signin')
          .send(adminModel);

        expect(res.statusCode).toBe(200)
        expect(res.body.token).toEqual(adminModel.token)
      }

    );
  });

  describe('Signup', () => {
    it('should return token', async () => {
        let res = await request('http://localhost:1337')
          .post('/signup')
          .send(model)

        _id = res.body.id;

        expect(res.statusCode).toBe(201)
        expect(res.body.token).toEqual(model.token)
      }

    );
  });

  describe('Signin', () => {
    it('should return token', async () => {
        let res = await request('http://localhost:1337')
          .post('/signin')
          .send(model);

        expect(res.statusCode).toBe(200)
        expect(res.body.token).toEqual(model.token)
      }

    );
  });
})
