import path from 'path';
import fs from 'fs';

export const getComponentStrings = (lang, name, rootDir) => {
    const componentStrings = JSON.parse(
        fs.readFileSync(
            path.join(rootDir, `./src/locales/${lang}/components/${name}.json`),
            'utf8',
        ),
    );
    return componentStrings;
};
