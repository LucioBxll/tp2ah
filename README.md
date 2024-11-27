lol_react
Aplicación web móvil creada con React y conectada a una API REST. Esta aplicación permite a los usuarios registrarse, iniciar sesión y explorar información sobre campeones y mapas del juego.

Características
Registro de Usuario: Los usuarios pueden registrarse proporcionando un nombre de usuario y una contraseña.
Inicio de Sesión: Los usuarios pueden iniciar sesión con sus credenciales.
Lista de Campeones: Muestra una lista de campeones con detalles como origen, línea, rol, recurso y dificultad.
Lista de Mapas: Muestra una lista de mapas con detalles como líneas y si tiene jungla.
Navegación: Navegación sencilla entre las diferentes secciones de la aplicación utilizando React Router.
Estructura del Proyecto
lol_react/
├── Api_lol_react/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Banner.jsx
│   │   │   ├── LoginForm.jsx
│   │   │   ├── MapCard.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── RegistroForm.jsx
│   │   │   └── LolChampCard.jsx
│   │   ├── views/
│   │   │   ├── campeones.jsx
│   │   │   ├── inicio.jsx
│   │   │   ├── mapas.jsx
│   │   │   ├── iniciarSesion.jsx
│   │   │   └── registrar.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.scss
│   ├── public/
│   ├── package.json
│   └── README.md
└── README.md
Instalación
Clona el repositorio:

git clone https://github.com/tu_usuario/lol_react.git
cd lol_react/Api_lol_react
Instala las dependencias:

npm install
Asegúrate de que tu API esté en funcionamiento en http://localhost:3000.

Ejecución
Para iniciar la aplicación, ejecuta el siguiente comando:

npm run dev
Esto iniciará la aplicación en modo de desarrollo. Abre tu navegador y ve a http://localhost:5173 para ver la aplicación en acción.

Uso
Registro: Ve a la página de registro para crear una nueva cuenta.
Inicio de Sesión: Accede a tu cuenta existente desde la página de inicio de sesión.
Explorar Campeones: Navega a la sección de campeones para ver la lista de campeones disponibles.
Explorar Mapas: Navega a la sección de mapas para ver la lista de mapas disponibles.
Contribuciones
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.

BACKEND
Tecnologías Utilizadas
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express
Base de Datos: MongoDB, Mongoose
Estructura del Proyecto
El proyecto está organizado en las siguientes carpetas:

public/: Contiene los archivos estáticos del frontend, incluyendo HTML, CSS y JavaScript.
models/: Contiene los modelos de Mongoose para interactuar con la base de datos.
node_api/: Contiene la lógica del servidor y las rutas de la API.
README.md: Este archivo, que proporciona información sobre el proyecto.
Instalación
Para instalar y ejecutar el proyecto, sigue estos pasos:

Clona el repositorio:

git clone https://github.com/LucioBxll/backend.git

cd backend.git
Instala las dependencias:

npm install
Configura la base de datos MongoDB. Asegúrate de tener MongoDB en funcionamiento y actualiza la cadena de conexión en el archivo de configuración.

Inicia el servidor:

npm start
Abre tu navegador y visita http://localhost:3000 para ver la aplicación en funcionamiento.

Funcionalidades
Visualización de Campeones: Los usuarios pueden ver una lista de campeones con su información básica.
Detalles del Campeón: Al hacer clic en un campeón, se muestra información detallada sobre él.
Filtrado de Campeones: Los usuarios pueden filtrar campeones según diferentes criterios.
