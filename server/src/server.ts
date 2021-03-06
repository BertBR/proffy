import express from 'express';
import cors from 'cors';
import routes from './routes';
import connection from './config/connection';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

connection.then(() => {
  app.listen(3333, () => console.log('Server Running on PORT 3333...'));
})