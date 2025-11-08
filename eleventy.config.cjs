require("ts-node").register({
  transpileOnly: true,
});

const config = require("./eleventy.config.ts");

module.exports = config.default || config;
