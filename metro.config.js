const { getDefaultConfig } = require('@expo/metro-config');

module.exports = {
  ...getDefaultConfig(__dirname),
  resolver: {
    assetExts: [...getDefaultConfig(__dirname).resolver.assetExts, 'png', 'jpg'],
  },
};
