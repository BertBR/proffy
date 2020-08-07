import express from 'express';
import cors from 'cors';
import routes from './routes';
import connection from './config/connection';

const app = express();

app.use(express.json());
app.use(routes);
app.use(cors());

connection.then(() => {
  app.listen(3333, () => console.log('Server Running on PORT 3333...'));
})