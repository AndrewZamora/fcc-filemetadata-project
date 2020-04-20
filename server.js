'use strict';
const {unlink} = require('fs')
const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
const upload = multer({ dest: './uploads' });
app.use(cors());


app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function (req, res) {
  res.json({ greetings: "Hello, API" });
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname, mimetype, size, filename } = req.file;
  res.json({ name: originalname, type: mimetype, size });
  unlink(`./uploads/${filename}`, error => {
    if(error){
      console.log(error)
      return
    }
    console.log('File is removed.')
  })
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
