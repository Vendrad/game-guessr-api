import express from 'express';
import 'dotenv/config';
const igdb = require('igdb-api-node').default;
const app = express();
const port = 3080;

async function call(res) {
  try {
    const client = igdb();
    const response = await client.fields(['id', 'name', 'cover.url'])
      .offset(10)
      .limit(2)
      .request("games");
    res.send(response.data);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      res.send(error);
    } else {
      res.sendStatus(500);
    }
  }
}

app.get('/', (req, res) => {
  call(res);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));