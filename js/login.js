// Declaramos las variables

let login = []; // guarda logins en un array

let formLogin;
let username;
let email;
let password;
let passwordTwo;
let accessTable;

// Inicio del programa

class User {
	constructor(usernameValue, emailValue, passwordValue, passwordTwoValue) {
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

	accessTable = document.getElementById("accessTable");


}
//=========================================FUNCION LOGIN=================================================


function initializeEvents() {
	formLogin.onsubmit = (e) => checkInputs(e);
}

function checkInputs(e) {
	e.preventDefault();
	const usernameValue = username.value;
	const emailValue = email.value;
	const passwordValue = password.value;
	const passwordTwoValue = passwordTwo.value;
	let userToRegister = new User(
		usernameValue,
		emailValue,
		passwordValue,
		passwordTwoValue);
	login.push(userToRegister);


	// Valida usuario

	if (usernameValue === '') {
		setErrorFor(username, 'El usuario no puede estar vacío');
	} else if (usernameValue.length < 3) {
		setErrorFor(username, 'Debe tener al menos 3 caracteres');
	} else if (usernameValue.length > 15) {
		setErrorFor(username, 'Debe tener menos de 15 caracteres');
	} else {
		setSuccessFor(username);
	}

	// valida el correo electrónico
	if (emailValue === '') {
		setErrorFor(email, 'El correo no puede estar vacío');
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'El correo no es válido');
	} else {
		setSuccessFor(email);
	}

	// valida la contraseña
	if (passwordValue === '') {
		setErrorFor(password, 'La contraseña no puede estar vacía');
	} else if (passwordValue.length < 6) {
		setErrorFor(password, 'Debe tener al menos 6 caracteres');
	} else if (passwordValue.length > 15) {
		setErrorFor(password, 'Debe tener menos de 15 caracteres');
	} else {
		setSuccessFor(password);
	}

	// valida la contraseña coincidente
	if (passwordTwoValue === '') {
		setErrorFor(passwordTwo, 'La contraseña no puede estar vacía');
	} else if (passwordValue !== passwordTwoValue) {
		setErrorFor(passwordTwo, 'La contraseña no coincide');
	} else {
		setSuccessFor(passwordTwo);
	}

	if (usernameValue && emailValue && passwordValue && passwordTwoValue) {

		if (passwordValue !== passwordTwoValue) {
			setErrorFor(passwordTwo, 'La contraseña no coincide');
		} else {
			addUserLocalStorage();
			window.location.href = "./pages/reserva.html";
		}
	}
}

// Agrega los usuarios registrados al localStorage

function addUserLocalStorage() {
	localStorage.setItem("userList", JSON.stringify(login)); // guarda los usuarios en localStorage
}

function getUsersLocalStorage() {
	let storedUsers = localStorage.getItem("userList"); // obtiene los usuarios guardados en localStorage
	console.log(typeof storedUsers)
	if (storedUsers !== null) {
		login = JSON.parse(storedUsers);
	}
}


// Inicio del programa

function main() {
	loginRegister();
	initializeEvents();
	getUsersLocalStorage();
}
main();

//=========================================V.2.0=================================================