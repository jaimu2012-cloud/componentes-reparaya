import { leerLocal, guardarLocal } from './storage.js';

const CLAVE = 'cuentas';

async function resumenClave(password, sal) {
  const datos = new TextEncoder().encode(`${sal}:${password}`);
  const bytes = await crypto.subtle.digest('SHA-256', datos);
  return [...new Uint8Array(bytes)].map(n => n.toString(16).padStart(2, '0')).join('');
}

export async function crearCuenta(datos) {
  const cuentas = leerLocal(CLAVE, []);
  if (!Array.isArray(cuentas)) return { ok: false, mensaje: 'No fue posible cargar las cuentas locales.' };
  const email = datos.email.trim().toLowerCase();
  if (cuentas.some(c => c.email === email)) return { ok: false, mensaje: 'Ya existe una cuenta con ese correo.' };
  const sal = [...crypto.getRandomValues(new Uint8Array(16))].map(n => n.toString(16).padStart(2,'0')).join('');
  const clave = await resumenClave(datos.password, sal);
  const { password, ...usuario } = datos;
  const cuenta = { ...usuario, email, sal, clave };
  if (!guardarLocal(CLAVE, [...cuentas, cuenta])) return { ok: false, mensaje: 'No fue posible guardar la cuenta en este navegador.' };
  return { ok: true, usuario: { nombre: cuenta.nombre, email, telefono: cuenta.telefono, rol: cuenta.rol } };
}

export async function ingresarCuenta(email, password) {
  const cuentas = leerLocal(CLAVE, []);
  const cuenta = Array.isArray(cuentas) ? cuentas.find(c => c.email === email.trim().toLowerCase()) : null;
  if (!cuenta || await resumenClave(password, cuenta.sal) !== cuenta.clave) {
    return { ok: false, mensaje: 'Correo o contraseña incorrectos.' };
  }
  return { ok: true, usuario: { nombre: cuenta.nombre, email: cuenta.email, telefono: cuenta.telefono, rol: cuenta.rol } };
}
