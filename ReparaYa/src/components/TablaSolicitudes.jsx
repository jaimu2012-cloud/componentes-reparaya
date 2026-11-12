import React, { useMemo, useState } from 'react';
import { ESTADOS, fechaLegible } from '../data/catalogo.js';
import Icono from './Icono.jsx';
import EstadoSolicitud from './EstadoSolicitud.jsx';

export default function TablaSolicitudes({ solicitudes, usuario, navegar }) {
  const [texto, setTexto] = useState('');
  const [estado, setEstado] = useState('Todos');
  const filtradas = useMemo(() => solicitudes.filter(s => {
    const coincideTexto = [s.id, s.categoria, s.cliente, s.descripcion].some(v => String(v).toLowerCase().includes(texto.trim().toLowerCase()));
    return coincideTexto && (estado === 'Todos' || s.estado === estado);
  }).sort((a, b) => new Date(b.fecha) - new Date(a.fecha)), [solicitudes, texto, estado]);
  return <div className="contenedor pagina-contenido">
    <div className="encabezado-pagina"><div><span className="seccion-etiqueta">GESTIÓN DE CASOS</span><h1>{usuario?.rol === 'encargado' ? 'Todas las solicitudes' : 'Mis solicitudes'}</h1><p>Consulta tus reparaciones, abre los detalles y revisa su estado.</p></div><button className="boton boton-principal" onClick={() => navegar('/solicitudes/nueva')} type="button"><Icono nombre="plus" size={18}/> Nueva solicitud</button></div>
    <div className="panel-tabla"><div className="filtros"><label className="buscador"><Icono nombre="search" size={19}/><input type="search" placeholder="Buscar por código, servicio o cliente..." value={texto} onChange={e => setTexto(e.target.value)} aria-label="Buscar solicitudes"/></label><label className="filtro-estado"><span>Estado:</span><select value={estado} onChange={e => setEstado(e.target.value)} aria-label="Filtrar por estado"><option>Todos</option>{ESTADOS.map(e => <option key={e}>{e}</option>)}</select></label></div>
      <div className="tabla-scroll"><table><thead><tr><th>Código</th><th>Servicio</th><th>Cliente</th><th>Fecha</th><th>Estado</th><th>Acción</th></tr></thead><tbody>{filtradas.map(s => <tr key={s.id}><td><strong className="codigo-tabla">{s.id}</strong></td><td>{s.categoria}</td><td>{s.cliente}</td><td>{fechaLegible(s.fecha)}</td><td><EstadoSolicitud estado={s.estado}/></td><td><button className="boton-tabla" type="button" onClick={() => navegar(`/solicitudes/${s.id}`)}>Ver detalle <Icono nombre="arrow" size={15}/></button></td></tr>)}</tbody></table>
      {filtradas.length === 0 && <div className="sin-resultados"><Icono nombre="search" size={35}/><h3>No se encontraron solicitudes</h3><p>{solicitudes.length ? 'Intenta con otro código, palabra o estado.' : 'Todavía no tienes solicitudes registradas.'}</p><button type="button" className="boton boton-contorno" onClick={() => navegar('/solicitudes/nueva')}>Registrar mi primera solicitud</button></div>}
      </div><div className="pie-tabla">Mostrando {filtradas.length} de {solicitudes.length} solicitudes · Datos guardados en este navegador</div>
    </div>
  </div>;
}
