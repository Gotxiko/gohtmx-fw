import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import posthtml from 'posthtml';
import htmlnano from 'htmlnano';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const locales = ['es', 'en'];
const views = fs
    .readdirSync('./src/views')
    .filter((file) => file.endsWith('.ejs'));

const routesMap = JSON.parse(
    fs.readFileSync('./server/data/routesMap.json', 'utf-8'),
);

for (const locale of locales) {
    const strings = JSON.parse(
        fs.readFileSync(`./src/locales/${locale}.json`, 'utf-8'),
    );
    for (const view of views) {
        try {
            const viewName = view.replace('.ejs', '');
            const str = await ejs.renderFile(
                `./src/views/${view}`,
                { ...strings[viewName], locale },
                {},
            );
            const result = await posthtml().use(htmlnano()).process(str);
            const outputDir = `./dist/${locale}`;
            fs.mkdirSync(outputDir, { recursive: true });

            // Get the filename from the routes map
            const filename = routesMap[locale][view.replace('.ejs', '')];

            fs.writeFileSync(
                path.join(__dirname, `${outputDir}/${filename}.html`),
                result.html,
            );
        } catch (err) {
            console.error(err);
        }
    }
}
