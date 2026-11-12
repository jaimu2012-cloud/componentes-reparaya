import React, { useState } from 'react';
import EstadoSolicitud from './EstadoSolicitud.jsx';
import Icono from './Icono.jsx';
import MensajeAlerta from './MensajeAlerta.jsx';
import { ESTADOS, fechaHoraLegible } from '../data/catalogo.js';

export default function DetalleSolicitud({ solicitud, usuario, onActualizar, navegar }) {
  const [tecnico, setTecnico] = useState(solicitud.tecnico || '');
  const [estado, setEstado] = useState(solicitud.estado);
  const [observacion, setObservacion] = useState('');
  const [mensaje, setMensaje] = useState('');
  const esEncargado = usuario?.rol === 'encargado';
  const actualizar = (evento) => {
    evento.preventDefault();
    if (!esEncargado) return;
    if (['Asignada', 'En proceso', 'Finalizada'].includes(estado) && tecnico.trim().length < 3) { setMensaje('Para este estado debes indicar un técnico responsable.'); return; }
    if (!observacion.trim() && estado === solicitud.estado && tecnico.trim() === (solicitud.tecnico || '')) { setMensaje('Realiza un cambio o agrega una observación antes de guardar.'); return; }
    onActualizar(solicitud.id, { estado, tecnico: tecnico.trim(), observacion: observacion.trim() });
    setObservacion(''); setMensaje('');
  };
  return <div className="contenedor pagina-contenido">
    <div className="miga"><button onClick={() => navegar('/solicitudes')} type="button">Solicitudes</button><span>/</span><span>{solicitud.id}</span></div>
    <div className="encabezado-pagina detalle-encabezado"><div><span className="seccion-etiqueta">DETALLE DE LA REPARACIÓN</span><h1>Solicitud {solicitud.id}</h1><p>Registrada el {fechaHoraLegible(solicitud.fecha)}</p></div><EstadoSolicitud estado={solicitud.estado}/></div>
    <div className="detalle-grid"><div className="detalle-principal"><section className="caja"><div className="caja-titulo"><Icono nombre="clipboard"/><h2>Información del servicio</h2></div><div className="detalle-datos"><div><small>Tipo de reparación</small><strong>{solicitud.categoria}</strong></div><div><small>Estado actual</small><EstadoSolicitud estado={solicitud.estado}/></div><div><small>Cliente</small><strong>{solicitud.cliente}</strong></div><div><small>Teléfono</small><strong>{solicitud.telefono}</strong></div><div><small>Correo electrónico</small><strong className="texto-rompible">{solicitud.email}</strong></div><div><small>Técnico asignado</small><strong>{solicitud.tecnico || 'Por asignar'}</strong></div></div><div className="descripcion-caso"><small>Dirección</small><p>{solicitud.direccion}</p><small>Descripción del problema</small><p>{solicitud.descripcion}</p></div></section>
      <section className="caja"><div className="caja-titulo"><Icono nombre="clock"/><h2>Historial de avances</h2></div><div className="linea-tiempo">{[...solicitud.historial].reverse().map((h, i) => <div className="evento-tiempo" key={`${h.fecha}-${i}`}><div className="punto-tiempo"/><div><div className="evento-cabecera"><strong>{h.estado}</strong><small>{fechaHoraLegible(h.fecha)}</small></div><p>{h.nota}</p></div></div>)}</div></section>
    </div><aside className="detalle-lateral">
      {esEncargado ? <section className="caja caja-gestion"><div className="caja-titulo"><Icono nombre="edit"/><h2>Gestionar solicitud</h2></div><p className="texto-atenuado">Como encargado puedes asignar un técnico y actualizar el estado del caso.</p><form onSubmit={actualizar}><div className="campo"><label htmlFor="tecnico">Técnico responsable</label><input id="tecnico" value={tecnico} onChange={e => setTecnico(e.target.value)} placeholder="Nombre del técnico" /></div><div className="campo"><label htmlFor="estado">Estado del servicio</label><select id="estado" value={estado} onChange={e => setEstado(e.target.value)}>{ESTADOS.map(x => <option key={x}>{x}</option>)}</select></div><div className="campo"><label htmlFor="observacion">Observación del avance</label><textarea id="observacion" rows="4" value={observacion} onChange={e => setObservacion(e.target.value)} placeholder="Descripción del avance realizado"/></div>{mensaje && <MensajeAlerta tipo="error">{mensaje}</MensajeAlerta>}<button className="boton boton-principal boton-ancho" type="submit">Guardar actualización <Icono nombre="check" size={17}/></button></form></section>
      : <section className="caja caja-gestion"><span className="ayuda-icono"><Icono nombre="shield"/></span><h3>Seguimiento transparente</h3><p className="texto-atenuado">Puedes consultar los avances de tu caso. La asignación de técnicos y los cambios de estado están reservados para el encargado.</p><button className="boton boton-contorno boton-ancho" onClick={() => navegar('/seguimiento')} type="button">Ir al seguimiento</button></section>}
      <div className="caja ayuda-pequena"><Icono nombre="info" size={20}/><p>Los cambios se guardan en este navegador. No hay servidor ni notificaciones externas.</p></div>
    </aside></div>
  </div>;
}
