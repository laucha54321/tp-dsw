import React from "react";
import "./TurnoAdmin.css";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

// Turnos demo hardcodeados
const turnosDemo = [
  {
    id: 1,
    paciente: { nombre: 'Juan', apellido: 'Pérez' },
    tipoAnalisis: { nombre: 'Hemograma' },
    centroAtencion: { nombre: 'Centro Central' },
    fechaHoraReserva: '2025-10-01T10:00',
    fechaHoraExtraccion: '2025-10-01T10:30',
    estado: 'pendiente',
    observacion: '',
    recibeMail: true,
    receta: '/receta-demo.png', // Imagen demo
  },
  {
    id: 2,
    paciente: { nombre: 'Ana', apellido: 'García' },
    tipoAnalisis: { nombre: 'Glucemia' },
    centroAtencion: { nombre: 'Sucursal Norte' },
    fechaHoraReserva: '2025-10-02T11:00',
    fechaHoraExtraccion: '2025-10-02T11:30',
    estado: 'completado',
    observacion: 'Ayuno 8hs',
    recibeMail: false,
    receta: '/receta-demo.png',
  },
  {
    id: 3,
    paciente: { nombre: 'Carlos', apellido: 'López' },
    tipoAnalisis: { nombre: 'Colesterol' },
    centroAtencion: { nombre: 'Centro Central' },
    fechaHoraReserva: '2025-10-03T09:00',
    fechaHoraExtraccion: '2025-10-03T09:30',
    estado: 'pendiente',
    observacion: '',
    recibeMail: true,
    receta: '/receta-demo.png',
  },
];

function TurnoAdmin() {
  const [turnos, setTurnos] = React.useState(turnosDemo);
  const [showReceta, setShowReceta] = React.useState(false);
  const [recetaUrl, setRecetaUrl] = React.useState(null);

  // Función para confirmar un turno
  const confirmarTurno = (id) => {
    setTurnos(turnos.map(t =>
      t.id === id ? { ...t, estado: 'confirmado' } : t
    ));
  };

  const handleVerReceta = (url) => {
    setRecetaUrl(url);
    setShowReceta(true);
  };
  const handleCerrarReceta = () => {
    setShowReceta(false);
    setRecetaUrl(null);
  };

  return (
    <div style={{ padding: 24, marginTop: 80 }}>
      <h1>Administración de Turnos</h1>
      <Tabs defaultActiveKey="todos" id="turnos-tabs" className="mb-3">
        <Tab eventKey="todos" title="Todos los turnos">
          <table className="table">
            <thead>
              <tr>
                <th>Numero de Turno</th>
                <th>Paciente</th>
                <th>Tipo de Analisis</th>
                <th>Centro de Atencion</th>
                <th>Fecha y Hora Reserva</th>
                <th>Fecha y Hora Extraccion</th>
                <th>Estado</th>
                <th>Observación</th>
                <th>Recibe Mail</th>
                <th>Receta</th>
              </tr>
            </thead>
            <tbody>
              {turnos.map((turno) => (
                <tr key={turno.id}>
                  <td>{turno.id}</td>
                  <td>{turno.paciente.apellido + ", " + turno.paciente.nombre}</td>
                  <td>{turno.tipoAnalisis.nombre}</td>
                  <td>{turno.centroAtencion.nombre}</td>
                  <td>{new Date(turno.fechaHoraReserva).toLocaleString()}</td>
                  <td>{new Date(turno.fechaHoraExtraccion).toLocaleString()}</td>
                  <td>{turno.estado}</td>
                  <td>{turno.observacion === "" ? "-" : turno.observacion}</td>
                  <td>{turno.recibeMail ? "Si" : "No"}</td>
                  <td>
                    <button className="login-btn" style={{background:'#007bff',color:'white'}} onClick={() => handleVerReceta(turno.receta)}>
                      Ver Receta
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="confirmar" title="Confirmar Turnos">
          <div style={{padding: 12}}>
            <h2>Confirmar Turnos Pendientes</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Numero de Turno</th>
                  <th>Paciente</th>
                  <th>Tipo de Analisis</th>
                  <th>Centro de Atencion</th>
                  <th>Fecha y Hora Reserva</th>
                  <th>Estado</th>
                  <th>Receta</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {turnos.filter(t => t.estado === 'pendiente').length === 0 ? (
                  <tr><td colSpan={8} style={{textAlign:'center'}}>No hay turnos pendientes para confirmar.</td></tr>
                ) : (
                  turnos.filter(t => t.estado === 'pendiente').map(turno => (
                    <tr key={turno.id}>
                      <td>{turno.id}</td>
                      <td>{turno.paciente.apellido + ", " + turno.paciente.nombre}</td>
                      <td>{turno.tipoAnalisis.nombre}</td>
                      <td>{turno.centroAtencion.nombre}</td>
                      <td>{new Date(turno.fechaHoraReserva).toLocaleString()}</td>
                      <td>{turno.estado}</td>
                      <td>
                        <button className="login-btn" style={{background:'#007bff',color:'white'}} onClick={() => handleVerReceta(turno.receta)}>
                          Ver Receta
                        </button>
                      </td>
                      <td>
                        <button className="login-btn" style={{background:'green',color:'white'}} onClick={() => confirmarTurno(turno.id)}>
                          Confirmar
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Tab>
      </Tabs>
      {/* Modal para mostrar receta */}
      {showReceta && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }} onClick={handleCerrarReceta}>
          <div style={{background: 'white', padding: 24, borderRadius: 8, maxWidth: 500}} onClick={e => e.stopPropagation()}>
            <h3>Receta Adjunta</h3>
            <img src={recetaUrl} alt="Receta" style={{maxWidth: '100%', maxHeight: 400, marginBottom: 16}} />
            <button className="login-btn" onClick={handleCerrarReceta}>Cerrar</button>
          </div>
        </div>
      )}
      <div style={{marginTop: 40}}>
        <h2>Filtrar turnos (demo, sin funcionalidad)</h2>
        <form className="login-formReg" onSubmit={e => e.preventDefault()} noValidate>
          <div id="fechaNac" className="form-group">
            <label htmlFor="date">Fecha de Inicio</label>
            <input type="date" id="fechaInicio" className="form-input" />
          </div>
          <div id="fechaNac" className="form-group">
            <label htmlFor="date">Fecha de Fin</label>
            <input type="date" id="fechaFin" className="form-input" />
          </div>
          <button type="submit" className="login-btn" disabled>Filtrar (no funcional)</button>
        </form>
      </div>
    </div>
  );
}

export default TurnoAdmin;
