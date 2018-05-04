# Backlog

El objetivos de este documento es dejar claro el rumbo del proyecto y nuestro compromiso con las entregas.

Es un documento muy vivo, por lo que te recomendamos que lo revises cada poco tiempo. COmo minimo este Guild se compromete a actualziarlo al principio y al final de cada sprint.

#### Backlog producto

Aquí se definen todas las funcionalidades que componen nuestro producto final.

- **Sacar todos los datos posibles del coche:** {{Descripción Corta}}
- **Almacenar la información del coche en una base de datos:** {{Descripción Corta}}
- **La información debe ser compatible con APIRest y Matlab:** {{Descripción Corta}}
- **Visualización por web de los datos críticos en tiempo real** {{Descripción Corta}}
- **El coche no contará con una estación en tierra** Por lo que el coche debera de ser capaz de conectar a internet por si mismo (4G)
- **El sistema debe ser fuerte e independiente** El coche necesita correr en paises extrajeros y en condiciones duras, especialmente calor.
- **Admás del Arduino y sus sensores debemos ocuparnos de la ECU** Es interesante poder extraer la información que se pueda y se envie al servidor
- **El sistema debe ser calibrable** {{Descripción Corta de Paco y @Bifuer}}

#### Backlog técnico

Aquí se definen todas las funcionaldiades de caracter tecnico que necsitamos desarrollar/integrar en nuestro producto

- **Arduino Mega con código a pelo:** El Arduino mega gestionará la lectura e interpretación básica de la información de los sensores
- **COmunicación I2C entre Arduino y Raspi**
- **Raspberry 3** Encargada de enviar la información recolectada del arduino + ECU al servidor vía MQTT. Utilizando una tarjeta de 4G
- **Pillars + Mongo + Mosca** para gestionar toda la disgestión de información como backend.
- **ApiRest y/o WS** Para facilitar las consultas de front y las consultas por eventos usando realtime
- **VUE y Charts.js** Param gestionar la visualización y consultas desde el front

#### Otros elementos

Aquí se definen todos lso elemntos que no forman parte de del desarrollo del prodcuto tecnológico pero sí de su ciclo de vida como por ejemplo campañas promocionales en redes sociales, branding, etc...

- **{{Nombre elemento}}:** {{Descripción Corta}}
- ...


#### Roadmap

Aquí definimos lo que esperamos implementar de manera "muy generica" en próximas releases

Se han definido Sprints cada dos semanas, ya que contamos con poco tiempo para realizar todo el proyecto.

Los nombres que usaremos en las releases, aún están [debatiendose](https://github.com/OSWeekends/formula-uc3m/issues/20)

**{{Nombre de la release}} P0 (Zero Code):**
- Fecha Fin: 30 Marzo
- Objetivos:
  - [ ] Tener las cosas claras y resolver todas las dudas en general
  - [ ] Trazar un plan maestro
  - [ ] Generar un Readme.md
  - [ ] Generar un Backlog.md
  - [ ] Preparar una presentación
  - [ ] Comprar materiales

**{{Nombre de la release}} P1 (fast MVP):**
- Fecha Fin: 15 Abril
- Objetivos:
  - [ ] MVP con un sensor o varios
  - [ ] Tener un replica para trabajar construida en Campus

**{{Nombre de la release}} P2:**
- Fecha Fin: 30 Abril
- Objetivos:
  - [ ] *TBD*


**{{Nombre de la release}} P3:**
- Fecha Fin: 15 Mayo
- Objetivos:
  - [ ] *TBD*

**{{Nombre de la release}} P4 (v1.0.0):**
- Fecha Fin: 1 Junio
- Objetivos:
  - [ ] *TBD*
  
**{{Nombre de la release}} P5:**
- Fecha Fin: 15 Junio
- Objetivos:
  - [ ] Solventar Bugs de la versión estable

