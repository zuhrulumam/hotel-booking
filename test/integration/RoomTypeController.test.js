const request = require('supertest');

let _id;
let room_type = "Suite 1";
describe('Room Type Controller', () => {

  describe('Get All', () => {
    it('should return empty', async () => {
        let res = await request('http://localhost:1337')
          .get('/room-types');

        // console.debug(res)
        expect(res.statusCode).toBe(200)
        expect(res.body.data).toEqual([])
      }

    );
  });

  describe('Create One Room Type', () => {
    it('should return empty', async () => {
        let res = await request('http://localhost:1337')
          .post('/room-types')
          .send({
            room_type
          })

        _id = res.body.id;

        // console.debug(res)
        expect(res.statusCode).toBe(201)
        expect(res.body.room_type).toEqual(room_type)
      }

    );
  });

  describe('Get One Room Type By Id', () => {
    it('should return one room type', async () => {
        let res = await request('http://localhost:1337')
          .get('/room-types/' + _id)

        // console.debug(res)
        expect(res.statusCode).toBe(200)
        expect(res.body.room_type).toEqual(room_type)
      }

    );
  });

  describe('Update Room Type', () => {
    it('should return updated room type', async () => {
        room_type = "Suite 1 Updated";
        let res = await request('http://localhost:1337')
          .put('/room-types')
          .send({
            _id,
            room_type
          });

        // console.debug(res)
        expect(res.statusCode).toBe(200)
        expect(res.body.room_type).toEqual(room_type)
      }

    );
  });

  describe('Delete Room Type By Id', () => {
    it('should return deleted room type', async () => {
        let res = await request('http://localhost:1337')
          .delete('/room-types/' + _id)

        // console.debug(res)
        expect(res.statusCode).toBe(200)
        expect(res.body.room_type).toEqual(room_type)
      }

    );
  });

})
