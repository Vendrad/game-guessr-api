import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
import 'dotenv/config';
import routes from './routes';

console.log('We are in: ' + process.env.NODE_ENV);

const app = express();
const port = process.env.PORT;
const port_ssl = process.env.PORT_SSL;

app.use(express.static(process.env.STATIC_FILES_PATH, { dotfiles: 'allow' } ))

routes(app);

http.createServer(app).listen(port, () => {
  console.log(`Listening on port ${port}.`)
});

if (process.env.SSL_PATH_TO_KEY !== '') {
  https.createServer({
    key: fs.readFileSync(process.env.SSL_PATH_TO_KEY),
    cert: fs.readFileSync(process.env.SSL_PATH_TO_CERT),
    ca: fs.readFileSync(process.env.SSL_PATH_TO_CHAIN)
  }, app).listen(port_ssl, () => {
    console.log(`Listening on SSL port ${port_ssl}.`)
  });
}
