const request = require('supertest');

let date_start = new Date();
let date_end = new Date();

let _id;
let model = {
  user: "test",
  room: "test",
  date_start,
  date_end: date_end.setDate(date_start.getDate() + 3),
}

describe('Booking Controller', () => {

  describe('Get All', () => {
    it('should return empty', async () => {
        let res = await request('http://localhost:1337')
          .get('/bookings')
          .set('Authorization', 'Bearer tokenforadmin');;

        expect(res.statusCode).toBe(200);
      }

    );
  });

  describe('Create One Booking', () => {
    it('should return One Booking', async () => {

        // create User whos booking a room
        let user = await request('http://localhost:1337')
          .post('/users')
          .send({
            email: "testuser@test.com",
            password: "test"
          })
          .set('Authorization', 'Bearer tokenforadmin');

        model.user_id = user.body.id;
        model.email = user.body.email;

        // create type for room
        let roomType = await request('http://localhost:1337')
          .post('/room-types')
          .send({
            room_type: "Test Room Type For Booking"
          })
          .set('Authorization', 'Bearer tokenforadmin');

        model.type = roomType.body.id;

        // create room for booking
        let room = await request('http://localhost:1337')
          .post('/rooms')
          .send({
            name: "Test Room For Booking",
            type: model.type,
            price: 27000
          })
          .set('Authorization', 'Bearer tokenforadmin');

        model.room_id = room.body.id;
        model.price = 27000;

        let res = await request('http://localhost:1337')
          .post('/bookings')
          .send(model)
          .set('Authorization', 'Bearer tokenforadmin');

        _id = res.body.id;

        expect(res.statusCode).toBe(201)
        // expect(res.body.user_id.email).toEqual(model.email)
        // expect(res.body.room_id).toEqual(model.price);
      }

    );
  });

  describe('Get One Booking By Id', () => {
    it('should return one Booking', async () => {
        let res = await request('http://localhost:1337')
          .get('/bookings/' + _id)
          .set('Authorization', 'Bearer tokenforadmin');;

        expect(res.statusCode).toBe(200);
        expect(res.body.user_id.email).toEqual(model.email)
        expect(res.body.room_id.price).toEqual(model.price);

      }

    );
  });

  describe('Update Booking', () => {
    it('should return updated Booking', async () => {
        model.date_start = "date updated"
        model._id = _id;
        let res = await request('http://localhost:1337')
          .put('/bookings')
          .send(model)
          .set('Authorization', 'Bearer tokenforadmin');;

        expect(res.statusCode).toBe(200)
        expect(res.body.user_id).toEqual(model.user_id)
      }

    );
  });

  describe('Change Status Booking To Done', () => {
    it('should change status booking to done', async () => {
      model.status = 'done';
      let res = await request('http://localhost:1337')
        .put('/booking-status')
        .send(model)
        .set('Authorization', 'Bearer tokenforadmin');;

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toEqual(model.status);
    });
  });

  describe('Cancel A Booking', () => {
    it('should change status booking to canceled', async () => {
      model.status = 'canceled';
      let res = await request('http://localhost:1337')
        .put('/booking-status')
        .send(model)
        .set('Authorization', 'Bearer tokenforadmin');;

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toEqual(model.status);
    });
  });

  describe('Delete Booking By Id', () => {
    it('should return deleted Booking', async () => {
        //delete user
        let user = await request('http://localhost:1337')
          .delete('/users/' + model.user_id)
          .set('Authorization', 'Bearer tokenforadmin');

        //delete roomType
        let roomType = await request('http://localhost:1337')
          .delete('/room-types/' + model.type)
          .set('Authorization', 'Bearer tokenforadmin');
        //delete room
        let room = await request('http://localhost:1337')
          .delete('/rooms/' + model.room_id)
          .set('Authorization', 'Bearer tokenforadmin');

        let res = await request('http://localhost:1337')
          .delete('/bookings/' + _id)
          .set('Authorization', 'Bearer tokenforadmin');

        expect(res.statusCode).toBe(200)
        expect(res.body.id).toEqual(model._id)
      }

    );
  });

})
