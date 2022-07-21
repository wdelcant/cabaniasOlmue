// declaramos las variables a ocupar

let usuarios = []; // guarda usuarios que accederán al sistema
let ingresos = []; // guarda ingresos

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
let oneCabin = 60000;
let twoCabin = 120000;

// sección de validaciones de funciones
function main() {
    inicializarElementos();
    inicializarEventos();
    agregarTotalDetalles();
    obtenerUsuariosLocalStorage();
    agregarUsuariosTabla();
    extraerLogin();
    vaciarUsuariosLocalStorage();
    botonImprimir();
}
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
}

function inicializarEventos() {
    formulario.onsubmit = (e) => validarFormulario(e);
    formSelect.onsubmit = (e) => validarIngresos(e);
}

function validarFormulario(e) {
    e.preventDefault();
    let nombre = inputNombre.value
    let apellido = inputApellido.value;
    let apellidoMaterno = inputApellidoMaterno.value;
    let run = inputRun.value;
    let edad = parseInt(inputEdad.value);
    let usuario = new Usuarios(nombre, apellido, apellidoMaterno, run, edad);

    if (nombre === '') {
        setErrorFor(inputNombre, 'El nombre no puede estar vacío');
    } else if (!isLetters(nombre)) {
        setErrorFor(inputNombre, 'Debes escribir el nombre');
    } else if (nombre.length < 3) {
        setErrorFor(inputNombre, 'Debe tener al menos 3 caracteres');
    } else if (nombre.length > 15) {
        setErrorFor(inputNombre, 'Debe tener menos de 15 caracteres');
    } else {
        setSuccessFor(inputNombre);
    }

    if (apellido === '') {
        setErrorFor(inputApellido, 'El apellido no puede estar vacío');
    } else if (!isLetters(apellido)) {
        setErrorFor(inputApellido, 'Debes escribir el Apellido');
    } else if (apellido.length < 3) {
        setErrorFor(inputApellido, 'Debe tener al menos 3 caracteres');
    } else if (apellido.length > 15) {
        setErrorFor(inputApellido, 'Debe tener menos de 15 caracteres');
    } else {
        setSuccessFor(inputApellido);
    }

    if (apellidoMaterno === '') {
        setErrorFor(inputApellidoMaterno, 'El apellido no puede estar vacío');
    } else if (!isLetters(apellidoMaterno)) {
        setErrorFor(inputApellidoMaterno, 'Debes escribir el Apellido');
    } else if (apellidoMaterno.length < 3) {
        setErrorFor(inputApellidoMaterno, 'Debe tener al menos 3 caracteres');
    } else if (apellidoMaterno.length > 15) {
        setErrorFor(inputApellidoMaterno, 'Debe tener menos de 15 caracteres');
    } else {
        setSuccessFor(inputApellidoMaterno);
    }

    if (run === '') {
        setErrorFor(inputRun, 'El RUN no puede estar vacío');
    } else if (!isRut(run)) {
        setErrorFor(inputRun, 'El formato no es válido 11111111-1');
    } else if (run.length < 10) {
        setErrorFor(inputRun, 'Debe tener al menos 9 caracteres');
    } else if (run.length > 10) {
        setErrorFor(inputRun, 'Debe tener menos de 9 caracteres');
    } else {
        setSuccessFor(inputRun);
    }

    if (edad === '') {
        setErrorFor(inputEdad, 'La edad no puede estar vacía');
    } else if (edad > 100 || edad <= 0) {
        setErrorFor(inputEdad, 'Debes escribir la edad');
    } else {
        setSuccessFor(inputEdad);
    }

    if (usuarios !== '' && isLetters(nombre) && isLetters(apellido) && isLetters(apellidoMaterno) && isRut(run) && edad > 0 && edad <= 100) {
        usuarios.push(usuario);
        formulario.reset();
        limpiarTabla();
        agregarUsuariosTabla();
        almacenarUsuariosLocalStorage();
        Toastify({
            text: "Cliente agregado correctamente",
            className: "info",
            duration: 2500,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #d6ae7b, #eacda3)",
                color: "#ffffff",
            }
        }).showToast();
    }
}

function validarIngresos(e) {
    e.preventDefault();
    let cabins = parseInt(inputCabins.value);
    let adults = parseInt(inputAdults.value);
    let children = parseInt(inputChildren.value);
    let total = adults + children;
    let ingreso = new Ingresos(cabins, adults, children, total);

    if (adults < 1) {
        setErrorFor(inputAdults, 'No se pueden arrendar cabañas sin adultos');
    } else if (cabins <= 1 && total >= 7) {
        setErrorFor(inputAdults, 'El tope de personas es 6 por cabaña');
    } else {
        setSuccessFor(inputAdults);
    }
    if (children === '') {
        setErrorFor(inputChildren, 'No puede estar vacía');
    } else if (cabins <= 1 && total >= 7) {
        setErrorFor(inputChildren, 'El tope de personas es 6 por cabaña');
    } else if (adults === 0 && children > adults) {
        setErrorFor(inputChildren, 'No puede ser mayor a los adultos');
    } else {
        setSuccessFor(inputChildren);
    }
    if (cabins === '') {
        setErrorFor(inputCabins, 'No puede estar vacía');
    } else if (total >= 7 && cabins === 1) {
        setErrorFor(inputCabins, 'El máximo de personas es 6, si desea más debe arrendar 2 cabañas.');
    } else if (total >= 13 && cabins === 2) {
        setErrorFor(inputCabins, 'El máximo de personas es 12, si desea más debe contactar a la administración.');
    } else {
        setSuccessFor(inputCabins);
    }
    ingresos.push(ingreso);
    agregarTotalDetalles();
    Toastify({
        text: "Ahora agrega los detalles de los ingresos",
        className: "info",
        duration: 2500,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #d6ae7b, #eacda3)",
            color: "#ffffff",
            border: "1px solid #ffffff",
        }
    }).showToast();
}

function agregarTotalDetalles() {
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

function agregarUsuariosTabla() { // agrega los usuarios a la cotización
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

// vacía la lista de usuarios Almacenados
function vaciarUsuariosLocalStorage() {
    btnVaciar.onclick = () => localStorage.removeItem('listaUsuarios');
}

function botonImprimir() {
    btnImpr.onclick = () => window.print();
}

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