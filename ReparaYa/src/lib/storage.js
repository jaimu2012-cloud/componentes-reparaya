const PREFIX = 'reparaya_sena_v2_';

export function leerLocal(clave, respaldo) {
  try {
    const raw = window.localStorage.getItem(PREFIX + clave);
    return raw === null ? respaldo : JSON.parse(raw);
  } catch {
    return respaldo;
  }
}

export function guardarLocal(clave, valor) {
  try {
    window.localStorage.setItem(PREFIX + clave, JSON.stringify(valor));
    return true;
  } catch {
    return false;
  }
}

export function borrarLocal(clave) {
  try { window.localStorage.removeItem(PREFIX + clave); } catch { /* noop */ }
}
