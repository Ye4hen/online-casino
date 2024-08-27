const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");

module.exports = {
  // ... other options
  devtool: "source-map", // Source map generation must be turned on
  plugins: [
    // Put the Sentry Webpack plugin after all other plugins
    sentryWebpackPlugin({
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: "yevb",
      project: "javascript-vue",
    }),
	],
  
	module: {
		rules: [
			// ... other rules ...
			{
				type: 'json',
				test: /\.yml$/,
				use: 'yaml-loader',
			},
		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json', '.yml']
	}
}