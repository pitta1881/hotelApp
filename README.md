## Proyecto

El presente proyecto es un Trabajo Práctico Final Integrador de Conocimientos para la materia Programación en Ambiente Web de la Universidad Nacional de Luján.  
Se hará uso de estrategias como Mobile First, Mashups, CSS Reset, y Accesibilidad Web entre otros.  
Mas información en **Documentacion/TP_Integrador_PAW.pdf** .

## Propuesta

La idea del proyecto es el desarrollo de una página web para la administración de un hotel, permitiendo un ABM de reservas, habitaciones, servicios, fotos y usuarios (de backend).  
También se permitirá integrar proveedores de servicios cercanos al hotel (gastronomía, atracciones, supermercados) que pagando un abono mensual, tendrán el derecho a ser listados en primer orden y sobresalir visualmente en el mapa de servicios.  
Por el lado del usuario final, éste podrá ver información del hotel, habitaciones, servicios, fotos, ubicación, lugares de interes cercano y podrá contactarse con ellos mediante un formulario.  
En **Documentacion/Diagrama_Hotel.pdf** encontrará un sencillo diagrama de clases del proyecto.  
En **Documentacion/Wireframes.pdf** encontrará los wireframes del proyecto.

## Autor

- Patricio Ariel Pittavino
- Email: pitta1881@gmail.com
- Leg.: 121476

## Tecnologías

### Backend

- [Nest.js](https://nestjs.com/) - Framework de Node.js basado en TypeScript.
- Base de Datos - [PostgreSQL](https://www.postgresql.org).
- ORM - [TypeORM](https://github.com/typeorm/typeorm)
- Documentador - [Swagger](https://github.com/nestjs/swagger)
- Hashing Password - [bcrypt](https://www.npmjs.com/package/bcrypt)
- Autenticación - [passport-local](https://www.npmjs.com/package/bcrypt) y [jwt](https://jwt.io/)
- Mailer - [@nestjs-modules/mailer y Nodemailer](https://nest-modules.github.io/mailer/)

### Frontend

- [Handlebars](https://handlebarsjs.com/) - Motor de Plantillas.

### Desarrollo

- [Git](https://git-scm.com/) - Control de Versiones.
- [VS Code](https://code.visualstudio.com/) - Editor de Código.
- [Docker](https://www.docker.com/) - Contenedores. (Pg y PgAdmin)

## Instalación de Depedencias

```bash
$ npm install
```

## Iniciar Contenedores Docker

```bash
$ docker-compose up
```

## Limpiar schema y Base de Datos

```bash
$ npm run typeorm:drop
```

## Generación de Base de Datos y Seeds de prueba

```bash
$ npm run migrations:run
$ npm run seeds:run
```

## Iniciar la App

```bash
$ npm run start
```

## Abrir Navegador

<pre>
<a href="http://localhost:3000">http://localhost:3000</a>
</pre>

## Documentación y prueba de la API

<pre>
<a href="http://localhost:3000/api/docs">http://localhost:3000/api/docs</a>
</pre>

## Notas

- Antes de iniciar la app, completar el archivo .env con los datos solicitados.
- Las credenciales del usuario y hotel de prueba están en swagger(http://localhost:3000/api/docs/#/Auth/AuthController_login), sección Auth.
- Al crear un nuevo Hotel, se asigna una uri(nombre_uri) para despues llamarla por URL, la cual sera con trim(), lowerCase() y sin espacios.
- Al crear un nuevo Hotel, se crea un usuario por defecto con las siguientes credenciales que luego se pueden modificar:
  - nombre: `admin-{{nombre_uri}}`
  - apellido: `admin-{{nombre_uri}}`
  - email: `admin-{{nombre_uri}}@mail.com`
  - nick: `admin-{{nombre_uri}}`
  - password: `admin123`
- Al recibir un Contacto, se envía un email con la copia del mensaje al cliente, y un email a todos los usuarios del hotel en cuestión asi como al email definido para el hotel.

<small><i>Documento en constante actualización.</i></small>
