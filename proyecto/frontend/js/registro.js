document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('form-registro');
    const parametros = new URLSearchParams(window.location.search);

    if (parametros.get('error')) {
        document.getElementById('alerta-registro-error').classList.remove('d-none');
    }

    formRegistro.addEventListener('submit', function(evento) {
        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();

        if (nombre === "") {
            evento.preventDefault();
            alert("Por favor, ingresa tu nombre completo.");
            return;
        }

        if (correo === "") {
            evento.preventDefault();
            alert("Por favor, ingresa un correo electrónico válido.");
            return;
        }

        if (contrasena.length < 4) {
            evento.preventDefault();
            alert("La contraseña debe tener al menos 4 caracteres.");
            return;
        }
    });
});