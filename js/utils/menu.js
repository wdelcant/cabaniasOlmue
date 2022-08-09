// menu flotante
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      document.getElementById('navbar_top').classList.add('fixed-top');
      navbar_height = document.querySelector('.navbar').offsetHeight;
      document.body.style.paddingTop = navbar_height + 'px';
    } else {
      document.getElementById('navbar_top').classList.remove('fixed-top');
      document.body.style.paddingTop = '0';
    }
  });
}); // fin menu flotante


/* -------------------------------------------------------------------------
  Boton bajar
 * ------------------------------------------------------------------------- */
(function () {
  'use strict';

  let btnScrollDown = document.querySelector('#scroll_down');

  function scrollDown() {
    let windowCoords = document.documentElement.clientHeight;
    (function scroll() {
      if (window.pageYOffset < windowCoords) {
        window.scrollBy(0, 10);
        setTimeout(scroll, 0);
      }
      if (window.pageYOffset > windowCoords) {
        window.scrollTo(0, windowCoords);
      }
    })();
  }

  btnScrollDown.addEventListener('click', scrollDown);
})();
