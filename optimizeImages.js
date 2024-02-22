import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directoryPath = path.join(__dirname, 'src/assets/img');
const outputDirectory = path.join(__dirname, 'dist/assets/img');

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    files.forEach((file) => {
        sharp(`${directoryPath}/${file}`)
            .resize(800) // Resize to 800px width, height is auto to maintain aspect ratio
            .jpeg({ quality: 80 }) // Convert to jpeg format with 80% quality
            .toFile(`${outputDirectory}/${file}`)
            .then(() => console.log(`Image processed: ${file}`))
            .catch((err) => console.log(err));
    });
});
