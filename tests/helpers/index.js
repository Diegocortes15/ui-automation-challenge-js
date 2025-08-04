import express from 'express';
import fileUpload from 'express-fileupload';
import { uploadFile } from '../utils/s3-service.utils.js';

const app = express();

// Middleware to parse the file upload - Enable the upload of files
// All routes will pass first through this middleware
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './tmp/s3-uploads',
  }),
);

app.get('/', (req, res) => {
  res.json({ message: 'Hello World Awesome!!!' });
  //res.send("<h1>Hello World</h1>");
});

app.post('/baseline-images', async (req, res) => {
  // console.log(req.files); // This .files is possible because of the middleware
  await uploadFile(req.files.baselineImage);
  res.json({ message: 'Baseline image uploaded successfully' });
  //res.send("<h1>Hello World</h1>");
});

app.listen(3000);

console.log(`Server is running on port ${3000}`);
