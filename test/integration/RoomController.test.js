const request = require('supertest');

let _id;

// model of table
let model = {
  name: "Testing Room",
  type_name: 'Suite 1 For Room Testing',
  price: 27000
};

describe('Room Controller', () => {

  describe('Get All', () => {
    it('should return empty', async () => {
        let res = await request('http://localhost:1337')
          .get('/rooms')
          .set('Authorization', 'Bearer tokenforadmin');;

        expect(res.statusCode).toBe(200)
      }

    );
  });

  describe('Create One Room', () => {
    it('should return empty', async () => {

        let roomType = await request('http://localhost:1337')
          .post('/room-types')
          .send({
            room_type: model.type_name
          })
          .set('Authorization', 'Bearer tokenforadmin');

        model.type = roomType.body.id;

        let res = await request('http://localhost:1337')
          .post('/rooms')
          .send(model)
          .set('Authorization', 'Bearer tokenforadmin');

        _id = res.body.id;

        expect(res.statusCode).toBe(201)
        expect(res.body.price).toEqual(model.price)
      }

    );
  });

  describe('Get One Room By Id', () => {
    it('should return one Room', async () => {
        let res = await request('http://localhost:1337')
          .get('/rooms/' + _id)
          .set('Authorization', 'Bearer tokenforadmin');

        expect(res.statusCode).toBe(200)
        expect(res.body.price).toEqual(model.price)
        expect(res.body.type.room_type).toEqual(model.type_name)
      }

    );
  });

  describe('Update Room', () => {
    it('should return updated Room', async () => {
        model.price = 290000;
        model._id = _id;
        let res = await request('http://localhost:1337')
          .put('/rooms')
          .send(model)
          .set('Authorization', 'Bearer tokenforadmin');

        expect(res.statusCode).toBe(200)
        expect(res.body.price).toEqual(model.price)
      }

    );
  });

  describe('Delete Room By Id', () => {
    it('should return deleted Room', async () => {

        let delRoomType = await request('http://localhost:1337')
          .delete('/room-types/' + model.type)
          .set('Authorization', 'Bearer tokenforadmin');

        let res = await request('http://localhost:1337')
          .delete('/rooms/' + _id)
          .set('Authorization', 'Bearer tokenforadmin');

        expect(res.statusCode).toBe(200)
        expect(res.body.price).toEqual(model.price)
      }

    );
  });

  describe('Create a booking', () => {
    it('should create a booking', async () => {
      // create User whos booking a room
      let user = await request('http://localhost:1337')
        .post('/users')
        .send({
          email: "testuser@test.com",
          password: "test"
        })
        .set('Authorization', 'Bearer tokenforadmin');

      model.user_id = user.body.id;

      // create 3 rooms

      let roomType = await request('http://localhost:1337')
        .post('/room-types')
        .send({
          room_type: model.type_name
        })
        .set('Authorization', 'Bearer tokenforadmin');

      model.type = roomType.body.id;

      let rooms = [];

      for (var i = 0; i < 3; i++) {

        let currRoom = await request('http://localhost:1337')
          .post('/rooms')
          .send({
            name: model.name + " " + i,
            type: model.type,
            price: model.price + (i * 2000)
          })
          .set('Authorization', 'Bearer tokenforadmin');

        rooms.push(currRoom.body);
      }

      model.room_id = rooms[0].id;

      // console.log("room id", model.room_id)

      // book 1 rooms
      let date_start = new Date();
      let date_end = new Date();
      model.date_start = date_start;
      model.date_end = date_end.setDate(date_start.getDate() + 3);

      let booked = await request('http://localhost:1337')
        .post('/bookings')
        .send(model)
        .set('Authorization', 'Bearer tokenforadmin');

      // console.log("booked id", booked.body.room_id)

      expect(booked.statusCode).toBe(201);
    })

  })

  describe("Get Available Room", () => {
    it('should return all available room', async () => {

      // get the available room
      let res = await request('http://localhost:1337')
        .get(
          '/available-rooms?start_date=' + model.date_start + '&&end_date=' + model.date_end
        )
        .set('Authorization', 'Bearer tokenforadmin');

      // console.log(res.body)
      // expect return array of 2 rooms
      // expect to one of array is the room type

      expect(res.statusCode).toBe(200)
    })

  })

})
