CREATE DATABASE IF NOT EXISTS bd;
USE bd;

INSERT INTO user_roles (id, name, description) VALUES
(1, 'VIAJERO', 'Usuario estándar de la aplicación'),
(2, 'ADMIN', 'Usuario con privilegios de administrador')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO destination_categories (id, name, description) VALUES
(1, 'PLAYA', 'Destinos de costa con playas de arena'),
(2, 'CIUDAD', 'Grandes metrópolis y centros urbanos'),
(3, 'MONTAÑA', 'Destinos para senderismo y deportes de invierno'),
(4, 'AVENTURA', 'Destinos para actividades de riesgo y exploración')
ON DUPLICATE KEY UPDATE name=name;

INSERT INTO trip_statuses (id, name, description) VALUES
(1, 'PLANEADO', 'El viaje está planificado pero aún no ha comenzado'),
(2, 'EN_CURSO', 'El viaje está activo actualmente'),
(3, 'COMPLETADO', 'El viaje ya ha finalizado'),
(4, 'CANCELADO', 'El viaje ha sido cancelado')
ON DUPLICATE KEY UPDATE name=name;