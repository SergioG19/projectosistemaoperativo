import React from 'react';
import './IncidenciaList.css'; // Importar los estilos CSS

const IncidenciaList = ({ incidencias }) => { // Recibe las incidencias como prop
  return (
    <div className="incidencia-list-container">
      <h2>Lista de Incidencias</h2>
      {incidencias.length === 0 ? (
        <p>No hay incidencias registradas.</p>
      ) : (
        <table className="incidencia-table">
          <thead>
            <tr>
              <th>Empresa</th>
              <th>Incidencia</th>
              <th>Causa</th>
              <th>Afecta</th>
              <th>Reporte</th>
              <th>Atendida</th>
            </tr>
          </thead>
          <tbody>
            {incidencias.map((incidencia) => (
              <tr key={incidencia._id}>
                <td>{incidencia.empresa}</td>
                <td>{incidencia.incidencia}</td>
                <td>{incidencia.causa}</td>
                <td>{incidencia.afecta}</td>
                <td>{incidencia.reporte}</td>
                <td>{incidencia.atendida ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default IncidenciaList;
