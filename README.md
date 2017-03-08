# TestGrability

La aplicacion esta divida en varias capas que evidenciaré a continuacion

#
--- api // Metodos para consumir la libreria de marvel

--- marvel // libreria de consumo para el api de Marvel

--- store //estas estan divididas en dos modulos 

----------Comics //Presenta toda la responsabilidad que se debe llevar sobe la store comics

----------Characters //Presenta toda la responsabilidad que se debe llevar sobe la store characters

----Components // Componentes de la aplicacion

---------Spinner // comoponente de loadin de la app

---------Modal // componente para los modales

---------ListCharacters //Este componente presenta los datos buscados de los personajes

---------ListFavourites //Este componente presenta la lista de favoritos que se han añadido

---------Header // compoenente para el emcabezado de la aplicación 

---------------Search // componente para hacer una busqueda de personajes

---------Footer //componente para el footer de la aplicación

----views // vistas para la aplicación

---------HomeView //es la única vista que existe puesto que no se hizo necesidad de mas vistas

 ----route // ruteador de las vistas 
 
-----config // credenciales para el api de Marvel

-----static // aqui se encuentran los contenidos de la aplicación



Muchas gracias espero les gustes, no lleva pruebas unitarias por motivos de tiempo.

