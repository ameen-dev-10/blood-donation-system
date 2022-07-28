const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const withSass = require("@zeit/next-sass");
const withCSS = require("@zeit/next-css");
const withFonts = require("next-fonts");
const webpack = require("webpack");
const path = require("path");

module.exports = withFonts(
  withCSS(
    withImages(
      withSass({
        webpack(config, options) {
          config.module.rules.push({
            test: /\.(eot|ttf|woff|woff2)$/,
            use: {
              loader: "url-loader",
            },
          });
          config.resolve.modules.push(path.resolve("./"));
          return config;
        },
      })
    )
  )
);

// module.exports = {
//   env: {
//     MONGO_URI: `mongodb+srv://ameenilyas786:$F-59MrcUQ-78g5@cluster0.wzmng.mongodb.net/?retryWrites=true&w=majority`,
//   },
// };
