// let id;
// let room_type = "Suite 1";

// describe("Find All Room", () => {
//   it('should return array', async () => {

//     let data = await RoomType.find();

//     expect(data).toEqual([]);

//   })
// });

// describe("Insert Room Type", () => {
//   it('should return room type', async () => {

//     let createdRoomType = await RoomType.create({
//         room_type,
//       })
//       .fetch();

//     id = createdRoomType.id;

//     expect(createdRoomType.room_type).toEqual(room_type);
//   })

// });

// describe("Find By Id", () => {
//   it('should return room type by id', async () => {

//     let roomType = await RoomType.findOne({
//       id
//     });

//     expect(roomType.room_type).toEqual(room_type);
//   });
// });

// describe("Update By Id", () => {
//   it('should update room type by id', async () => {

//     // room_type = "Suite 1 Update";

//     let updatedRoomType = await RoomType.update({
//         room_type
//       })
//       .set({
//         room_type: 'Suite 1 Update'
//       })
//       .fetch();

//     expect(updatedRoomType.room_type).toEqual('Suite 1 Update');
//   });
// });


const request = require('supertest');

let _id;
let room_type = "Suite 1";
describe('Room Type Controller', () => {

  describe('Get All', () => {
    it('should return empty', async () => {
        let res = await request(sails.hooks.http.app)
          .get('/room-types');

        // console.debug(res)
        expect(res.statusCode).toBe(200)
        expect(res.body.data).toEqual([])
      }

    );
  });

  describe('Create One Room Type', () => {
    it('should return empty', async () => {
        let res = await request(sails.hooks.http.app)
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
        let res = await request(sails.hooks.http.app)
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
        let res = await request(sails.hooks.http.app)
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
        let res = await request(sails.hooks.http.app)
          .delete('/room-types/' + _id)

        // console.debug(res)
        expect(res.statusCode).toBe(200)
        expect(res.body.room_type).toEqual(room_type)
      }

    );
  });

})
