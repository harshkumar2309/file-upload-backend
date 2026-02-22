import express from "express";
import dotenv from "dotenv";
import fileupload from "express-fileupload";
import { connectWithDB } from "./config/database.js";
import { cloudinaryConnect } from "./config/cloudinary.js";
import { router } from "./routes/FileUpload.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(express.json());
// middleware for file uploading
app.use(fileupload());

// connect with DB
connectWithDB();

// connect with cloudinary
cloudinaryConnect();

// mount api route
app.use('/api/v1/upload', router);

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);  
});