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

-- -----------------------------------------------------
-- Seeds para la tabla 'destinations'
-- -----------------------------------------------------

-- Usamos JSON_ARRAY para los campos de tipo JSON (tags, gallery_image_urls)
-- Usamos ON DUPLICATE KEY UPDATE para que el script sea idempotente (se pueda ejecutar varias veces)

INSERT INTO destinations (id, name, description, country, region, main_image_url, gallery_image_urls, category_id, tags, popularity_score, is_trending, best_time_to_visit, average_daily_cost, latitude, longitude) VALUES
(1, 'Valparaíso', 'Ciudad portuaria de Chile, famosa por sus coloridos cerros, funiculares históricos y vibrante escena artística. Un laberinto de calles que es Patrimonio de la Humanidad.', 'Chile', 'Región de Valparaíso', 'https://images.unsplash.com/photo-1579683938431-3c241416d552?q=80&w=1974&auto=format&fit=crop', JSON_ARRAY('https://images.unsplash.com/photo-1621591234783-71861b585566?q=80&w=1974&auto=format&fit=crop', 'https://images.unsplash.com/photo-1558862369-a5585a034268?q=80&w=2070&auto=format&fit=crop'), 2, JSON_ARRAY('ciudad', 'cultura', 'patrimonio', 'costa'), 85, TRUE, 'Septiembre a Diciembre', 80.00, -33.047239, -71.612663),
(2, 'Cancún', 'Famoso destino en la península de Yucatán, México, conocido por sus playas de arena blanca, aguas turquesas y la vibrante vida nocturna. Cerca de ruinas mayas como Chichén Itzá.', 'México', 'Quintana Roo', 'https://images.unsplash.com/photo-1590523743842-0943194a2b29?q=80&w=2070&auto=format&fit=crop', JSON_ARRAY('https://images.unsplash.com/photo-1558507317-a7488c947492?q=80&w=1964&auto=format&fit=crop'), 1, JSON_ARRAY('playa', 'caribe', 'resort', 'fiesta'), 95, TRUE, 'Diciembre a Abril', 150.50, 21.161908, -86.851524),
(3, 'Parque Nacional Torres del Paine', 'Ubicado en la Patagonia chilena, es uno de los parques más espectaculares del mundo. Famoso por sus imponentes macizos de granito, glaciares y lagos de color turquesa.', 'Chile', 'Región de Magallanes', 'https://images.unsplash.com/photo-1565358074833-885718873426?q=80&w=2070&auto=format&fit=crop', JSON_ARRAY('https://images.unsplash.com/photo-1525381831510-168a8abc0786?q=80&w=2070&auto=format&fit=crop'), 3, JSON_ARRAY('montaña', 'trekking', 'naturaleza', 'patagonia'), 92, TRUE, 'Octubre a Marzo', 120.00, -51.242485, -72.852440),
(4, 'Cusco y Machu Picchu', 'Antigua capital del Imperio Inca y puerta de entrada a la ciudadela de Machu Picchu. Un destino lleno de historia, cultura y paisajes andinos impresionantes.', 'Perú', 'Cusco', 'https://images.unsplash.com/photo-1526481280642-423261d3555f?q=80&w=2070&auto=format&fit=crop', JSON_ARRAY('https://images.unsplash.com/photo-1609349781313-a5f111e49441?q=80&w=1974&auto=format&fit=crop'), 4, JSON_ARRAY('aventura', 'historia', 'inca', 'montaña'), 98, TRUE, 'Abril a Octubre', 100.00, -13.531950, -71.967461),
(5, 'Tokio', 'La bulliciosa capital de Japón, una mezcla fascinante de lo ultramoderno y lo tradicional. Desde rascacielos y neón hasta templos históricos y jardines serenos.', 'Japón', 'Región de Kantō', 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop', JSON_ARRAY('https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=2036&auto=format&fit=crop'), 2, JSON_ARRAY('ciudad', 'tecnología', 'cultura', 'gastronomía'), 90, FALSE, 'Marzo a Mayo y Septiembre a Noviembre', 200.00, 35.6762, 139.6503),
(6, 'Roma', 'La Ciudad Eterna. Un viaje a través de la historia con monumentos como el Coliseo, el Foro Romano y el Vaticano. La capital de Italia es un museo al aire libre.', 'Italia', 'Lacio', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop', NULL, 2, JSON_ARRAY('ciudad', 'historia', 'arte', 'romano'), 88, FALSE, 'Abril a Junio', 180.75, 41.902782, 12.496366),
(7, 'Isla de Pascua', 'Una de las islas habitadas más remotas del mundo, famosa por sus enigmáticas estatuas monumentales llamadas moái. Un destino único lleno de misterio y cultura Rapa Nui.', 'Chile', 'Región de Valparaíso', 'https://images.unsplash.com/photo-1588626083212-32b4b3b0704c?q=80&w=2070&auto=format&fit=crop', NULL, 4, JSON_ARRAY('aventura', 'misterio', 'isla', 'cultura'), 80, FALSE, 'Todo el año', 130.00, -27.112722, -109.349686),
(8, 'Interlaken', 'Situado entre dos lagos cristalinos en los Alpes suizos, Interlaken es la capital europea de los deportes de aventura. Ideal para parapente, senderismo y esquí.', 'Suiza', 'Cantón de Berna', 'https://images.unsplash.com/photo-1535443180472-6b3a3a4205b3?q=80&w=1931&auto=format&fit=crop', JSON_ARRAY('https://images.unsplash.com/photo-1594968981845-9870639b7754?q=80&w=1974&auto=format&fit=crop'), 3, JSON_ARRAY('montaña', 'aventura', 'alpes', 'deportes'), 89, FALSE, 'Junio a Septiembre', 250.00, 46.6863, 7.8632)
ON DUPLICATE KEY UPDATE id=id;