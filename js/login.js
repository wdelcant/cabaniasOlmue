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
}
//=========================================FUNCIÓN LOGIN=================================================

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
	const validaUsername = () => {
		usernameValue === '' ? setErrorFor(username, 'El usuario no puede estar vacío') :
			usernameValue.length < 3 ? setErrorFor(username, 'El usuario debe tener al menos 3 caracteres') :
			usernameValue.length > 20 ? setErrorFor(username, 'El usuario debe tener menos de 20 caracteres') :
			setSuccessFor(username);
	}
	validaUsername(usernameValue);

	// Valida email
	const validaEmail = () => {
		emailValue === '' ? setErrorFor(email, 'El email no puede estar vacío') :
			emailValue = !isEmail(emailValue) ? setErrorFor(email, 'El email no es válido') :
			emailValue === '.' ? setErrorFor(email, 'El email no es válido') :
			setSuccessFor(email);
	}
	validaEmail(emailValue);

	// Valida password
	const validaPassword = () => {
		passwordValue === '' ? setErrorFor(password, 'La contraseña no puede estar vacía') :
			passwordValue.length < 6 ? setErrorFor(password, 'La contraseña debe tener al menos 6 caracteres') :
			passwordValue.length > 20 ? setErrorFor(password, 'La contraseña debe tener menos de 20 caracteres') :
			setSuccessFor(password);
	}
	validaPassword(passwordValue);

	// valida la contraseña coincidente
	const validaPasswordTwo = () => {
		passwordTwoValue === '' ? setErrorFor(passwordTwo, 'La contraseña no puede estar vacía') :
			passwordTwoValue !== passwordValue ? setErrorFor(passwordTwo, 'Las contraseñas no coinciden') :
			setSuccessFor(passwordTwo);
	}
	validaPasswordTwo(passwordTwoValue);

	if (usernameValue && emailValue && passwordValue && passwordTwoValue) {
		passwordTwoValue !== passwordTwoValue ? setErrorFor(passwordTwo, 'La contraseña no coincide') : addUserLocalStorage(), window.location.href = "./pages/reserva.html";
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

//=========================================V.3.0=================================================