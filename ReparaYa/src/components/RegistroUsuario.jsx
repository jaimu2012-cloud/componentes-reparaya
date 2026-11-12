import React, { useState } from 'react';
import Icono from './Icono.jsx';
import MensajeAlerta from './MensajeAlerta.jsx';

const INICIAL = { nombre: '', email: '', telefono: '', password: '', rol: 'cliente' };
export default function RegistroUsuario({ onRegistro, navegar }) {
  const [datos, setDatos] = useState(INICIAL);
  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');
  const [cargando, setCargando] = useState(false);
  const cambiar = (evento) => { const { name, value } = evento.target; setDatos(anterior => ({ ...anterior, [name]: value })); setErrores(anterior => ({ ...anterior, [name]: '' })); setErrorGeneral(''); };
  const enviar = async (evento) => {
    evento.preventDefault();
    const nuevos = {};
    if (datos.nombre.trim().length < 3) nuevos.nombre = 'Escribe tu nombre completo (mínimo 3 caracteres).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) nuevos.email = 'Escribe un correo electrónico válido.';
    if (datos.telefono.replace(/\D/g, '').length < 7) nuevos.telefono = 'Ingresa un teléfono válido (mínimo 7 dígitos).';
    if (datos.password.length < 8) nuevos.password = 'La contraseña debe tener al menos 8 caracteres.';
    if (!['cliente', 'encargado'].includes(datos.rol)) nuevos.rol = 'Selecciona un rol válido.';
    setErrores(nuevos);
    if (Object.keys(nuevos).length) return;
    setCargando(true);
    try { const resultado = await onRegistro({ ...datos, nombre: datos.nombre.trim(), email: datos.email.trim().toLowerCase(), telefono: datos.telefono.trim() }); if (!resultado.ok) setErrorGeneral(resultado.mensaje); }
    finally { setCargando(false); }
  };
  return <div className="pagina-formulario contenedor estrecho">
    <div className="titulo-interior centro"><span className="seccion-etiqueta">BIENVENIDO A REPARAYA</span><h1>Crea tu cuenta</h1><p>Completa tus datos y comienza a gestionar tus reparaciones.</p></div>
    <div className="panel-formulario"><div className="form-icono"><Icono nombre="user" size={28}/></div><h2>Regístrate</h2><p className="subtitulo-formulario">Los datos se guardan en este navegador, sin servidor.</p>
      <form onSubmit={enviar} noValidate>
        <div className="campo"><label htmlFor="reg-nombre">Nombre completo <span>*</span></label><input id="reg-nombre" name="nombre" autoComplete="name" value={datos.nombre} onChange={cambiar} placeholder="Nombre y apellido" aria-invalid={!!errores.nombre}/>{errores.nombre && <small className="campo-error">{errores.nombre}</small>}</div>
        <div className="campo"><label htmlFor="reg-email">Correo electrónico <span>*</span></label><input id="reg-email" name="email" type="email" autoComplete="email" value={datos.email} onChange={cambiar} placeholder="Correo electrónico" aria-invalid={!!errores.email}/>{errores.email && <small className="campo-error">{errores.email}</small>}</div>
        <div className="campo"><label htmlFor="reg-telefono">Teléfono <span>*</span></label><input id="reg-telefono" name="telefono" autoComplete="tel" value={datos.telefono} onChange={cambiar} placeholder="Número de contacto" aria-invalid={!!errores.telefono}/>{errores.telefono && <small className="campo-error">{errores.telefono}</small>}</div>
        <div className="campo"><label htmlFor="reg-password">Contraseña <span>*</span></label><input id="reg-password" name="password" type="password" autoComplete="new-password" value={datos.password} onChange={cambiar} placeholder="Mínimo 8 caracteres" aria-invalid={!!errores.password}/>{errores.password && <small className="campo-error">{errores.password}</small>}</div>
        <div className="campo"><label htmlFor="reg-rol">Tipo de usuario <span>*</span></label><select id="reg-rol" name="rol" value={datos.rol} onChange={cambiar}><option value="cliente">Cliente</option><option value="encargado">Encargado</option></select>{errores.rol && <small className="campo-error">{errores.rol}</small>}</div>
        {errorGeneral && <MensajeAlerta tipo="error">{errorGeneral}</MensajeAlerta>}
        <button disabled={cargando} className="boton boton-principal boton-ancho" type="submit">{cargando ? 'Registrando…' : 'Crear cuenta'} <Icono nombre="arrow" size={18}/></button>
      </form>
      <p className="alternativa-formulario">¿Ya tienes cuenta? <button className="enlace-texto" onClick={() => navegar('/ingresar')} type="button">Iniciar sesión</button></p>
    </div>
  </div>;
}
