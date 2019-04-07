import express from 'express';
import https from 'https';
import 'dotenv/config';
import routes from './routes';

console.log('We are in: ' + process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {

}

const app = express();
const port = 3080;

app.use(express.static(process.env.STATIC_FILES_PATH, { dotfiles: 'allow' } ))

routes(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));