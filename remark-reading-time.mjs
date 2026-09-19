// remark-reading-time.mjs
import getReadingTime from "reading-time";
import { toString } from "mdast-util-to-string";

export function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // Gardamos o resultado amigable (ex: "3 min read") no frontmatter
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}
