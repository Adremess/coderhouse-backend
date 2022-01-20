import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = `${process.env.MONGO_DB_URI}${process.env.MONGO_DB_NAME}`
console.log(process.env.MONGO_URI);
console.log('keeeeeees');
let connection;
(async () => {
  try {
    console.log('mongoose');
    connection = mongoose.connect(MONGO_URI, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
     })
     console.log('Conectado a mongoDb!');
  } catch (error) {
    console.log(error);
  }
})();
console.log(connection);
export default connection;
