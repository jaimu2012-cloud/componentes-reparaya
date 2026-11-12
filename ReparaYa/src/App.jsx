import React, { useEffect, useMemo, useState } from 'react';
import Encabezado from './components/Encabezado.jsx';
import Footer from './components/Footer.jsx';
import Inicio from './components/Inicio.jsx';
import TarjetaServicio from './components/TarjetaServicio.jsx';
import RegistroUsuario from './components/RegistroUsuario.jsx';
import InicioSesion from './components/InicioSesion.jsx';
import FormularioSolicitud from './components/FormularioSolicitud.jsx';
import TablaSolicitudes from './components/TablaSolicitudes.jsx';
import DetalleSolicitud from './components/DetalleSolicitud.jsx';
import SeguimientoSolicitud from './components/SeguimientoSolicitud.jsx';
import PanelPrincipal from './components/PanelPrincipal.jsx';
import FormularioContacto from './components/FormularioContacto.jsx';
import MensajeAlerta from './components/MensajeAlerta.jsx';
import Icono from './components/Icono.jsx';
import { SERVICIOS } from './data/catalogo.js';
import { crearCuenta, ingresarCuenta } from './lib/cuentas.js';
import { leerLocal, guardarLocal, borrarLocal } from './lib/storage.js';

function rutaActual() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash.startsWith('/') ? hash : '/inicio';
}

function AccesoRequerido({ navegar }) {
  return <div className="contenedor pagina-contenido estado-vacio-grande"><div className="icono-grande"><Icono nombre="shield" size={35}/></div><span className="seccion-etiqueta">ACCESO A REPARAYA</span><h1>Ingresa para continuar</h1><p>Las solicitudes y su seguimiento se muestran únicamente al usuario que inició sesión. Inicia sesión con tu cuenta o crea una nueva para comenzar.</p><div className="hero-botones"><button type="button" className="boton boton-principal" onClick={() => navegar('/ingresar')}>Iniciar sesión <Icono nombre="arrow" size={18}/></button><button type="button" className="boton boton-contorno" onClick={() => navegar('/registro')}>Crear cuenta</button></div></div>;
}

function Servicios({ navegar, solicitarServicio }) {
  return <div className="contenedor pagina-contenido"><div className="titulo-interior centro"><span className="seccion-etiqueta">NUESTROS SERVICIOS</span><h1>¿Qué necesitas solucionar hoy?</h1><p>Elige el tipo de reparación. Cada categoría cuenta con un formulario para describir tu caso.</p></div><div className="grid-servicios">{SERVICIOS.map(s => <TarjetaServicio key={s.id} servicio={s} onElegir={solicitarServicio}/>)}</div><div className="franja-consejo"><Icono nombre="info" size={22}/><p>Aplicación académica: los registros se conservan únicamente en este navegador.</p><button type="button" className="link-flecha" onClick={() => navegar('/contacto')}>Contacto <Icono nombre="arrow" size={18}/></button></div></div>;
}

