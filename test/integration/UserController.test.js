const request = require('supertest');

let _id;
let model = {
  email: "test@test.com",
  password: "asdasd",
  role: "user",
}
describe('User Controller', () => {

  describe('Get All', () => {
    it('should return empty', async () => {
        let res = await request('http://localhost:1337')
          .get('/users');

        expect(res.statusCode).toBe(200)
        expect(res.body.data).toEqual([])
      }

    );
  });

  describe('Create One User', () => {
    it('should return empty', async () => {
        let res = await request('http://localhost:1337')
          .post('/users')
          .send(model)

        _id = res.body.id;

        expect(res.statusCode).toBe(201)
        expect(res.body.email).toEqual(model.email)
      }

    );
  });

  describe('Get One User By Id', () => {
    it('should return one User', async () => {
        let res = await request('http://localhost:1337')
          .get('/users/' + _id)


        expect(res.statusCode).toBe(200)
        expect(res.body.email).toEqual(model.email)
      }

    );
  });

  describe('Update User', () => {
    it('should return updated User', async () => {
        model.email = "test3@test.com";
        model._id = _id;
        let res = await request('http://localhost:1337')
          .put('/users')
          .send(model);

        expect(res.statusCode).toBe(200)
        expect(res.body.email).toEqual(model.email)
      }

    );
  });

  describe('Delete User By Id', () => {
    it('should return deleted User', async () => {
        let res = await request('http://localhost:1337')
          .delete('/users/' + _id)

        expect(res.statusCode).toBe(200)
        expect(res.body.email).toEqual(model.email)
      }

    );
  });

})
