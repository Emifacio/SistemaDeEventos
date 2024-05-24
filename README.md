# Sistema de Gestión de Eventos

## Descripción del Proyecto

El objetivo de este proyecto es desarrollar un sistema básico de gestión de eventos donde los usuarios puedan registrarse, iniciar sesión y gestionar eventos (crear, ver, actualizar y eliminar). El sistema cuenta con una interfaz web (frontend) y una API (backend) que soporta las operaciones necesarias.

## Tecnologías Utilizadas

### Backend
- **Python** con **Flask**
- **PostgreSQL**
- **JWT** para autenticación

### Frontend
- **React** 
- **Bootstrap** para el diseño responsivo

### Otros
- **Docker** para contenedores
- **GitHub Actions** (o **Travis CI/CircleCI**) para CI/CD
-  **Vercel** para desplegar el backend
- **Netlify** (o **Vercel**) para desplegar el frontend

## Funcionalidades

1. **Registro de Usuario**
2. **Inicio de Sesión**
3. **Crear Evento**
4. **Listar Eventos**
5. **Actualizar Evento**
6. **Eliminar Evento**
7. **Ver Detalles de un Evento**

## Configuración del Entorno de Desarrollo

### Prerrequisitos

- **Node.js** y **npm** 
- **Python** y **pip**
- **Docker Desktop**
- **Visual Studio Code** (u otro editor de código)
- **PostgreSQL** (puedes usar una base de datos local o un servicio en la nube)

### Pasos para Configurar el Proyecto

1. Clona el repositorio:
    ```sh
    git clone https://*******
    cd sistema-gestion-eventos
    ```

2. Configura el Backend:

 **Python/Flask:**
    ```sh
    cd backend
    pip install -r requirements.txt
    ```

3. Configura el Frontend:
    ```sh
    cd frontend
    npm install
    ```

4. Configura las Variables de Entorno:

    Crea un archivo `.env` en la carpeta del backend con las siguientes variables:
    ```env
    PORT=5000
    DB_URL=PostgreSQL://localhost:27017/eventos 
    JWT_SECRET=your_secret_key
    ```

5. Inicia los Servicios:

    **Backend:**
    ```sh
    cd backend
    npm start (o python app.py)
    ```

    **Frontend:**
    ```sh
    cd frontend
    npm start
    ```

### Uso de Docker

1. Construye y corre los contenedores:
    ```sh
    docker-compose up --build
    ```

2. Accede a la aplicación en el navegador:
    - Frontend: `http://localhost:3000`
    - Backend: `http://localhost:5000`

## Despliegue

### Despliegue del Backend

1. Crea una cuenta en  **Vercel**.
2. Sube el backend Vercel siguiendo las instrucciones de su documentación.

### Despliegue del Frontend

1. Crea una cuenta en **Netlify** (o **Vercel**).
2. Conecta el repositorio y despliega el frontend siguiendo las instrucciones de su documentación.

## Documentación de la API

Los endpoints de la API y sus descripciones se pueden encontrar en el archivo `API_DOCUMENTATION.md` en la raíz del repositorio.

## Pruebas

1. Ejecuta las pruebas del Backend:
    ```sh
    cd backend
    npm test (o pytest)
    ```

2. Ejecuta las pruebas del Frontend:
    ```sh
    cd frontend
    npm test
    ```

## CI/CD

El pipeline de CI/CD está configurado utilizando **GitHub Actions**. Cada vez que se hace un push al repositorio, se ejecutan las pruebas automáticamente.

## Contribuciones

Si deseas contribuir al proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza los cambios necesarios y haz commit (`git commit -m 'Agrega nueva funcionalidad'`).
4. Empuja los cambios a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.


## Contacto

Si tienes alguna pregunta o sugerencia, por favor contacta a @emifacio en facio.gabrielemiliano@gmail.com.
