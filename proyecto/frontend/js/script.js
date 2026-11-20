document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const parametros = new URLSearchParams(window.location.search);

    if (parametros.get('error')) {
        document.getElementById('alerta-error').classList.remove('d-none');
    }

    if (parametros.get('registro') === 'exitoso') {
        document.getElementById('alerta-exito').classList.remove('d-none');
    }

    formulario.addEventListener('submit', function(evento) {
        const correo = document.getElementById('correo').value.trim();
        const contrasena = document.getElementById('contrasena').value.trim();

        if (correo === "") {
            evento.preventDefault();
            alert("Por favor, ingresa tu correo electrónico.");
            return;
        }

        if (contrasena === "") {
            evento.preventDefault();
            alert("Por favor, ingresa tu contraseña.");
            return;
        }
    });
});