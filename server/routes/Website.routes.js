/*
 * Website route handling
 * @param {Object} fastify - Fastify instance
 * @param {Object} opts - Options
 * @param {Function} done - Callback function
 *
 * These routes should all view .hbs files from ./views or their respective category folders.
 *
 */

import { validateLanguage } from '../utils/validateLanguage.js';
import { getViewName, getPageContents } from '../middleware/websiteFunctions.js';

export const WebsiteRoutes = (fastify, opts, done) => {
    const rootDir = opts['rootDir'];

    fastify.setNotFoundHandler((req, reply) => {
        reply.code(404).sendFile('404.html', { root: rootDir + '/public' });
    });

    fastify.route({
        method: 'GET',
        url: '/:lang/:slug?',
        preValidation: validateLanguage,
        preHandler: getViewName,
        handler: (req, reply) => {
          const { lang, slug } = req.params;
          if(req.params.slug == '404') {
            reply.sendFile('404.html', { root: rootDir + '/public' });
            return;
          }
          const { pageStrings } = getPageContents(lang, slug, rootDir);
          reply.view(`/pages/${slug}/index`, {
              strings: pageStrings,
              slug: slug,
              lang: lang,
          });
        },
    });

    fastify.route({
        method: 'GET',
        url: '/:lang/:category/:slug',
        preValidation: validateLanguage,
        preHandler: getViewName,
        handler: (req, reply) => {
          const { lang, category, slug } = req.params;
          if(slug == '404') {
            reply.sendFile('404.html', { root: rootDir + '/public' });
            return;
          }
          const { pageStrings } = getPageContents(lang, slug, rootDir);
          reply.view(`/pages/${slug}/index`, {
              strings: pageStrings,
              slug: slug,
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
