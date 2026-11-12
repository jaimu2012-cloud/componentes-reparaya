import React from 'react';
export default function EstadoSolicitud({ estado }) {
  const mapa = { Pendiente: 'pendiente', Asignada: 'asignada', 'En proceso': 'proceso', Finalizada: 'finalizada' };
  return <span className={`badge-estado badge-${mapa[estado] || 'pendiente'}`}><span className="badge-punto" />{estado || 'Pendiente'}</span>;
}
