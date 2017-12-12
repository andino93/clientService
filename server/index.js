import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';

config();
const app = express();
const port = process.env.PORT;

app.listen(port, () => console.log(`listening on port ${port}`));

app.use(cors());

app.get('/', (req, res) => {
  res.sendStatus(200);
});
