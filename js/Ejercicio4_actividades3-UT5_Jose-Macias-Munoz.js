'use strict'

document.addEventListener("DOMContentLoaded", function (event) {

    const cuerpo = document.getElementsByTagName('body')[0];
    let formulario = GeneraFormulario(cuerpo);

    const botonAtras = InsertarEnDOM(cuerpo, 'a', 'boton', 'Atrás');
    botonAtras.setAttribute('href', '../index.html');
    botonAtras.classList.add('atras');
    const contenedorErrores = InsertarEnDOM(formulario, 'div', 'error', '');

    document.getElementById('Enviar').addEventListener('click', function (event) {

        event.preventDefault();
        let enviar = Comprobar(formulario);

        if (enviar) {
            let usuario = document.getElementById('Usuario').value;
            InsertarEnDOM(contenedorErrores, 'p', 'notificacion', 'El usuario ' + usuario + ' ha sido registrado correctamente.');
            contenedorErrores.classList.add('correcto');
            setTimeout(Enviar, 2000);
        }

        formulario.addEventListener('input', function (event) {
            Comprobar(formulario);
        });
    });
});

function Comprobar(formulario) {
    let enviar = true;
    let contenedorErrores = formulario.querySelector('.error');
    contenedorErrores.innerHTML = '';
    let campos = formulario.getElementsByClassName('campo');

    const mensajesError = [];
    mensajesError[0] = 'El usuario debe empezar en mayúscula y acabar en número.';
    mensajesError[1] = 'La contraseña debe tener 8 carácteres, empezar en un número y acabar en mayúscula.';
    mensajesError[2] = 'Las contraseñas no coinciden.';
    mensajesError[3] = 'Debe introducir una dirección de correo electrónico válida.';
    mensajesError[4] = 'El nombre debe empezar en mayúscula.';
    mensajesError[5] = 'Los apellidos deben de empezar en mayúscula.';
    mensajesError[6] = 'Edad no válida.';
    mensajesError[7] = 'El teléfono ha de empezar por 6, 7 o 9 y tener 9 dígitos.';

    for (let i = 0; i < campos.length; i++) {

        let valido = Validar(campos[i], contenedorErrores, mensajesError[i]);
        if (!valido)
            enviar = false;

        if (campos[i].id == 'Repetir Contraseña') {
            let contrasena = document.getElementById('Contraseña').value;
            campos[i].classList.add('campoValidado');

            if (campos[i].value != contrasena) {

                campos[i].setCustomValidity("No válido.");
                if (valido)
                    InsertarEnDOM(contenedorErrores, 'p', 'notificacion', mensajesError[i]);
                enviar = false;
            }
        }
    }

    return enviar;
}

function GeneraFormulario(contenedor) {

    const formulario = InsertarEnDOM(contenedor, 'form', 'formulario', '');
    formulario.noValidate = true;
    const cabecera = InsertarEnDOM(formulario, 'h2', 'cabecera', 'Formulario de registro')

    const campoUsuario = CrearCampo(formulario, 'Usuario', true, 'text', "^[A-Z]([A-Za-z0-9])*[0-9]$");
    campoUsuario.focus();
    const campoContrasena = CrearCampo(formulario, 'Contraseña', true, 'password', "^[0-9][a-zA-Z0-9\.\-\_\\\/]{6}[A-Z]$");
    const repiteContrasena = CrearCampo(formulario, 'Repetir Contraseña', true, 'password', "^[0-9][a-zA-Z0-9\.\-\_\\\/]{6}[A-Z]$");
    const campoEmail = CrearCampo(formulario, 'Email', true, 'email', "^([a-zA-Z0-9\-\_\.])+@([a-zA-Z0-9])+\.(com|es)$");
    const campoNombre = CrearCampo(formulario, 'Nombre', false, 'text', "^[A-Z][a-zA-Z]+");
    const campoApellidos = CrearCampo(formulario, 'Apellidos', false, 'text', "^[A-Z][a-zA-Z]+( [A-Z][a-zA-Z]+)?");
    const campoEdad = CrearCampo(formulario, 'Edad', false, 'number', "");
    const campoTelefono = CrearCampo(formulario, 'Teléfono', true, 'text', "[679][0-9]{8}");

    const botonEnviar = InsertarEnDOM(formulario, 'button', 'boton', 'Registrarse');
    botonEnviar.id = 'Enviar';

    return formulario;
}

function Validar(campo, contenedorErrores, mensajeError) {

    let valido = true;
    let nombre = campo.id;
    campo.classList.add('campoValidado');
    campo.setCustomValidity("");

    if (!campo.validity.valid) {
        valido = false;
        campo.setCustomValidity("No válido.");
        if (campo.required) {
            if (campo.value == null || campo.value.length == 0 || /^\s*$/.test(campo.value)) {
                InsertarEnDOM(contenedorErrores, 'p', 'notificacion', 'El campo ' + nombre + ' es obligatorio.');
            } else {
                InsertarEnDOM(contenedorErrores, 'p', 'notificacion', mensajeError);
            }
        } else {
            InsertarEnDOM(contenedorErrores, 'p', 'notificacion', mensajeError);
        }
    }

    return valido;
}

let Enviar = function () {
    document.getElementsByClassName('formulario')[0].submit();
}

function CrearCampo(formulario, label, requerido, tipo, patron) {
    let fila = InsertarEnDOM(formulario, 'div', 'fila', '');
    let etiqueta = InsertarEnDOM(fila, 'label', 'etiqueta', label + ':');
    let campo = InsertarEnDOM(fila, 'input', 'campo', '');
    campo.id = label;//.split(' ')[0];
    campo.setAttribute('type', tipo);
    campo.pattern = patron;

    if (requerido) {
        InsertarEnDOM(etiqueta, 'span', 'requerido', ' *')
        campo.required = true;
    }

    return campo;
}

function InsertarEnDOM(elementoPadre, etiqueta, clase, contenido) {
    let nodo = document.createElement(etiqueta);
    nodo.classList.add(clase);
    nodo.textContent = contenido;
    elementoPadre.appendChild(nodo);
    return nodo;
}