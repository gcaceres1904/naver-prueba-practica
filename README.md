## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

- [Node.js](https://nodejs.org/) (v22.13.1 o superior)
- [npm](https://www.npmjs.com/) (v10.9.2 o superior)

## Instalación

Sigue estos pasos para configurar y levantar el proyecto en tu máquina local.

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/gcaceres1904/naver-prueba-practica
   cd naver-prueba-practica
   
2. **Instala las dependencias:** 
   ```bash
   npm i
   
3. **Levanta el backend simulado**
   ```bash
   npx json-server db.json

4. **Abre un nuevo terminal de CMD en el mismo directorio y levanta el frontend**
   ```bash
   npm run dev
   
5. **Navega**

La consola indicará en que puertos esta levantado el sistema, por defecto son [http://localhost:3000](http://localhost:3000) para backend y [http://localhost:5173](http://localhost:5173) para frontend

Al ser un proyecto de prueba los usuarios y contraseñas están almacenados sin encriptar en el archivo db.json.

Por ejemplo:
   -username: usuario1 y password: password123
