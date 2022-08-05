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
const d = document;

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
    constructor(ID, nombre, apellido, apellidoMaterno, run, edad) {
        this.ID = ID;
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
    formulario = d.getElementById('formulario');
    inputNombre = d.getElementById('inputNombre');
    inputApellido = d.getElementById('inputApellido');
    inputApellidoMaterno = d.getElementById('inputApellidoMaterno');
    inputRun = d.getElementById('inputRun');
    inputEdad = d.getElementById('inputEdad');
    tabla = d.getElementById('tablaUsuarios');
    datosRegistros = d.getElementById('datosRegistros');
    btnVaciar = d.getElementById('btnVaciar');
    btnImpr = d.getElementById('btnImpr');
    formSelect = d.getElementById('formSelect');
    inputCabins = d.getElementById('inputCabins');
    inputAdults = d.getElementById('inputAdults');
    inputChildren = d.getElementById('inputChildren');
    listaDetalles = d.getElementById('listaDetalles');
    btnAdd = d.getElementById('btnAdd');
    totalAPagar = d.getElementById('totalAPagar');
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
        cabins === '' ? setErrorFor(inputCabins, 'El número de cabins no puede estar vacío.') :
            total >= 7 && cabins === 1 ? setErrorFor(inputCabins, 'El máximo de personas es 6, si desea más debe arrendar 2 cabañas.') :
            total >= 13 && cabins === 2 ? setErrorFor(inputCabins, 'El máximo de personas es 12, si desea más debe contactar a la administración.') :
            setSuccessFor(inputCabins);
    }
    validaCabins(cabins);

    const validaAdults = () => {
        adults < 1 ? setErrorFor(inputAdults, 'El número de adultos no puede estar vacío') :
            total >= 7 && cabins <= 1 ? setErrorFor(inputAdults, 'No se puede ingresar más adultos, supera el máximo.') :
            total >= 13 && cabins <= 2 ? setErrorFor(inputAdults, 'No se puede ingresar más adultos, super el máximo.') :
            setSuccessFor(inputAdults);
    }
    validaAdults(adults);

    const validaChildren = () => {
        children === '' ? setErrorFor(inputChildren, 'El número de cabins no puede estar vacío.') :
            total >= 7 && cabins <= 1 ? setErrorFor(inputChildren, 'No se puede ingresar más adultos, supera el máximo.') :
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
        limpiarIngresosTotales();
        limpiarPrecioTotal();
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
    let ID = 0; // se le asigna un ID a cada usuario
    while (ID < usuarios.length) {
        ID++;
    }
    let usuario = new Usuarios(ID, nombre, apellido, apellidoMaterno, run, edad);

    const validaNombre = () => {
        nombre === '' ? setErrorFor(inputNombre, 'El nombre no puede estar vacío.') :
            nombre = !isLetters(nombre) ? setErrorFor(inputNombre, 'Debes escribir el nombre.') :
            nombre.length < 3 ? setErrorFor(inputNombre, 'El nombre debe tener al menos 3 caracteres.') :
            nombre.length > 20 ? setErrorFor(inputNombre, 'El nombre debe tener máximo 20 caracteres.') :
            setSuccessFor(inputNombre);
    }
    validaNombre(nombre);

    const validaApellido = () => {
        apellido === '' ? setErrorFor(inputApellido, 'El apellido no puede estar vacío.') :
            apellido = !isLetters(apellido) ? setErrorFor(inputApellido, 'Debes escribir el apellido.') :
            apellido.length < 3 ? setErrorFor(inputApellido, 'El apellido debe tener al menos 3 caracteres.') :
            apellido.length > 20 ? setErrorFor(inputApellido, 'El apellido debe tener máximo 20 caracteres.') :
            setSuccessFor(inputApellido);
    }
    validaApellido(apellido);

    const validaApellidoMaterno = () => {
        apellidoMaterno === '' ? setErrorFor(inputApellidoMaterno, 'El apellido materno no puede estar vacío.') :
            apellidoMaterno = !isLetters(apellidoMaterno) ? setErrorFor(inputApellidoMaterno, 'Debes escribir el apellido materno.') :
            apellidoMaterno.length < 3 ? setErrorFor(inputApellidoMaterno, 'El apellido materno debe tener al menos 3 caracteres.') :
            apellidoMaterno.length > 20 ? setErrorFor(inputApellidoMaterno, 'El apellido materno debe tener máximo 20 caracteres.') :
            setSuccessFor(inputApellidoMaterno);
    }
    validaApellidoMaterno(apellidoMaterno);

    const validaRun = () => {
        run === '' ? setErrorFor(inputRun, 'El RUN no puede estar vacío.') :
            run = !isRun(run) ? setErrorFor(inputRun, 'Debes escribir el run.') :
            run.length < 10 ? setErrorFor(inputRun, 'El run debe tener al menos 10 caracteres.') :
            run.length > 10 ? setErrorFor(inputRun, 'El run debe tener máximo 10 caracteres.') :
            setSuccessFor(inputRun);
    }
    validaRun(run);

    const validaEdad = () => {
        edad === '' ? setErrorFor(inputEdad, 'La edad no puede estar vacía.') :
            edad <= 0 ? setErrorFor(inputEdad, 'La edad debe ser mayor a 0.') :
            edad > 100 ? setErrorFor(inputEdad, 'La edad debe ser menor a 100.') :
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
        let Detalle = d.createElement('ul');
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
        let spanTotal = d.createElement('p');
        totalP = 70 * ingreso.cabins
        spanTotal.innerHTML = `
        <span><strong>Total a pagar: $${totalP}.000</strong></span>
        `;
        totalAPagar.appendChild(spanTotal);
    });

}

