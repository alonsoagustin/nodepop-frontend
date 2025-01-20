# Descripción del proyecto

Frontend de una aplicación que permite a los usuarios realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre anuncios, además de filtrarlos. Incluye un sistema de notificaciones para mejorar la experiencia del usuario. Se conecta con la API pública de [Sparrest](https://github.com/kasappeal/sparrest.js) para gestionar los datos de usuarios y anuncios.

### **Tecnologías utilizadas**

- **HTML**
- **CSS**
- **Bootstrap**
- **JavaScript** (sin frameworks ni librerías externas)

## Instalación y uso

1. Clonar este repositorio e instalar sus dependencias.

```bash
git clone https://github.com/alonsoagustin/nodepop-frontend.git
```

```bash
cd nodepop-frontend
npm install
```

2. Hacer lo mismo con el repositorio de [Sparrest](https://github.com/kasappeal/sparrest.js).

```bash
git clone https://github.com/kasappeal/sparrest.js.git
```

```bash
cd sparrest.js
npm install
```

3. Configurar la base de datos.

Sustituye el archivo `db.json` del repositorio de [Sparrest](https://github.com/kasappeal/sparrest.js) por el archivo `db.json` que está en este proyecto.
Puedes encontrar este archivo en la carpeta raíz del repositorio.

4. Ejecutar el servidor de [Sparrest](https://github.com/kasappeal/sparrest.js).

```bash
cd sparrest.js
npm start
```

Esto iniciará el backend de [Sparrest](https://github.com/kasappeal/sparrest.js) en tu máquina local.
Asegúrate de que el servidor de [Sparrest](https://github.com/kasappeal/sparrest.js) esté corriendo antes de usar la aplicación frontend.

5. Ejecutar el proyecto

Puedes utilizar la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) en tu editor para abrir y visualizar el archivo `index.html`.

6 Ver la aplicación

Con ambos servidores corriendo, puedes abrir tu navegador y acceder al frontend en http://localhost:3000 (o en el puerto que Live Server asigne).
Ahora podrás interactuar con la aplicación usando los datos proporcionados por la API de [Sparrest](https://github.com/kasappeal/sparrest.js).

## Futuras mejoras

Las siguientes características están planeadas para futuras versiones:

- Mejorar el sistema de búsqueda de anuncios.
- Desarrollar la paginación en la página **index.html** para mejorar la visualización de los anuncios.
