import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = `${process.env.MONGO_DB_URI}${process.env.MONGO_DB_NAME}`
mongoose.connect(MONGO_URI, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
 })
 .then(() => console.log('Conectado a mongoDb!'))
 .catch(err => console.log(err));
 

// const startMongoConnection = async () => {
//   try {
//     console.log('mongoose');
//     connection = mongoose.connect(MONGO_URI, { 
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//      })
//      console.log('Conectado a mongoDb!');
//   } catch (error) {
//     console.log(error);
//   }
// };

export { mongoose };
