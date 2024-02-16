import dotenv from 'dotenv';
import path from 'path';
import handlebars from 'handlebars';

import Fastify from 'fastify';
import view from '@fastify/view';
import staticPlugin from '@fastify/static';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { WebsiteRoutes } from './server/routes/Website.routes.js';
import { PartialsRoutes } from './server/routes/Partials.routes.js';
// import { ApiRoutes } from './server/routes/Api.routes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const __viewsDir = path.resolve(__dirname, './views');

const fastify = Fastify({ logger: true, ignoreTrailingSlash: true });
const port = process.env.PORT || 3000;

fastify.register(view, {
    engine: { handlebars },
    root: __viewsDir,
});

fastify.register(staticPlugin, {
    root: path.join(__dirname, 'dist'),
    prefix: '/assets/',
});

fastify.register(WebsiteRoutes, { rootDir: __dirname });
fastify.register(PartialsRoutes, { rootDir: __dirname });

fastify
    .listen({ port: port })
    .then((address) => console.log(`server listening on ${address}`))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
