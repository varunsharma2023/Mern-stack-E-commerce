// db.js
import mongoose from "mongoose";
const Connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to mongo DB ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
export default Connect;