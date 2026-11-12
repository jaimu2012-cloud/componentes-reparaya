import React from 'react';
import { SERVICIOS } from '../data/catalogo.js';
import TarjetaServicio from './TarjetaServicio.jsx';
import EstadoSolicitud from './EstadoSolicitud.jsx';
import Icono from './Icono.jsx';

export default function Inicio({ navegar, solicitarServicio }) {
  return <>
    <section className="hero">
      <div className="contenedor hero-grid">
        <div className="hero-texto">
          <span className="etiqueta"><span className="etiqueta-punto"/> Reparaciones sencillas, soluciones reales</span>
          <h1>Tu hogar y tus equipos <span>en buenas manos.</span></h1>
          <p>En ReparaYa puedes solicitar una reparación, consultar su avance y mantenerte informado en cada paso. Todo desde un mismo lugar.</p>
          <div className="hero-botones">
            <button className="boton boton-principal" type="button" onClick={() => navegar('/solicitudes/nueva')}>Solicitar reparación <Icono nombre="arrow" size={19}/></button>
            <button className="boton boton-contorno" type="button" onClick={() => navegar('/servicios')}>Conocer servicios</button>
          </div>
          <div className="hero-seguro"><Icono nombre="shield" size={18}/> Seguimiento claro de principio a fin · Prototipo académico</div>
        </div>
        <div className="hero-grafico" aria-label="Ilustración del seguimiento de una reparación">
          <div className="hero-orbita hero-orbita-uno"/><div className="hero-orbita hero-orbita-dos"/>
          <div className="hero-ficha">
            <div className="hero-ficha-cabecera"><span className="mini-logo"><Icono nombre="tool" size={19}/></span><div><small>Mi solicitud</small><strong>Seguimiento de reparación</strong></div><span className="hero-mas">•••</span></div>
            <div className="hero-ficha-detalle"><span>REPARACIÓN DE COMPUTADOR</span><h3>Seguimiento de reparación</h3><EstadoSolicitud estado="En proceso" /></div>
            <div className="hero-pasos">
              <div className="paso-hecho"><span><Icono nombre="check" size={14}/></span><div><strong>Solicitud recibida</strong><small>Registrada exitosamente</small></div></div>
              <div className="paso-hecho"><span><Icono nombre="check" size={14}/></span><div><strong>Técnico asignado</strong><small>Listo para atenderte</small></div></div>
              <div className="paso-actual"><span><Icono nombre="tool" size={14}/></span><div><strong>En proceso</strong><small>Estamos trabajando en ello</small></div></div>
            </div>
            <div className="hero-ficha-pie"><Icono nombre="circleCheck" size={17}/> Siempre informado sobre tu caso</div>
          </div>
          <div className="flotante flotante-superior"><Icono nombre="circleCheck" size={19}/><span>¡Solicitud registrada!</span></div>
          <div className="flotante flotante-inferior"><span className="flotante-icono"><Icono nombre="clock" size={17}/></span><span>Consulta tu avance</span></div>
        </div>
      </div>
      <div className="hero-nota">Vista ilustrativa de las etapas de una reparación.</div>
    </section>

    <section className="seccion" id="servicios-inicio"><div className="contenedor">
      <div className="cabecera-seccion"><div><span className="seccion-etiqueta">LO QUE HACEMOS</span><h2>Un servicio para cada necesidad</h2><p>Explora nuestras categorías y registra la reparación que necesitas.</p></div><button className="link-flecha" onClick={() => navegar('/servicios')} type="button">Ver todos los servicios <Icono nombre="arrow" size={18}/></button></div>
      <div className="grid-servicios">{SERVICIOS.map(servicio => <TarjetaServicio key={servicio.id} servicio={servicio} onElegir={solicitarServicio}/>)}</div>
    </div></section>

    <section className="seccion seccion-suave"><div className="contenedor">
      <div className="centro"><span className="seccion-etiqueta">ASÍ DE FÁCIL</span><h2>¿Cómo funciona ReparaYa?</h2><p>Tres pasos para llevar el control de tu reparación sin complicaciones.</p></div>
      <div className="grid-pasos"><div><span className="numero-paso">01</span><div className="paso-icono"><Icono nombre="clipboard" size={25}/></div><h3>Cuéntanos qué sucede</h3><p>Completa la solicitud con los datos del servicio y una descripción del problema.</p></div><div><span className="numero-paso">02</span><div className="paso-icono"><Icono nombre="users" size={25}/></div><h3>Organizamos tu atención</h3><p>Un encargado revisa el caso y asigna al técnico responsable.</p></div><div><span className="numero-paso">03</span><div className="paso-icono"><Icono nombre="circleCheck" size={25}/></div><h3>Revisa el seguimiento</h3><p>Consulta el código de tu solicitud y conoce su estado actualizado.</p></div></div>
    </div></section>
    <section className="seccion"><div className="contenedor cta"><div><span className="seccion-etiqueta">ESTAMOS PARA AYUDARTE</span><h2>¿Tienes algo por reparar?</h2><p>Registra tu solicitud y consulta su avance desde el panel.</p></div><button className="boton boton-blanco" type="button" onClick={() => navegar('/solicitudes/nueva')}>Empezar ahora <Icono nombre="arrow" size={19}/></button></div></section>
  </>;
}
