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

4. **Levanta el frontend**
   ```bash
   npm run dev
   
5. **Navega**

Al ser un proyecto de prueba los usuarios y contraseñas están almacenados sin encriptar en el archivo db.json.

Por ejemplo:
   -username: usuario1 y password: password123