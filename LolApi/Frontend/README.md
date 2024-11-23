# lol_react

Aplicación web móvil creada con React y conectada a una API REST. Esta aplicación permite a los usuarios registrarse, iniciar sesión y explorar información sobre campeones y mapas del juego.

## Características

- **Registro de Usuario**: Los usuarios pueden registrarse proporcionando un nombre de usuario y una contraseña.
- **Inicio de Sesión**: Los usuarios pueden iniciar sesión con sus credenciales.
- **Lista de Campeones**: Muestra una lista de campeones con detalles como origen, línea, rol, recurso y dificultad.
- **Lista de Mapas**: Muestra una lista de mapas con detalles como líneas y si tiene jungla.
- **Navegación**: Navegación sencilla entre las diferentes secciones de la aplicación utilizando React Router.

## Estructura del Proyecto

```
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
```

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu_usuario/lol_react.git
   cd lol_react/Api_lol_react
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Asegúrate de que tu API esté en funcionamiento en `http://localhost:3000`.

## Ejecución

Para iniciar la aplicación, ejecuta el siguiente comando:

```bash
npm run dev
```

Esto iniciará la aplicación en modo de desarrollo. Abre tu navegador y ve a `http://localhost:5173` para ver la aplicación en acción.

## Uso

- **Registro**: Ve a la página de registro para crear una nueva cuenta.
- **Inicio de Sesión**: Accede a tu cuenta existente desde la página de inicio de sesión.
- **Explorar Campeones**: Navega a la sección de campeones para ver la lista de campeones disponibles.
- **Explorar Mapas**: Navega a la sección de mapas para ver la lista de mapas disponibles.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
