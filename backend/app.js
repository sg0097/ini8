const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use("/files", express.static("files"));  


mongoose
  .connect("mongodb://localhost:27017/ASSIGN")
  .then(() => console.log("connected to mongodb"))
  .catch((e) => console.log(e));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });


const PdfSchema = require("./pdfDetails");


app.post("/upload-files", upload.single("file"), async (req, res) => {
  console.log("FILE UPLOADED:", req.file);

  const { title } = req.body;
  const fileName = req.file.filename;

  try {
    await PdfSchema.create({
      title: title,
      pdf: fileName,
    });

    res.json({ status: "ok", message: "File uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", error: error.message });
  }
});


app.get("/get-files", async (req, res) => {
  try {
    const data = await PdfSchema.find({});
    res.json({ status: "ok", data: data });
  } catch (error) {
    res.status(500).json({ status: "error" });
  }
});


app.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "files", req.params.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File not found" });
  }

  res.download(filePath);
});


app.delete("/delete-file/:id", async (req, res) => {
  try {
    const fileData = await PdfSchema.findById(req.params.id);
    if (!fileData) return res.status(404).json({ message: "File not found" });

    const filePath = path.join(__dirname, "files", fileData.pdf);

    
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    
    await PdfSchema.findByIdAndDelete(req.params.id);

    res.json({ message: "File deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


app.listen(8000, () => {
  console.log("server started on port 8000");
});
