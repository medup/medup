var path = require('path');
var webpack = require('webpack');
   module.exports = {
       entry: './server/public/app/app.js',
       output: {
           path: path.join(__dirname, 'server/public/dist'),
           filename: 'bundle.js'
       },
       module: {
           loaders: [
               {
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                   presets: 'es2015'
                 }
               },
               {
                 test: /\.html$/, loader: 'raw'
               }
           ]
       }
     };
