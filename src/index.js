import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import 'dotenv/config';
import routes from './core/routes';
import log from './core/logging/Logger';

// Port values from configuration
const port = process.env.PORT;
const portSSL = process.env.PORT_SSL;

// Start express
const app = express();

// Allow static files
app.use(express.static(process.env.STATIC_FILES_PATH, { dotfiles: 'allow' }));

// Load core routes file
routes(app);

// Initialise non SSL listener
http.createServer(app).listen(port, () => {
  log(`Env: ${process.env.NODE_ENV} - Listening on port ${port}.`);
});

// Initialise SSL listener
if (process.env.SSL_PATH_TO_KEY !== '') {
  https
    .createServer(
      {
        key: fs.readFileSync(process.env.SSL_PATH_TO_KEY),
        cert: fs.readFileSync(process.env.SSL_PATH_TO_CERT),
        ca: fs.readFileSync(process.env.SSL_PATH_TO_CHAIN),
      },
      app,
    )
    .listen(portSSL, () => {
      log(`Env: ${process.env.NODE_ENV} - Listening on SSL port ${portSSL}.`);
    });
}

export default app;
