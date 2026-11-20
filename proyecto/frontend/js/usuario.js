const parametros = new URLSearchParams(window.location.search);

const idUsuario = parametros.get('id_usuario') || '2';
const nombreUsuario = parametros.get('nombre') || 'Conductor';
const ultimoResultado = parametros.get('ultimo_resultado');
const ultimoEstado = parametros.get('ultimo_estado');

document.getElementById('usuario-nombre').textContent = `Conductor: ${nombreUsuario}`;
document.getElementById('input-id-usuario').value = idUsuario;
document.getElementById('input-nombre-usuario').value = nombreUsuario;

if (ultimoResultado !== null && ultimoEstado !== null) {
    const lcd = document.getElementById('lcd-texto');
    const led = document.getElementById('led-luz');
    const textoAlerta = document.getElementById('texto-alerta');

    lcd.innerHTML = `
        <div>Resultado:</div>
        <div>${ultimoResultado} mg/L (${ultimoEstado})</div>
    `;

    if (ultimoEstado === 'No Apto') {
        led.className = 'led-indicador led-rojo';
        textoAlerta.textContent = '¡ALERTA SONORA Y VISUAL! Supera el límite (0.25 mg/L). No conduzcas.';
        textoAlerta.className = 'text-danger';
    } else {
        led.className = 'led-indicador led-verde';
        textoAlerta.textContent = 'LED Verde: Conductor Apto (Dentro del límite legal).';
        textoAlerta.className = 'text-success';
    }
}

async function cargarMisPruebas() {
    try {
        const respuesta = await fetch(`/mis-pruebas?id_usuario=${idUsuario}`);
        const pruebas = await respuesta.json();

        const tbody = document.getElementById('tabla-mis-pruebas');
        tbody.innerHTML = '';

        if (pruebas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="text-center">Aún no has realizado ninguna prueba.</td></tr>';
            return;
        }

        pruebas.forEach(p => {
            const esDentro = p.estado === 'Dentro del límite';
            const fechaFormateada = new Date(p.fecha_hora).toLocaleString('es-MX');
            const claseBadge = esDentro ? 'badge-apto' : 'badge-no-apto';

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td class="fw-bold">#${String(p.id_prueba).padStart(4, '0')}</td>
                <td>${fechaFormateada}</td>
                <td class="fw-bold">${Number(p.concentracion).toFixed(2)} mg/L</td>
                <td>${p.resultado}</td>
                <td><span class="${claseBadge}">${p.estado}</span></td>
            `;
            tbody.appendChild(fila);
        });
    } catch (error) {
        console.error('Error al cargar tus pruebas:', error);
    }
}

cargarMisPruebas();