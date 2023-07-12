import express from 'express';
const router = express.Router();

import { usersList, createUser } from '../controllers/userController.js';

/** user router */

router.get('/', usersList);

router.post('/', createUser);

router.put('/', (req, res) => {
  res.send('desde usuarios');
});

router.delete('/', (req, res) => {
  res.send('desde usuarios');
});

export default router;
