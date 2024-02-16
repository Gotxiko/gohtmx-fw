/*
 * Components routes for HTMX requests handling and response
 * @param {Object} fastify - Fastify instance
 * @param {Object} opts - Options
 * @param {Function} done - Callback function
 *
 * These routes should all view .hbs files from ./views/components
 *
 */

import { getComponentStrings } from '../middleware/componentFunctions.js';

export const ComponentsRoutes = (fastify, opts, done) => {
    const rootDir = opts['rootDir'];

    fastify.route({
        method: 'GET',
        url: '/:lang/component/:name',
        handler: (req, reply) => {
            const { lang, name } = req.params;
            const componentStrings = getComponentStrings(lang, name, rootDir);
            reply.view(`components/${name}`, {
                strings: componentStrings,
            });
        },
    });

    done();
};
