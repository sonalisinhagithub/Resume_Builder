const express = require("express");
const bodyParser = require("body-parser");
const Datastore = require("nedb");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

const db = new Datastore({ filename: "resumeData.db", autoload: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(express.static("public"));

const mysql = require("mysql");
// MySQL connection
// const mysqldb = mysql.createConnection({
//   host: "your_database_host",
//   user: "your_database_user",
//   password: "your_database_password",
//   database: "your_database_name",
// });

// mysqldb.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("Connected to MySQL database");
// });

app.post("/submit-resume", (req, res) => {
  // storing in mysql
  // let resumeDataForMYSQL = {
  //   name: req.body.name,
  //   contact: req.body.contact,
  //   address: req.body.address,
  //   linkedIn: req.body.linkedIn,
  //   github: req.body.github,
  //   objective: req.body.objective,
  //   workExperience: req.body.workExperience,
  //   academicQualification: req.body.academicQualification,
  //   imgFilename: req.files ? req.files.imgField.name : "", // Assuming you're handling file upload similarly
  // };

  // // Assuming you handle file upload before this step
  // let sql = "INSERT INTO resumes SET ?";
  // mysqldb.query(sql, resumeDataForMYSQL, (err, result) => {
  //   if (err) throw err;
  //   console.log("Resume data saved:", result);
  // });

  // storing in neDB
  let resumeData = req.body;
  db.insert(resumeData, (err, newDoc) => {
    if (err) {
      console.error("Error saving data:", err);
      return res.status(500).send("Error saving resume data");
    }
    // Redirect to the prepared resume page with query params
    res.redirect(`/prepared_resume.html?id=${newDoc._id}`);
  });
});

// Endpoint to get resume data by id
app.get("/get-resume", (req, res) => {
  const resumeId = req.query.id;
  db.findOne({ _id: resumeId }, (err, doc) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).send("Error fetching resume data");
    }
    if (!doc) {
      return res.status(404).send("Resume not found");
    }
    res.json(doc);
  });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// Directory for uploads
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.post("/upload-image", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name 'imgField' is the name attribute from the HTML input
  let imgField = req.files.imgField;

  // Save the file as 'profile.jpg' in the uploads directory
  imgField.mv(path.join(uploadDir, "profile.jpg"), function (err) {
    if (err) return res.status(500).send(err);

    res.send({ message: "File uploaded and saved as profile.jpg" });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
