// declaramos las variables a ocupar

let usuarios = []; // guarda usuarios que accederán al sistema
let ingresos = []; // guarda ingresos totales

let formulario;
let inputNombre;
let inputApellido;
let inputApellidoMaterno;
let inputRun;
let inputEdad;
let tabla;
let datosRegistros;
let btnVaciar;
let btnImpr;
let btnAdd;
let formSelect;
let inputCabins;
let inputAdults;
let inputChildren;
let listaDetalles;
let ingreso;
let totalAPagar;

// sección de validaciones de funciones
function main() {
    inicializarElementos();
    inicializarEventos();
    extraerLogin();
    agregarTotalDetalles();
    obtenerUsuariosLocalStorage();
    agregarUsuariosTabla();
    vaciarLogica();
    botonImprimir();

}
// Aplicamos constructores a las clases
class Usuarios {
    constructor(nombre, apellido, apellidoMaterno, run, edad) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.apellidoMaterno = apellidoMaterno.toUpperCase();
        this.run = run;
        this.edad = edad;
    }
}
class Ingresos {
    constructor(cabins, adults, children, total) {
        this.cabins = cabins;
        this.adults = adults;
        this.children = children;
        this.total = total;
    }
}

// sección de DOM
function inicializarElementos() { // inicializa los elementos
    formulario = document.getElementById('formulario');
    inputNombre = document.getElementById('inputNombre');
    inputApellido = document.getElementById('inputApellido');
    inputApellidoMaterno = document.getElementById('inputApellidoMaterno');
    inputRun = document.getElementById('inputRun');
    inputEdad = document.getElementById('inputEdad');
    tabla = document.getElementById('tablaUsuarios');
    datosRegistros = document.getElementById('datosRegistros');
    btnVaciar = document.getElementById('btnVaciar');
    btnImpr = document.getElementById('btnImpr');
    formSelect = document.getElementById('formSelect');
    inputCabins = document.getElementById('inputCabins');
    inputAdults = document.getElementById('inputAdults');
    inputChildren = document.getElementById('inputChildren');
    listaDetalles = document.getElementById('listaDetalles');
    btnAdd = document.getElementById('btnAdd');
    totalAPagar = document.getElementById('totalAPagar');
}


// Se inicializa los botones de los formularios
function inicializarEventos() {
    formulario.onsubmit = (e) => validarFormulario(e);
    formSelect.onsubmit = (e) => validarIngresos(e);
}

// Función que valida la cantidad de cabañas arrendar y personas que ingresan
function validarIngresos(e) {
    e.preventDefault();
    let cabins = parseInt(inputCabins.value);
    let adults = parseInt(inputAdults.value);
    let children = parseInt(inputChildren.value);
    let total = adults + children;
    let ingreso = new Ingresos(cabins, adults, children, total);

    const validaCabins = () => {
        cabins === '' ? setErrorFor(inputCabins, 'El número de cabins no puede estar vacío') :
            total >= 7 && cabins === 1 ? setErrorFor(inputCabins, 'El máximo de personas es 6, si desea más debe arrendar 2 cabañas') :
            total >= 13 && cabins === 2 ? setErrorFor(inputCabins, 'El máximo de personas es 12, si desea más debe contactar a la administración.') :
            setSuccessFor(inputCabins);
    }
    validaCabins(cabins);

    const validaAdults = () => {
        adults < 1 ? setErrorFor(inputAdults, 'El número de adultos no puede estar vacío') :
            total >= 7 && cabins <= 1 ? setErrorFor(inputAdults, 'No se puede ingresar más adultos, supera el máximo') :
            total >= 13 && cabins <= 2 ? setErrorFor(inputAdults, 'No se puede ingresar más adultos, super el máximo.') :
            setSuccessFor(inputAdults);
    }
    validaAdults(adults);

    const validaChildren = () => {
        children === '' ? setErrorFor(inputChildren, 'El número de cabins no puede estar vacío') :
            total >= 7 && cabins <= 1 ? setErrorFor(inputChildren, 'No se puede ingresar más adultos, supera el máximo') :
            total >= 13 && cabins <= 2 ? setErrorFor(inputChildren, 'No se puede ingresar más adultos, super el máximo.') :
            setSuccessFor(inputChildren);
    }
    validaChildren(children);

    if (total === 0 || total >= 7 && cabins === 1) {
        alertError();
    } else if (total >= 13 && cabins === 2) {
        alertError();
    } else {
        ingresos.push(ingreso);
        agregarTotalDetalles();
        AgregarTotalDinero();
        const Toast = Swal.mixin({
            toast: true,
            background: '#f7e6ba',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'success',
            title: 'Total agregado correctamente'
        })
    }
}

