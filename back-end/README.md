# API Backend para Juego de Elecciones ('Noche en Arcadia')con Sistema de Gestión de Usuarios

Esta es una API backend desarrollada en Node.js utilizando Express y MongoDB para un juego de elecciones. Además, incluye un sistema de gestión de usuarios para autenticación y control de acceso.

## Funcionalidades del Juego Noche en Arcadia

La API proporciona las siguientes funcionalidades para el juego de elecciones:

1. **Creación de Árbol de Decisiones:** Permite definir y crear un árbol de decisiones para el juego de elecciones.
2. **Interacción con el Árbol de Decisiones:** Los usuarios pueden interactuar con el árbol de decisiones, tomando decisiones que afectarán al curso del juego.
3. **Desarrollo de la Historia:** Permite desarrollar una historia narrativa con múltiples caminos y finales basados en las decisiones de los usuarios.

## Funcionalidades del Sistema de Gestión de Usuarios

Además del juego de elecciones, la API también proporciona funcionalidades de gestión de usuarios:

1. **Registro de Usuarios:** Los usuarios pueden registrarse en el sistema proporcionando su nombre, apellido, correo electrónico y contraseña.
2. **Inicio de Sesión:** Los usuarios pueden iniciar sesión utilizando su correo electrónico y contraseña.
3. **Autenticación de Usuarios:** La API utiliza tokens JWT para autenticar a los usuarios en las solicitudes protegidas.
4. **Control de Acceso:** Se implementa un sistema de roles de usuario (root, admin, normal) para controlar el acceso a ciertas funcionalidades.

## Configuración del Proyecto

Para configurar y ejecutar el proyecto en tu entorno local, sigue estos pasos:

1. **Clona el Repositorio:**

   ```
   git clone <URL del repositorio>
   ```
2. **Instala las Dependencias:**

   ```
   npm install
   ```
3. **Configura la Base de Datos:**

   - Crea una base de datos MongoDB.
   - Copia el archivo `.env.example` a `.env` y configura la URL de conexión a la base de datos.
4. **Ejecuta la Aplicación:**

   ```
   npm start
   ```
5. **Accede a la API:**
   La API estará disponible en http://localhost:3000.

## Documentación de la API

Para obtener información detallada sobre los endpoints de la API y cómo utilizarlos, consulta la documentación en [Postman](link_postman).[colection](https://drive.google.com/file/d/1mQBY_-ZW3GfU3KH_m8pHZ3yqKP8ip1Vm/view?usp=drive_link)

¡Disfruta del juego de elecciones y del sistema de gestión de usuarios!

```

```
