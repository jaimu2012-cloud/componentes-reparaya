import React, { useState, useEffect } from 'react';
import Icono from './Icono.jsx';

const enlaces = [
  ['#/inicio', 'Inicio'],
  ['#/servicios', 'Servicios'],
  ['#/solicitudes/nueva', 'Solicitar reparación'],
  ['#/solicitudes', 'Solicitudes'],
  ['#/seguimiento', 'Seguimiento'],
  ['#/contacto', 'Contacto'],
];

export default function Encabezado({ ruta, usuario, alSalir, navegar }) {
  const [abierto, setAbierto] = useState(false);
  useEffect(() => setAbierto(false), [ruta]);
  return <header className="encabezado">
    <div className="contenedor encabezado-interior">
      <a className="marca" href="#/inicio" onClick={() => setAbierto(false)} aria-label="ReparaYa, ir al inicio">
        <span className="marca-simbolo"><Icono nombre="tool" size={21} /></span>
        <span>Repara<span className="marca-destacada">Ya</span><small>Tu solución, más cerca</small></span>
      </a>
      <button className="menu-movil" aria-expanded={abierto} aria-controls="navegacion" aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setAbierto(!abierto)}>
        <Icono nombre={abierto ? 'close' : 'menu'} size={24} />
      </button>
      <nav id="navegacion" className={`navegacion ${abierto ? 'navegacion-abierta' : ''}`} aria-label="Navegación principal">
        {enlaces.map(([href, texto]) => <a key={href} href={href} className={ruta === href.slice(1) ? 'enlace-activo' : ''} onClick={() => setAbierto(false)}>{texto}</a>)}
        {usuario ? <div className="sesion-bloque">
          <button className="sesion-perfil" type="button" onClick={() => navegar('/panel')} title="Abrir panel"><Icono nombre="user" size={17}/><span>{usuario.nombre.split(' ')[0]}</span></button>
          <button className="cerrar-sesion" type="button" onClick={alSalir} title="Cerrar sesión" aria-label="Cerrar sesión"><Icono nombre="logout" size={18}/></button>
        </div> : <a href="#/ingresar" className="boton boton-pequeno boton-oscuro enlace-sesion"><Icono nombre="user" size={17}/> Ingresar</a>}
      </nav>
    </div>
  </header>;
}
