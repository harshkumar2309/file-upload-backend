import mongoose from "mongoose";
import nodemailer from "nodemailer";

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

// post middleware
fileSchema.post("save", async function(doc){
  try{
    console.log("Doc:", doc);

    // transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      },
    });

    // send mail
    let info = await transporter.sendMail({
      from: "JohnWick",
      to: doc.email,
      subject: "New File Uploaded on Cloudinary",
      html: `<h2>Hello Jee</h2> <p>File is successfully uploaded on cloudinary. View Here: <a href="${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
    });

    console.log("INFO -> ", info);

  } catch(error){
    console.error(error);
  }
})

export const File = mongoose.model("File", fileSchema);