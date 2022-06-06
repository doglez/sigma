import mongoose from "mongoose";
import Config from "../config/Config.js";

/**
 * @name connecDB
 * @description Connect with DB through mongoose
 */
const ConnectDB = async () => {
    const conn = await mongoose.connect(Config.MONGO_URL);

    console.log(`MongoDB connected: ${conn.connection.host}`.green);
};

export default ConnectDB;
