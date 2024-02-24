/*
 * Components routes for HTMX requests handling and response
 * @param {Object} fastify - Fastify instance
 * @param {Object} opts - Options
 * @param {Function} done - Callback function
 *
 * These routes should all view .hbs files from the partials folder inside the respective page folder.
 *
 */

import { getPartialStrings } from '../middleware/partialsFunctions.js';

export const PartialsRoutes = (fastify, opts, done) => {
    const rootDir = opts['rootDir'];

    fastify.route({
        method: 'GET',
        url: '/partials/:name/:lang?',
        handler: (req, reply) => {
            const hxHeaders = req.headers['hx-request'];
            if (hxHeaders !== 'true') {
                return reply.code(403).send('Forbidden');
            } else {
                let { name, lang } = req.params;
                const partialStrings = getPartialStrings(lang, name, rootDir);
                reply.view(`/server/views/partials/${name}`, {
                    locale: lang,
                    strings: partialStrings,
                });
            }
        },
    });

    done();
};
