//Escuchamos el evento load del window y disparamos la funcion que le pasamos como callback (precargaImagenes).
window.addEventListener('load', precargaImagenes);

function precargaImagenes() {
    let img = new Image();
    img.src = '/assets/img/bannertop.jpg' || '/assets/img/foto8.jpeg';

    //Cuando se terminan de cargar las imágenes se le agrega la clase "close" a #wrap-preload.
    let preload = document.getElementById('wrap-preload');
    preload.classList.add('close');

}