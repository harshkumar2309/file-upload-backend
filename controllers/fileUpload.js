import { File } from "../models/File.js";
import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary";

// recreate __filename
const __filename = fileURLToPath(import.meta.url);

// recreate __dirname
const __dirname = path.dirname(__filename);

// handler function for localFileUpload

export const localFileUpload = async (req, res) => {
  try {
    // fetch file
    const file = req.files.file;
    console.log("FILE->", file);

    const filePath = path.join(
      __dirname,
      "files",
      `${Date.now()}.${file.name.split('.')[1]}`,
    );
    console.log("PATH->", filePath);
    

    file.mv(filePath, (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error while uploading file",
        });
      }
    });

    res.json({
      success: true,
      message: "Local File Uploaded Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

// handler function for imageUpload

// function for checking file format support
function isFileTypeSupported(type, supportedTypes){
  return supportedTypes.includes(type);
}

// function for uploading media to cloudinary
async function uploadFileToCloudinary(file, folder){
  const options = {folder};

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

export const imageUpload = async (req, res) => {
  try{
    // data fetch
    const { name, tags, email} = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // vaildation
    const supportedTypes = ["jpg", "jpeg", "png"];

    const fileType = file.name.split('.')[1].toLowerCase();
    console.log("File type:", fileType);
    
    // file format not supported
    if(!isFileTypeSupported(fileType, supportedTypes)){
      return res.status(400).json({
        success: false,
        message: 'File format not supported',
      })
    }

    // file format supported
    const response = await uploadFileToCloudinary(file, "myFolder1");
    console.log(response);
    

    // create entry in DB
    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    })

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: 'Image successfully uploaded'
    });
  } catch(error){
      console.log(error);
      res.status(400).json({
        success: false,
        message: 'Something went wrong'
      });
  }
}
