import path from 'path';
import fs from 'fs';

export const getPartialStrings = (lang, slug, name, rootDir) => {
    const partialStrings = JSON.parse(
        fs.readFileSync(
            path.join(
                rootDir,
                `./views/pages/${slug}/partials/${name}/strings.${lang}.json`,
            ),
            'utf8',
        ),
    );
    return partialStrings;
};
