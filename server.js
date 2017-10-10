import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import bodyParser from 'body-parser';
import express from 'express';
import fs from 'fs';
import schema from './graphql/schema.js';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import webpackDevMiddleware from 'webpack-dev-middleware';

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

app.use(express.static(__dirname + '/www'));

app.use(bodyParser.json())

app.use('/graphql', graphqlExpress(req => ({
  schema,
  context: {
    readJson: (entity) => {
      const json = fs.readFileSync(`./graphql/data/${entity}.json`)
      return JSON.parse(json)
    },
    readJsonAsync: (entity) => {
      return new Promise((resolve, reject) => {
        fs.readFile(`./graphql/data/${entity}.json`, (err, data) => {
          if (err) {
            reject(err)
          }

          resolve(JSON.parse(data))
        })
      })
    }
  },
})))

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: 'ws://localhost:3000/subs',
}))

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
