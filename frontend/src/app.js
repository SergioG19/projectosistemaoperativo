import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IncidenciaForm from './components/IncidenciaForm';
import IncidenciaList from './components/IncidenciaList';

const App = () => {
  const [incidencias, setIncidencias] = useState([]); // Estado global para las incidencias
  const [showForm, setShowForm] = useState(false); // Controlar la visibilidad del formulario

  // Función para obtener las incidencias del backend
  const fetchIncidencias = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/incidencias');
      setIncidencias(response.data); // Actualiza el estado con las incidencias del backend
    } catch (error) {
      console.error('Error al obtener las incidencias:', error);
    }
  };

  // Cargar las incidencias al montar el componente
  useEffect(() => {
    fetchIncidencias();
  }, []);

  // Función para agregar una nueva incidencia al estado
  const addIncidencia = (nuevaIncidencia) => {
    setIncidencias((prevIncidencias) => [nuevaIncidencia, ...prevIncidencias]);
  };

  return (
    <div className="App">
      <header>
        <h1>Gestión de Incidencias</h1>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Agregar Nueva Incidencia'}
        </button>
      </header>

      {/* Formulario para registrar nuevas incidencias */}
      {showForm && <IncidenciaForm addIncidencia={addIncidencia} />}

      {/* Tabla que muestra la lista de incidencias */}
      <IncidenciaList incidencias={incidencias} />
    </div>
  );
};

export default App;
