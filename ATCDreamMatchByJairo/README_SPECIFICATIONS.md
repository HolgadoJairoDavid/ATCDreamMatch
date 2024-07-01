# Frontend Vite React Project - ATC Dream Match - README
Este proyecto de frontend utiliza Vite como herramienta de construcción rápida para aplicaciones React. Incorpora Axios para solicitudes HTTP, Zustand para la gestión de estados, React Router DOM para el enrutamiento y Docker para la creación de un entorno de desarrollo consistente.

## Requisitos previos
- Node.js y npm: Asegúrate de tener Node.js y npm (o yarn) instalados en tu sistema. Puedes verificar las versiones con node -v y npm -v.
- Docker (Opcional): Si deseas utilizar el entorno de desarrollo Dockerizado, instala Docker Desktop.

## Instalación y ejecución
- ### Clonar el repositorio:

``` git clone https://github.com/HolgadoJairoDavid/ATCDreamMatch.git cd *ATCDreamMatchByJairo* ```


- ### Instalar dependencias:

````
npm install 
````
- ### Levantar el proyecto (Opción 1: Node.js directo):

````
npm run dev
````
Esto iniciará el servidor de desarrollo de Vite. Abre tu navegador y visita http://localhost:8000.

- ### Levantar el proyecto (Opción 2: Docker):

````
docker compose up -d --force-recreate --build vite_docker
````
Esto construirá la imagen de Docker y levantará el contenedor. La aplicación estará disponible en http://localhost:8000.

## Estructura del proyecto

```` 
/src: Contiene el código fuente de la aplicación React.

/components: Componentes reutilizables de la interfaz de usuario.

/views: Componentes que representan las diferentes vistas de la aplicación.

/stores: Lógica de gestión de estados con Zustand.

/services: Funciones para realizar solicitudes HTTP con Axios.

/public: Archivos estáticos que no se procesan con Vite (por ejemplo, index.html).

/assets:  Imágenes utilizadas en la aplicación.

/lib: Configuración básica de axios.

/helpers: Funciones auxiliares y utilidades que se utilizan en diferentes partes de la aplicación.

vite.config.js: Archivo de configuración de Vite.

vercel.json: Archivo de configuración de deploy con vercel.

docker-compose.yml: Archivo de configuración de Docker Compose (si se utiliza).

````

- ### Docker
Si utilizas Docker, puedes personalizar el archivo docker-compose.yml para ajustar la configuración del contenedor (por ejemplo, puertos, variables de entorno).
