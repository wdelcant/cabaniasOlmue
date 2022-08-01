// Valida formulario y realiza petición API para envío de correo

const d = document;

function contactForm() {
    const $form = d.querySelector('.contact-form');
    $inputs = d.querySelectorAll('.contact-form [required]');

    $inputs.forEach(input => {
        const $span = d.createElement('span');
        $span.id = input.name;
        $span.textContent = input.title;
        $span.classList.add('contact-form-error', 'none');
        input.insertAdjacentElement('afterend', $span);
    });

    d.addEventListener('keyup', (e) => {

        if (e.target.matches('.contact-form [required]')) {
            let $input = e.target,
                pattern = $input.pattern || $input.dataset.pattern;

            if (pattern && $input.value !== '') {

                let regex = new RegExp(pattern);
                return !regex.exec($input.value) ?
                    d.getElementById($input.name).classList.add('is-active') :
                    d.getElementById($input.name).classList.remove('is-active');
            }

            if (!pattern) {
                return $input.value !== '' ?
                    d.getElementById($input.name).classList.remove('is-active') :
                    d.getElementById($input.name).classList.add('is-active');
            }
        }
    });

    d.addEventListener('submit', (e) => {
        e.preventDefault();
        const $loader = d.querySelector('.contact-form-loader'),
            $response = d.querySelector('.contact-form-response');

        $loader.classList.remove('none');

        // API envía correo electrónico a traves de una petición AJAX

        /*
         *  Para activar con tu correo, debes ingresar tu Email donde están los números de mi key
         *  Asi puedes probar la API funcional y ver el resultado en tu correo.
         */

        fetch('https://formsubmit.co/ajax/5e36ccd515272d990de7549f4ddd264a', {
                method: 'POST',
                body: new FormData(e.target)
            })
            .then((respuesta => respuesta.ok ? respuesta.json() : Promise.reject(res)))
            .then(json => {
                console.log(json);
                // Si la respuesta es correcta, se muestra el mensaje de éxito
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    background: '#f7e6ba',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    }
                });

                Toast.fire({
                    icon: "success",
                    title: "Los datos han sido enviados"
                });

                $loader.classList.add('none');
                $response.classList.remove('none');
                $response.innerHTML = `<p>${json.message}</p>`;
                $form.reset();
            })
            .catch(error => {
                console.log(error);
                let message =
                    error.statusText || 'Ocurrió un error al enviar, intenta nuevamente';
                $response.innerHTML = `<p>Error ${error.status}:${message}</p>`;
            })
            .finally(() =>
                setTimeout(() => {
                    $response.classList.add('none');
                    $response.innerHTML = '';
                }, 3000)
            );
    });
}

// Inicializar formulario
d.addEventListener('DOMContentLoaded', contactForm);