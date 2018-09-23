const request = require('supertest');

let _id;

// model of table
let model = {
  type: 'Suite 1',
  price: 27000
};

describe('Room Controller', () => {

  describe('Get All', () => {
    it('should return empty', async () => {
        let res = await request('http://localhost:1337')
          .get('/rooms');

        expect(res.statusCode).toBe(200)
        expect(res.body.data).toEqual([])
      }

    );
  });

  describe('Create One Room', () => {
    it('should return empty', async () => {
        let res = await request('http://localhost:1337')
          .post('/rooms')
          .send(model)

        _id = res.body.id;

        expect(res.statusCode).toBe(201)
        expect(res.body.type).toEqual(model.type)
      }

    );
  });

  describe('Get One Room By Id', () => {
    it('should return one Room', async () => {
        let res = await request('http://localhost:1337')
          .get('/rooms/' + _id)


        expect(res.statusCode).toBe(200)
        expect(res.body.type).toEqual(model.type)
      }

    );
  });

  describe('Update Room', () => {
    it('should return updated Room', async () => {
        model.type = "Suite 1 Updated";
        model._id = _id;
        let res = await request('http://localhost:1337')
          .put('/rooms')
          .send(model);

        expect(res.statusCode).toBe(200)
        expect(res.body.type).toEqual(model.type)
      }

    );
  });

  describe('Delete Room By Id', () => {
    it('should return deleted Room', async () => {
        let res = await request('http://localhost:1337')
          .delete('/rooms/' + _id)

        expect(res.statusCode).toBe(200)
        expect(res.body.type).toEqual(model.type)
      }

    );
  });

})
