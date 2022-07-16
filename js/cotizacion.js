// declaramos las variables a ocupar
let usuarios = []; // guarda usuarios que accederan al sistema

let formulario;
let inputNombre;
let inputApellido;
let inputApellidoDos;
let inputRun;
let inputEdad;
let tabla;
let datosRegistros;
let btnVaciar;

let formSelect;
let inputCabains;
let inputAdults;
let inputChildren;


// seccion de validaciones de funciones
function main() {
    inicializarElementos();
    inicializarEventos();
    obtenerUsuariosLocalStorage();
    agregarUsuariosTabla();
    extraerLogin();
    vaciarUsuariosLocalStorage();
}

class Usuarios {
    constructor(nombre, apellido, apellidoDos, run, edad) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.apellidoDos = apellidoDos.toUpperCase();
        this.run = run;
        this.edad = edad;
    }
}

function inicializarElementos() { // inicializa los elementos
    formulario = document.getElementById("formulario");
    inputNombre = document.getElementById("inputNombre");
    inputApellido = document.getElementById("inputApellido");
    inputApellidoDos = document.getElementById("inputApellidoDos");
    inputRun = document.getElementById("inputRun");
    inputEdad = document.getElementById("inputEdad");
    tabla = document.getElementById("tablaUsuarios");
    datosRegistros = document.getElementById("datosRegistros");
    btnVaciar = document.getElementById("btnVaciar");

    formSelect = document.getElementById("formSelect");
    inputCabains = document.getElementById("inputCabains");
    inputAdults = document.getElementById("inputAdults");
    inputChildren = document.getElementById("inputChildren");

}

function inicializarEventos() {
    formulario.onsubmit = (e) => validarFormulario(e);
    formSelect.onsubmit = (e) => validarIngresos(e);
}

function validarFormulario(e) {
    e.preventDefault();
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let apellidoDos = inputApellidoDos.value;
    let run = inputRun.value;
    let edad = parseInt(inputEdad.value);
    let usuario = new Usuarios(nombre, apellido, apellidoDos, run, edad);
    usuarios.push(usuario);
    formulario.reset();

    if (nombre === '') {
        setErrorFor(inputNombre, 'El nombre no puede estar vacío');
    } else if (nombre.length < 3) {
        setErrorFor(inputNombre, 'Debe tener al menos 3 caracteres');
    } else if (nombre.length > 15) {
        setErrorFor(inputNombre, 'Debe tener menos de 15 caracteres');
    } else {
        setSuccessFor(inputNombre);
    }

    if (apellido === '') {
        setErrorFor(inputApellido, 'El apellido no puede estar vacío');
    } else if (apellido.length < 3) {
        setErrorFor(inputApellido, 'Debe tener al menos 3 caracteres');
    } else if (apellido.length > 15) {
        setErrorFor(inputApellido, 'Debe tener menos de 15 caracteres');
    } else {
        setSuccessFor(inputApellido);
    }

    if (apellidoDos === '') {
        setErrorFor(inputApellidoDos, 'El apellido no puede estar vacío');
    } else if (apellidoDos.length < 3) {
        setErrorFor(inputApellidoDos, 'Debe tener al menos 3 caracteres');
    } else if (apellidoDos.length > 15) {
        setErrorFor(inputApellidoDos, 'Debe tener menos de 15 caracteres');
    } else {
        setSuccessFor(inputApellidoDos);
    }

    if (run === '') {
        setErrorFor(inputRun, 'El RUN/DNI no puede estar vacío');
    } else if (run.length < 9) {
        setErrorFor(inputRun, 'Debe tener al menos 9 caracteres');
    } else if (run.length > 9) {
        setErrorFor(inputRun, 'Debe tener menos de 9 caracteres');
    } else {
        setSuccessFor(inputRun);
    }

    if (edad === '') {
        setErrorFor(inputEdad, 'La edad no puede estar vacia');
    } else if (edad === 0) {
        setErrorFor(inputEdad, 'La edad no puede ser 0');
    } else {
        setSuccessFor(inputEdad);
    }

    if (nombre && apellido && apellidoDos && run && edad) {
        limpiarTabla();
        agregarUsuariosTabla();
        almacenarUsuariosLocalStorage();
    }
}


function validarIngresos(e) {
    e.preventDefault();
    let cabains = parseInt(inputCabains.value);
    let adults = parseInt(inputAdults.value);
    let children = parseInt(inputChildren.value);
    let total = adults + children;

    if (total > 0) {

    }
    if (adults < 1) {
        setErrorFor(inputAdults, 'No se pueeden arrendar cabañas sin adultos');
    } else {
        setSuccessFor(inputAdults);
    }
    if (children === '') {
        setErrorFor(inputChildren, 'No puede estar vacia');
    } else {
        setSuccessFor(inputChildren);
    }
    if (cabains === '') {
        setErrorFor(inputCabains, 'No puede estar vacia');
    } else if (total >= 7 && cabains === 1) {
        setErrorFor(inputCabains, 'El maximo de personas es 6, si desea mas debe arrendar 2 cabañas.');
    } else if (total >= 13 && cabains === 2) {
        setErrorFor(inputCabains, 'El maximo de personas es 12, si desea mas debes contactar a la administracion.');
    } else {
        setSuccessFor(inputCabains);
    }


}


function agregarUsuariosTabla() { // agrega los usuarios a la cotizacion
    usuarios.forEach((usuario) => {
        let filaTabla = document.createElement("tr");
        filaTabla.innerHTML = `
      <td>${usuario.nombre}</td>
      <td>${usuario.apellido}</td>
      <td>${usuario.apellidoDos}</td>
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
    localStorage.setItem("listaUsuarios", JSON.stringify(usuarios));
}

function obtenerUsuariosLocalStorage() {
    let usuariosAlmacenados = localStorage.getItem("listaUsuarios");
    console.log(typeof usuariosAlmacenados)
    if (usuariosAlmacenados !== null) {
        usuarios = JSON.parse(usuariosAlmacenados);
    }
}
// vacia la lista de usuarios Almacenados
function vaciarUsuariosLocalStorage() {
    btnVaciar.onclick = () => localStorage.removeItem('listaUsuarios');

}

// se extrae usuario y correo de localStorage
function extraerLogin() {

    let usuarioRegistrados = localStorage.getItem('userList');
    let arrayUser = usuarioRegistrados ? JSON.parse(usuarioRegistrados) : [];

    console.log(arrayUser);

    if (arrayUser !== '') {
        arrayUser.forEach((username) => {
            let spanRegistros = document.createElement("p");
            spanRegistros.innerHTML = `
        <p> Estimado/a <b>${username.usernameValue} </b>,</p>
        <p> Correo: 
        <a href="mailto:${username.emailValue}" class="text-decoration-none mail" target="_blank"><b>${username.emailValue}</b></a></p>
        `;
            datosRegistros.insertBefore(spanRegistros, datosRegistros.firstChild);
        });
    }
}


//inicializar el programa
main();