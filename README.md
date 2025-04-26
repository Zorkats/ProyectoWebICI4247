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
3. [Pasos para ejecutar el Proyecto](#pasos-para-ejecutar-el-proyecto)
4. [Roles del Sistema](#roles-del-sistema)
5. [Requerimientos Funcionales por Rol](#requerimientos-funcionales-por-rol)
6. [Requerimientos Funcionales](#requerimientos-funcionales)
7. [Requerimientos No Funcionales](#requerimientos-no-funcionales)
8. [Arquitectura de la Información](#arquitectura-de-la-información)
9. [Prototipo de Diseño](#prototipo-de-diseño)
10. [Librerías y Tecnologías](#librerías-y-tecnologías)

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
  
    

## Pasos para ejecutar el Proyecto
De manera preliminar, asegurarse de instalar **Node.js**
1. Primeramente se debe de hacer instalacion de Ionic, donde mediante la terminal seria: `npm install -g @ionic/cli`
2. Con Ionic instalado, se procede a clonar el proyecto desde Github en el presente repositorio. Esto se logra usando la terminal y escribiendo **HTTPS**: `git clone https://github.com/Zorkats/ProyectoWebICI4247.git` **SSH**: `git clone git@github.com:Zorkats/ProyectoWebICI4247.git`
3. Una vez se tenga el directorio **ProyectoWebICI4247**, lo abrimos y ejecutamos en la terminal (estando dentro del directorio) `npm install package.json`. Instalando las dependencias del proyecto.
4. Ya con las dependencias instaladas, procedemos a compilar y ejecutar el proyecto con `ionic serve`. Abriendo de manera local el proyecto.


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
