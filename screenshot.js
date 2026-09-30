const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const inputFile = path.join(__dirname, 'assets', 'image', 'images.jpg');
const outputDir = path.join(__dirname, 'viewport-image');

// Create output folder if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [
  { width: 640,  height: 360,  suffix: 'sm' }, // mobile portrait
  { width: 1024, height: 576,  suffix: 'md' }, // mobile landscape / tablet
  { width: 1600, height: 900,  suffix: 'lg' }, // desktop standard
  { width: 2400, height: 1350, suffix: 'xl' }, // retina / 4K
];

// Process all sizes in parallel and wait for completion
Promise.all(
  sizes.map(({ width, height, suffix }) =>
    sharp(inputFile)
      .resize(width, height, { fit: 'cover' })
      .jpeg({ quality: 82, progressive: true })
      .toFile(path.join(outputDir, `image-${suffix}.jpg`))
      .then(info => console.log(`✅ image-${suffix}.jpg — ${width}×${height}`, info))
      .catch(err => console.error(`❌ hero-${suffix}.jpg failed:`, err.message))
  )
).then(() => console.log('Done.'));