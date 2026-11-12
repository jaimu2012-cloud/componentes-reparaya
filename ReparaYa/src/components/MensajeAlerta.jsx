import React from 'react';
import Icono from './Icono.jsx';
export default function MensajeAlerta({ tipo = 'exito', titulo, children, onCerrar }) {
  return <div className={`mensaje mensaje-${tipo}`} role={tipo === 'error' ? 'alert' : 'status'}>
    <Icono nombre={tipo === 'error' ? 'alert' : tipo === 'info' ? 'info' : 'circleCheck'} size={20} />
    <div><strong>{titulo || (tipo === 'error' ? 'Revisa los datos' : 'Operación realizada')}</strong>{children && <p>{children}</p>}</div>
    {onCerrar && <button type="button" className="mensaje-cerrar" onClick={onCerrar} aria-label="Cerrar mensaje">×</button>}
  </div>;
}
