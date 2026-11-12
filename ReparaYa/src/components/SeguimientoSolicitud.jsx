import React, { useState } from 'react';
import { ESTADOS, fechaHoraLegible } from '../data/catalogo.js';
import EstadoSolicitud from './EstadoSolicitud.jsx';
import Icono from './Icono.jsx';
import MensajeAlerta from './MensajeAlerta.jsx';

export default function SeguimientoSolicitud({ solicitudes, navegar }) {
  const [codigo, setCodigo] = useState('');
  const [buscado, setBuscado] = useState(false);
  const solicitud = buscado ? solicitudes.find(s => s.id.toUpperCase() === codigo.trim().toUpperCase()) : null;
  const pasoActual = solicitud ? Math.max(0, ESTADOS.indexOf(solicitud.estado)) : 0;
  return <div className="contenedor pagina-contenido">
    <div className="titulo-interior centro"><span className="seccion-etiqueta">SEGUIMIENTO DE CASOS</span><h1>¿Cómo va tu reparación?</h1><p>Ingresa el código asignado a tu solicitud para conocer su progreso.</p></div>
    <div className="seguimiento-buscador"><form onSubmit={e => { e.preventDefault(); setBuscado(true); }}><label htmlFor="codigo-seguimiento">Código de solicitud</label><div className="input-accion"><Icono nombre="search" size={20}/><input id="codigo-seguimiento" value={codigo} onChange={e => { setCodigo(e.target.value); setBuscado(false); }} placeholder="Código de solicitud" required/><button type="submit" className="boton boton-principal">Consultar estado</button></div></form><p><Icono nombre="info" size={15}/> Solo puedes consultar las solicitudes asociadas a tu cuenta.</p></div>
    {buscado && !solicitud && <div className="resultado-consulta"><MensajeAlerta tipo="error" titulo="No encontramos ese código">Verifica el número o comprueba que la solicitud pertenece a tu usuario.</MensajeAlerta></div>}
    {solicitud && <div className="resultado-consulta"><div className="seguimiento-tarjeta"><div className="seguimiento-tarjeta-cab"><div><span className="seccion-etiqueta">SOLICITUD LOCALIZADA</span><h2>{solicitud.id}</h2><p>{solicitud.categoria} · Creada el {fechaHoraLegible(solicitud.fecha)}</p></div><EstadoSolicitud estado={solicitud.estado}/></div><div className="pasos-progreso">{ESTADOS.map((e, i) => <div className={`progreso-item ${i < pasoActual ? 'completado' : i === pasoActual ? 'actual' : ''}`} key={e}><div className="progreso-icono">{i < pasoActual ? <Icono nombre="check" size={18}/> : <span>{i + 1}</span>}</div><strong>{e}</strong></div>)}</div><div className="progreso-ultimo"><Icono nombre="clock" size={20}/><div><small>ÚLTIMO MOVIMIENTO</small><strong>{fechaHoraLegible(solicitud.historial[solicitud.historial.length - 1]?.fecha)}</strong><p>{solicitud.historial[solicitud.historial.length - 1]?.nota || 'Sin novedades adicionales.'}</p></div></div><button type="button" className="boton boton-contorno" onClick={() => navegar(`/solicitudes/${solicitud.id}`)}>Ver detalle completo <Icono nombre="arrow" size={17}/></button></div></div>}
    {!buscado && <div className="seguimiento-ayuda"><div className="icono-grande"><Icono nombre="clock" size={32}/></div><h3>Estamos aquí para mantenerte informado</h3><p>Tu reparación pasa por cuatro etapas: Pendiente, Asignada, En proceso y Finalizada. Cada cambio quedará reflejado en el seguimiento.</p></div>}
  </div>;
}
