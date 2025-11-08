import path from "node:path";
import Image from "@11ty/eleventy-img";
import EleventyVitePlugin from "@11ty/eleventy-plugin-vite";
import { EleventyRenderPlugin, type UserConfig } from "@11ty/eleventy";
import EleventyPluginBundle from "@11ty/eleventy-plugin-bundle";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

async function imageShortcode(src: string, alt: string, sizes = "100vw") {
  if (!alt) {
    throw new Error(`Image shortcode for ${src} requires an alt attribute.`);
  }

  const resolvedSrc = path.join("src/assets/images", src);

  const metadata = await Image(resolvedSrc, {
    widths: [400, 800, 1200],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "dist/assets",
    urlPath: "/assets/",
    sharpOptions: {
      animated: false,
    },
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes, {
    whitespaceMode: "inline",
  });
}

export default function (eleventyConfig: UserConfig) {
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addPlugin(EleventyRenderPlugin);
  eleventyConfig.addPlugin(EleventyPluginBundle);

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: ".11ty-vite",
    viteOptions: {
      clearScreen: false,
      appType: "mpa",
      server: {
        middlewareMode: true,
      },
      resolve: {
        alias: {
          "/@/": path.resolve("src") + "/",
          "@images": path.resolve("src/assets/images"),
          "@styles": path.resolve("src/styles"),
          "@scripts": path.resolve("src/scripts"),
        },
      },
      build: {
        manifest: true,
        emptyOutDir: true,
      },
    },
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/manifest.webmanifest");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addWatchTarget("src/styles");
  eleventyConfig.addWatchTarget("src/scripts");

  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink(),
  });
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("toOpeningHoursSpecification", (entries: { day: string; open: string; close: string }[] = []) =>
    entries.map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.open,
      closes: entry.close,
    }))
  );

  eleventyConfig.addFilter(
    "toStructuredReviews",
    (
      collection: { author: string; rating: number; excerpt: string; source: string; url?: string }[] = []
    ) =>
      collection.map((review) => ({
        "@type": "Review",
        datePublished: new Date().toISOString().split("T")[0],
        reviewRating: {
          "@type": "Rating",
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1,
        },
        author: {
          "@type": "Person",
          name: review.author,
        },
        reviewBody: review.excerpt,
        publisher: {
          "@type": "Organization",
          name: review.source,
        },
        url: review.url,
      }))
  );

  eleventyConfig.addFilter("stars", (rating: number) => "★".repeat(Math.round(rating)));
  eleventyConfig.addFilter("tel", (input: string) => input.replace(/[^+\d]/g, ""));

  eleventyConfig.addGlobalData("currentYear", () => new Date().getFullYear());

  return {
    dir: {
      input: "src",
      includes: "includes",
      layouts: "layouts",
      data: "data",
      output: "dist",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "11ty.js"],
    passthroughFileCopy: true,
  } satisfies UserConfig;
}
