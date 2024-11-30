import React, { useState } from 'react';
import axios from 'axios';
import './IncidenciaForm.css'; // Importa los estilos aquí

const IncidenciaForm = ({ addIncidencia }) => { // Recibe la función addIncidencia como prop
  const [formData, setFormData] = useState({
    empresa: '',
    incidencia: '',
    causa: '',
    afecta: '',
    reporte: '',
    atendida: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Enviar los datos al backend
      const response = await axios.post('http://localhost:5000/api/incidencias', formData);

      if (response.status === 201) { // Código 201 indica que se creó exitosamente
        addIncidencia(response.data); // Actualiza la lista de incidencias en el estado global
        alert('Incidencia registrada con éxito');
        setFormData({
          empresa: '',
          incidencia: '',
          causa: '',
          afecta: '',
          reporte: '',
          atendida: false,
        });
      }
    } catch (err) {
      setError('Hubo un error al registrar la incidencia. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Registrar Incidencia</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="empresa">Nombre de la Empresa</label>
          <input
            type="text"
            id="empresa"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="incidencia">Descripción de la Incidencia</label>
          <textarea
            id="incidencia"
            name="incidencia"
            value={formData.incidencia}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="causa">Posible Causa</label>
          <input
            type="text"
            id="causa"
            name="causa"
            value={formData.causa}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="afecta">¿Qué afecta esta incidencia?</label>
          <input
            type="text"
            id="afecta"
            name="afecta"
            value={formData.afecta}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="reporte">Reporte de la Incidencia</label>
          <textarea
            id="reporte"
            name="reporte"
            value={formData.reporte}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="atendida">¿Incidencia Atendida?</label>
          <input
            type="checkbox"
            id="atendida"
            name="atendida"
            checked={formData.atendida}
            onChange={(e) => setFormData({ ...formData, atendida: e.target.checked })}
          />
        </div>

        <div className="form-group">
          <button type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrar Incidencia'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidenciaForm;
