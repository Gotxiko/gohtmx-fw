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
import { getPageStrings } from '../middleware/websiteFunctions.js';

export const WebsiteRoutes = (fastify, opts, done) => {
    const rootDir = opts['rootDir'];

    fastify.route({
        method: 'GET',
        url: '/:lang/:slug?',
        preValidation: validateLanguage,
        handler: (req, reply) => {
            let { lang, slug } = req.params;
            if (!slug) {
                slug = lang === 'es' ? 'inicio' : 'home';
            }
            const pageStrings = getPageStrings(lang, slug, rootDir);
            reply.view(`/server/views/${pageStrings.template}`, {
                strings: pageStrings,
                locale: lang,
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
