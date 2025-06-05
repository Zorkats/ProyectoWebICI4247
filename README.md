## Índice

1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Roles del Sistema](#roles-del-sistema)
3. [Requerimientos Funcionales por Rol](#requerimientos-funcionales-por-rol)
4. [Requerimientos Funcionales](#requerimientos-funcionales)
5. [Requerimientos No Funcionales](#requerimientos-no-funcionales)
6. [Arquitectura de la Información](#arquitectura-de-la-información)
7. [Prototipo de Diseño](#prototipo-de-diseño)
8. [Librerías y Tecnologías](#librerías-y-tecnologías)
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

@@ -109,7 +133,7 @@ La estructura de navegación fue representada en este diagrama y la experiencia


## Prototipo de diseño
[Figma - Prototipo de Gestión de Viaje](https://www.figma.com/design/m7J4ZW6fQPdBScFVKbOkJu/WEB-Y-MOVIL-FIGMA?node-id=241-220&t=jSjsnV8ZDIaLHReQ-1)
[Figma - Prototipo de Gestión de Viaje](https://www.figma.com/community/file/1495974136760248327)

## Librerías y Tecnologías
