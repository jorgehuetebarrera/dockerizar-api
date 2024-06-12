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

# Backend de la Aplicación

Este repositorio contiene el código del backend de nuestra aplicación. El backend es responsable de manejar la lógica de negocio y la interacción con la base de datos.

## Estructura de Carpetas

El backend está organizado en varias carpetas, cada una con un propósito específico:

* **`loaders`** : Contiene archivos de inicialización de la aplicación, donde se configuran y cargan los módulos necesarios como Express, bases de datos, etc.
* **`middlewares`** : Aquí se encuentran los middlewares utilizados en la aplicación, como la validación de datos de usuario y la autenticación.
* **`models`** : Define los esquemas de los modelos de datos utilizados en la aplicación, utilizando Mongoose para interactuar con la base de datos MongoDB.
* **`openapi`** : Contiene archivos YAML que definen la especificación OpenAPI de la API REST.
* **`routes`** : Define las rutas de la API REST, que dirigen las solicitudes HTTP a los controladores correspondientes.
* **`services`** : Aquí se encuentran los servicios utilizados en la aplicación, como la configuración de la base de datos y otros servicios utilitarios.
* **`test`** : Contiene archivos de pruebas unitarias para los controladores y middlewares de la aplicación.
* **`utils`** : Incluye archivos de utilidades, como un logger y funciones de paginación.

## Configuración

El archivo `config.js` contiene la configuración de la aplicación, como el puerto en el que se ejecutará el servidor y las credenciales de acceso a servicios externos, que se cargan desde variables de entorno.

c

```
onst config = {
      port: process.env.PORT || 3000,
      icon: {
        url:process.env.ICON_URL,
        apiKey: process.env.ICON_API_KEY,},
        app: {
          secretKey: process.env.SECRET_KEY,
          dbUrl: process.env.DB_URL,
        },
}
```

## Base de Datos

Utilizamos MongoDB como base de datos para nuestra aplicación. La conexión con la base de datos se establece en el archivo `dbConfig.js` dentro de la carpeta `services/database`.

i

```
mport mongoose from 'mongoose';const uri = 'mongodb+srv://user:1234@stories.q7jbuug.mongodb.net/?retryWrites=true&w=majority';const options = {
};const connectDB = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log('Conectado a MongoDB Atlas');
  } catch (error) {
    console.error('Error al conectar a MongoDB Atlas:', error);
  }
};export default connectDB;
```

## Pruebas

La carpeta `test` contiene archivos de prueba unitaria para los controladores y middlewares de la aplicación. Utilizamos Jest como framework de pruebas.

```
describe('User Middleware', () => {
  // Mock req, res objects for testing
  let req, res, next;
  beforeEach(() => {
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });  describe('validateUserData middleware', () => {
    test('should pass validation with valid user data', () => {
      const validUserData = {
        name: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        role: 'admin',
      };      req.body = validUserData;      validateUserData(req, res, next);      expect(next).toHaveBeenCalledTimes(1);
    });    // Más pruebas aquí...
  });
});
```

## Documentación de la API

La especificación OpenAPI de la API REST se encuentra en la carpeta `openapi`, dividida en archivos YAML para mantenerla organizada y legible.

## Autores

* Jorge Huete Barrera

```

```
