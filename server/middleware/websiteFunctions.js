import path from 'path';
import fs from 'fs';

export const getPageStrings = (lang, slug, rootDir) => {
    const pageStrings = JSON.parse(
        fs.readFileSync(
            path.join(rootDir, `./locales/${lang}/${slug}.json`),
            'utf8',
        ),
    );
    return pageStrings;
};

export const getNavMenuItems = (lang, rootDir) => {
    const navMenuItems = JSON.parse(
        fs.readFileSync(
            path.join(rootDir, `./locales/${lang}/navMenu.json`),
            'utf8',
        ),
    );
    return navMenuItems;
};
