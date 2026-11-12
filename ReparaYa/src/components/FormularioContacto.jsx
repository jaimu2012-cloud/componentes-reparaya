import React, { useState } from 'react';
import Icono from './Icono.jsx';
import MensajeAlerta from './MensajeAlerta.jsx';

export default function FormularioContacto({ usuario, onEnviar }) {
  const [datos, setDatos] = useState({ nombre: usuario?.nombre || '', email: usuario?.email || '', asunto: '', mensaje: '' });
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const cambiar = ({ target: { name, value } }) => { setDatos(actual => ({ ...actual, [name]: value })); setErrores(actual => ({ ...actual, [name]: '' })); setEnviado(false); };
  const enviar = (e) => { e.preventDefault(); const err = {};
    if (datos.nombre.trim().length < 3) err.nombre = 'Escribe tu nombre.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) err.email = 'Ingresa un correo válido.';
    if (datos.asunto.trim().length < 4) err.asunto = 'Escribe el asunto.';
    if (datos.mensaje.trim().length < 10) err.mensaje = 'Explica tu consulta en al menos 10 caracteres.';
    setErrores(err); if (Object.keys(err).length) return;
    onEnviar(datos); setEnviado(true); setDatos({ nombre: usuario?.nombre || '', email: usuario?.email || '', asunto: '', mensaje: '' });
  };
  return <div className="contenedor pagina-contenido"><div className="titulo-interior centro"><span className="seccion-etiqueta">HABLEMOS</span><h1>Estamos aquí para escucharte</h1><p>¿Tienes preguntas sobre ReparaYa? Escríbenos desde este formulario.</p></div>
    <div className="contacto-grid"><div className="contacto-info"><span className="etiqueta etiqueta-clara">A UN MENSAJE DE DISTANCIA</span><h2>¿En qué podemos ayudarte?</h2><p>Cuéntanos tu inquietud y observa cómo la aplicación valida y registra un mensaje.</p><div className="contacto-item"><span><Icono nombre="mail"/></span><div><strong>Formulario de contacto</strong><small>La información no sale del navegador</small></div></div><div className="contacto-item"><span><Icono nombre="clock"/></span><div><strong>Confirmación inmediata</strong><small>Confirmación visual al registrar el mensaje</small></div></div><div className="contacto-ilustracion"><Icono nombre="mail" size={80}/></div></div><div className="panel-formulario"><h2>Envíanos un mensaje</h2><p className="subtitulo-formulario">Todos los campos son obligatorios.</p>
      {enviado && <MensajeAlerta tipo="exito" titulo="¡Mensaje guardado en este navegador!">El mensaje quedó guardado en este navegador. No se envió un correo.</MensajeAlerta>}
      <form onSubmit={enviar} noValidate><div className="dos-campos"><div className="campo"><label htmlFor="con-nombre">Nombre completo *</label><input id="con-nombre" name="nombre" value={datos.nombre} onChange={cambiar} placeholder="Tu nombre" aria-invalid={!!errores.nombre}/>{errores.nombre && <small className="campo-error">{errores.nombre}</small>}</div><div className="campo"><label htmlFor="con-email">Correo electrónico *</label><input id="con-email" name="email" type="email" value={datos.email} onChange={cambiar} placeholder="Correo electrónico" aria-invalid={!!errores.email}/>{errores.email && <small className="campo-error">{errores.email}</small>}</div></div><div className="campo"><label htmlFor="con-asunto">Asunto *</label><input id="con-asunto" name="asunto" value={datos.asunto} onChange={cambiar} placeholder="¿Sobre qué deseas hablar?" aria-invalid={!!errores.asunto}/>{errores.asunto && <small className="campo-error">{errores.asunto}</small>}</div><div className="campo"><label htmlFor="con-mensaje">Tu mensaje *</label><textarea id="con-mensaje" name="mensaje" rows="6" value={datos.mensaje} onChange={cambiar} placeholder="Escribe aquí tu consulta..." aria-invalid={!!errores.mensaje}/>{errores.mensaje && <small className="campo-error">{errores.mensaje}</small>}</div><button type="submit" className="boton boton-principal boton-ancho">Registrar mensaje <Icono nombre="arrow" size={19}/></button></form></div></div>
  </div>;
}
