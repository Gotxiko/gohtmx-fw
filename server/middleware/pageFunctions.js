import path from 'path';
import fs from 'fs';

export const getPageContents = (lang, slug, rootDir) => {
    const pageStrings = JSON.parse(
        fs.readFileSync(
            path.join(rootDir, `./src/locales/${lang}/pages/${slug}.json`),
            'utf8',
        ),
    );
    return { pageStrings };
};
