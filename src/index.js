import express from 'express';
import https from 'https';
import 'dotenv/config';
import routes from './routes';

console.log('We are in: ' + process.env.NODE_ENV);

const app = express();
const port = 3080;

routes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));