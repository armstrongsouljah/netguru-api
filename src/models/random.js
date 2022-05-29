const {MongoClient} = require('mongodb');
const {Movie} = require('./Movie')

describe('insert', () => {
    let connection;
    let db;
  
    beforeAll(async () => {
      connection = await MongoClient.connect(globalThis.__MONGO_URI__, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      db = await connection.db(globalThis.__MONGO_DB_NAME__);
    });
  
    afterAll(async (done) => {
      await connection.close();
      done()
    });
  
    it('should insert a doc into collection', async (done) => {
    //   const movies = db.collection('movies');
  
      const mockMovie = {
          _id: 'some-user-id',
          Title: 'First Blood',
          Released: '2022-05-29T17:02:08.876Z',
          Genre: 'Action Thriller',
          createdBy: 213,
          createdAt: '2022-05-29T17:02:08.876Z',

        };
      await movies.insertOne(mockMovie);
  
      const insertedMovie = await movies.findOne({_id: 'some-user-id'});
      expect(insertedMovie).toEqual(mockMovie);
      done()
    });
  });