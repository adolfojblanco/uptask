import Task from '../models/Task.js';
import Project from '../models/Project.js';

/** New Task */
export const addTask = async (req, res) => {
  const { project } = req.body;

  const projectBD = await Project.findById(project);

  /** Verificamos si existe el proyecto */
  if (!projectBD) {
    const error = new Error('Proyecto no encontrado');
    return res.status(404).json({
      message: error.message,
    });
  }

  /** Comprobamos que sea el mismo autor del proyecto */
  if (projectBD.creator.toString() !== req.user._id.toString()) {
    const error = new Error('No puedes modificar este proyecto');
    return res.status(404).json({
      message: error.message,
    });
  }

  /** Creamos la tarea */
  try {
    const task = await Task.create(req.body);
    task.save();

    res.status(201).json({
      message: 'Tarea creada correctamente',
      task,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

/** Obtener una tarea */
export const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate('project');

  if (!task) {
    const error = new Error('No existe la tarea');
    return res.status(403).json({
      message: error.message,
    });
  }

  /** Comprobamos que sea el mismo autor del proyecto */
  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('No tienes permiso para verificar esta tarea');
    return res.status(403).json({
      message: error.message,
    });
  }

  res.status(200).json({
    task,
  });
};

/**
 * Actualizar una tarea
 * @param {id} req id de la tarea a actualizar
 */
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate('project');

  if (!task) {
    const error = new Error('No existe la tarea');
    return res.status(403).json({
      message: error.message,
    });
  }

  /** Comprobamos que sea el mismo autor del proyecto */
  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('No tienes permiso para verificar esta tarea');
    return res.status(403).json({
      message: error.message,
    });
  }

  task.name = req.task.name || task.name;
  task.description = req.task.description || task.description;
  task.prioriry = req.task.prioriry || task.prioriry;
  task.deliveredDate = req.task.deliveredDate || task.deliveredDate;

  try {
    await Task.save();
    res.status(200).json({
      task,
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
    });
  }

  /** Comprobamos que sea el mismo autor del proyecto */
  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('No tienes permiso para verificar esta tarea');
    return res.status(403).json({
      message: error.message,
    });
  }

  res.status(200).json({
    task,
  });
};

/** Eliminar tarea */
export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate('project');

  if (!task) {
    const error = new Error('No existe la tarea');
    return res.status(403).json({
      message: error.message,
    });
  }

  /** Comprobamos que sea el mismo autor del proyecto */
  if (task.project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('No tienes permiso para verificar esta tarea');
    return res.status(403).json({
      message: error.message,
    });
  }

  try {
    await Task.deleteOne();
    res.status(200).json({
      message: 'Tarea eliminada correctamete',
      project,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const changeStatusTask = (req, res) => {};
