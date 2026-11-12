import React from 'react';
import { fechaLegible } from '../data/catalogo.js';
import EstadoSolicitud from './EstadoSolicitud.jsx';
import Icono from './Icono.jsx';

export default function PanelPrincipal({ usuario, solicitudes, navegar }) {
  const datos = [
    { titulo: 'Total solicitudes', valor: solicitudes.length, icono: 'clipboard', clase: 'metrica-azul' },
    { titulo: 'Pendientes', valor: solicitudes.filter(s => s.estado === 'Pendiente').length, icono: 'clock', clase: 'metrica-amarillo' },
    { titulo: 'En proceso', valor: solicitudes.filter(s => ['Asignada', 'En proceso'].includes(s.estado)).length, icono: 'tool', clase: 'metrica-lila' },
    { titulo: 'Finalizadas', valor: solicitudes.filter(s => s.estado === 'Finalizada').length, icono: 'circleCheck', clase: 'metrica-verde' },
  ];
  const recientes = [...solicitudes].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 4);
  return <div className="contenedor pagina-contenido"><div className="panel-bienvenida"><div><span className="seccion-etiqueta">MI ESPACIO REPARAYA</span><h1>Hola, {usuario.nombre.split(' ')[0]} <span aria-hidden="true">👋</span></h1><p>{usuario.rol === 'encargado' ? 'Aquí tienes el resumen de todas las reparaciones y los casos que requieren atención.' : 'Aquí puedes ver un resumen de tus solicitudes y sus avances.'}</p></div><div className="rol-etiqueta"><Icono nombre={usuario.rol === 'encargado' ? 'shield' : 'user'} size={18}/>{usuario.rol === 'encargado' ? 'Vista de encargado' : 'Vista de cliente'}</div></div>
    <div className="grid-metricas">{datos.map(d => <div className="metrica" key={d.titulo}><div className={`metrica-icono ${d.clase}`}><Icono nombre={d.icono} size={23}/></div><small>{d.titulo}</small><strong>{d.valor}</strong></div>)}</div>
    <div className="panel-dos-columnas"><section className="caja"><div className="caja-cabecera"><div><h2>Solicitudes recientes</h2><p>Últimos casos registrados</p></div><button type="button" className="link-flecha" onClick={() => navegar('/solicitudes')}>Ver todas <Icono nombre="arrow" size={17}/></button></div><div className="lista-recientes">{recientes.map(s => <button className="reciente-item" key={s.id} type="button" onClick={() => navegar(`/solicitudes/${s.id}`)}><span className="reciente-icono"><Icono nombre="tool" size={21}/></span><span className="reciente-descrip"><strong>{s.categoria} <span>{s.id}</span></strong><small>{fechaLegible(s.fecha)} · {s.cliente}</small></span><EstadoSolicitud estado={s.estado}/></button>)}{!recientes.length && <p className="texto-atenuado vacio-lista">Aún no tienes solicitudes.</p>}</div></section><aside className="caja"><div className="caja-cabecera"><div><h2>Acciones rápidas</h2><p>Lo que puedes hacer ahora</p></div></div><div className="acciones-rapidas"><button type="button" onClick={() => navegar('/solicitudes/nueva')}><span><Icono nombre="plus" size={21}/></span><div><strong>Nueva solicitud</strong><small>Reporta una reparación</small></div><Icono nombre="arrow" size={17}/></button><button type="button" onClick={() => navegar('/seguimiento')}><span><Icono nombre="clock" size={21}/></span><div><strong>Consultar seguimiento</strong><small>Conoce el estado de tu caso</small></div><Icono nombre="arrow" size={17}/></button><button type="button" onClick={() => navegar('/contacto')}><span><Icono nombre="mail" size={21}/></span><div><strong>Contactar soporte</strong><small>Déjanos tu mensaje</small></div><Icono nombre="arrow" size={17}/></button></div></aside></div>
  </div>;
}
