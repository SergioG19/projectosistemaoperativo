// Importamos Express y el modelo de Incidencia
const express = require('express');
const Incidencia = require('../models/Incidencia');

// Creamos un enrutador de Express
const router = express.Router();

// Ruta para obtener todas las incidencias
router.get('/', async (req, res) => {
  try {
    const incidencias = await Incidencia.find();
    res.status(200).json(incidencias); // Devolvemos las incidencias en formato JSON
  } catch (error) {
    console.error('Error al obtener incidencias:', error);
    res.status(500).json({ mensaje: 'Error al obtener las incidencias' });
  }
});

// Ruta para obtener una incidencia específica por ID
router.get('/:id', async (req, res) => {
  try {
    const incidencia = await Incidencia.findById(req.params.id);

    if (!incidencia) {
      return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    res.status(200).json(incidencia); // Devolvemos la incidencia encontrada
  } catch (error) {
    console.error('Error al obtener la incidencia:', error);
    res.status(500).json({ mensaje: 'Error al obtener la incidencia' });
  }
});

// Ruta para crear una nueva incidencia
router.post('/', async (req, res) => {
  try {
    const { empresa, incidencia, estado, requisitos, causa, afecta, reporte, atendida } = req.body;

    const nuevaIncidencia = new Incidencia({
      empresa,
      incidencia,
      estado,
      requisitos,
      causa,
      afecta,
      reporte,
      atendida,
    });

    await nuevaIncidencia.save(); // Guardamos la nueva incidencia en la base de datos
    res.status(201).json(nuevaIncidencia); // Devolvemos la incidencia creada
  } catch (error) {
    console.error('Error al crear incidencia:', error);
    res.status(500).json({ mensaje: 'Error al crear la incidencia' });
  }
});

// Ruta para actualizar una incidencia existente
router.put('/:id', async (req, res) => {
  try {
    const { empresa, incidencia, estado, requisitos, causa, afecta, reporte, atendida } = req.body;

    const incidenciaActualizada = await Incidencia.findByIdAndUpdate(
      req.params.id,
      { empresa, incidencia, estado, requisitos, causa, afecta, reporte, atendida },
      { new: true } // Devuelve el objeto actualizado
    );

    if (!incidenciaActualizada) {
      return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    res.status(200).json(incidenciaActualizada); // Devolvemos la incidencia actualizada
  } catch (error) {
    console.error('Error al actualizar incidencia:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la incidencia' });
  }
});

// Ruta para eliminar una incidencia por ID
router.delete('/:id', async (req, res) => {
  try {
    const incidenciaEliminada = await Incidencia.findByIdAndDelete(req.params.id);

    if (!incidenciaEliminada) {
      return res.status(404).json({ mensaje: 'Incidencia no encontrada' });
    }

    res.status(200).json({ mensaje: 'Incidencia eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar incidencia:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la incidencia' });
  }
});

// Exportamos el enrutador
module.exports = router;
