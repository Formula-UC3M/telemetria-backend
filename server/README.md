![header](.osweekends/img/OSW-project-GitHub-template-header.jpg)

# Fórmula UC3M Server
## Servidor para guardado y explotación de datos en tiempo real.

> Proyecto para la realización de la telemetría al monoplaza de la UC3M. Dentro del proyecto, esta parte se encargará de la gestión del guardado y explotación de datos, en tiempo real.

## Tecnologías

- [**Node JS**](https://nodejs.org/en/): Entorno de ejecución de Javascript que funciona sobre el motor v8 de Google Chrome.
- [**MongoDB**](https://www.mongodb.com/es): Almacenamiento de datos para consulta en tiempo real.
- [**Mosca**](https://github.com/mcollina/mosca/wiki): Broker [MQTT](https://geekytheory.com/que-es-mqtt) para [Node JS](https://nodejs.org/en/).
- [**Pillars**](http://pillarsjs.com/): Framework de desarrollo web para Node.js.

## Instalación

Primero clona este repositorio:

```shell
git clone git@github.com:OSWeekends/formula-uc3m.git
```

Es necesario recordar que debes de tener instalado en tu ordenador MongoDB, Node JS y NPM (Gestor de paquetes de Node JS) antes de empezar a instalar este proyecto.
Una vez clonado puedes entrar a la carpeta `./server` y ejecutar el siguiente comando:

```shell
npm install
```

Una vez realizado esto ya deberían estar instaladas todas las dependencias de este paquete. Ahora debes copiar el fichero `.env.example` y crear un fichero `.env`, dentro debes sustituir la configuración de ejemplo por la de tu base de datos.

Una ver realizado esto ya estaría completamente instalado y listo para arrancar (recuerda arrancar el servidor de base de datos antes de arrancar este servidor).

**Cómo iniciar el servidor**

```sh
npm start
```
Abre la url http://localhost:3001/ (Siendo localhost y 3001 el host y el port que asignaste en el archivo .env).

**Cómo comprobar los test**

```sh
npm test
```

**Cómo comprobar que el código cumple la especificación del [linter](https://eslint.org/docs/about/)**

```sh
npm run lint
```

## Equipo

De la creación y gestión del servidor de datos en tiempo real se encargará el equipo ArduData.

- [Javier Gallego (@bifuer)](https://github.com/bifuer) (lider ArduData) Fullstack
- [Sebastián Cabanas (@Sediug)](https://github.com/Sediug) (lider ArduData) Fullstack
- [Rubén Moreno (@rubenmoreno94)](https://github.com/rubenmoreno94) (contributor) Pruebas de conexión Arduino <-> Servidor
- Todas las personas que se quieran unir al equipo que envien un PR con su info sustituyendo este mensage :P

## Contribuir
Puedes contribuir, al apartado de backend dentro del proyecto de Formula UC3M, leyendo las [issues con la etiqueta back](https://github.com/OSWeekends/formula-uc3m/issues?q=is%3Aopen+is%3Aissue+label%3ABack).


![footer](.osweekends/img/OSW-project-GitHub-template-footer.jpg)
