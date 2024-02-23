import path from "path";
import fs from "fs";

export const getPartialStrings = (
  lang: string,
  name: string,
  rootDir: string,
) => {
  const partialStrings = JSON.parse(
    fs.readFileSync(
      path.join(rootDir, `./server/views/partials/${name}/langs.${lang}.json`),
      "utf8",
    ),
  );
  return partialStrings;
};
