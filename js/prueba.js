let tabla;
let formulario = document.getElementById("formulario");
// let firstName = document.getElementById("firstName");
// let lastName = document.getElementById("lastName");
// let age = document.getElementById("age");
// let email = document.getElementById("email");


const users = [];

class Users {
    constructor(firstName, lastName, age, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.email = email;
    }
}

formulario.onsubmit = (event) => registrarUsuarios(event);

function registrarUsuarios(event) {
    event.preventDefault();
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let age = document.getElementById("age").value;
        let email = document.getElementById("email").value;
        // let firstName = firstName.value;
        // let lastName = lastName.value;
        // let age = parseInt(age.value);
        // let email = email.value;

        let usuarioARegistrar = new Users(
            firstName,
            lastName,
            age,
            email
        );
        users.push(usuarioARegistrar);
        
        formulario.reset();
    }
    

function agregarUsuariosTabla() {
    users.forEach((users) => {
        let filaTabla = document.createElement("tr");
        filaTabla.innerHTML = `
        <td>${users.firstName}</td>
        <td>${users.lastName}</td>
        <td>${users.age}</td>
        <td>${users.email}</td>`;
        tabla.tBodies[0].append(filaTabla);
    });
}

function main() {
    registrarUsuarios();
    agregarUsuariosTabla();
}

main();