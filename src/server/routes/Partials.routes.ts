/*
 * Components routes for HTMX requests handling and response
 * @param {Object} fastify - Fastify instance
 * @param {Object} opts - Options
 * @param {Function} done - Callback function
 *
 * These routes should all view .hbs files from the partials folder inside the respective page folder.
 *
 */

import { getPartialStrings } from "../middleware/partialsFunctions.js";

export const PartialsRoutes = (fastify: any, opts: any, done: any) => {
  const rootDir = opts["rootDir"];

  fastify.route({
    method: "GET",
    url: "/:lang/partials/:name",
    handler: (req: any, reply: any) => {
      const { lang, name } = req.params;
      const partialStrings = getPartialStrings(lang, name, rootDir);
      reply.view(`/server/views/partials/${name}/partial`, {
        strings: partialStrings,
      });
    },
  });

  done();
};
