// VARIABLES
var barras = document.getElementById('barras_menu');
var menumovil = document.getElementById('slidemenu');
var enlaces = document.querySelectorAll('#slidemenu .menu-principal a');

// Enventos  - Clicks

barras.addEventListener('click', moverMenu);
for (var i = 0; i<enlaces.length; i++){
enlaces[i].addEventListener('click', moverMenu); 
}

// funcion que cambia class activo para mostrar/ ocultar menu

function moverMenu(){
    if (menumovil.className == 'slidemenu') {
    menumovil.className = 'slidemenu activo';
    } else {
        menumovil.className = 'slidemenu';
    }
}