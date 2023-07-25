import express from 'express';
import conectDB from './config/db.js';
import cors from 'cors';
import 'dotenv/config';

import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
app.use(express.json());
conectDB();

/** Cors config */
const whitelist = [process.env.FRONTEND];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      // Puede acceder
      callback(null, true);
    } else {
      // No esta permitido
      callback(new Error('Error de cors'));
    }
  },
};

app.use(cors(corsOptions));

/** Routing */
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en el puerto ${process.env.PORT}`);
});
