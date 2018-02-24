const withOffline = require("next-offline");
const BabiliPlugin = require("babili-webpack-plugin");

const routes = require("./server/routes");

const { NODE_ENV } = process.env;
const { alias } = require("./now.json");

module.exports = withOffline({
  webpack(config, { dev }) {
    config.plugins = config.plugins.filter(plugin => {
      return plugin.constructor.name !== "UglifyJsPlugin";
    });

    if (!dev) {
      config.plugins.push(new BabiliPlugin());
    }

    return config;
  },

  assetPrefix:
    NODE_ENV === "production" ? `https://${alias}` : "http://localhost:3001",

  exportPathMap() {
    return routes;
  }
});
