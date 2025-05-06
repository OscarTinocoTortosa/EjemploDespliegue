// un array con la lista de fotos para el slider 

var listafotos = new Array;

listafotos[0] = 'imagenes/slide-01.jpg';
listafotos[1] = 'imagenes/slide-02.jpg';


var cont = 0;

// crear intervalo

setInterval('cambiarFoto()', 3000);

// crear la funcion

function cambiarFoto() {

    cont++;

    if (cont == 2) {

        cont = 0;
    }

    document.images[0].src = listafotos[cont];

}