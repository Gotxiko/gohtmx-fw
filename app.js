import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';

import Fastify from 'fastify';
import view from '@fastify/view';
import staticPlugin from '@fastify/static';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { WebsiteRoutes } from './server/routes/Website.routes.js';
import { PartialsRoutes } from './server/routes/Partials.routes.js';
import { APIRoutes } from './server/routes/Api.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = path.join(__dirname, `${process.env.NODE_ENV}.env`);
dotenv.config({ path: envPath });

const fastify = Fastify({ logger: true, ignoreTrailingSlash: true });
const port = process.env.PORT || 3000;

fastify.register(view, {
    engine: { ejs },
    root: __dirname,
});

fastify.register(staticPlugin, {
    root: path.join(__dirname, 'dist'),
});

fastify.register(WebsiteRoutes, { rootDir: __dirname });
fastify.register(PartialsRoutes, { rootDir: __dirname });
fastify.register(APIRoutes, { rootDir: __dirname });

fastify
    .listen({ port: port })
    .then((address) => console.log(`server listening on ${address}`))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
