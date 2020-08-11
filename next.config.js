const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  webpack(config, _options) {
    config.module.rules.push({
      test: /\.(ts|tsx|js)$/,
      use: [
        {
          loader: "linaria/loader",
          options: {
            sourceMap: process.env.NODE_ENV !== "production",
          },
        },
      ],
    });

    return config;
  },
});
