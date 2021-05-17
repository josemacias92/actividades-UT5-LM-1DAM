document.addEventListener("DOMContentLoaded", Cargar("../sources/libros.xml"));
function Cargar(fichero) {
    let http = new XMLHttpRequest();
    http.open("GET", fichero, true);
    //http.setRequestHeader("Content-type", "text/xml");
    http.send();
    http.addEventListener('load', (event) => {
        if (http.status === 200) {
            Gestionar(http.responseXML)
        }
    });
}

function Gestionar(xmlDoc) {
    let cuerpo = document.getElementById('elementos');
    let librerias = xmlDoc.querySelectorAll('libreria');

    librerias.forEach(libreria => {
        let tabla = InsertarEnDOM(cuerpo, 'div', 'tabla', '');
        CrearCabecera(libreria, tabla);
        GenerarFilas(libreria, tabla);
    });

    let atras = InsertarEnDOM(cuerpo, 'a', 'atras', 'Atrás');
    atras.setAttribute('href', '../index.html');
}

function InsertarEnDOM(elementoPadre, etiqueta, clase, contenido) {
    let nodo = document.createElement(etiqueta);
    nodo.classList.add(clase);
    nodo.textContent = contenido;
    elementoPadre.appendChild(nodo);
    return nodo;
}

function CrearCabecera(libreria, tabla) {
    let elementosCabecera = [];
    let nombre = libreria.getElementsByTagName('nombre')[0].childNodes[0].nodeValue;
    InsertarEnDOM(tabla, 'div', 'cabecera', 'Librería ' + nombre);
    InsertarEnDOM(tabla, 'div', 'fila', '');

    elementosCabecera[0] = 'ISBN';
    elementosCabecera[1] = 'Título';
    elementosCabecera[2] = 'Nivel';
    elementosCabecera[3] = 'Autor';
    elementosCabecera[4] = 'Editorial';
    elementosCabecera[5] = 'Fecha Publicación';
    elementosCabecera[6] = 'Página Web';
    elementosCabecera[7] = 'Precio';

    for (let i = 0; i < elementosCabecera.length; i++) {
        let contenido = elementosCabecera[i];
        InsertarEnDOM(tabla, 'div', 'cabeza', contenido);
    }
}

function GenerarFilas(libreria, tabla) {
    let libros = libreria.querySelectorAll('libro');

    libros.forEach(libro => {
        InsertarEnDOM(tabla, 'div', 'fila', '');
        let elementosLibro = GetElementos(libro);
        let barato = BuscarBarato(libreria);

        for (let i = 0; i < elementosLibro.length; i++) {
            let contenido = elementosLibro[i];
            let nodo = InsertarEnDOM(tabla, 'div', 'col', contenido);

            if (elementosLibro[7] == barato)
                nodo.classList.add('barato');
        }
    });
}

function GetElementos(libro) {
    let elementosLibro = [];

    elementosLibro[0] = libro.getElementsByTagName('ISBN')[0].childNodes[0].nodeValue;
    elementosLibro[1] = libro.getElementsByTagName('titulo')[0].childNodes[0].nodeValue;
    elementosLibro[2] = libro.getElementsByTagName('nivelProfundidad')[0].childNodes[0].nodeValue;
    elementosLibro[3] = libro.getElementsByTagName('autores')[0].childNodes[1].firstChild.nodeValue;
    elementosLibro[4] = libro.getElementsByTagName('editorial')[0].childNodes[0].nodeValue;
    elementosLibro[5] = libro.getElementsByTagName('fechaPublicacion')[0].childNodes[0].nodeValue;
    elementosLibro[6] = libro.getElementsByTagName('paginaWeb')[0].childNodes[0].nodeValue;
    elementosLibro[7] = libro.getElementsByTagName('precio')[0].childNodes[0].nodeValue;

    return elementosLibro;
}

function BuscarBarato(libreria) {
    let precios = libreria.getElementsByTagName('precio');
    let valores = [];

    for (let i = 0; i < precios.length; i++) {
        valores[i] = precios[i].childNodes[0].nodeValue;
    }

    return valores.sort(function (a, b) { return a - b; })[0];
}