// Declaramos las variables

let login = []; // guarda logins en un array

let formLogin;
let username;
let email;
let password;
let passwordTwo;

// Inicio del programa
function main() {
	loginRegister();
	initializeEvents();
	getUsersLocalStorage();
}

class User {
	constructor(ID, usernameValue, emailValue, passwordValue, passwordTwoValue) {
		this.ID = ID;
		this.usernameValue = usernameValue;
		this.emailValue = emailValue;
		this.passwordValue = passwordValue;
		this.passwordTwoValue = passwordTwoValue;
	}
}

function loginRegister() {
	formLogin = document.getElementById('formLogin');
	username = document.getElementById('username');
	email = document.getElementById('email');
	password = document.getElementById('password');
	passwordTwo = document.getElementById('passwordTwo');
}
//=========================================FUNCIÓN LOGIN=================================================

function initializeEvents() {
	formLogin.onsubmit = (e) => checkInputs(e);
}

function checkInputs(e) {
	e.preventDefault();


	username.addEventListener('input', function () {
		let usernameValue = username.value;
		usernameValue === '' ? setErrorFor(username, 'El usuario no puede estar vacío') :
			usernameValue === 'admin' ? setErrorFor(username, 'El usuario no puede ser admin') :
			usernameValue === 'user' ? setErrorFor(username, 'El usuario no puede ser user') :
			usernameValue === 'root' ? setErrorFor(username, 'El usuario no puede ser root') :
			usernameValue.length < 3 ? setErrorFor(username, 'Debe tener al menos 3 caracteres') :
			usernameValue.length > 20 ? setErrorFor(username, 'Debe tener menos de 20 caracteres') :
			setSuccessFor(username);
	});

	email.addEventListener('input', function () {
		let emailValue = email.value;
		emailValue === '' ? setErrorFor(email, 'El email no puede estar vacío') :
			!isEmail(emailValue) ? setErrorFor(email, 'El email no es válido') :
			setSuccessFor(email);
	});

	password.addEventListener('input', function () {
		let passwordValue = password.value;
		passwordValue === '' ? setErrorFor(password, 'La contraseña no puede estar vacía') :
			passwordValue.length < 6 ? setErrorFor(password, 'Debe tener al menos 6 caracteres') :
			passwordValue.length > 20 ? setErrorFor(password, 'Debe tener menos de 20 caracteres') :
			setSuccessFor(password);
	});

	passwordTwo.addEventListener('input', function () {
		let passwordTwoValue = passwordTwo.value;
		passwordTwoValue === '' ? setErrorFor(passwordTwo, 'La contraseña no puede estar vacía') :
			passwordTwoValue !== password.value ? setErrorFor(passwordTwo, 'Las contraseñas no coinciden') :
			setSuccessFor(passwordTwo);
	});

	if (username.value === '' || email.value === '' || password.value === '' || passwordTwo.value === '') {
		Swal.fire({
			type: 'error',
			icon: 'error',
			title: 'Ups...',
			text: 'Todos los campos son obligatorios!',
		})
	} else {
		let ID = Math.floor(Math.random() * 1000000);
		while (ID < login.length) {
			ID++;
		}

		let userToRegister = new User(ID, username.value, email.value, password.value, passwordTwo.value);
		login.push(userToRegister);
		addUserLocalStorage()
		window.location.href = "./pages/reserva.html";
	}
}

// Agrega los usuarios registrados al localStorage
function addUserLocalStorage() {
	localStorage.setItem("userList", JSON.stringify(login)); // guarda los usuarios en localStorage
}

function getUsersLocalStorage() {
	let storedUsers = localStorage.getItem("userList"); // obtiene los usuarios guardados en localStorage
	storedUsers !== null ? login = JSON.parse(storedUsers) : login = []; // si hay usuarios guardados los guarda en el array login
}

// llama a inicializar el programa
main();

//=========================================V.4.0=========================================