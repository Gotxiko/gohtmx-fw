/*
 * Website route handling
 * @param {Object} fastify - Fastify instance
 * @param {Object} opts - Options
 * @param {Function} done - Callback function
 *
 * These routes should all view .hbs files from ./views or their respective category folders.
 *
 */

import { validateLanguage } from '../middleware/validateLanguage.js';
import { getPageContents } from '../middleware/pageFunctions.js';

export const WebsiteRoutes = (fastify, opts, done) => {
    const rootDir = opts['rootDir'];

    fastify.setNotFoundHandler((req, reply) => {
        reply.code(404).sendFile('404.html', { root: rootDir + '/public' });
    });

    fastify.route({
        method: 'GET',
        url: '/:lang',
        preValidation: validateLanguage,
        handler: (req, reply) => {
            const { lang } = req.params;
            const slug = lang == 'es' ? 'inicio' : 'index';
            const { pageStrings } = getPageContents(lang, slug, rootDir);
            reply.view(`/pages/${pageStrings.template}`, {
                strings: pageStrings,
                lang: lang,
            });
        },
    });

    fastify.route({
        method: 'GET',
        url: '/:lang/:slug',
        preValidation: validateLanguage,
        handler: (req, reply) => {
            const { lang, slug } = req.params;
            const { pageStrings } = getPageContents(lang, slug, rootDir);
            reply.view(`/pages/${pageStrings.template}`, {
                strings: pageStrings,
                lang: lang,
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
