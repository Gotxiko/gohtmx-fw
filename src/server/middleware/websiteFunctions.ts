import path from "path";
import fs from "fs";

export const getPageStrings = (lang: string, slug: string, rootDir: string) => {
  const pageStrings = JSON.parse(
    fs.readFileSync(
      path.join(rootDir, `./locales/${lang}/${slug}.json`),
      "utf8",
    ),
  );
  return pageStrings;
};

export const getNavMenuItems = (lang: string, rootDir: string) => {
  const navMenuItems = JSON.parse(
    fs.readFileSync(
      path.join(rootDir, `./locales/${lang}/navMenu.json`),
      "utf8",
    ),
  );
  return navMenuItems;
};
