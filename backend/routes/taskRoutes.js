import express from 'express';
const router = express.Router();

import { checkAuth } from '../middleware/checkAuth.js';
import { addTask } from '../controllers/taskController.js';

router.post('', checkAuth, addTask);

export default router;
