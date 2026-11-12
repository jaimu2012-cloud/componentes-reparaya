import React, { useState } from 'react';
import Icono from './Icono.jsx';
import MensajeAlerta from './MensajeAlerta.jsx';

const CATEGORIAS = ['Plomería', 'Tecnología', 'Electricidad', 'Mantenimiento', 'Pintura', 'Otro'];
export default function FormularioSolicitud({ usuario, categoriaInicial, onRegistrar, navegar }) {
  const [datos, setDatos] = useState({ cliente: usuario?.nombre || '', email: usuario?.email || '', telefono: usuario?.telefono || '', direccion: '', categoria: categoriaInicial || '', descripcion: '' });
  const [errores, setErrores] = useState({});
  const cambiar = ({ target: { name, value } }) => { setDatos(actual => ({ ...actual, [name]: value })); setErrores(actual => ({ ...actual, [name]: '' })); };
  const enviar = (e) => {
    e.preventDefault();
    const err = {};
    if (datos.cliente.trim().length < 3) err.cliente = 'Indica el nombre de contacto.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) err.email = 'Indica un correo válido.';
    if (datos.telefono.replace(/\D/g, '').length < 7) err.telefono = 'Indica un teléfono válido.';
    if (datos.direccion.trim().length < 6) err.direccion = 'Escribe la dirección completa.';
    if (!CATEGORIAS.includes(datos.categoria)) err.categoria = 'Selecciona una categoría.';
    if (datos.descripcion.trim().length < 15) err.descripcion = 'Describe el problema en al menos 15 caracteres.';
    setErrores(err);
    if (!Object.keys(err).length) onRegistrar(datos);
  };
  return <div className="contenedor pagina-contenido formulario-solicitud">
    <div className="miga"><button onClick={() => navegar('/inicio')} type="button">Inicio</button><span>/</span><span>Nueva solicitud</span></div>
    <div className="titulo-interior"><span className="seccion-etiqueta">NUEVA REPARACIÓN</span><h1>Cuéntanos qué necesitas reparar</h1><p>Completa el formulario y recibirás un código para hacer seguimiento a tu caso.</p></div>
    <div className="columnas-formulario"><div className="panel-formulario"><div className="seccion-form-cabecera"><span className="paso-tag">01</span><div><h2>Datos de la solicitud</h2><p>Los campos marcados con * son obligatorios.</p></div></div>
      <form onSubmit={enviar} noValidate>
        <div className="dos-campos">
          <div className="campo"><label htmlFor="sol-cliente">Nombre completo *</label><input id="sol-cliente" name="cliente" value={datos.cliente} onChange={cambiar} aria-invalid={!!errores.cliente}/>{errores.cliente && <small className="campo-error">{errores.cliente}</small>}</div>
          <div className="campo"><label htmlFor="sol-telefono">Teléfono *</label><input id="sol-telefono" name="telefono" type="tel" value={datos.telefono} onChange={cambiar} aria-invalid={!!errores.telefono}/>{errores.telefono && <small className="campo-error">{errores.telefono}</small>}</div>
        </div>
        <div className="campo"><label htmlFor="sol-email">Correo electrónico *</label><input id="sol-email" name="email" type="email" value={datos.email} onChange={cambiar} aria-invalid={!!errores.email}/>{errores.email && <small className="campo-error">{errores.email}</small>}</div>
        <div className="campo"><label htmlFor="sol-direccion">Dirección del servicio *</label><input id="sol-direccion" name="direccion" placeholder="Dirección completa del servicio" value={datos.direccion} onChange={cambiar} aria-invalid={!!errores.direccion}/>{errores.direccion && <small className="campo-error">{errores.direccion}</small>}</div>
        <div className="campo"><label htmlFor="sol-categoria">Tipo de reparación *</label><select id="sol-categoria" name="categoria" value={datos.categoria} onChange={cambiar} aria-invalid={!!errores.categoria}><option value="">Selecciona un servicio</option>{CATEGORIAS.map(x => <option key={x} value={x}>{x}</option>)}</select>{errores.categoria && <small className="campo-error">{errores.categoria}</small>}</div>
        <div className="campo"><label htmlFor="sol-descripcion">Descripción del problema *</label><textarea id="sol-descripcion" name="descripcion" rows="5" value={datos.descripcion} onChange={cambiar} placeholder="Explícanos qué ocurrió, desde cuándo sucede y qué necesitas reparar." aria-invalid={!!errores.descripcion}/><div className="fila-ayuda"><small className="campo-error">{errores.descripcion || ''}</small><small>{datos.descripcion.trim().length} caracteres</small></div></div>
        <button className="boton boton-principal boton-ancho" type="submit"><Icono nombre="plus" size={19}/> Registrar solicitud</button>
      </form>
    </div>
    <aside className="sidebar-ayuda"><div className="ayuda-tarjeta"><span className="ayuda-icono"><Icono nombre="clipboard" size={23}/></span><h3>¿Qué sigue después?</h3><div className="ayuda-paso"><span>1</span><div><strong>Recibirás un código</strong><p>Guarda el código que recibirás al registrar el caso.</p></div></div><div className="ayuda-paso"><span>2</span><div><strong>Tu solicitud quedará pendiente</strong><p>El encargado podrá revisarla.</p></div></div><div className="ayuda-paso"><span>3</span><div><strong>Consulta su avance</strong><p>Verás los cambios y observaciones.</p></div></div></div><MensajeAlerta tipo="info" titulo="Práctica académica">Los datos se almacenan solamente en este navegador. No se envían a ningún servidor.</MensajeAlerta></aside>
    </div>
  </div>;
}
