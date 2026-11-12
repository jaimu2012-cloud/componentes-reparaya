export const ESTADOS = ['Pendiente', 'Asignada', 'En proceso', 'Finalizada'];

export const SERVICIOS = [
  { id: 'hogar', titulo: 'Reparaciones del hogar', categoria: 'Plomería', icono: 'home', clase: 'salmon', descripcion: 'Soluciones para fugas, grifería, puertas y arreglos cotidianos.', especialidades: 'Plomería · Ajustes · Instalaciones' },
  { id: 'tecnologia', titulo: 'Tecnología y equipos', categoria: 'Tecnología', icono: 'monitor', clase: 'lila', descripcion: 'Diagnóstico de computadores, portátiles y equipos electrónicos.', especialidades: 'Computadores · Portátiles · Periféricos' },
  { id: 'electricidad', titulo: 'Servicios eléctricos', categoria: 'Electricidad', icono: 'zap', clase: 'amarillo', descripcion: 'Atención de tomacorrientes, iluminación y conexiones.', especialidades: 'Iluminación · Tomas · Revisión' },
  { id: 'mantenimiento', titulo: 'Mantenimiento general', categoria: 'Mantenimiento', icono: 'tool', clase: 'verde', descripcion: 'Revisiones preventivas, pintura y mantenimiento de espacios.', especialidades: 'Prevención · Pintura · Ajustes' },
];

export function fechaLegible(fecha) {
  if (!fecha) return 'Sin fecha';
  const valor = new Date(fecha);
  if (Number.isNaN(valor.getTime())) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }).format(valor);
}

export function fechaHoraLegible(fecha) {
  if (!fecha) return 'Sin fecha';
  const valor = new Date(fecha);
  if (Number.isNaN(valor.getTime())) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short' }).format(valor);
}
