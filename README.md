
# BCP LEGACY - CHECKER | MINSAIT

[Link to heading](#Authors)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Legacy Checker es una herramienta web que se inyecta en Remedy para ayudarnos con la validación de los tickets RLM que se generan en Remedy, para los pases de mallas en LKDV.

Validaciones:

- Valida que se tenga la plantilla correcta.
- Valida los datos del campo resumen:
    - App
    - TA
    - Criticidad
    - PO
- Valia los datos del campo notas:
    - Tipo de solicitud
    - Hito de acuerdo al tipo de solicitud
    - Fecha de solicitud (revisa cantidad de días con diferencia de hoy)
    - VoB
    - Grupo coordinador
    - coordinador de lanzamientos
    - Ruta de diagramas
    - Nombre de contacto pase
    - Celular contacto pase
    - Commit Id (revisa correcto commit en bitbucket)



## Uso

Para poder utilizar el validador, debemos inyectarlo dentro de Remedy.

1. Es necesario abrir la consola de chrome: 

```bash
CtrlShiftJ (on Windows) or CtrlOptionJ (on Mac).
```

2. En la consola: ingresar y ejecutar lo siguiente:

```javascript
await fetch(new Request('https://unpkg.com/legacy-checker/dist/main.js')).then(js => js.text()).then(js => eval(js));
```
    
3. Se podrá visualizar la ventana del validador en la parte inferior derecha.

## Validación con Bitbucket

Para poder realizar la validación del commit id correcto en bitbucket es necesario que tenga configurado y ejecutando `BCPServer`

## Authors

- [@roberthuaman](https://www.github.com/pepobj)

