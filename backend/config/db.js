import mongoose from 'mongoose';

/**
 * Cadena de conexion para la BBDD
 */
const conectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@task.uv6rz1j.mongodb.net/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Base de datos conectada');
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // Forzar que los procesos terminen
  }
};

export default conectDB;
