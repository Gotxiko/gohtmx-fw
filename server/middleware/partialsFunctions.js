import path from 'path';
import fs from 'fs';

export const getPartialStrings = (lang, name, rootDir) => {
    const partialStrings = JSON.parse(
        fs.readFileSync(
            path.join(
                rootDir,
                `./server/views/partials/${name}/langs.${lang}.json`,
            ),
            'utf8',
        ),
    );
    return partialStrings;
};
