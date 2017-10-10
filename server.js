import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/www/index.html')
})

const server = app.listen(3000, function() {
  console.log('Example app listening at http://localhost:3000');
});
