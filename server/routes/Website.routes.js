/*
 * Website route handling
 * @param {Object} fastify - Fastify instance
 * @param {Object} opts - Options
 * @param {Function} done - Callback function
 *
 * These routes should all send the .html files from ./dist.
 *
 */

import { validateRoute } from '../utils/validateRoute.js';

import fs from 'fs';
import path from 'path';

export const WebsiteRoutes = (fastify, opts, done) => {
    const rootDir = opts['rootDir'];

    fastify.route({
        method: 'GET',
        url: '/:lang/:slug?',
        // preValidation: (req, reply, done) => validateRoute(req, reply, done),
        handler: (req, reply) => {
            let { lang, slug } = req.params;
            if (!slug) {
                slug = lang === 'es' ? 'inicio' : 'home';
            }
            console.log(`/pages/${lang}/${slug}`);
            reply.view(`/pages/${lang}/${slug}`, {
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
