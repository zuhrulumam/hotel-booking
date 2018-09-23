const request = require('supertest');

let _id;
let model = {
  user_id: "test",
  room_id: "test",
  date_start: "test",
  date_end: "test",
}

describe('Booking Controller', () => {

  describe('Get All', () => {
    it('should return empty', async () => {
        let res = await request('http://localhost:1337')
          .get('/bookings');

        expect(res.statusCode).toBe(200)
        expect(res.body.data).toEqual([])
      }

    );
  });

  describe('Create One Booking', () => {
    it('should return empty', async () => {
        let res = await request('http://localhost:1337')
          .post('/bookings')
          .send(model)

        _id = res.body.id;

        expect(res.statusCode).toBe(201)
        expect(res.body.user_id).toEqual(model.user_id)
      }

    );
  });

  describe('Get One Booking By Id', () => {
    it('should return one Booking', async () => {
        let res = await request('http://localhost:1337')
          .get('/bookings/' + _id)


        expect(res.statusCode).toBe(200)
        expect(res.body.user_id).toEqual(model.user_id)
      }

    );
  });

  describe('Update Booking', () => {
    it('should return updated Booking', async () => {
        model.user_id = " Test Updated"
        model._id = _id;
        let res = await request('http://localhost:1337')
          .put('/bookings')
          .send(model);

        expect(res.statusCode).toBe(200)
        expect(res.body.user_id).toEqual(model.user_id)
      }

    );
  });

  describe('Delete Booking By Id', () => {
    it('should return deleted Booking', async () => {
        let res = await request('http://localhost:1337')
          .delete('/bookings/' + _id)

        expect(res.statusCode).toBe(200)
        expect(res.body.user_id).toEqual(model.user_id)
      }

    );
  });

})
