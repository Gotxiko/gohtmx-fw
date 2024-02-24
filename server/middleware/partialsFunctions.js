import path from 'path';
import fs from 'fs';

export const getPartialStrings = (lang, name, rootDir) => {
    const partialStrings = JSON.parse(
        fs.readFileSync(
            path.join(rootDir, `./locales/${lang}/partials/${name}.json`),
            'utf8',
        ),
    );
    return partialStrings;
};

export const verifyHxRequest = (request, reply, done) => {
    const hxHeaders = request.headers['hx-request'];
    if (hxHeaders !== 'true') {
        reply.code(400).send('Bad Request');
    }
    done();
};
