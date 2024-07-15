let errorNombre = document.getElementById("error-nombre");
let errorTel = document.getElementById("error-tel");
let errorEmail = document.getElementById("error-email");
let errorAsunto = document.getElementById("error-asunto");
let errorMensaje = document.getElementById("error-mensaje");
let errorEnvio = document.getElementById("error-envio");
let formulario = document.getElementById("form-contacto");

formulario.addEventListener('submit', validarEnvio); 

function validarNombre(){
    let nombre = document.getElementById("nombre-contacto").value;

    if(nombre.length == 0) {
        errorNombre.innerHTML = "Debe ingresar un nombre!";
        return false;
    }
    if(nombre.length <= 4) {
        errorNombre.innerText = "Escriba el nombre completo!";
        return false;
    }
    errorNombre.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
    return true;
}

function validarTelefono() {
    let telefono = document.getElementById("telefono-contacto").value;
    
    if(telefono.length == 0){
        errorTel.innerHTML = "Debe ingresar un número de teléfono!";
        return false;
    }
    if(telefono.length !== 10){
        errorTel.innerHTML = "El número de teléfono debe contener 10 dígitos";
        return false;
    }
    if(!telefono.match(/^[0-9]{10}$/)){
        errorTel.innerHTML = "El número de teléfono ingresado es incorrecto"
        return false;
    }
    errorTel.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
    return true;
}

function validarEmail() {
    let email = document.getElementById("email-contacto").value;

    if(email == 0) {
        errorEmail.innerHTML = "Debe ingresar un correo electrónico!";
        return false;
    }

    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        errorEmail.innerHTML = "El correo electrónico ingresado no es válido!"
        return false;
    }
    errorEmail.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
    return true;
    
}

function validarAsunto(){
    let asunto = document.getElementById("asunto-contacto").value;
    
    if(asunto.length == 0) {
        errorAsunto.innerHTML = "Debe ingresar un asunto!";
        return false;
    }
    errorAsunto.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
    return true;


}

function validarMensaje(){
    let mensaje = document.getElementById("mensaje-contacto").value;
    const caracteresnecesarios = 30;
    let caracterespendientes = caracteresnecesarios - mensaje.length;

    if(caracterespendientes > 0) {
        errorMensaje.innerHTML = `${caracterespendientes}/${caracteresnecesarios}`;
        return false;
    }
    errorMensaje.innerHTML = '<i class="fa-solid fa-circle-check fa-lg" style="color: #1dd755;"></i>';
    return true;
}

function validarEnvio(evento){
    evento.preventDefault();
    if(!validarNombre() || !validarTelefono() || !validarEmail() || !validarAsunto() || !validarMensaje()){
        errorEnvio.style.display = "block";
        errorEnvio.innerHTML = "Por favor complete el formulario";
        setTimeout(function(){errorEnvio.style.display = "none";}, 3000);
        return false;
    }
    alert("El contacto hubiera sido enviado OK!");
    this.submit();
}


