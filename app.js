/**
 * Conexión al backend (Apps Script). Reemplaza API_BASE con la URL de tu
 * Web App desplegada (termina en /exec) — está en Configuración →
 * URL_PORTAL_RESULTADOS dentro de tu Google Sheet.
 */
const API_BASE = 'PEGA_AQUI_TU_URL_DE_APPS_SCRIPT_TERMINA_EN_/exec';

function obtenerParametro(nombre) {
  return new URLSearchParams(window.location.search).get(nombre) || '';
}

async function llamarApi(params) {
  const url = API_BASE + '?api=1&' + new URLSearchParams(params).toString();
  const resp = await fetch(url);
  if (!resp.ok) throw new Error('Error de red: ' + resp.status);
  return resp.json();
}

async function ejecutarAccion(params) {
  const url = API_BASE + '?api=1&' + new URLSearchParams(params).toString();
  const resp = await fetch(url);
  return resp.json();
}

function guardarCodigoRecordado(tipo, codigo) {
  try { localStorage.setItem('propmatch_' + tipo, codigo); } catch (e) { /* si el navegador bloquea localStorage, simplemente no se recuerda */ }
}

function obtenerCodigoRecordado(tipo) {
  try { return localStorage.getItem('propmatch_' + tipo) || ''; } catch (e) { return ''; }
}

function mostrarError(contenedorId, mensaje) {
  document.getElementById(contenedorId).innerHTML =
    '<div class="card"><h3>No pudimos cargar esto</h3><p>' + mensaje + '</p></div>';
}

function construirRutaHtml(etapaActual, etapas) {
  const indiceActual = etapas.indexOf(etapaActual);
  return etapas.map((etapa, i) => {
    const clase = i < indiceActual ? 'hecho' : i === indiceActual ? 'actual' : '';
    const icono = i < indiceActual ? '✓' : i === indiceActual ? '●' : '○';
    return '<div class="ruta-paso ' + clase + '"><div class="ruta-nodo">' + icono + '</div>' +
      '<div class="ruta-texto">' + etapa + '</div></div>';
  }).join('');
}

function formatoRD(numero) {
  return 'RD$' + Math.round(numero).toLocaleString('es-DO');
}
