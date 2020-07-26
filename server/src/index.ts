import dotenv from 'dotenv';
import express from 'express';
import path from 'path';

import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { ApolloServer } from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Server settings
app.disable('x-powered-by');
app.set('trust proxy', 1);

// MIDDLEWARE
app.use(logger('combined'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());


// Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
});


app.get(`/playground`, expressPlayground({ endpoint: '/graphql' }));
app.get("/", (req, res) => {
  res.send("Hello World");
});

apolloServer.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Server listening on http://localhost${port}`);
});

function shutdown() {
  // @ts-ignore
  app.close(function onServerClosed(err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
}

// Cleanup
process.on('SIGINT', function onSigint() {
  console.info('Got SIGINT. Graceful shutdown: ', new Date().toISOString());
  shutdown();
});

process.on('SIGTERM', function onSigterm() {
  console.info('Got SIGTERM (Docker container stop). Graceful shutdown: ', new Date().toISOString());
  shutdown();
});