// función principal que valida los inputs de las personas ingresadas
function validarFormulario(e) {
    e.preventDefault();
    let nombre = inputNombre.value
    let apellido = inputApellido.value;
    let apellidoMaterno = inputApellidoMaterno.value;
    let run = inputRun.value;
    let edad = parseInt(inputEdad.value);
    let usuario = new Usuarios(nombre, apellido, apellidoMaterno, run, edad);


    const validaNombre = () => {
        nombre === '' ? setErrorFor(inputNombre, 'El nombre no puede estar vacío') :
            nombre = !isLetters(nombre) ? setErrorFor(inputNombre, 'Debes escribir el nombre') :
            nombre.length < 3 ? setErrorFor(inputNombre, 'El nombre debe tener al menos 3 caracteres') :
            nombre.length > 20 ? setErrorFor(inputNombre, 'El nombre debe tener máximo 20 caracteres') :
            setSuccessFor(inputNombre);
    }
    validaNombre(nombre);

    const validaApellido = () => {
        apellido === '' ? setErrorFor(inputApellido, 'El apellido no puede estar vacío') :
            apellido = !isLetters(apellido) ? setErrorFor(inputApellido, 'Debes escribir el apellido') :
            apellido.length < 3 ? setErrorFor(inputApellido, 'El apellido debe tener al menos 3 caracteres') :
            apellido.length > 20 ? setErrorFor(inputApellido, 'El apellido debe tener máximo 20 caracteres') :
            setSuccessFor(inputApellido);
    }
    validaApellido(apellido);

    const validaApellidoMaterno = () => {
        apellidoMaterno === '' ? setErrorFor(inputApellidoMaterno, 'El apellido materno no puede estar vacío') :
            apellidoMaterno = !isLetters(apellidoMaterno) ? setErrorFor(inputApellidoMaterno, 'Debes escribir el apellido materno') :
            apellidoMaterno.length < 3 ? setErrorFor(inputApellidoMaterno, 'El apellido materno debe tener al menos 3 caracteres') :
            apellidoMaterno.length > 20 ? setErrorFor(inputApellidoMaterno, 'El apellido materno debe tener máximo 20 caracteres') :
            setSuccessFor(inputApellidoMaterno);
    }
    validaApellidoMaterno(apellidoMaterno);

    const validaRun = () => {
        run === '' ? setErrorFor(inputRun, 'El RUN no puede estar vacío') :
            run = !isRun(run) ? setErrorFor(inputRun, 'Debes escribir el run') :
            run.length < 10 ? setErrorFor(inputRun, 'El run debe tener al menos 10 caracteres') :
            run.length > 10 ? setErrorFor(inputRun, 'El run debe tener máximo 10 caracteres') :
            setSuccessFor(inputRun);
    }
    validaRun(run);

    const validaEdad = () => {
        edad === '' ? setErrorFor(inputEdad, 'La edad no puede estar vacía') :
            edad <= 0 ? setErrorFor(inputEdad, 'La edad debe ser mayor a 0') :
            edad > 100 ? setErrorFor(inputEdad, 'La edad debe ser menor a 100') :
            setSuccessFor(inputEdad);
    }
    validaEdad(edad);

    // se valida ingresos totales con Sweetalert2
    if (usuarios !== '' && isLetters(nombre) && isLetters(apellido) && isLetters(apellidoMaterno) && !isRun(run) && edad > 0 && edad <= 100) {
        usuarios.push(usuario);
        formulario.reset();
        limpiarTabla();
        agregarUsuariosTabla();
        almacenarUsuariosLocalStorage();
        const Toast = Swal.mixin({ // se agrega alerta de que se agregó correctamente
            toast: true,
            background: '#f7e6ba',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'success',
            title: 'Agregado correctamente'
        })
    } else {
        alertError();
    }
}

