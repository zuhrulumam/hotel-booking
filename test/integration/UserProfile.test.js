const request = require('supertest');

let _id;
let model = {
  name: "Test",
  address: "Test",
  phone: "Test",
  photo_url: ["Test"],
};

describe('User Profile Controller', () => {

  describe('Get All', () => {
    it('should return empty', async () => {
        let res = await request('http://localhost:1337')
          .get('/user-profiles');

        expect(res.statusCode).toBe(200)
        expect(res.body.data).toEqual([])
      }

    );
  });

  describe('Create One User Profile', () => {
    it('should return empty', async () => {
        let res = await request('http://localhost:1337')
          .post('/user-profiles')
          .send(model)

        _id = res.body.id;

        expect(res.statusCode).toBe(201)
        expect(res.body.name).toEqual(model.name)
      }

    );
  });

  describe('Get One User Profile By Id', () => {
    it('should return one User Profile', async () => {
        let res = await request('http://localhost:1337')
          .get('/user-profiles/' + _id)


        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(model.name)
      }

    );
  });

  describe('Update User Profile', () => {
    it('should return updated User Profile', async () => {
        model.name = "Test Updated";
        model._id = _id;
        let res = await request('http://localhost:1337')
          .put('/user-profiles')
          .send(model);

        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(model.name)
      }

    );
  });

  describe('Delete User Profile By Id', () => {
    it('should return deleted User Profile', async () => {
        let res = await request('http://localhost:1337')
          .delete('/user-profiles/' + _id)

        expect(res.statusCode).toBe(200)
        expect(res.body.name).toEqual(model.name)
      }

    );
  });

})
