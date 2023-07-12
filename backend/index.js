import express from 'express';
import conectDB from './config/db.js';
import 'dotenv/config';

const app = express();
conectDB();

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
