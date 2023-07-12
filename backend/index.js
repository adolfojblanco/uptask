import express from 'express';
import conectDB from './config/db.js';
import 'dotenv/config';

import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());
conectDB();

/** Routing */
app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
