import express from 'express';
const router = express.Router();

import { checkAuth } from '../middleware/checkAuth.js';
import {
  addTask,
  getTask,
  updateTask,
  deleteTask,
  changeStatusTask,
} from '../controllers/taskController.js';

router.post('', checkAuth, addTask);
router.post('/status/:id', checkAuth, changeStatusTask);
router
  .route('/:id')
  .get(checkAuth, getTask)
  .put(checkAuth, updateTask)
  .delete(checkAuth, deleteTask);

export default router;
