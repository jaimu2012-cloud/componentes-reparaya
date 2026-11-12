import React from 'react';
import Icono from './Icono.jsx';
export default function TarjetaServicio({ servicio, onElegir }) {
  return <article className="tarjeta-servicio">
    <div className={`icono-servicio ${servicio.clase}`}><Icono nombre={servicio.icono} size={28}/></div>
    <h3>{servicio.titulo}</h3>
    <p>{servicio.descripcion}</p>
    <div className="servicio-pie"><span>{servicio.especialidades}</span><button onClick={() => onElegir(servicio.categoria)} type="button" title={`Solicitar ${servicio.titulo}`} aria-label={`Solicitar ${servicio.titulo}`}><Icono nombre="arrow" size={19}/></button></div>
  </article>;
}
