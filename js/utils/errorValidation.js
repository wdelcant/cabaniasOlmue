// Valida datos de usuarios 
function setErrorFor(input, message) { // elimina el error de los campos
	const formControl = input.parentElement; // .form-control
	const small = formControl.querySelector('small');
	// agrega el mensaje de error debajo de small
	small.innerText = message;
	//agrega la clase error
	formControl.className = 'form-control error';
} // fin de la función setErrorFor

function setSuccessFor(input) { // elimina el error de los campos
	const formControl = input.parentElement; // .form-control
	formControl.className = 'form-control success';
} // fin de la función setSuccessFor

function isEmail(email) { // valida el correo electrónico
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
} // fin de la función isEmail

function isRut(inputRun) { // valida el rut completo
	return /^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(inputRun);
} // fin de la función isRut

