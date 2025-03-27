## Proyecto Web

# Integrantes:

-Vicente Mediano Larenas
-Nikolai Navea



### EP 1.1: Requisitos Funcionales y no Funcionales:

# Requisitos Funcionales

##   Registro y Autenticación de Usuarios:

        Permitir que los usuarios se registren creando una cuenta con campos obligatorios (nombre, email, contraseña, RUT, región, etc.) y se autentiquen mediante JWT para acceder a sus datos de forma segura.

##    Generación Automática de Itinerarios:

        La aplicación debe generar itinerarios personalizados automáticamente en base a criterios ingresados por el usuario, como destino, fechas, presupuesto, intereses y tiempo disponible. Se integrarán datos de APIs externas (Google Places, Eventbrite, OpenWeather) para enriquecer las sugerencias.

##   Edición Manual del Itinerario:

        Permitir al usuario editar el itinerario generado de forma automática, incluyendo reordenar actividades, modificar horarios, agregar o eliminar actividades, para personalizar completamente su plan de viaje.

##    Gestión de Viajes en el Perfil de Usuario:

        Cada usuario debe poder administrar sus viajes mediante una sección en su perfil que liste los viajes próximos y pasados, permitiendo ver, modificar o eliminar itinerarios guardados.

##  Operaciones CRUD Completo para Recursos:

        La aplicación deberá permitir operaciones de Crear, Leer, Actualizar y Borrar (CRUD) para entidades clave como usuarios, viajes e itinerarios, y para las actividades incluidas en cada viaje.

##  Integración de APIs Externas:

        Se debe integrar de forma transparente con APIs externas para obtener información actualizada:

            Google Places: Para buscar lugares de interés y puntos de atracción según la categoría.

            Eventbrite: Para obtener eventos locales relevantes en la fecha y destino del viaje.

            OpenWeather: Para mostrar el pronóstico del clima y ajustar la planificación de actividades.

##   Gestión de Roles y Funcionalidades de Administrador:

        Incorporar al menos dos roles de usuario (viajero y administrador). El administrador tendrá acceso a funcionalidades de gestión como ver la lista completa de usuarios, moderar contenido y, de ser necesario, realizar cambios administrativos sobre los itinerarios y usuarios.

# Requisitos No Funcionales

##   Diseño Responsive y Adaptativo:

        La interfaz debe ser responsiva y funcionar de manera óptima tanto en dispositivos móviles como en navegadores de escritorio, aprovechando Ionic + Angular para lograr una experiencia coherente.

##    Seguridad y Protección de Datos:

        Implementar medidas de seguridad robustas: autenticación con JWT, cifrado de contraseñas, validación de entradas y protección contra ataques comunes (XSS, CSRF, etc.).

##    Rendimiento y Tiempo de Respuesta:

        La aplicación debe responder en tiempos razonables (por ejemplo, generación del itinerario en menos de 2 segundos) para garantizar una experiencia de usuario fluida, incluso al integrar múltiples fuentes de datos en tiempo real.

##   Usabilidad y Experiencia de Usuario (UX):

        La interfaz debe ser intuitiva y amigable, facilitando la navegación entre pantallas y operaciones con componentes de Ionic (formularios, menús, tarjetas, etc.), y debe contar con retroalimentación visual clara para cada acción del usuario.

##   Escalabilidad y Manejo de Carga:

        El sistema debe estar diseñado para soportar múltiples usuarios concurrentes sin degradar el rendimiento, de forma que se pueda ampliar la infraestructura en función del crecimiento en la cantidad de viajes y actividades gestionadas.

##   Mantenibilidad y Modularidad del Código:

        La arquitectura del proyecto debe ser modular y bien documentada (tanto en el frontend como en el backend), facilitando futuras modificaciones, el trabajo en equipo y la integración de nuevas funcionalidades sin afectar el sistema en su conjunto.

##   Portabilidad y Despliegue Consistente:

        La aplicación deberá ser fácilmente desplegable en distintos entornos mediante Docker, garantizando consistencia en el entorno de desarrollo, pruebas y producción, y facilitando la replicación del sistema en cualquier plataforma compatible.
