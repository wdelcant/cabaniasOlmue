//================================ FUNCIONES DE COTIZACIÓN ==========================================================

//inicio del código
// declaramos las variables de los precios
const priceOne = 60000;
const priceTwo = 120000;
let total = 0;
let totalPersonas = 0;

alert('Bienvenido/a a nuestro programa de cotización de cabañas');
let userName = prompt('Ingrese nombre de usuario '); // El usuario ingresa su nombre
alert(`Hola ${userName.toUpperCase()} bienvenido/a`); // mensaje de bienvenida

alert('A continuación elija la cantidad de personas que desean arrendar');
adults = parseInt(prompt('Ingrese el número de adultos'));
kids = parseInt(prompt('Ingrese el número de niños'));

// Listas
class User {    
    constructor(name, lastName, age) {
        this.name = name.toUpperCase();
        this.lastName = lastName.toUpperCase();
        this.age = age;
    }
}

function registerUsers() { // registra los usuarios
    let numberUsers = adults + kids;
    let users = [];
    for (let i = 0; i < numberUsers; i++) {
        let name = prompt('Ingrese el nombre de la persona a registrar: ');
        let lastName = prompt('Ingrese el apellido');
        let age = parseInt(prompt('Ingrese la edad'));
        let user = new User(name, lastName, age);
        users.push(user);
    }
    return users;
}

function registeredUsers(users) { // muestra los usuarios registrados
    for (const user of users) {
        console.log(user);
        alert(`Nombre: ${user.name} \n Apellido: ${user.lastName} \n Edad: ${user.age}`);
    }
}

function registration() { // registra los usuarios
    let users = registerUsers();
    registeredUsers(users);
}

// Funciones de orden superior
const menus = [{ // Lista de menú de opciones del día c/ entrada piscina 
    id: 1,
    name: 'Desayuno',
    price: 3500
    },{
    id: 2,
    name: 'Almuerzo',
    price: 8000
    },{ 
    id: 3,
    name: 'Once',
    price: 3500
    },
];

function menuComida(menus) {

    const nombreComidas = parseInt(prompt('Que deseas \n 1. Desayuno \n 2. Almuerzo \n 3. Once'));
    const comidasEncontrado = menus.find((comida) => comida.id === nombreComidas);
    if (comidasEncontrado) {
        alert(`El ${comidasEncontrado.name}, tiene un precio de: $${comidasEncontrado.price} por persona`);
            console.log(`El ${comidasEncontrado.name} tiene un precio de: $${comidasEncontrado.price} por persona`);
            console.log(comidasEncontrado);
    }
    else if (comidasEncontrado === undefined) {
        alert('No se encontró la comida');
    }
    showMenu();
    
}

// funciones

function oneCabin(adults, kids){ // cotizamos una cabaña
    let total = adults + kids;
        if (adults <= 0 && kids !== 0){
            alert('No se puede arrendar una cabañas sin adultos');
            showMenu();
        }
        else if (total > 6){
            /* Una alerta que se activa cuando el número de personas supera las 6. */
            alert('Sobrepasa el limite de personas por cabaña (6 personas), contrate dos si desea mas capacidad');
            showMenu();
        }
        else (total <= 6)
            {registration();} 

    return total;
}

function twoCabin(adults, kids){ // cotizamos dos cabañas«
    let total = adults + kids;
        if (adults <= 0 && kids !== 0){
            alert('No se puede arrendar una cabañas sin adultos');
            showMenu();
        }
        else if (total > 12){
            /* Una alerta que se activa cuando el número de personas supera las 12. */
            alert('Sobrepasa el limite de personas máximo por cabaña, si son mas personas favor contactar a nuestro personal');
            showMenu();
        }
        else (total <= 12)
            {registration();} 
    return total;
}

function showMenu(menu){ // muestra el menú principal del programa
    let options = prompt(`Estimado/a ${userName.toUpperCase()}, actualmente son ${adults + kids} personas ingresadas. \n \n Elija la opción que desea: \n 1. Una cabaña (hasta 6 personas) \n 2. Dos cabañas (hasta 12 personas) \n \n Escriba (EXIT) para salir`);
    return options;
}

function quotation(){ //cotizamos las cabañas y el menú
    let selectedOption = showMenu(); 
    while(selectedOption !== 'EXIT'){
        if(!isNaN(selectedOption !== '')){
                selectedOption = parseInt(selectedOption);
                 //Switch seleccionar la opción
                
                switch(selectedOption){
                    case 1: // una cabaña
                        let totalOne = oneCabin(adults, kids); // solicitamos el número de adultos y niños
                        total = total + priceOne
                        totalPersonas = totalPersonas + adults + kids 
                        const footOne = prompt(`¿Desea menu diario o menu completo? \n 1. Si \n 2. No`)
                        if(footOne === '1'){
                            menuComida(menus);
                        }
                        else if(footOne === '2'){
                            const decisionOne = prompt(`¿Desea seguir cotizando? \n 1. Si \n 2. No`)
                            if (decisionOne === '1'){
                                alert('A continuación elija la cantidad de personas que desean arrendar');
                                adults = parseInt(prompt('Ingrese el número de adultos'));
                                kids = parseInt(prompt('Ingrese el número de niños'));
                                selectedOption = showMenu();
                            }
                            else if (decisionOne === '2'){
                                alert(`El total a pagar es: $${total}`);
                                alert(`El total de personas ingresadas es: ${totalPersonas}`);
                                selectedOption = 'EXIT';
                            }
                            else if (decisionOne === undefined || decisionOne === ''){
                                alert('Opción no valida');
                            }
                        }
                        else if (footOne === undefined || footOne === '') {
                                alert('Ese menu no existe');
                        }	
                        break;

                    case 2: // dos cabañas
                        let totalTwo = twoCabin(adults, kids); // solicitamos el número de adultos y niños
                        total = total + priceTwo
                        totalPersonas = totalPersonas + adults + kids 
                        const footTwo = prompt(`¿Desea menu diario o menu completo? \n 1. Si \n 2. No`)
                        if (footTwo === '1'){
                            menuComida(menus);
                        }
                        else if (footTwo === '2'){
                            const decisionTwo = prompt(`¿Desea seguir cotizando? \n 1. Si \n 2. No`)
                            if (decisionTwo === '1'){
                            alert('A continuación elija la cantidad de personas que desean arrendar');
                            adults = parseInt(prompt('Ingrese el número de adultos'));
                            kids = parseInt(prompt('Ingrese el número de niños'));
                            selectedOption = showMenu()
                            }
                            else if (decisionTwo === '2'){
                            alert(`El total a pagar es: $${total}`);
                            alert(`El total de personas ingresadas es: ${totalPersonas}`);
                            selectedOption = 'EXIT';
                            }
                            else{
                                alert('Opción inválida');   
                            }
                        }
                        else {
                            alert('Opción no válida');
                        }
                        break;

                    default:
                        alert('Ingrese la opción 1 o 2 para continuar');
                        selectedOption = showMenu();
                        break;
                }
        }     
        else{ // si el usuario ingresa un número que no está entre 1,2 o 3
            alert('Ingrese la opción valida');  
            selectedOption = showMenu();
        }
        
    }
}
/* Llamando a la función principal. */
quotation();
/* Fin de la función principal. */

alert(`Adios ${userName.toUpperCase()}. Gracias por usar nuestro servicio de arriendo de cabañas.`);

