var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: { 
        app: "./src/main.js"
    },
    output: {
        path: __dirname ,
        filename: "[name].bundle.js"
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        vue: 'vue/dist/vue.js',
        'vue$': 'vue/dist/vue.esm.js',
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'vue-style-loader' 
              })
            }
          } 
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    node: {
      fs: 'empty',
      tls: 'empty',
      net: 'empty'
    }
/*
    plugins: [
      new ExtractTextPlugin("style.css")
    ]
*/
};
