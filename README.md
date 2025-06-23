# Integrantes:

- Vicente Mediano Larenas
- Daniel Miranda
- Nikolai Navea
- Vicente Arratia
- Javier Sepúlveda

# Sistema de Gestión de Viajes

## Índice

1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Entrega Parcial 1](#entrega-parcial-1)
3. [Entrega Parcial 2](#entrega-parcial-2)
4. [Pasos para ejecutar el Proyecto](#pasos-para-ejecutar-el-proyecto)
5. [Roles del Sistema](#roles-del-sistema)
6. [Requerimientos Funcionales por Rol](#requerimientos-funcionales-por-rol)
7. [Requerimientos Funcionales](#requerimientos-funcionales)
8. [Requerimientos No Funcionales](#requerimientos-no-funcionales)
9. [Arquitectura de la Información](#arquitectura-de-la-información)
10. [Prototipo de Diseño](#prototipo-de-diseño)
11. [Librerías y Tecnologías](#librerías-y-tecnologías)

## Resumen del Proyecto

La propuesta consiste en desarrollar una aplicación web y móvil orientada a viajeros mochileros para la planificación automática y personalizada de itinerarios de viaje.
El objetivo es facilitar a los usuarios la organización de sus viajes de forma rápida y optimizada, considerando sus restricciones de presupuesto, preferencias de intereses
y tiempo disponible.

## Entrega Parcial 1
A continuación se describe la entrega parcial 1, con las diversas implementaciones hechas al proyecto.
- **Definición Requerimientos**: En el presente README se definen los diversos requerimientos funcionales y no funcionales
- **Bocetos de UI/UX y prototipo Figma**: Se realizaron los bocetos guía UI/UX, encontrados en la carpeta [Otros](https://github.com/Zorkats/ProyectoWebICI4247/tree/master/otros) en el presente repositorio. En Figma se hicieron los 7 mockups que representan las funcionalidades propuestas [Prototipo de Diseño](#prototipo-de-diseño). Se considero Web y Móvil. (Se incluyó dos mockups de formulario relacionados al Inicio de Sesión y el Registro)
- **Definición de navegación y experiencia de Usuario**: Se definio la navegación y experiencia del usuario mediante un diagrama, ubicado en la carpeta [Otros](https://github.com/Zorkats/ProyectoWebICI4247/tree/master/otros) en el presente repositorio.
- **Proyecto con Ionic**: Se implementó la logica/estructura de navegación para cada página creada. Estas se trabajaron mediante ramas, donde fueron diseñadas e ideadas.
  - [Home-page](https://github.com/Zorkats/ProyectoWebICI4247/tree/home-page): Creación y desarrollo frontend de la pagina Home. 
  - [Explore-page](https://github.com/Zorkats/ProyectoWebICI4247/tree/explore-page): Creación y desarrollo frontend de la pagina Explore
  - [Perfil-page](https://github.com/Zorkats/ProyectoWebICI4247/tree/Perfil-Page): Creación y desarrollo frontend de la pagina Perfil
  - [Mis-viajes-page](https://github.com/Zorkats/ProyectoWebICI4247/tree/mis-viajes-page): Creación y desarrollo frontend de la pagina Mis viajes
  - [Dashboard-page](https://github.com/Zorkats/ProyectoWebICI4247/tree/dashboard-page): Creación y desarrollo frontend de la pagina Dashboard/Inicio
  - [Crear-viajes-page](https://github.com/Zorkats/ProyectoWebICI4247/tree/crear-viajes-page): Creación y desarrollo frontend de la pagina Crear viajes
  

## Entrega Parcial 2
A continuacion se describe la entrega parcial 2, con los nuevos avances realizados en el proyecto. En esta segunda entrega, el enfoque ha sido la construcción de un backend robusto con Node.js y Express, su conexión con una base de datos MySQL a través del ORM Sequelize, y la integración completa con el frontend de Ionic/Angular.

### EP 2.1: Creación del Servidor en Node.js con Express

Se ha desarrollado un servidor backend funcional y robusto utilizando **Node.js** y el framework **Express**, que se encarga de gestionar toda la lógica de negocio y las peticiones de la API REST.

* **Punto de Entrada y Configuración**: El punto de entrada del servidor es `backend/src/server.js`, responsable de iniciar la aplicación. La configuración principal de Express se centraliza en `backend/src/app.js`, donde se definen middlewares esenciales como `cors` y `express.json()` y se montan las rutas de la API.
* **Gestión de Entorno**: El servidor utiliza variables de entorno (`dotenv`) para gestionar de forma segura la configuración del puerto y la base de datos.
* **Dependencias y Scripts**: Todas las dependencias del proyecto, incluyendo `express`, `sequelize`, `mysql2`, `jsonwebtoken`, y `bcryptjs`, están declaradas en el archivo `backend/package.json`. Se han configurado scripts como `start` y `dev` para la ejecución del servidor.



### EP 2.2: Configuración y Modelado de la Base de Datos Relacional

Se ha diseñado y configurado una base de datos relacional **MySQL**, gestionada eficientemente a través del ORM **Sequelize**.

* **Esquema y Estructura**: El esquema completo de la base de datos, con tablas como `users`, `trips`, `destinations`, y `user_roles`, está definido en `database/schema.sql` o `backend/src/config/db_info/schema.sql`.
* **Modelos de Datos**: Los modelos de Sequelize, que mapean las tablas, se encuentran en el directorio `backend/src/models/`. El archivo `backend/src/models/index.js` importa los modelos y establece sus asociaciones.
* **Conexión y Datos Iniciales**: La configuración de la conexión de Sequelize con la base de datos se maneja en `backend/src/config/db.js`. Se han incluido *seeds* en `backend/src/config/db_info/seeds.sql` para la inicialización de datos básicos como roles.



### EP 2.3: Desarrollo de API REST con Endpoints Básicos

Se ha implementado una **API RESTful** completa que expone los endpoints necesarios para las operaciones **CRUD** (Crear, Leer, Actualizar, Borrar) sobre las principales entidades de la aplicación.

* **Estructura de Rutas y Controladores**: La lógica está organizada de forma modular. Las rutas de la API se definen en la carpeta `backend/src/routes/` (ej. `user.routes.js`), conectando los endpoints con sus funciones en la carpeta `backend/src/controllers/` (ej. `user.controller.js`).
* **Endpoints Implementados**: Se han desarrollado endpoints para la gestión de autenticación (`/api/auth`), usuarios (`/api/user`), viajes (`/api/trips`) y destinos (`/api/destinations`). Esto incluye un endpoint `POST /register` para el registro de nuevos usuarios y `POST /login` para la autenticación.



### EP 2.4: Consumo de la API desde Ionic usando HttpClient

El frontend de **Ionic/Angular** se ha conectado con el backend para consumir los datos de la API de forma dinámica.

* **HttpClient de Angular**: Se utiliza el módulo `HttpClient` de Angular para realizar todas las llamadas a la API REST de manera estandarizada y eficiente.
* **Servicios de Datos**: Se han desarrollado servicios específicos como `AuthService`, `TripService` y `DestinationService` para encapsular la lógica de las llamadas a la API, facilitando la gestión de datos.
* **Envío de Credenciales**: La aplicación frontend está configurada para enviar credenciales (cookies) en cada petición a los endpoints protegidos.
* **Interfaz Dinámica**: La interfaz de usuario reacciona al estado de autenticación, mostrando contenido personalizado según si el usuario ha iniciado sesión o no.



### EP 2.5: Implementación de Autenticación con JWT

Se ha implementado un sistema de autenticación completo y seguro basado en **JSON Web Tokens (JWT)** para gestionar el registro e inicio de sesión.

* **Hashing de Contraseñas**: Las contraseñas se hashean de forma segura antes de almacenarse en la base de datos, utilizando la librería `bcryptjs`.
* **Generación de Tokens**: Tras un inicio de sesión exitoso, el `auth.controller.js` genera un token JWT firmado usando la librería `jsonwebtoken`.
* **Almacenamiento Seguro del Token**: Para mayor seguridad, el token JWT se almacena en una **cookie `httpOnly`**, lo que mitiga ataques de tipo XSS al impedir su acceso desde el lado del cliente.



### EP 2.6: Validación de Usuarios y Manejo de Sesiones

Se han implementado **middlewares** y **guardias de rutas** para asegurar que solo los usuarios autorizados puedan acceder a recursos específicos.

* **Middleware de Autenticación**: El middleware `backend/src/middlewares/auth.middleware.js` protege las rutas que requieren autenticación. Verifica la validez del token JWT en cada petición y deniega el acceso si no es válido.
* **Middleware de Autorización por Roles**: Se ha implementado un middleware de autorización (`backend/src/middlewares/role.middleware.js`) para restringir el acceso a ciertos endpoints según el rol del usuario (ej. `ADMIN`).
* **Protección de Rutas en Frontend (AuthGuard)**: En el lado del cliente, un `AuthGuard` de Angular verifica el estado de autenticación del usuario antes de permitir el acceso a rutas protegidas como `/profile` o `/mis-viajes`, redirigiendo al login si es necesario.

### Pruebas de Integración

La API ha sido probada exhaustivamente utilizando **Postman** para verificar el correcto funcionamiento de cada endpoint. Se validó el registro de usuarios, el inicio de sesión, la generación de tokens y el acceso a rutas protegidas, asegurando una integración sólida entre el frontend y el backend.
## Ejemplos POSTMAN
Se usó una cookie para obtener respuestas de END POINTS que necesitan de autenticación.

**GET** /api/destinations

![image](https://github.com/user-attachments/assets/0c83a7e5-34ed-4843-810a-8c51ffbd7c86)
![image](https://github.com/user-attachments/assets/ed5d318f-2cc0-430d-b25d-6f1a5a7e148d)

**GET** /api/trips (viajes de un usuario)

![image](https://github.com/user-attachments/assets/ae81c48a-eb2d-4bc9-803b-7a6fe9cbf0e8)
![image](https://github.com/user-attachments/assets/07da5e83-1ece-4b31-b411-7cdaef62da41)

**GET** /api/trips/:tripid (detalles viaje especifico)

![image](https://github.com/user-attachments/assets/eab82c19-2b6c-4c9b-9212-a1d2d2363749)
![image](https://github.com/user-attachments/assets/03bf404c-6dc6-40eb-86a0-147ff1baaf65)

**POST** /api/trips (crear viaje)

![image](https://github.com/user-attachments/assets/d805556d-6163-4aef-8829-65c321aee848)
![image](https://github.com/user-attachments/assets/0a9667b7-1580-4411-bfcb-29055bf826f3)


---

## Entrega Final
Esta fase final del proyecto se centró en transformar la aplicación de un sistema básico de gestión de viajes a una plataforma de planificación y descubrimiento de contenido mucho más robusta, interactiva y segura, acercándola al nivel de aplicaciones de referencia en la industria.

A continuación se detallan los pilares de desarrollo que marcaron esta evolución.

### 1. Expansión del Modelo de Datos: Puntos de Interés (POI)
Para que la aplicación fuera verdaderamente útil, era fundamental ir más allá de los "destinos" (ciudades/países) y catalogar lo que se puede hacer *dentro* de ellos.

* **Nuevas Entidades en el Backend**: Se expandió la base de datos MySQL con las tablas `poi_categories` y `points_of_interest` para clasificar y almacenar lugares de interés (restaurantes, museos, etc.) y su relación con un destino.
* **API para POI**: Se desarrollaron nuevos endpoints (`GET /api/destinations/:id/pois`, `GET /api/pois/:id`) para exponer este nuevo contenido de forma estructurada.
* **Integración Frontend**: La página de detalle de un destino fue rediseñada para mostrar pestañas interactivas ("Atracciones", "Restaurantes") que listan los POI correspondientes, cada uno con su propia página de detalle.

### 2. Mejora Radical de la Interfaz y Experiencia de Usuario (UI/UX)
Se realizó un rediseño completo de las páginas clave para ofrecer una experiencia más moderna, profesional y, sobre todo, intuitiva y consistente.

* **Diseño en Capas y Profundidad**: Se implementó un patrón de diseño "Sheet" en las páginas de detalle. Una "hoja" de contenido con fondo sólido y bordes redondeados se superpone a una imagen de cabecera inmersiva. Esto crea un efecto de profundidad, separa claramente la información de las imágenes de fondo y establece una estética premium.
* **Jerarquía Visual Clara**: Mediante el uso estratégico de tamaños de fuente, grosores (`font-weight`) y el layout en capas, la interfaz ahora guía la vista del usuario hacia la información más importante primero, como el nombre del destino o del punto de interés.
* **Consistencia en la Interfaz**: El mismo patrón de diseño y los mismos componentes se reutilizan en las páginas de detalle de Destinos y de POI. Esta consistencia hace que la aplicación sea predecible y fácil de usar, ya que el usuario aprende a interactuar con ella una sola vez.
* **Retroalimentación Interactiva**: La experiencia de usuario se enriqueció añadiendo respuestas visuales a las acciones del usuario. Se utilizan `ion-spinner` durante las cargas de datos, `ion-toast` con mensajes de éxito para confirmar acciones (ej. "Lugar añadido al viaje"), y `ion-alert` para solicitar confirmaciones importantes (ej. "¿Seguro que quieres eliminar?").
* **Descubrimiento de Contenido Mejorado**: En la página "Explorar", se reemplazaron las listas estáticas por un carrusel horizontal interactivo (implementado con **Swiper.js** tras la eliminación de `<ion-slides>`), permitiendo a los usuarios descubrir lugares sin cambiar de contexto.

### 3. Implementación de Funcionalidades Avanzadas
Se construyeron herramientas potentes que transforman la aplicación en una verdadera plataforma de planificación.

* **Búsqueda Global Unificada**: Se implementó un endpoint `GET /api/search` que busca en múltiples tablas (`destinations` y `points_of_interest`) y devuelve resultados unificados. El frontend presenta estos resultados en una vista de búsqueda limpia, diferenciando cada tipo de resultado con iconos y texto, y optimizando el rendimiento con una lógica de **debouncing** mediante RxJS.
* **Evolución de Viajes a Itinerarios Detallados**: La funcionalidad central fue rediseñada para permitir una planificación real.
    * **Backend**: Se creó la tabla `itinerary_items` para conectar viajes (`trips`) con puntos de interés (`pois`), añadiendo la dimensión clave de `day_number`. El endpoint `GET /api/trips/:id` ahora devuelve el itinerario completo y ordenado. Se crearon también los endpoints para añadir y eliminar items del itinerario.
    * **Frontend**: Se implementó el flujo completo: el usuario puede añadir cualquier POI a uno de sus viajes a través de un `ion-action-sheet`. Se creó una nueva página de detalle del viaje que presenta el itinerario agrupado por días, permitiendo al usuario visualizar su plan de forma clara y gestionar las actividades.

### 4. Implementación de Medidas de Seguridad Robustas
La seguridad ha sido un pilar fundamental en el desarrollo, protegiendo tanto al usuario como a la integridad de la aplicación contra vulnerabilidades comunes.

* **Protección contra Inyección SQL (SQL Injection)**: La aplicación está protegida de forma nativa contra este tipo de ataques gracias al uso del ORM **Sequelize**. Todas las consultas a la base de datos se realizan a través de los métodos de Sequelize, que utilizan *consultas parametrizadas* (prepared statements). Esto asegura que la entrada del usuario siempre se trate como datos y nunca como código SQL ejecutable, neutralizando la amenaza de inyección.
* **Protección contra Cross-Site Scripting (XSS)**: El uso del framework **Angular** proporciona una defensa automática y robusta contra XSS. Angular, por defecto, sanitiza todas las variables que se renderizan en las plantillas (ej. con `{{ variable }}`). Esto significa que cualquier script o HTML malicioso que un usuario intente introducir se mostrará como texto plano en lugar de ejecutarse en el navegador de otros usuarios.
* **Protección contra Cross-Site Request Forgery (CSRF)**: La arquitectura de la API y el frontend implementan varias capas de mitigación. La configuración de **CORS (Cross-Origin Resource Sharing)** en el backend está restringida para aceptar peticiones únicamente desde el dominio del frontend. Adicionalmente, el uso de cookies `httpOnly` para el token JWT dificulta que scripts de otros sitios puedan secuestrar la sesión del usuario para realizar peticiones no autorizadas.
* **Seguridad de Contraseñas y Autenticación**:
    * **Hashing de Contraseñas**: Todas las contraseñas de los usuarios se almacenan en la base de datos después de ser procesadas con un algoritmo de hashing robusto (`bcryptjs`). Esto garantiza que, incluso en caso de una brecha de datos, las contraseñas originales no queden expuestas.
    * **JWT en Cookies `httpOnly`**: El token de sesión se almacena en una cookie `httpOnly`, lo que impide que sea accesible a través de JavaScript en el lado del cliente. Esta es una medida de seguridad crítica que previene el robo del token a través de ataques XSS.

---

## Pasos para Ejecutar el Proyecto

Esta guía cubre todos los pasos necesarios, desde la configuración del entorno hasta la ejecución del frontend y el backend.

### 1. Prerrequisitos
Antes de empezar, asegúrate de tener instalado el siguiente software en tu sistema.

* **Node.js**: Necesario para gestionar los paquetes y ejecutar el entorno de JavaScript.
* **Ionic CLI**: Instala la Interfaz de Línea de Comandos (CLI) de Ionic de forma global, que es esencial para compilar y ejecutar la aplicación.
    ```sh
    npm install -g @ionic/cli
    ```
* **MySQL**: El proyecto requiere una base de datos MySQL. Asegúrate de que el servicio esté instalado y en ejecución.
* **Git**: Necesario para clonar el repositorio del proyecto.

---

### 2. Configuración Inicial del Proyecto

1.  **Clonar el Repositorio**: Abre tu terminal y clona el proyecto desde GitHub en tu máquina local.
    * Usando HTTPS:
        ```sh
        git clone [https://github.com/Zorkats/ProyectoWebICI4247.git](https://github.com/Zorkats/ProyectoWebICI4247.git)
        ```
    * O usando SSH:
        ```sh
        git clone git@github.com:Zorkats/ProyectoWebICI4247.git
        ```
2.  **Navegar al Directorio del Proyecto**: Una vez clonado, entra en la carpeta principal del proyecto.
    ```sh
    cd ProyectoWebICI4247
    ```

---

### 3. Configuración y Ejecución del Backend
Sigue estos pasos en una terminal para poner en marcha el servidor.

1.  **Navegar al Backend**: Desde la raíz del proyecto, muévete al directorio del backend.
    ```sh
    cd backend
    ```
2.  **Configurar la Base de Datos**:
    * Crea una base de datos en tu instancia local de MySQL.
    * Ejecuta el script `database/schema.sql` (o `backend/src/config/db_info/schema.sql`) para crear la estructura de las tablas.
    * Ejecuta el script `backend/src/config/db_info/seeds.sql` para cargar datos iniciales como roles de usuario.
    * Crea un archivo llamado `.env` en la raíz de la carpeta `backend/`. Dentro de este archivo, define las variables de entorno para la conexión a tu base de datos (puerto, host, usuario, contraseña, etc.).
3.  **Instalar Dependencias**: Instala todos los paquetes de Node.js necesarios para el servidor.
    ```sh
    npm install
    ```
4.  **Iniciar el Servidor**: Ejecuta el servidor en modo de desarrollo.
    ```sh
    npm run dev
    ```
    El backend ahora estará activo, escuchando las peticiones de la API. Mantén esta terminal abierta.

---

### 4. Ejecución del Frontend
Sigue estos pasos en una **nueva terminal** para levantar la aplicación de Ionic.

1.  **Navegar al Frontend**: Desde la raíz del proyecto, muévete al directorio del frontend (probablemente llamado `front/`).
2.  **Instalar Dependencias**: Instala todos los paquetes necesarios para la aplicación de Ionic/Angular.
    ```sh
    npm install
    ```
3.  **Iniciar la Aplicación**: Compila y ejecuta el proyecto de manera local.
    ```sh
    ionic serve
    ```
    Este comando abrirá automáticamente la aplicación en tu navegador web. La aplicación frontend se conectará al backend que ya dejaste en ejecución.


## Roles del Sistema

- **Administrador supremo**: Puede administrar usuarios (edición, creación, eliminación), asignar roles de usuario y ver todos los viajes del sistema.
- **Administrador**: Puede crear nuevos elementos por defecto para que sean descubiertos por los usuarios. (Viajes, ciudades, hoteles, paises, etc)
- **Viajero (Usuario logeado)**: Puede generar itinerarios en base a criterios ingresados por el viajero, editar los itinerarios, ver su perfil y explorar planes preexistentes.
- **Invitado (Usuario sin logear)**: Puede solamente explorar los planes preexistentes del sistema, tiene restricciones dentro de las funcionalidades que entrega el sistema al viajero.

## Requerimientos Funcionales por Rol

### Rol-Administrador-Supremo
- **RF-ADS-01**: El Administrador Supremo debe poder visualizar una lista paginada de todos los usuarios registrados en el sistema, incluyendo su nombre, correo electrónico y rol asignado.
- **RF-ADS-02**: El Administrador Supremo debe poder crear nuevas cuentas de usuario especificando, como mínimo, nombre, contraseña inicial y asignando un rol.
- **RF-ADS-03**: El Administrador Supremo debe poder modificar la información de un usuario existente, incluyendo la reasignación de su rol dentro del sistema.
- **RF-ADS-04**: El Administrador Supremo debe poder eliminar permanentemente la cuenta de un usuario del sistema, previa confirmación.
- **RF-ADS-05**: El Administrador Supremo debe poder acceder a una vista que liste todos los itinerarios de viaje generados por cualquier usuario en el sistema, con opciones de filtrado o búsqueda básica.

### Rol-Administrador
- **RF-ADM-01**: El Administrador debe poder acceder a un panel de gestión de contenido para crear nuevos elementos, tales como destinos, puntos de interés o planes de viaje de ejemplo.
- **RF-ADM-02**: El Administrador debe poder visualizar, modificar y eliminar los elementos de contenido predeterminado existentes que haya creado o que tenga permiso para gestionar.
- **RF-ADM-03**: El Administrador debe poder asignar categorías, etiquetas o atributos relevantes a los elementos de contenido predeterminado para mejorar su filtrado y descubrimiento en la sección "Explorar".

### Rol-Viajero
- **RF-VJR-01**: El Viajero debe poder iniciar el proceso de Generación Automática de Itinerarios a través de un formulario donde especifique sus criterios de viaje.
- **RF-VJR-02**: El Viajero debe poder modificar cualquier itinerario previamente generado o guardado.
- **RF-VJR-03**: El Viajero debe poder acceder a la sección "Mis Viajes" donde visualizará sus itinerarios y podrá seleccionar opciones para ver detalles, editar o eliminar.
- **RF-VJR-04**: El Viajero debe poder visualizar sus itinerarios planificados en una vista de Calendario interactiva.
- **RF-VJR-05**: El Viajero debe poder acceder y modificar la información de su propio perfil, incluyendo datos personales y contraseña.
- **RF-VJR-06**: El Viajero debe poder navegar y utilizar las funciones de búsqueda y filtrado dentro de la sección Explorar para descubrir contenido preexistente.

### Rol-Invitado
- **RF-INV-01**: El Invitado debe poder navegar por la sección Explorar para visualizar destinos y planes de viaje preexistentes.
- **RF-INV-02**: El Invitado debe tener acceso claro y funcional a las opciones de Iniciar Sesión y Registrarse desde la interfaz principal.
- **RF-INV-03**: El Invitado debe ser redirigido a la pantalla de Login o Registro si intenta acceder a funcionalidades exclusivas para Viajeros.

## **Requerimientos Funcionales**

- **RF-01 Generación Automática de Itinerarios**
	- La aplicación debe generar itinerarios personalizados automáticamente en base a criterios ingresados por el usuario, como destino, fechas, presupuesto, intereses y tiempo disponible.
	- Se integrarán datos de APIs externas (Google Places, Eventbrite, OpenWeather) para enriquecer las sugerencias.

- **RF-02 Edición Manual del Itinerario**
	- Permitir al usuario editar el itinerario generado de forma automática, incluyendo reordenar actividades, modificar horarios, agregar o eliminar actividades.
	- Permitir al usuario personalizar completamente su plan de viaje.

- **RF-03 Gestión de Viajes en el Perfil de Usuario**
	- Cada usuario debe poder administrar sus viajes mediante una sección en su perfil que liste los viajes próximos y pasados, permitiendo ver, modificar o eliminar itinerarios guardados.

## **Requerimientos No Funcionales**

- **RNF-01 Diseño Responsivo y Adaptativo**
	- La interfaz debe ser responsiva y funcionar de manera óptima tanto en dispositivos móviles como en navegadores de escritorio.
	- Se aprovecha Ionic + Angular para lograr una experiencia coherente.

- **RNF-02 Seguridad y Protección de Datos**
	- Implementar medidas de seguridad robustas: autenticación con JWT, cifrado de contraseñas, validación de entradas y protección contra ataques comunes (XSS, CSRF, etc.).

- **RNF-03 Rendimiento y Tiempo de Respuesta**
	- La aplicación debe responder en tiempos razonables (por ejemplo, generación del itinerario en menos de 2 segundos) para garantizar una experiencia de usuario fluida.

- **RNF-04 Usabilidad y Experiencia de Usuario (UX)**
	- La interfaz debe ser intuitiva y amigable, facilitando la navegación entre pantallas y operaciones con componentes de Ionic (formularios, menús, tarjetas, etc.).
	- La interfaz debe contar con retroalimentación visual clara para cada acción del usuario.

- **RNF-05 Escalabilidad y Manejo de Carga**
	- El sistema debe estar diseñado para soportar múltiples usuarios concurrentes sin degradar el rendimiento.

- **RNF-06 Mantenibilidad y Modularidad del Código**
	- La arquitectura del proyecto debe ser modular y bien documentada.

- **RNF-07 Portabilidad y Despliegue Consistente**
	- La aplicación deberá ser fácilmente desplegable en distintos entornos mediante Docker.
	
## Arquitectura de la Información

La estructura de navegación fue representada en este diagrama y la experiencia de usuario en los bocetos de UI/UX.

### Estructura de Navegación
[Diagrama - Estructura de Navegación](https://drive.google.com/file/d/1HAgcLaaisBYtad-bqRewSm3UVK2Ebg6O/view?usp=sharing)
### Bocetos UX/UI
![Untitled-2025-04-20-2109](https://github.com/user-attachments/assets/a674629f-0b73-4969-886f-3893d016e833)


## Prototipo de diseño
[Figma - Prototipo de Gestión de Viaje](https://www.figma.com/community/file/1495974136760248327)

## Librerías y Tecnologías

- **Ionic Framework** (v7+)
- **Angular** (v15+)
- **TypeScript**
- **RxJS**
- **Angular Router**
- **Express**
