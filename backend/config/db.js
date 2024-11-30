// Importamos mongoose
const mongoose = require('mongoose');
require('dotenv').config(); // Cargar variables de entorno desde un archivo .env

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    // Usamos la variable de entorno para obtener la URI de la base de datos
    const dbURI = process.env.MONGO_URI;

    // Conectamos a MongoDB usando Mongoose
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexión exitosa a la base de datos');
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error.message);
    process.exit(1); // Detener el proceso si no se puede conectar a la base de datos
  }
};

// Exportamos la función de conexión
module.exports = connectDB;
