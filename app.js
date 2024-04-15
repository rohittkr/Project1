const express = require("express");
//const multer = require('multer');
const path = require("path");
//const fs = require('fs');

const app = express();
const port = 5800;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
  }
});
// Render the index.html file
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

const upload = multer({ storage: storage });

// Serve static files (frontend)
app.use(express.static(path.join(__dirname, 'frontend')));

// Render the index.html file
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).send('No file uploaded');
  }

  console.log('File uploaded:', req.file.filename);
  res.send('File uploaded successfully');
});


// Serve processed data (placeholder)
app.get('/processedData', (req, res) => {
  const data = {}; // Replace with your processed data
  res.json(data);
});
app.use(express.static(path.join(__dirname, 'frontend')));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
