const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Conexión a la base de datos
const incidenciaRoutes = require('./routes/incidencias'); // Rutas de incidencias

const app = express();

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(express.json()); // Procesar datos JSON en solicitudes
app.use(cors({ origin: 'http://localhost:3000' })); // Habilitar CORS para el frontend

// Rutas
app.use('/api/incidencias', incidenciaRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ mensaje: 'Ocurrió un error en el servidor.' });
});

// Configurar el puerto y arrancar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
