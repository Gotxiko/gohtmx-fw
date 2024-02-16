import path from 'path';
import fs from 'fs';

import routesMap from '../data/routesMap.json' assert { type: 'json' };

export const getPageContents = (lang, slug, rootDir) => {
    const pageStrings = JSON.parse(
        fs.readFileSync(
            path.join(
                rootDir,
                `./views/pages/${slug}/locales/${lang}/strings.json`,
            ),
            'utf8',
        ),
    );
    return { pageStrings };
};

export const getViewName = (req, reply, done) => {
    const { lang, slug = 'inicio' } = req.params;
    if(req.params.category) {
        req.params.slug = `${req.params.category}.${slug}`;
    }
    if (routesMap[lang] && routesMap[lang][req.params.slug]) {
        req.params.slug = routesMap[lang][req.params.slug];
    }
    done();
};