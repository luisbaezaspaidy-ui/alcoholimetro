-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-10-2026 a las 05:55:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alcosafe_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alcoholimetro`
--

CREATE TABLE `alcoholimetro` (
  `id_dispositivo` int(11) NOT NULL,
  `modelo` varchar(100) NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alcoholimetro`
--

INSERT INTO `alcoholimetro` (`id_dispositivo`, `modelo`, `estado`) VALUES
(1, 'Prototipo V1', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alerta`
--

CREATE TABLE `alerta` (
  `id_alerta` int(11) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `estado` tinyint(1) DEFAULT NULL,
  `id_dispositivo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `basedatos`
--

CREATE TABLE `basedatos` (
  `id_bd` int(11) NOT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `servidor` varchar(100) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `basedatos`
--

INSERT INTO `basedatos` (`id_bd`, `tipo`, `servidor`, `estado`) VALUES
(1, 'MySQL', 'Localhost', 'Activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pantallalcd`
--

CREATE TABLE `pantallalcd` (
  `id_pantalla` int(11) NOT NULL,
  `columnas` int(11) DEFAULT NULL,
  `filas` int(11) DEFAULT NULL,
  `id_dispositivo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prueba`
--

CREATE TABLE `prueba` (
  `id_prueba` int(11) NOT NULL,
  `fecha_hora` datetime DEFAULT current_timestamp(),
  `concentracion` float NOT NULL,
  `resultado` varchar(50) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_sensor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `prueba`
--

INSERT INTO `prueba` (`id_prueba`, `fecha_hora`, `concentracion`, `resultado`, `estado`, `id_usuario`, `id_sensor`) VALUES
(1, '2026-10-06 10:43:42', 0.32, 'Fuera del límite', 'Completada', 1, 1),
(2, '2026-10-13 03:28:40', 0.27, 'No Apto', 'Fuera del límite', 2, 1),
(3, '2026-10-13 03:51:12', 0.04, 'Apto', 'Dentro del límite', 4, 1),
(4, '2026-10-13 03:51:17', 0.16, 'Apto', 'Dentro del límite', 4, 1),
(5, '2026-10-13 03:51:22', 0.57, 'No Apto', 'Fuera del límite', 4, 1);

--
-- Disparadores `prueba`
--
DELIMITER $$
CREATE TRIGGER `trg_generar_registro` AFTER INSERT ON `prueba` FOR EACH ROW BEGIN
    INSERT INTO Registro (fecha_hora, concentracion, resultado, observaciones, id_prueba, id_bd)
    VALUES (
        NEW.fecha_hora, 
        NEW.concentracion, 
        NEW.resultado, 
        CONCAT('Registro almacenado correctamente. Prueba #', NEW.id_prueba), 
        NEW.id_prueba, 
        1 -- ID por defecto para el servidor principal
    );
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `id_registro` int(11) NOT NULL,
  `fecha_hora` datetime DEFAULT NULL,
  `concentracion` float NOT NULL,
  `resultado` varchar(50) DEFAULT NULL,
  `observaciones` text DEFAULT NULL,
  `id_prueba` int(11) DEFAULT NULL,
  `id_bd` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`id_registro`, `fecha_hora`, `concentracion`, `resultado`, `observaciones`, `id_prueba`, `id_bd`) VALUES
(1, '2026-10-06 10:43:42', 0.32, 'Fuera del límite', 'Registro almacenado correctamente. Prueba #1', 1, 1),
(2, '2026-10-13 03:28:40', 0.27, 'No Apto', 'Registro almacenado correctamente. Prueba #2', 2, 1),
(3, '2026-10-13 03:51:12', 0.04, 'Apto', 'Registro almacenado correctamente. Prueba #3', 3, 1),
(4, '2026-10-13 03:51:17', 0.16, 'Apto', 'Registro almacenado correctamente. Prueba #4', 4, 1),
(5, '2026-10-13 03:51:22', 0.57, 'No Apto', 'Registro almacenado correctamente. Prueba #5', 5, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sensor`
--

CREATE TABLE `sensor` (
  `id_sensor` int(11) NOT NULL,
  `modelo` varchar(50) DEFAULT NULL,
  `tipo` varchar(50) DEFAULT NULL,
  `rango` varchar(50) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL,
  `id_dispositivo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sensor`
--

INSERT INTO `sensor` (`id_sensor`, `modelo`, `tipo`, `rango`, `estado`, `id_dispositivo`) VALUES
(1, 'MQ-3', 'Gas Analógico', '0.05-10 mg/L', 'Calibrado', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre`, `correo`, `contrasena`, `tipo`) VALUES
(1, 'Luis Baeza', 'luis@alcosafe.com', '12345', 'Administrador'),
(2, 'Alexis Sanchez', 'alexis@alcosafe.com', '12345', 'Administrador'),
(3, 'Joshua Zavala', 'joshua@alcosafe.com', '12345', 'Administrador'),
(4, 'Santiago Salamanca', 'santy@gmail.com', '12345', 'Usuario'),
(5, 'Sebastian Navarro', 'sebas@gmail.com', '12345', 'Usuario');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alcoholimetro`
--
ALTER TABLE `alcoholimetro`
  ADD PRIMARY KEY (`id_dispositivo`);

--
-- Indices de la tabla `alerta`
--
ALTER TABLE `alerta`
  ADD PRIMARY KEY (`id_alerta`),
  ADD KEY `id_dispositivo` (`id_dispositivo`);

--
-- Indices de la tabla `basedatos`
--
ALTER TABLE `basedatos`
  ADD PRIMARY KEY (`id_bd`);

--
-- Indices de la tabla `pantallalcd`
--
ALTER TABLE `pantallalcd`
  ADD PRIMARY KEY (`id_pantalla`),
  ADD KEY `id_dispositivo` (`id_dispositivo`);

--
-- Indices de la tabla `prueba`
--
ALTER TABLE `prueba`
  ADD PRIMARY KEY (`id_prueba`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_sensor` (`id_sensor`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`id_registro`),
  ADD KEY `id_prueba` (`id_prueba`),
  ADD KEY `id_bd` (`id_bd`);

--
-- Indices de la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`id_sensor`),
  ADD KEY `id_dispositivo` (`id_dispositivo`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alcoholimetro`
--
ALTER TABLE `alcoholimetro`
  MODIFY `id_dispositivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `alerta`
--
ALTER TABLE `alerta`
  MODIFY `id_alerta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `basedatos`
--
ALTER TABLE `basedatos`
  MODIFY `id_bd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `pantallalcd`
--
ALTER TABLE `pantallalcd`
  MODIFY `id_pantalla` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `prueba`
--
ALTER TABLE `prueba`
  MODIFY `id_prueba` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `id_registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sensor`
--
ALTER TABLE `sensor`
  MODIFY `id_sensor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alerta`
--
ALTER TABLE `alerta`
  ADD CONSTRAINT `alerta_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `alcoholimetro` (`id_dispositivo`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pantallalcd`
--
ALTER TABLE `pantallalcd`
  ADD CONSTRAINT `pantallalcd_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `alcoholimetro` (`id_dispositivo`) ON DELETE CASCADE;

--
-- Filtros para la tabla `prueba`
--
ALTER TABLE `prueba`
  ADD CONSTRAINT `prueba_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE SET NULL,
  ADD CONSTRAINT `prueba_ibfk_2` FOREIGN KEY (`id_sensor`) REFERENCES `sensor` (`id_sensor`) ON DELETE SET NULL;

--
-- Filtros para la tabla `registro`
--
ALTER TABLE `registro`
  ADD CONSTRAINT `registro_ibfk_1` FOREIGN KEY (`id_prueba`) REFERENCES `prueba` (`id_prueba`) ON DELETE CASCADE,
  ADD CONSTRAINT `registro_ibfk_2` FOREIGN KEY (`id_bd`) REFERENCES `basedatos` (`id_bd`) ON DELETE SET NULL;

--
-- Filtros para la tabla `sensor`
--
ALTER TABLE `sensor`
  ADD CONSTRAINT `sensor_ibfk_1` FOREIGN KEY (`id_dispositivo`) REFERENCES `alcoholimetro` (`id_dispositivo`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
