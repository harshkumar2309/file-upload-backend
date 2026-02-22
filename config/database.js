import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export const connectWithDB = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log("DB Connected Successfully"))
    .catch((err) => {
        console.log(err);
        console.log("DB is facing connection issues");
        process.exit(1);
    });
}