import express from 'express';
const router = express.Router();

import { checkAuth } from '../middleware/checkAuth.js';
import {
  addColaborator,
  deleteProject,
  editProject,
  getProject,
  getProjects,
  getTasks,
  newProject,
} from '../controllers/projectController.js';

router.route('/').get(checkAuth, getProjects).post(checkAuth, newProject);

router
  .route('/:id')
  .get(checkAuth, getProject)
  .put(checkAuth, editProject)
  .delete(checkAuth, deleteProject);

router.get('/task/:id', checkAuth, getTasks);
router.post('/add-colaborator/:id', checkAuth, addColaborator);
router.post('/delete-colaborator/:id', checkAuth, addColaborator);

export default router;
9