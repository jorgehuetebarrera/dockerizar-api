## Documentación del Proyecto

Este repositorio contiene el código fuente del proyecto, que está dividido en una parte back-end y una parte front-end. A continuación, se detallan ambos aspectos del proyecto.

### Back-End

El back-end del proyecto consiste en una API RESTful construida con Express y MongoDB para gestionar usuarios y autenticación.

#### Estructura del Proyecto Back-End

El proyecto back-end está estructurado de la siguiente manera:

back-end/
│
├── carpeta controllers/
│   ├── userController.js
│   └── authController.js
│
├── carpeta routes/
│   ├── index.js
│   └── user-router.js
│
├── carpeta services/
│   └── database/
│       ├── dbConfig.js
│       └── userdb.js
│
├── carpeta test/
│   ├── auth-controller.test.js
│   ├── user-controller.test.js
│   ├── user-middleware.test.js
│   └── auth-middleware.test.js
│
├── carpeta utils/
│   ├── logger.js
│   └── pagination.js
│
├── app.js
├── config.js
└── index.js

#### Ejemplos de Código

A continuación, se presentan algunos ejemplos de código de los archivos mencionados:

* **userController.js** :

```
import User from '../models/user.js';export const register = async (req, res) => {
  // Implementación de la lógica para registrar un nuevo usuario
};export const login = async (req, res) => {
  // Implementación de la lógica para el inicio de sesión de usuario
};
```




* **user-router.js** :

```
import { Router } from 'express';
import { register, login } from '../controllers/userController.js';const router = Router();router.post('/register', register);
router.post('/login', login);export default router;
```


* **dbConfig.js** :

```
import mongoose from 'mongoose';const uri = process.env.DB_URL;const options = {};const connectDB = async () => {
  try {
    await mongoose.connect(uri, options);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
};export default connectDB;
```


### Front-End

El front-end del proyecto está construido con React y consiste en una interfaz de usuario para interactuar con la API back-end.

#### Estructura del Proyecto Front-End

El proyecto front-end está estructurado de la siguiente manera:

front-end/
│
├── carpeta components/
│   ├── app/
│   │   ├── App.js
│   │   ├── ArbolDecisiones.js
│   │   ├── CreateUser.js
│   │   ├── LoginForm.js
│   │   └── styles.css
│   │
│   └── index.js
│
├── index.js
├── index.css
└── reportWebVitals.js

#### Ejemplos de Código

A continuación, se presentan algunos ejemplos de código de los archivos mencionados:

* **App.js** (Componente principal):

```
import React, { useState } from 'react';
import LoginForm from './logingForm';
import ArbolDecisiones from './ArbolDecisiones';
import CreateUser from './CreateUser';
import './styles.css';function App() {
  // Lógica del componente
}export default App;
```


* **LoginForm.js** (Componente para el formulario de inicio de sesión):

```
import React, { useState } from 'react';
import './styles.css';const LoginForm = ({ onLoginSuccess }) => {
  // Lógica del componente
};export default LoginForm;
```


### Ejecución del Proyecto

Para ejecutar el proyecto, siga los siguientes pasos:

1. **Back-End** :

* Asegúrese de tener MongoDB instalado y configurado.
* Instale las dependencias del proyecto con `npm install`.
* Inicie el servidor con `npm start`.

1. **Front-End** :

* Asegúrese de tener Node.js y npm instalados.
* Instale las dependencias del proyecto con `npm install`.
* Inicie la aplicación React con `npm start`.
