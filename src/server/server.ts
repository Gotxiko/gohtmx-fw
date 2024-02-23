import dotenv from "dotenv";
import path from "path";

import Fastify from "fastify";
import staticPlugin from "@fastify/static";

import { WebsiteRoutes } from "./routes/Website.routes";
// import PartialsRoutes from './routes/Partials.routes';
// import APIRoutes from './routes/Api.routes';

const envPath = path.join(__dirname, `../${process.env.NODE_ENV}.env`);
dotenv.config({ path: envPath });

const fastify = Fastify({ logger: false, ignoreTrailingSlash: true });
const port = Number(process.env.PORT) || 3002;

fastify.register(staticPlugin, {
  root: path.join(__dirname, "dist"),
});

fastify.register(WebsiteRoutes, { rootDir: __dirname });
// fastify.register(PartialsRoutes, { rootDir: __dirname });
// fastify.register(APIRoutes, { rootDir: __dirname });

fastify
  .listen({ port: port, host: "127.0.0.1" })
  .then((address) => {
    fastify.log.info(`server listening on ${address}`);
  })
  .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
  });
