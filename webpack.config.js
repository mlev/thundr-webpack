const CopyWebpackPlugin = require("copy-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const path = require("path");
const process = require("process");
const webpack = require("webpack");

const basic = {
    src: "src/main/static",
    webapp: "src/main/webapp",
    dist: "src/main/webapp/static"
};

const extensions = {
    fonts: "{css,eot,svg,ttf,woff,woff2,gif,png,jpg,jpeg}",
    images: "{png,jpg,jpeg,gif,webp,svg}",
    templates: "html"
};

function pathTo (folder) {
    return path.resolve(__dirname, folder);
}

module.exports = () => {

    const isDevServer = !!process.argv.find((v) => v.indexOf('webpack-dev-server') !== -1);
    console.log("Running From DevServer: ", isDevServer);

    function copyAssets (assetType, allowedExtensions) {
        const src = pathTo(basic.src);
        return {
            context: src + "/" + assetType,
            from: "**/*." + allowedExtensions,
            to: "static/" + assetType
        };
    }

    function injectAssetsIntoLayoutTag () {
        const tagsFolder = pathTo(basic.webapp) + "/WEB-INF/tags";
        return {
            alwaysWriteToDisk: isDevServer,
            template: tagsFolder + "/layout.template.tag",
            filename: tagsFolder + "/layout.tag",
            hash: true
        }
    }

    return {
        entry: pathTo(basic.src) + "/typescript/app.ts",
        output: {
            path: pathTo(basic.webapp),
            publicPath: "/",
            filename: "static/bundle.js"
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
        module: {
            rules: [
                {test: /\.ts$/, enforce: "pre", loader: "tslint-loader"},
                {test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
                {test: /\.ts$/, loaders: ["ng-annotate-loader", "ts-loader"]},
                {test: /\.tag$/, loader: "raw-loader"},
                {
                    test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                    loader: "file-loader?name=./static/fonts/[hash].[ext]"
                }
            ]
        },
        devServer: {
            contentBase: basic.webapp,
            proxy: {
                "!/static/**": {
                    target: "http://localhost:8081",
                    secure: false
                }
            }
        },
        plugins: [
            new CopyWebpackPlugin([
                copyAssets("fonts", extensions.fonts),
                copyAssets("images", extensions.images),
                copyAssets("templates", extensions.templates)
            ]),
            new FaviconsWebpackPlugin({
                logo: pathTo(basic.src) + "/images/favicon/original.png",
                prefix: "static/images/favicon/",
                icons: {
                    android: false,
                    appleIcon: true,
                    appleStartup: false,
                    coast: false,
                    favicons: true,
                    firefox: false,
                    opengraph: false,
                    twitter: false,
                    yandex: false,
                    windows: true
                }
            }),
            new HtmlWebpackPlugin(injectAssetsIntoLayoutTag()),
            new HtmlWebpackHarddiskPlugin(),
            new webpack.optimize.UglifyJsPlugin()
        ]
    }
};