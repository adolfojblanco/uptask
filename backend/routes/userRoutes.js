import express from 'express';
const router = express.Router();

import { usersList, createUser, loginUser } from '../controllers/userController.js';

/** user router */

router.get('/', usersList); // Get al users

router.post('/', createUser); // Create a new user

/** Auth Routes */
router.post('/login', loginUser);

router.put('/', (req, res) => {
  res.send('desde usuarios');
});

router.delete('/', (req, res) => {
  res.send('desde usuarios');
});

export default router;
