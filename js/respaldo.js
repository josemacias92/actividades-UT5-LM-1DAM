document.addEventListener("DOMContentLoaded", Cargar("xml/libros.xml"));

function Cargar(fichero) {
    let http = new XMLHttpRequest();
    http.open("GET", fichero, true);
    //http.setRequestHeader("Content-type", "text/xml");
    http.send();
    http.addEventListener('load', (event) => {
        if (http.status === 200) {
            Gestionar(http.responseXML)
        }
    })
}

function InsertarEnDOM(elementoPadre, etiqueta, clase, contenido) {

    let nodo = document.createElement(etiqueta);
    nodo.classList.add(clase);
    nodo.textContent = contenido;
    elementoPadre.appendChild(nodo);
    return nodo;
}

function Gestionar(xmlDoc) {

    let librerias = xmlDoc.querySelectorAll('libreria');
    librerias.forEach(libreria => {

        let cuerpo = document.querySelector('body');
        let tabla = document.createElement('div');
        tabla.classList.add('tabla');
        cuerpo.appendChild(tabla);
        //Crear cabecera con nombre de la libreria
        let nombre = libreria.getElementsByTagName('nombre')[0].childNodes[0].nodeValue;
        InsertarEnDOM(tabla, 'div', 'cabecera', nombre);
        //Crear cada fila
        let fila = document.createElement('div');
        fila.classList.add('fila');
        tabla.appendChild(fila);

        let elementosLibro = [];

        elementosLibro[0] = 'ISBN';
        elementosLibro[1] = 'Título';
        elementosLibro[2] = 'Nivel';
        elementosLibro[3] = 'Autor';
        elementosLibro[4] = 'Editorial';
        elementosLibro[5] = 'Fecha Publicación';
        elementosLibro[6] = 'Página Web';
        elementosLibro[7] = 'Precio';

        for (let i = 0; i < elementosLibro.length; i++) {

            let contenido = elementosLibro[i];
            InsertarEnDOM(tabla, 'div', 'cabeza', contenido);
        }

        let libros = libreria.querySelectorAll('libro');
        libros.forEach(libro => {

            fila = document.createElement('div');
            fila.classList.add('fila');
            tabla.appendChild(fila);

            elementosLibro[0] = libro.getElementsByTagName('ISBN')[0].childNodes[0].nodeValue;
            elementosLibro[1] = libro.getElementsByTagName('titulo')[0].childNodes[0].nodeValue;
            elementosLibro[2] = libro.getElementsByTagName('nivelProfundidad')[0].childNodes[0].nodeValue;
            elementosLibro[3] = libro.getElementsByTagName('autores')[0].childNodes[1].firstChild.nodeValue;
            elementosLibro[4] = libro.getElementsByTagName('editorial')[0].childNodes[0].nodeValue;
            elementosLibro[5] = libro.getElementsByTagName('fechaPublicacion')[0].childNodes[0].nodeValue;
            elementosLibro[6] = libro.getElementsByTagName('paginaWeb')[0].childNodes[0].nodeValue;
            elementosLibro[7] = libro.getElementsByTagName('precio')[0].childNodes[0].nodeValue;

            let precios = libreria.getElementsByTagName('precio');
            let valores = [];
            valores[0] = precios[0].childNodes[0].nodeValue;
            valores[1] = precios[1].childNodes[0].nodeValue;
            valores[2] = precios[2].childNodes[0].nodeValue;
            valores.sort(function (a, b) { return a - b; })

            for (let i = 0; i < elementosLibro.length; i++) {

                let nodo;
                let contenido = elementosLibro[i];

                if (i != 7)
                    nodo = InsertarEnDOM(tabla, 'div', 'col', contenido);
                else {
                    nodo = InsertarEnDOM(tabla, 'div', 'precio', contenido);                  
                }

                if (elementosLibro[7] == valores[0])
                    nodo.classList.add('barato');
            }
        });
    });
}