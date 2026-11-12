import React, { useState } from 'react';
import Icono from './Icono.jsx';
import MensajeAlerta from './MensajeAlerta.jsx';

export default function InicioSesion({ onIngreso, navegar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const enviar = async (evento) => {
    evento.preventDefault();
    setCargando(true); setError('');
    try { const res = await onIngreso(email.trim().toLowerCase(), password); if (!res.ok) setError(res.mensaje); }
    finally { setCargando(false); }
  };
  return <div className="pagina-formulario contenedor estrecho">
    <div className="titulo-interior centro"><span className="seccion-etiqueta">ACCEDE A TU ESPACIO</span><h1>Qué bueno verte de nuevo</h1><p>Ingresa para registrar solicitudes y consultar sus estados.</p></div>
    <div className="panel-formulario"><div className="form-icono"><Icono nombre="user" size={27}/></div><h2>Iniciar sesión</h2><p className="subtitulo-formulario">Escribe el correo y la contraseña de tu cuenta.</p>
      <form onSubmit={enviar}>
        <div className="campo"><label htmlFor="login-email">Correo electrónico</label><input id="login-email" autoComplete="email" type="email" value={email} onChange={e => { setEmail(e.target.value); setError(''); }} placeholder="Correo electrónico" required /></div>
        <div className="campo"><label htmlFor="login-pass">Contraseña</label><input id="login-pass" autoComplete="current-password" type="password" minLength="8" value={password} onChange={e => { setPassword(e.target.value); setError(''); }} placeholder="Contraseña" required /></div>
        {error && <MensajeAlerta tipo="error" titulo="No fue posible ingresar">{error}</MensajeAlerta>}
        <button disabled={cargando} type="submit" className="boton boton-principal boton-ancho">{cargando ? 'Ingresando…' : 'Ingresar'} <Icono nombre="arrow" size={18}/></button>
      </form>
      <p className="alternativa-formulario">¿Todavía no tienes una cuenta? <button className="enlace-texto" type="button" onClick={() => navegar('/registro')}>Crear cuenta</button></p>
    </div>
  </div>;
}
