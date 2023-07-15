import Project from '../models/Project.js';
import Task from '../models/Task.js';

/**
 * Get all project for auth user
 */
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().where('creator').equals(req.user);
    res.status(200).json({
      projects,
    });
  } catch (error) {
    res.status(400).json({
      message: 'No se pudieron cargar los proyectos',
      error,
    });
  }
};

/**
 * Nuevo proyecto
 */
export const newProject = async (req, res) => {
  const project = new Project(req.body);
  project.creator = req.user._id;
  try {
    await project.save();
    res.status(200).json({
      message: 'Proyecto registrado correctamente',
      project,
    });
  } catch (error) {
    res.status(400).json({
      message: 'No se pudo registrar el proyecto',
      error,
    });
  }
};

/**
 * Devuelve un proyecto, de un creador, con sus tareas
 * @param {id} req project id
 * @param {project[]}
 * @returns projects[]
 */
export const getProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error('Proyecto no encontrado');
    return res.status(404).json({
      error,
    });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Proyecto no encontrado');
    return res.status(404).json({
      error,
    });
  }
  const tasks = await Task.find().where('project').equals(project._id);

  res.status(200).json({
    project,
    tasks,
  });
};

/**
 * Edit project
 * @returns Edit project
 */
export const editProject = async () => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error('Proyecto no encontrado');
    return res.status(404).json({
      error,
    });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('Proyecto no encontrado');
    return res.status(404).json({
      error,
    });
  }

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.deliveredDate = req.body.deliveredDate || project.deliveredDate;
  project.client = req.body.client || project.client;

  try {
    await project.save();
    res.status(200).json({
      message: 'Proyecto actualizado correctamete',
      project,
    });
  } catch (error) {
    return res.status(404).json({
      error,
      message: 'No se pudo actualizar el proyecto',
    });
  }
};

/** Eliminar un proyecto */
export const deleteProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error('Proyecto no existe');
    return res.status(404).json({
      error,
    });
  }

  if (project.creator.toString() !== req.user._id.toString()) {
    const error = new Error('No se pudo eliminar el proyecto');
    return res.status(404).json({
      error,
    });
  }

  try {
    await project.deleteOne();
    res.status(200).json({
      message: 'Proyecto eliminado correctamete',
      project,
    });
  } catch (error) {
    return res.status(404).json({
      message: 'No se pudo eliminar el proyecto',
      error,
    });
  }
};

export const addColaborator = async () => {};

export const deleteColaborator = async () => {};

/**
 * Obtener tareas de un colaborador o dueño del proyecto
 * @param {id} req project id
 * @returns tasks[]
 */
export const getTasks = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    const error = new Error('Proyecto no existe');
    return res.status(404).json({
      error,
    });
  }

  const tasks = await Task.find().where('project').equals(id);

  res.status(200).json({
    tasks,
  });
};
