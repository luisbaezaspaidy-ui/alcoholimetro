const alcoModel = require('../Models/alcoModel');

// Iniciar sesión (Redirige a admin.html o usuario.html)
async function login(req, res) {
    try {
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;

        if (typeof correo !== 'string' || !correo.trim() || 
            typeof contrasena !== 'string' || !contrasena.trim()) {
            return res.redirect('/index.html?error=campos_vacios');
        }

        const usuario = await alcoModel.autenticarUsuario(correo.trim(), contrasena.trim());

        if (!usuario) {
            return res.redirect('/index.html?error=credenciales_invalidas');
        }

        const parametros = new URLSearchParams({
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            tipo: usuario.tipo
        });

        if (usuario.tipo.toLowerCase() === 'administrador') {
            res.redirect('/admin.html?' + parametros.toString());
        } else {
            res.redirect('/usuario.html?' + parametros.toString());
        }
    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).send('Error en el servidor al iniciar sesión');
    }
}

// Registrar nueva cuenta de conductor
async function registrarUsuario(req, res) {
    try {
        const nombre = req.body.nombre;
        const correo = req.body.correo;
        const contrasena = req.body.contrasena;

        if (typeof nombre !== 'string' || !nombre.trim() ||
            typeof correo !== 'string' || !correo.trim() ||
            typeof contrasena !== 'string' || !contrasena.trim()) {
            return res.redirect('/registro.html?error=campos_vacios');
        }

        await alcoModel.crearUsuario(nombre.trim(), correo.trim(), contrasena.trim(), 'Usuario');

        res.redirect('/index.html?registro=exitoso');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            return res.redirect('/registro.html?error=correo_duplicado');
        }
        res.status(500).send('Error al crear la cuenta');
    }
}

// Listar todas las pruebas (Admin)
async function listarPruebas(req, res) {
    try {
        const historial = await alcoModel.obtenerHistorial();
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener historial:', error);
        res.status(500).json({ error: 'Error al consultar las pruebas' });
    }
}

// Listar pruebas de un usuario específico (Conductor)
async function listarMisPruebas(req, res) {
    try {
        const id_usuario = Number(req.query.id_usuario);
        if (!id_usuario) {
            return res.status(400).json({ error: 'ID de usuario requerido' });
        }
        const historial = await alcoModel.obtenerHistorialPorUsuario(id_usuario);
        res.json(historial);
    } catch (error) {
        console.error('Error al obtener mis pruebas:', error);
        res.status(500).json({ error: 'Error al consultar tus pruebas' });
    }
}

// Guardar prueba de alcoholímetro
async function guardarPrueba(req, res) {
    try {
        const concentracion = parseFloat(req.body.concentracion);
        const id_usuario = Number(req.body.id_usuario) || 1;
        const id_sensor = Number(req.body.id_sensor) || 1;
        const nombreAdmin = req.body.nombreAdmin || 'Usuario';
        const tipoAdmin = req.body.tipoAdmin || 'Administrador';

        if (isNaN(concentracion) || concentracion < 0) {
            return res.status(400).send('El valor de concentración no es válido');
        }

        const superaLimite = concentracion >= 0.25;
        const resultado = superaLimite ? 'No Apto' : 'Apto';
        const estado = superaLimite ? 'Fuera del límite' : 'Dentro del límite';

        const fechaObj = new Date();
        const fecha_hora = fechaObj.toISOString().slice(0, 19).replace('T', ' ');

        await alcoModel.registrarPrueba(
            concentracion,
            resultado,
            estado,
            id_usuario,
            id_sensor,
            fecha_hora
        );

        const parametros = new URLSearchParams({
            id_usuario: id_usuario,
            nombre: nombreAdmin,
            tipo: tipoAdmin,
            ultimo_resultado: concentracion.toFixed(2),
            ultimo_estado: resultado
        });

        if (tipoAdmin.toLowerCase() === 'administrador') {
            res.redirect('/admin.html?' + parametros.toString());
        } else {
            res.redirect('/usuario.html?' + parametros.toString());
        }
    } catch (error) {
        console.error('Error al registrar prueba:', error);
        res.status(500).send('Error al guardar la prueba en la base de datos');
    }
}

module.exports = {
    login,
    registrarUsuario,
    listarPruebas,
    listarMisPruebas,
    guardarPrueba
};