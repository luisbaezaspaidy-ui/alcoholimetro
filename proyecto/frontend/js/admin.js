const parametros = new URLSearchParams(window.location.search);

const idUsuario = parametros.get('id_usuario') || '1';
const nombreAdmin = parametros.get('nombre') || 'Administrador';

document.getElementById('admin-nombre').textContent = `Hola, ${nombreAdmin}`;
document.getElementById('input-id-usuario').value = idUsuario;
document.getElementById('input-nombre-admin').value = nombreAdmin;

async function cargarHistorial() {
    try {
        const respuesta = await fetch('/pruebas');
        const pruebas = await respuesta.json();

        const tbody = document.getElementById('tabla-historial');
        tbody.innerHTML = '';

        let contadorAptos = 0;
        let contadorNoAptos = 0;

        if (pruebas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center">No hay pruebas registradas aún.</td></tr>';
            return;
        }

        pruebas.forEach(p => {
            const esDentro = p.estado === 'Dentro del límite';
            if (esDentro) {
                contadorAptos++;
            } else {
                contadorNoAptos++;
            }

            const fechaFormateada = new Date(p.fecha_hora).toLocaleString('es-MX');
            const claseBadge = esDentro ? 'badge-apto' : 'badge-no-apto';

            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td class="fw-bold">#${String(p.id_prueba).padStart(4, '0')}</td>
                <td>${fechaFormateada}</td>
                <td>${p.usuario || 'Conductor'}</td>
                <td class="fw-bold">${Number(p.concentracion).toFixed(2)} mg/L</td>
                <td>${p.resultado || '-'}</td>
                <td><span class="${claseBadge}">${p.estado}</span></td>
            `;
            tbody.appendChild(fila);
        });

        document.getElementById('total-pruebas').textContent = pruebas.length;
        document.getElementById('total-aptos').textContent = contadorAptos;
        document.getElementById('total-no-aptos').textContent = contadorNoAptos;

    } catch (error) {
        console.error('Error al cargar historial:', error);
    }
}

document.getElementById('buscador').addEventListener('keyup', function() {
    const texto = this.value.toLowerCase();
    const filas = document.querySelectorAll('#tabla-historial tr');
    filas.forEach(fila => {
        fila.style.display = fila.textContent.toLowerCase().includes(texto) ? '' : 'none';
    });
});

cargarHistorial();