import express from 'express';
const router = express.Router();

import { checkAuth } from '../middleware/checkAuth.js';

import {
  usersList,
  createUser,
  loginUser,
  confirmToken,
  forgetPassword,
  checkToken,
  newPassword,
  profile,
} from '../controllers/userController.js';

/** user router */

router.get('/', usersList); // Get al users

router.post('/', createUser); // Create a new user

router.get('/profile', checkAuth, profile);

router.put('/', (req, res) => {
  res.send('desde usuarios');
});

router.delete('/', (req, res) => {
  res.send('desde usuarios');
});

/** Auth Routes */
router.post('/login', loginUser);
router.get('/confirm/:token', confirmToken);
router.post('/forget-password', forgetPassword);

router.route('/forget-password/:token').get(checkToken).post(newPassword);

export default router;