function agregarUsuariosTabla() { // Agrega los usuarios a la cotización
    usuarios.forEach((usuario) => {
        let filaTabla = d.createElement('tr');
        filaTabla.innerHTML = `
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.apellidoMaterno}</td>
            <td>${usuario.run}</td>
            <td>${usuario.edad}</td>`;
        tabla.tBodies[0].append(filaTabla);
    });
}

// ============================================EVITA QUE LOS DATOS SE DUPLIQUEN=====================================================
function limpiarTabla() { // Limpia la tabla de usuarios ingresados
    while (tabla.rows.length > 1) {
        tabla.deleteRow(1);
    }
}

function limpiarIngresosTotales() { // Limpia los ingresos de la cotización cabañas y totales
    while (listaDetalles.children.length > 1) {
        listaDetalles.removeChild(listaDetalles.firstChild);
    }
}

function limpiarPrecioTotal() { // Limpia el precio total de la cotización
    while (totalAPagar.children.length > 1) {
        totalAPagar.removeChild(totalAPagar.firstChild);
    }
}
// ============================================FIN=====================================================

// storage de datos de usuarios
function almacenarUsuariosLocalStorage() {
    localStorage.setItem('listaUsuarios', JSON.stringify(usuarios));
}

function obtenerUsuariosLocalStorage() {
    let usuariosAlmacenados = localStorage.getItem('listaUsuarios');
    usuariosAlmacenados === null ? usuarios = [] : usuarios = JSON.parse(usuariosAlmacenados);
}

function renderizarDetalle() {
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
            cancelButtonText: 'No',
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
    ingresos = [];
    listaDetalles.innerHTML = '';
    totalAPagar.innerHTML = '';
    renderizarDetalle();
    localStorage.removeItem('listaUsuarios');

} // vacía la lista de usuarios Almacenados

// imprime la cotización
function printDiv() {
    let divContents = d.getElementById("imprimir").innerHTML;
    let impr = window.open('', '', 'height=900, width=900');
    impr.document.write(divContents);
    impr.document.close();
    impr.print();
}

function botonImprimir() {
    btnImpr.addEventListener("click", () => { // se agrega alerta de que se imprimió correctamente
        Swal.fire({ // se agrega alerta de que se vació correctamente
            title: "¿Deseas finalizar la cotización e imprimir?",
            showCancelButton: true,
            confirmButtonText: 'Sí',
            denyButtonText: `Cancelar`,
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                printDiv();
                let boleta = Math.floor(Math.random() * 1000000);
                Swal.fire({
                    title: 'COTIZACIÓN N' + boleta,
                    text: '¡Gracias por usar nuestros servicios!',
                    icon: 'success',
                })
                setTimeout(() => {
                    vaciarUsuariosLocalStorage();
                    localStorage.removeItem('userList');
                    window.location.href = "../index.html";
                }, 6000); // se agrega un tiempo de espera para que se imprima
            }
        })
    });
}

// se extrae usuario y correo de localStorage
function extraerLogin() {
    let usuarioRegistrados = localStorage.getItem('userList');
    let arrayUser = usuarioRegistrados ? JSON.parse(usuarioRegistrados) : [];
    const filteredArrUser = arrayUser.reduce(
        (prev, curr) => prev.find(el => el.usernameValue === curr.usernameValue) ?
        prev : [...prev, curr], []);
    if (filteredArrUser !== '') {
        filteredArrUser.forEach((username) => {
            let spanRegistros = d.createElement('p');
            spanRegistros.innerHTML = `
        <p> Estimado/a <strong>${username.usernameValue} </strong>,</p>
        <p> Correo: 
        <a href='mailto:${username.emailValue}' class='text-decoration-none mail' target='_blank'><strong>${username.emailValue}</strong></a></p>
        `;
            datosRegistros.insertBefore(spanRegistros, datosRegistros.firstChild);
        });
    }
}
//inicializar el programa
main();

//=============================== V.5 =====================================================