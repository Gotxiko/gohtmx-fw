/*
 * Website route handling
 * @param {Object} fastify - Fastify instance
 * @param {Object} opts - Options
 * @param {Function} done - Callback function
 *
 * These routes should all send the .html files from ./dist.
 *
 */

import { validateLanguage } from '../utils/validateLanguage.js';

export const WebsiteRoutes = (fastify, opts, done) => {
    const rootDir = opts['rootDir'];

    fastify.setNotFoundHandler((req, reply) => {
        reply.code(404).sendFile('404.html', { root: rootDir + '/public' });
    });

    fastify.route({
        method: 'GET',
        url: '/:lang/:slug?',
        preValidation: validateLanguage,
        handler: (req, reply) => {
            const { lang, slug = 'index' } = req.params;
            if (req.params.slug == '404') {
                reply.sendFile('404.html', { root: rootDir + '/public' });
                return;
            }
            reply.sendFile(`${lang}/${slug}.html`, {
                root: rootDir + '/dist/',
            });
        },
    });

    fastify.route({
        method: 'GET',
        url: '/favicon.ico',
        handler: (req, reply) => {
            reply.sendFile('favicon.ico', { root: rootDir + '/public' });
        },
    });
    done();
};
