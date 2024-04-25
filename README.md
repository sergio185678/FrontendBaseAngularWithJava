# FrontendBaseAngularWithJava

Este proyecto es un conjunto completo de herramientas esenciales para desarrollar aplicaciones en Angular. Encuentra la aplicación desplegada [aquí](https://frontendbaseangularwithjava.netlify.app/inicio).

![image](https://github.com/sergio185678/FrontendBaseAngularWithJava/assets/67492035/8015eda4-de58-431c-8066-db3fbc656c60)

Link del repositorio del backend: https://github.com/sergio185678/MyProjectJavaSpringBoot

## Estructura del Proyecto

- **Components:** Contiene todos los componentes que representan cada sección de la aplicación.
- **Environments:** Define la ruta base del backend.
- **Guards:** Proporciona seguridad para restringir el acceso a ciertas áreas de la aplicación. Incluye configuraciones para usuarios no autenticados y autenticados.
- **Models:** Ofrece representaciones de los objetos utilizados en la aplicación.
- **Services:** Contiene lógica para realizar peticiones al backend, con servicios personalizados para cada caso de uso.
- **Shared:** Archivos compartidos y reutilizables, como interceptores para mostrar pantallas de carga y un navbar.

## Características Destacadas

- **Lazy Loading:** Se implementó la carga diferida para los componentes, optimizando el rendimiento.
- **Interceptors:** Se han creado interceptores para incluir automáticamente la autorización en las cabeceras de las peticiones y para mostrar un spinner durante la carga.
- **Rutas Protegidas:** Todas las rutas están protegidas, redirigiendo a los usuarios no autenticados al inicio de sesión.
- **Inyección de Dependencias:** Se emplea la inyección de dependencias mediante el uso de `inject` para facilitar la gestión y la reutilización del código.
- **JWT Frontend:** Se configuró la gestión de tokens JWT en el frontend, validando su autenticidad y vigencia con el backend.
- **Funcionalidades de Tablas:** Se añadieron funciones avanzadas a las tablas, como búsqueda, paginación y opciones de descarga en PDF y Excel.
- **Administración de Archivos:** Se implementó un sistema de gestión de archivos por usuario, con opciones para agregar, ver y eliminar archivos.
- **Control de Acceso:** Se estableció el acceso a las funciones de edición y eliminación solo para usuarios con roles de administrador.
- **Exportación de Datos:** Se agregaron funcionalidades para descargar información personalizada de cada usuario en formato PDF.

Este proyecto proporciona una base sólida para el desarrollo de aplicaciones frontend con Angular, integrando características avanzadas y buenas prácticas de programación.
