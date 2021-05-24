'use strict'

let fichero = "../sources/mensajes.txt";
let cuerpo = document.getElementById('cuerpo');
let mensajesLeidos = 0;

document.addEventListener("DOMContentLoaded", CrearInterfaz);

function Cargar(fichero, primeraLectura) {
    let http = new XMLHttpRequest();
    http.open("GET", fichero, true);
    http.send();
    http.addEventListener('load', (event) => {
        if (http.status == 200) {
            Gestionar(http.responseText, primeraLectura);
        }
    });
}

function CrearInterfaz() {
    let cabecera = InsertarEnDOM(cuerpo, 'div', 'cabecera', '');
    let botonAtras = InsertarEnDOM(cabecera, 'a', 'botonAtras', '');
    botonAtras.setAttribute('href', '../index.html');
    InsertarEnDOM(cabecera, 'div', 'fotoPerfil', '');
    InsertarEnDOM(cuerpo, 'div', 'areaMensajes', '');

    Cargar(fichero, true);
    setInterval(CargarMensajes, 5000);

    let formulario = GenerarFormulario();
    let cuadroTexto = formulario.getElementsByClassName('cuadroTexto')[0];
    cuadroTexto.addEventListener('change', IntroducirMensaje);
}

let CargarMensajes = function () {
    let hoy = new Date();
    let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    console.log(hora);
    Cargar(fichero, false);
};

function IntroducirMensaje() {
    let cuadroTexto = document.getElementsByClassName('cuadroTexto')[0];
    let botonEnviar = document.getElementsByClassName('botonEnviar')[0];
    botonEnviar.addEventListener('click', envio(cuadroTexto));
}

let envio = function EnviarMensaje(cuadroTexto) {
    let textoAEnviar = cuadroTexto.value;
    let hoy = new Date();
    let hora = hoy.getHours() + ':' + hoy.getMinutes();
    let bocadillo = CrearBocadillo();
    RellenarBocadillo(bocadillo, 'Tú', textoAEnviar, hora + '  ✔');
    bocadillo.classList.add('receptor');
    document.getElementsByClassName('cuadroTexto')[0].value = '';
    document.scrollTop = document.scrollHeight - document.clientHeight;;
    document.getElementsByClassName('botonEnviar')[0].removeEventListener('click', envio);
    cuadroTexto.focus();
}

function Gestionar(textDoc, primeraLectura) {
    let mensajes = textDoc.split(/\r\n|\n/);
    let emisor = mensajes[0].split('=>')[1];
    let receptor = mensajes[1].split('=>')[1];
    mensajes.shift();
    mensajes.shift();

    if (primeraLectura) {
        let cabecera = document.getElementsByClassName('cabecera')[0];
        InsertarEnDOM(cabecera, 'div', 'nombreReceptor', emisor);
    }

    for (let i = mensajesLeidos; i < mensajes.length; i++) {
        let bocadillo = CrearBocadillo();
        let mensaje = mensajes[i].split('~');
        let hora = mensaje[1];
        let nombre = mensaje[0].split(':- ')[0];
        let contenido = mensaje[0].split(':- ')[1];

        if (nombre == receptor) {
            bocadillo.classList.add('receptor');
            hora += '  ✔';
        }
        else
            bocadillo.classList.add('emisor');

        RellenarBocadillo(bocadillo, nombre, contenido, hora);
        mensajesLeidos++;
    }
}

function CrearBocadillo() {
    let areaMensajes = document.getElementsByClassName('areaMensajes')[0];
    let bocadillo = InsertarEnDOM(areaMensajes, 'div', 'bocadillo', '');
    return bocadillo;
}

function RellenarBocadillo(bocadillo, nombre, contenido, hora) {
    InsertarEnDOM(bocadillo, 'div', 'remitente', nombre);
    let cuerpoMensaje = InsertarEnDOM(bocadillo, 'div', 'cuerpoMensaje', '');
    InsertarEnDOM(cuerpoMensaje, 'div', 'mensaje', contenido);
    InsertarEnDOM(cuerpoMensaje, 'div', 'hora', hora);
    let areaMensajes = document.getElementsByClassName('areaMensajes')[0];
    areaMensajes.scrollTop = areaMensajes.scrollHeight;
}

function GenerarFormulario() {
    let formulario = InsertarEnDOM(cuerpo, 'form', 'formulario', '');
    let cuadroTexto = InsertarEnDOM(formulario, 'input', 'cuadroTexto', '');
    cuadroTexto.setAttribute('type', 'text');
    cuadroTexto.focus();
    cuadroTexto.setAttribute('placeholder', 'Escribe un mensaje');
    InsertarEnDOM(formulario, 'div', 'botonEnviar', '');
    return formulario;
}

function InsertarEnDOM(elementoPadre, etiqueta, clase, contenido) {
    let nodo = document.createElement(etiqueta);
    nodo.classList.add(clase);
    nodo.textContent = contenido;
    elementoPadre.appendChild(nodo);
    return nodo;
}