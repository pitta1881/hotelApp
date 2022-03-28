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

### Frontend

- [Handlebars](https://handlebarsjs.com/) - Motor de Plantillas.

### Desarrollo

- [Git](https://git-scm.com/) - Control de Versiones.
- [VS Code](https://code.visualstudio.com/) - Editor de Código.

## Instalación de Depedencias

```bash
$ npm install
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
<a href="http://localhost:3000/docs">http://localhost:3000/docs</a>
</pre>

<small><i>Documento en constante actualización.</i></small>
