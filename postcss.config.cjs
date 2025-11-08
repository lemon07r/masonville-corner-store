const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [
    postcssPresetEnv({ stage: 1 }),
    autoprefixer(),
    process.env.NODE_ENV === "production"
      ? cssnano({ preset: "default" })
      : null,
  ].filter(Boolean),
};
