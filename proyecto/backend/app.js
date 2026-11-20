const express = require('express');
const path = require('path');
require('dotenv').config();

const alcoRoutes = require('./routes/alcoRoutes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Uso de las rutas
app.use('/', alcoRoutes);

// Iniciamos el server 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor de AlcoSafe ejecutándose en http://localhost:${PORT}`);
});