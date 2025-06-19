const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res, next) => {
  if (!req.file) return next();

  const inputPath = req.file.path;
  const outputFilename = req.file.filename.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const outputPath = path.join('images', outputFilename);

  try {
    await sharp(inputPath)
      .resize(500)
      .webp({ quality: 80 })
      .toFile(outputPath);

    fs.unlink(inputPath, (err) => {
      if (err) console.error('Erreur suppression image originale :', err);
    });

    // Mise à jour du fichier
    req.file.filename = outputFilename;
    req.file.path = outputPath;
    req.file.optimized = true;

    next();
  } catch (error) {
    console.error('Erreur Sharp:', error);
    res.status(500).json({ error: 'Erreur lors de l\'optimisation de l\'image.' });
  }
};
