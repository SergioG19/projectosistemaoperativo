// Importamos mongoose
const mongoose = require('mongoose');

// Creamos el esquema para una incidencia
const incidenciaSchema = new mongoose.Schema({
  empresa: {
    type: String,
    required: true, // Es obligatorio
  },
  incidencia: {
    type: String,
    required: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en progreso', 'resuelta', 'cerrada'],
    default: 'pendiente',
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  requisitos: {
    type: String,
  },
  causa: {
    type: String,
  },
  afecta: {
    type: String,
  },
  reporte: {
    type: String,
  },
  atendida: {
    type: Boolean,
    default: false,
  },
});

// Creamos el modelo para Incidencia con el esquema definido
const Incidencia = mongoose.model('Incidencia', incidenciaSchema);

// Exportamos el modelo para que pueda ser utilizado en otros archivos
module.exports = Incidencia;
