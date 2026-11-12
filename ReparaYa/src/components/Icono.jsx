import React from 'react';

/** Iconos SVG propios para evitar dependencias visuales y funcionar sin CDN. */
export default function Icono({ nombre = 'tool', size = 22, className = '' }) {
  const comunes = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const trazos = {
    tool: <><path d="M14.6 6a6 6 0 0 0-7.8 7.8L2.7 18a2.3 2.3 0 0 0 3.3 3.3l4.2-4.1A6 6 0 0 0 18 9.4l-4.2 4.1-3.3-3.3L14.6 6Z" /></>,
    home: <><path d="m3 11 9-7 9 7v9H3v-9Z" /><path d="M9 20v-7h6v7" /></>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4" /></>,
    zap: <><path d="m13 2-9 12h7l-1 8 10-13h-7l0-7Z" /></>,
    arrow: <><path d="M4 12h16m-6-6 6 6-6 6" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    check: <><path d="m5 12 4 4L19 6" /></>,
    clipboard: <><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4.5V3h6v1.5M9 11h6m-6 4h6" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    users: <><circle cx="9" cy="8" r="3" /><path d="M3 20v-2a6 6 0 0 1 12 0v2H3ZM16 6a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 4" /></>,
    chart: <><path d="M4 20V10m6 10V5m6 15v-8m4 8H2" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.3 15.3 5 5" /></>,
    pin: <><path d="M12 22s7-6 7-12A7 7 0 0 0 5 10c0 6 7 12 7 12Z" /><circle cx="12" cy="10" r="2" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    phone: <><path d="M5 3h4l2 5-2 2c1 2 3 4 5 5l2-2 5 2v4c0 1-1 2-2 2C10 21 3 14 3 5c0-1 1-2 2-2Z" /></>,
    shield: <><path d="m12 2 9 4v6c0 5-4 8-9 10-5-2-9-5-9-10V6l9-4Z" /><path d="m8 12 3 3 5-6" /></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M5 5l14 14M19 5 5 19" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
    logout: <><path d="M10 4H5v16h5m4-4 4-4-4-4m-7 4h11" /></>,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6m0-10v.2" /></>,
    circleCheck: <><circle cx="12" cy="12" r="9" /><path d="m7 12 3 3 7-7" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></>,
    alert: <><path d="m12 3 10 18H2L12 3Z" /><path d="M12 9v5m0 4v.1" /></>,
    edit: <><path d="M4 20h4l12-12-4-4L4 16v4Zm10-14 4 4" /></>,
  };
  return <svg aria-hidden="true" focusable="false" width={size} height={size} viewBox="0 0 24 24" {...comunes} className={className}>{trazos[nombre] || trazos.tool}</svg>;
}
