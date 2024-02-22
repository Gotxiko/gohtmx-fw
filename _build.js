import ejs from 'ejs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import posthtml from 'posthtml';
import htmlnano from 'htmlnano';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directoryPath = path.join(__dirname, 'src', 'locales');

async function processLocale(locale) {
    try {
        const files = await fs.readdir(
            path.join(__dirname, 'src', 'locales', locale),
        );
        for (const file of files) {
            const strings = await fs.readFile(
                path.join(directoryPath, locale, file),
                'utf-8',
            );
            const template = JSON.parse(strings).template;
            const str = await ejs.renderFile(
                path.join(__dirname, 'src', 'views', `${template}.ejs`),
                { ...JSON.parse(strings), locale },
                {},
            );
            const result = await posthtml().use(htmlnano()).process(str);
            const outputDir = path.join(__dirname, 'dist', locale);
            await fs.mkdir(outputDir, { recursive: true });

            const filename = path.parse(file).name;
            await fs.writeFile(
                path.join(outputDir, `${filename}.html`),
                result.html,
            );
        }
    } catch (err) {
        console.error(err);
    }
}

async function processLocales() {
    try {
        const locales = await fs.readdir(directoryPath);
        await Promise.all(locales.map(processLocale));
    } catch (err) {
        console.error('Error reading directory:', err);
    }
}

processLocales();