function agregarTotalDetalles() { // Agrega el total de los ingresos a la tabla
    ingresos.forEach((ingreso) => {
        let Detalle = document.createElement('ul');
        Detalle.innerHTML = `
        <li>Cantidad de cabañas: ${ingreso.cabins}</li>
        <li>Adultos: ${ingreso.adults}</li>
        <li>Niños: ${ingreso.children}</li>
        <li>Total ingresos: ${ingreso.total}</li>
        `;
        listaDetalles.appendChild(Detalle);
    });
}

const AgregarTotalDinero = () => { // Agrega el precio total del a cotización
    ingresos.forEach((ingreso) => {
        let spanTotal = document.createElement('p');
        totalP = 60000 * ingreso.cabins
        spanTotal.innerHTML = `
        <span><b>Total a pagar: $${totalP}</b></span>
        `;
        totalAPagar.appendChild(spanTotal);
    });
}

function agregarUsuariosTabla() { // Agrega los usuarios a la cotización
    usuarios.forEach((usuario) => {
        let filaTabla = document.createElement('tr');
        filaTabla.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.apellidoMaterno}</td>
            <td>${usuario.run}</td>
            <td>${usuario.edad}</td>`;
        tabla.tBodies[0].append(filaTabla);
    });
}

function limpiarTabla() {
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}

function almacenarUsuariosLocalStorage() {
    localStorage.setItem('listaUsuarios', JSON.stringify(usuarios));
}

function obtenerUsuariosLocalStorage() {
    let usuariosAlmacenados = localStorage.getItem('listaUsuarios');
    usuariosAlmacenados === null ? usuarios = [] : usuarios = JSON.parse(usuariosAlmacenados);
}

function renderizarListaUsuarios() {
    limpiarTabla();
}
// vacía la lista de usuarios Almacenados con Sweetalert2
function vaciarLogica() {
    btnVaciar.addEventListener("click", () => {
        Swal.fire({ // se agrega alerta de que se vació correctamente
            title: "¿Estás seguro que quieres vaciar la lista?",
            showCancelButton: true,
            confirmButtonText: 'Sí, estoy seguro',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Lista vacía', '', 'success')
                vaciarUsuariosLocalStorage();
            }
        })
    });
}

function vaciarUsuariosLocalStorage() {
    usuarios = [];
    renderizarListaUsuarios();
    localStorage.removeItem('listaUsuarios');

} // vacía la lista de usuarios Almacenados

function botonImprimir() {
    btnImpr.onclick = () => window.print();
} // imprime la tabla de usuarios

// se extrae usuario y correo de localStorage
function extraerLogin() {
    let usuarioRegistrados = localStorage.getItem('userList');
    let arrayUser = usuarioRegistrados ? JSON.parse(usuarioRegistrados) : [];
    if (arrayUser !== '') {
        arrayUser.forEach((username) => {
            let spanRegistros = document.createElement('p');
            spanRegistros.innerHTML = `
        <p> Estimado/a <b>${username.usernameValue} </b>,</p>
        <p> Correo: 
        <a href='mailto:${username.emailValue}' class='text-decoration-none mail' target='_blank'><b>${username.emailValue}</b></a></p>
        `;
            datosRegistros.insertBefore(spanRegistros, datosRegistros.firstChild);
        });
    }
}
//inicializar el programa
main();