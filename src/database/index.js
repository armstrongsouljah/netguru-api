const mongoose = require('mongoose');
const {MongoMemoryServer } = require('mongodb-memory-server');

const { DATABASE_URL } = process.env;

let db = null;

const connectDB = async () => {
    try {
        let dbUrl = DATABASE_URL;
        if(process.env.NODE_ENV == 'test') {
            db = await MongoMemoryServer.create();
            dbUrl = db.getUri();
        }

        const conn = await mongoose.connect(dbUrl);
        return conn

    } catch(err) {
        console.error(err)
        process.exit(1)
    }
}

const disconnectDB = async () => {
    try {
      await mongoose.connection.close();
      if (db) {
        await db.stop();
      }
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  };

  module.exports = {
      connectDB, disconnectDB
  };
