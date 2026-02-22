// import { File } from "../models/File.js";
import path from "path";
import { fileURLToPath } from "url";

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
