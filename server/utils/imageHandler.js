const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

//  Process the uploaded image and return the URL of the processed image.
const processImage = async (file) => {
  // Generate a unique filename for the processed image.
  const outputFileName = `${Date.now()}_${file.originalname.split(".")[0]}.webp`;

  // Use /tmp for serverless environments
  const dir = process.env.NODE_ENV === 'production' ?
    path.join('/tmp', 'uploads')
    : path.join(__dirname, '../uploads');
  // For local development

  const outputPath = path.join(dir, outputFileName);

  // // Create the directory if it does not exist.
  // const dir = path.join(__dirname, "../uploads");

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Process the image using sharp.
  await sharp(file.buffer)
    // Resize the image to a maximum width of 800px.
    .resize({ width: 800 })
    // Convert the image to webp format with 80% quality.
    .toFormat("webp", { quality: 80 })
    // Save the processed image to the output file.
    .toFile(outputPath);

  // Return the URL of the processed image.
  return `/uploads/${outputFileName}`;
};

module.exports = { processImage };
