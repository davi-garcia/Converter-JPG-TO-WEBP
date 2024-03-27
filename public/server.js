const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const archiver = require('archiver');
const app = express();
const PORT = process.env.PORT || 3000;
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/convert', upload.array('images[]', 12), async (req, res) => {
  const promises = req.files.map(async file => {
    const outputPath = `converted/${file.originalname.replace('.jpg', '.webp')}`;
    await sharp(file.path)
      .toFormat('webp')
      .toFile(outputPath);
    return outputPath;
  });

  const convertedImages = await Promise.all(promises);

  const archive = archiver('zip');
  archive.on('error', (err) => {
    throw err;
  });

  convertedImages.forEach((filePath) => {
    archive.file(filePath, { name: filePath.split('/').pop() });
  });

  archive.finalize();

  archive.on('finish', () => {
    const downloadLink = `http://your-server.com/converted-images.zip`;
    res.json({ downloadLink });
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});