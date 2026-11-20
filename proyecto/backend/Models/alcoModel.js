const conectar = require('../config/database');

// 1. Verificar credenciales en la tabla 'usuario'
async function autenticarUsuario(correo, contrasena) {
    const sql = `
        SELECT id_usuario, nombre, correo, tipo 
        FROM usuario 
        WHERE correo = ? AND contrasena = ?
    `;
    const db = await conectar();
    const [rows] = await db.execute(sql, [correo, contrasena]);
    await db.end();
    return rows[0];
}

// 2. Crear nueva cuenta de conductor (Por defecto tipo 'Usuario')
async function crearUsuario(nombre, correo, contrasena, tipo = 'Usuario') {
    const sql = `
        INSERT INTO usuario (nombre, correo, contrasena, tipo)
        VALUES (?, ?, ?, ?)
    `;
    const db = await conectar();
    const [res] = await db.execute(sql, [nombre, correo, contrasena, tipo]);
    await db.end();
    return res.insertId;
}

// 3. Obtener todas las pruebas para el panel de Administrador
async function obtenerHistorial() {
    const sql = `
        SELECT p.id_prueba, p.fecha_hora, u.nombre AS usuario, p.concentracion, p.resultado, p.estado 
        FROM prueba p 
        LEFT JOIN usuario u ON p.id_usuario = u.id_usuario 
        ORDER BY p.id_prueba DESC
    `;
    const db = await conectar();
    const [rows] = await db.execute(sql);
    await db.end();
    return rows;
}

// 4. Obtener historial exclusivo de un conductor
async function obtenerHistorialPorUsuario(id_usuario) {
    const sql = `
        SELECT id_prueba, fecha_hora, concentracion, resultado, estado 
        FROM prueba 
        WHERE id_usuario = ? 
        ORDER BY id_prueba DESC
    `;
    const db = await conectar();
    const [rows] = await db.execute(sql, [id_usuario]);
    await db.end();
    return rows;
}

// 5. Registrar una nueva prueba de alcoholímetro
async function registrarPrueba(concentracion, resultado, estado, id_usuario, id_sensor, fecha_hora) {
    const sql = `
        INSERT INTO prueba(fecha_hora, concentracion, resultado, estado, id_usuario, id_sensor)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const db = await conectar();
    const [res] = await db.execute(sql, [
        fecha_hora,
        concentracion,
        resultado,
        estado,
        id_usuario,
        id_sensor
    ]);
    await db.end();
    return res.insertId;
}

module.exports = {
    autenticarUsuario,
    crearUsuario,
    obtenerHistorial,
    obtenerHistorialPorUsuario,
    registrarPrueba
};