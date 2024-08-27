El código de estado de una respuesta es un número que nos va a indicar lo que ha pasado con la petición: sí, fue bien, si fue mal, si se ha redirigido. Las respuestas se agrupan en cinco clases:

Respuestas informativas (100–199),

Respuestas satisfactorias (200–299),

Redirecciones (300–399),

Errores de los clientes (400–499),

Errores de los servidores (500–599).

Generalmente siempre es un número de tres cifras, por ejemplo:

Todos los estados que empiecen con dos especifica que todo ha ido bien:

200 será 'Ok, todo fue genial'.

201, ha creado un recurso nuevo y todo ha ido bien.

Todos los estados que empiecen con un tres, 300, 301, 303, 304, significa que la petición se ha redirigido a otro sitio, por ejemplo:

301 se utilizar mucho cuando un recurso se mueve permanentemente de una URL a otra, de un servidor a otro.

304 cuando no ha habido ningún tipo de modificación en un recurso.

Los errores del cliente se identifican con el código 400:

400 significa que el usuario ha enviado algo mal

401 significa que el cliente que está haciendo la petición no está autorizado.

403 Forbidden es prohibido, significa uqe un cliente está haciendo una petición pero no tiene permisos.

404, súper típico que seguro que habéis visto en un millón de sitios, significa no se ha encontrado el recurso que se está pidiendo.

## Mostrar todos los servicios de una coleccion

1. Crear el modelo de datos con las restricciones y tipo de datos
1. Crear el archivo para el pack de rutas del servicios
1. Configurar el servidor para que use las nuevas rutas index.js `server.use("/", routesServices)`
1. Crear el controlador del servicio, crear una funcion que busque en la BD.
