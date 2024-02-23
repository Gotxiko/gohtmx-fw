/*
 * Website route handling
 * @param {Object} fastify - Fastify instance
 * @param {Object} opts - Options
 * @param {Function} done - Callback function
 *
 * These routes should all send the .html files from ./dist.
 *
 */

import { validateLanguage } from "../utils/validateLanguage";
import {
  getPageStrings,
  getNavMenuItems,
} from "../middleware/websiteFunctions";

export const WebsiteRoutes = (fastify: any, opts: any, done: any) => {
  const rootDir = opts["rootDir"];

  fastify.route({
    method: "GET",
    url: "/:lang/:slug?",
    preValidation: validateLanguage,
    handler: async (req: any, reply: any) => {
      let { lang, slug } = req.params;
      if (!slug) {
        slug = lang === "es" ? "inicio" : "home";
      }
      const pageStrings = getPageStrings(lang, slug, rootDir);
      const navMenuItems = Object.values(getNavMenuItems(lang, rootDir));

      const contents = await import(
        `${rootDir}/views/${pageStrings.template}.js`
      );
      const html = contents.default({
        ...pageStrings,
        navMenuItems,
        locale: lang,
      });
      reply.type("text/html").send(html);
    },
  });

  fastify.route({
    method: "GET",
    url: "/favicon.ico",
    handler: (req: any, reply: any) => {
      reply.sendFile("favicon.ico", { root: rootDir + "/public" });
    },
  });
  done();
};
