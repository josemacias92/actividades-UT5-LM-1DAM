'use strict'

document.addEventListener("DOMContentLoaded", function (event) {

    const cuerpo = document.getElementsByTagName('body')[0];
    const formulario = InsertarEnDOM(cuerpo, 'form', 'formulario', '');
    formulario.noValidate = true;

    InsertarEnDOM(formulario, 'label', 'etiqueta', 'Correo electrónico');
    const campoEmail = InsertarEnDOM(formulario, 'input', 'campo', '');
    campoEmail.setAttribute('type', 'email');
    campoEmail.pattern = "^([a-zA-Z0-9\-\_\.])+@iesdoctorbalmis.com$";
    campoEmail.focus();

    InsertarEnDOM(formulario, 'label', 'etiqueta', 'Contraseña');
    const campoContrasena = InsertarEnDOM(formulario, 'input', 'campo', '');
    campoContrasena.setAttribute('type', 'password');
    campoContrasena.pattern = "[0-9]{8}";

    const botones = InsertarEnDOM(formulario, 'div', 'botones', '');
    
    const botonEnviar = InsertarEnDOM(botones, 'input', 'boton', '');
    botonEnviar.setAttribute('type', 'submit');

    const botonAtras = InsertarEnDOM(botones, 'a', 'boton', 'Atrás');
    botonAtras.setAttribute('href', '../index.html');
    botonAtras.classList.add('atras')

    const error = InsertarEnDOM(formulario, 'div', 'error', '');

    formulario.addEventListener('submit', function (event) {
        campoEmail.classList.add('campoValidado');
        campoContrasena.classList.add('campoValidado');
        campoEmail.setCustomValidity("");
        campoContrasena.setCustomValidity("");
        //jose.macias@iesdoctorbalmis.com
        event.preventDefault();

        if (!campoEmail.validity.valid || campoEmail.value == null || campoEmail.value.length == 0 || /^\s*$/.test(campoEmail.value)) {
            campoEmail.setCustomValidity("No se permiten campos vacíos o espacios.");
            error.classList.add('activo');
            error.textContent = 'Debe introducir una dirección de correo electrónico de dominio @iesdoctorbalmis.com';
            //event.preventDefault();
        } else if (!campoContrasena.validity.valid || campoContrasena.value == null || campoContrasena.value.length == 0 || /^\s*$/.test(campoContrasena.value)) {
            campoEmail.setCustomValidity("");
            campoContrasena.setCustomValidity("No se permiten campos vacíos o espacios.")
            error.classList.add('activo');
            error.textContent = 'Debe introducir una contraseña de 8 dígitos';
            //event.preventDefault();
        } else {
            error.innerHTML = 'Se ha registrado el usuario \"' + campoEmail.value + '\" corectamente.';
            error.classList.add('correcto');
            error.classList.add('activo');
            setTimeout(enviar, 1000);
        }

        formulario.addEventListener('input', function (event) {
            campoEmail.setCustomValidity("");
            campoContrasena.setCustomValidity("");
        });
    });
});

let enviar = function() {
    document.getElementsByClassName('formulario')[0].submit();
}

function InsertarEnDOM(elementoPadre, etiqueta, clase, contenido) {
    let nodo = document.createElement(etiqueta);
    nodo.classList.add(clase);
    nodo.textContent = contenido;
    elementoPadre.appendChild(nodo);
    return nodo;
}