export default function App() {
  const [ruta, setRuta] = useState(rutaActual);
  const [usuario, setUsuario] = useState(() => leerLocal('usuario', null));
  const [solicitudes, setSolicitudes] = useState(() => {
    const guardadas = leerLocal('solicitudes', []);
    return Array.isArray(guardadas) ? guardadas : [];
  });
  const [mensajes, setMensajes] = useState(() => leerLocal('mensajes', []));
  const [categoriaElegida, setCategoriaElegida] = useState('');
  const [aviso, setAviso] = useState(null);

  useEffect(() => {
    const cambiarRuta = () => { setRuta(rutaActual()); window.scrollTo({ top: 0, behavior: 'auto' }); };
    window.addEventListener('hashchange', cambiarRuta);
    if (!window.location.hash) window.location.hash = '#/inicio';
    return () => window.removeEventListener('hashchange', cambiarRuta);
  }, []);
  useEffect(() => { guardarLocal('usuario', usuario); }, [usuario]);
  useEffect(() => { guardarLocal('solicitudes', solicitudes); }, [solicitudes]);
  useEffect(() => { guardarLocal('mensajes', mensajes); }, [mensajes]);
  useEffect(() => {
    if (!aviso) return;
    const temporizador = window.setTimeout(() => setAviso(null), 6500);
    return () => window.clearTimeout(temporizador);
  }, [aviso]);

  const navegar = (destino) => {
    if (window.location.hash === `#${destino}`) {
      setRuta(destino);
      window.scrollTo({ top: 0, behavior: 'auto' });
    } else window.location.hash = `#${destino}`;
  };
  const elegirServicio = (categoria) => { setCategoriaElegida(categoria); navegar('/solicitudes/nueva'); };
  const abrirSesion = (datos) => { setUsuario(datos); setAviso({ tipo: 'exito', texto: `Bienvenido, ${datos.nombre}.` }); navegar('/panel'); };
  const ingresoCredenciales = async (email, password) => {
    try {
      const resultado = await ingresarCuenta(email, password);
      if (resultado.ok) abrirSesion(resultado.usuario);
      return resultado;
    } catch { return { ok: false, mensaje: 'No fue posible iniciar sesión en este navegador.' }; }
  };
  const registrarUsuario = async (datos) => {
    try {
      const resultado = await crearCuenta(datos);
      if (resultado.ok) {
        setUsuario(resultado.usuario);
        setAviso({ tipo: 'exito', texto: 'Cuenta registrada. Ya puedes crear solicitudes.' });
        navegar('/solicitudes/nueva');
      }
      return resultado;
    } catch { return { ok: false, mensaje: 'No fue posible crear la cuenta en este navegador.' }; }
  };
  const salir = () => { setUsuario(null); borrarLocal('usuario'); setAviso({ tipo: 'info', texto: 'Sesión cerrada.' }); navegar('/inicio'); };
  const registrarSolicitud = (datos) => {
    if (!usuario) return;
    const numeros = solicitudes.map(s => Number(String(s.id).replace('REP-', ''))).filter(Number.isFinite);
    const numero = Math.max(0, ...numeros) + 1;
    const id = `REP-${String(numero).padStart(3, '0')}`;
    const fecha = new Date().toISOString();
    const nueva = {
      id, cliente: datos.cliente.trim(), propietarioEmail: usuario.email, email: datos.email.trim().toLowerCase(),
      telefono: datos.telefono.trim(), direccion: datos.direccion.trim(), categoria: datos.categoria,
      descripcion: datos.descripcion.trim(), fecha, estado: 'Pendiente', tecnico: '',
      historial: [{ estado: 'Pendiente', fecha, nota: 'Solicitud registrada correctamente.' }],
    };
    setSolicitudes(anteriores => [nueva, ...anteriores]);
    setCategoriaElegida('');
    setAviso({ tipo: 'exito', texto: `¡Solicitud ${id} creada! Guárdala para consultar el seguimiento.` });
    navegar(`/solicitudes/${id}`);
  };
  const actualizarSolicitud = (id, cambio) => {
    if (usuario?.rol !== 'encargado') return;
    setSolicitudes(actuales => actuales.map(s => {
      if (s.id !== id) return s;
      const fecha = new Date().toISOString();
      const partes = [];
      if (cambio.estado !== s.estado) partes.push(`Estado: ${s.estado} → ${cambio.estado}.`);
      if (cambio.tecnico !== s.tecnico) partes.push(`Técnico asignado: ${cambio.tecnico || 'Sin asignar'}.`);
      const nota = [partes.join(' '), cambio.observacion].filter(Boolean).join(' ');
      return { ...s, estado: cambio.estado, tecnico: cambio.tecnico,
        historial: [...s.historial, { estado: cambio.estado, fecha, nota: nota || 'Actualización del caso.' }],
      };
    }));
    setAviso({ tipo: 'exito', texto: `Se actualizó la solicitud ${id} en este navegador.` });
  };
  const registrarContacto = (datos) => {
    setMensajes(actuales => [{ ...datos, id: `MSG-${Date.now()}`, fecha: new Date().toISOString() }, ...actuales]);
  };
  const visibles = useMemo(() => usuario?.rol === 'encargado'
    ? solicitudes
    : solicitudes.filter(s => usuario && (s.propietarioEmail || s.email) === usuario.email), [solicitudes, usuario]);
  const detalleId = ruta.startsWith('/solicitudes/') && ruta !== '/solicitudes/nueva' ? ruta.slice('/solicitudes/'.length) : '';
  const solicitudAbierta = visibles.find(s => s.id === detalleId);

  let contenido;
  if (ruta === '/inicio' || ruta === '/') contenido = <Inicio navegar={navegar} solicitarServicio={elegirServicio}/>;
  else if (ruta === '/servicios') contenido = <Servicios navegar={navegar} solicitarServicio={elegirServicio}/>;
  else if (ruta === '/ingresar') contenido = <InicioSesion onIngreso={ingresoCredenciales} navegar={navegar}/>;
  else if (ruta === '/registro') contenido = <RegistroUsuario onRegistro={registrarUsuario} navegar={navegar}/>;
  else if (['/solicitudes', '/solicitudes/nueva', '/seguimiento', '/panel'].includes(ruta) || detalleId) {
    if (!usuario) contenido = <AccesoRequerido navegar={navegar}/>;
    else if (ruta === '/solicitudes') contenido = <TablaSolicitudes solicitudes={visibles} usuario={usuario} navegar={navegar}/>;
    else if (ruta === '/solicitudes/nueva') contenido = <FormularioSolicitud key={`${categoriaElegida}-${usuario.email}`} usuario={usuario} categoriaInicial={categoriaElegida} onRegistrar={registrarSolicitud} navegar={navegar}/>;
    else if (ruta === '/seguimiento') contenido = <SeguimientoSolicitud solicitudes={visibles} navegar={navegar}/>;
    else if (ruta === '/panel') contenido = <PanelPrincipal usuario={usuario} solicitudes={visibles} navegar={navegar}/>;
    else contenido = solicitudAbierta ? <DetalleSolicitud key={solicitudAbierta.id} solicitud={solicitudAbierta} usuario={usuario} onActualizar={actualizarSolicitud} navegar={navegar}/> : <div className="contenedor pagina-contenido estado-vacio-grande"><div className="icono-grande"><Icono nombre="search" size={30}/></div><h1>Solicitud no disponible</h1><p>El código no existe o no pertenece a la sesión actual.</p><button type="button" className="boton boton-principal" onClick={() => navegar('/solicitudes')}>Volver a solicitudes</button></div>;
  } else if (ruta === '/contacto') contenido = <FormularioContacto usuario={usuario} onEnviar={registrarContacto}/>;
  else contenido = <div className="contenedor pagina-contenido estado-vacio-grande"><h1>Página no encontrada</h1><p>La sección que buscas no existe.</p><button type="button" className="boton boton-principal" onClick={() => navegar('/inicio')}>Volver al inicio</button></div>;

  return <div className="aplicacion"><Encabezado ruta={ruta} usuario={usuario} alSalir={salir} navegar={navegar}/><main id="contenido">{contenido}</main><Footer/>{aviso && <div className="toast" role="status"><MensajeAlerta tipo={aviso.tipo} titulo="ReparaYa" onCerrar={() => setAviso(null)}>{aviso.texto}</MensajeAlerta></div>}</div>;
}
