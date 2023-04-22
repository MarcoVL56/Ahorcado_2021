"use strict"

const diccionario = [
    { palabra: "Casa", pista: "Hogar de un ser humano" },
    { palabra: "Cuba", pista: "País con régimen comunista" },
    { palabra: "Hola", pista: "Palabra utilizada para saludar" },
    { palabra: "Cama", pista: "Mueble de un dormitorio" },
    { palabra: "Fifa", pista: "Videojuego deportivo" },
    { palabra: "Perro", pista: "Animal domestico" },
    { palabra: "Carro", pista: "Medio de transporte" },
    { palabra: "Apodo", pista: "Sobrenombre" },
    { palabra: "Botas", pista: "Tipo de calzado" },
    { palabra: "Catar", pista: "País ubicado en Asia" },
    { palabra: "Cuatro", pista: "Número odidado en China" },
    { palabra: "Ataque", pista: "Movimiento ofensivo" },
    { palabra: "Ingles", pista: "Un idioma" },
    { palabra: "Diesel", pista: "Tipo de combustible" },
    { palabra: "Atleta", pista: "Tipo de deportista" },
    { palabra: "Camisas", pista: "Prendas de vestir" },
    { palabra: "Pantalla", pista: "Dispositivo que transmite imagen" },
    { palabra: "Teclado", pista: "Periférico de una computadora" },
    { palabra: "Escritorio", pista: "Mueble de tipo mesa" },
    { palabra: "Cargador", pista: "Aparato para transmitir corriente" },
];

let palabraAleatoria = "";
let palabraAdivinar = "";
let turnos = 10;
let victorias = 0;
let derrotas = 0;
let letrasHistorial = [];
let letrasRepetidas = [];
const modalContenedor = document.getElementById("modal_contenedor");
const letraElegida = document.getElementById("letra_elegida");

function calcularPalabra(){
    let aleatorio = Math.floor(Math.random()*diccionario.length);
    palabraAleatoria = diccionario[aleatorio].palabra;
    for (let i = 0; i < palabraAleatoria.length; i++) {
        palabraAdivinar += "_ ";    
    }
    document.getElementById("palabra_oculta").innerHTML = palabraAdivinar;
}

function evaluarLetra(){
    let resultado = "";
    let letra = letraElegida.value.toLowerCase();
    palabraAleatoria = palabraAleatoria.toLowerCase();
    for (let i = 0; i < palabraAleatoria.length; i++) {
        if(letra == palabraAleatoria[i]){
            resultado = resultado + letra + " ";
        }else{
            resultado = resultado + palabraAdivinar[i*2] + " ";
        }
    }
    if(resultado == palabraAdivinar){
        turnos--;
        document.getElementById("mostrar_turnos").innerHTML = `Turnos: ${turnos}`;
        letrasHistorial.push(letraElegida.value.toLowerCase());
        document.getElementById("letra_historial").innerHTML = `Letras incorrectas: ${letrasHistorial.join('')}`;
    }
    palabraAdivinar = resultado;
    document.getElementById("palabra_oculta").innerHTML = palabraAdivinar;
}

function validarTurnos(){
    if(turnos == 0){
        derrotas++;
        modalContenedor.classList.add("mostrar");
        mostrarTexto(`PERDISTE la palabra es: ${palabraAleatoria.toUpperCase()} <br>
        Toca el botón nuevo juego para volver a comenzar`);
        document.getElementById("mostrar_derrotas").innerHTML = `Computadora: ${derrotas}`;
        document.getElementById("boton_evaluar").disabled = true;
        document.getElementById("boton_pista").disabled = true;
        letraElegida.disabled = true;

    } else if(palabraAdivinar.search("_") == -1){
        victorias++;
        modalContenedor.classList.add("mostrar");
        mostrarTexto(`GANASTE <br> Toca el botón nuevo juego para volver a comenzar`);
        document.getElementById("mostrar_victorias").innerHTML = `Jugador: ${victorias}`;
        document.getElementById("boton_evaluar").disabled = true;
        document.getElementById("boton_pista").disabled = true;
        letraElegida.disabled = true;
    }
    document.getElementById("mostrar_partidas").innerHTML = `Total: ${victorias + derrotas}`;
    letraElegida.value = "";
    letraElegida.focus();
}

function limitarLetra(){
    let respuesta = false;
    if(letrasRepetidas.includes(letraElegida.value.toLowerCase())){
        respuesta = true;
    }
    if(respuesta == true){
        modalContenedor.classList.add("mostrar");
        mostrarTexto(`Ya ingresaste la letra: "${letraElegida.value.toUpperCase()}" <br> por favor ingrese otra`);
    }else{
        letrasRepetidas.push(letraElegida.value.toLowerCase());
        evaluarLetra();
        validarTurnos();   
    }
    letraElegida.value = "";
    letraElegida.focus();
}

function revelarPista(){
    for (let i = 0; i < diccionario.length; i++) {
      if(palabraAleatoria.toLowerCase() == diccionario[i].palabra.toLowerCase()){
        document.getElementById("mostrar_pista").innerHTML = `Pista: ${diccionario[i].pista}`; 
      }
    }
}

function mostrarTexto(texto){
    document.getElementById("parrafoVentana").innerHTML = texto;
}

function cambiarImagen(){
    document.getElementById("imagen_ahorcado").src=`recursos/img/ahorcado/Ahorcado_${turnos}.png`;
}

function reiniciarJuego(){
    palabraAdivinar = "";
    turnos = 10;
    letrasHistorial = [];
    letrasRepetidas = [];
    document.getElementById("boton_evaluar").disabled = false;
    document.getElementById("boton_pista").disabled = false;
    letraElegida.disabled = false;
    document.getElementById("mostrar_pista").innerHTML = "";
    document.getElementById("letra_historial").innerHTML = `Letras incorrectas: ${letrasHistorial.join('')}`
    document.getElementById("mostrar_turnos").innerHTML = `Turnos: ${turnos}`;
    cambiarImagen();
}

function reiniciarMarcador(){
    victorias = 0;
    derrotas = 0;
    document.getElementById("mostrar_derrotas").innerHTML = `Computadora: ${derrotas}`;
    document.getElementById("mostrar_victorias").innerHTML = `Jugador: ${victorias}`;
    document.getElementById("mostrar_partidas").innerHTML = `Total: ${victorias + derrotas}`;
}

document.getElementById("boton_evaluar").onclick = function(){
    if(!/^[A-Z]+$/i.test(letraElegida.value)){
        modalContenedor.classList.add("mostrar");
        mostrarTexto(`Solo puede ingresar letras`);
        letraElegida.value = "";
        letraElegida.focus();
    }else{
        limitarLetra();
        cambiarImagen();
    }
}

document.getElementById("boton_juego").onclick = function(){
    reiniciarMarcador();
    reiniciarJuego();
    calcularPalabra();
}

document.getElementById("boton_clave").onclick = function(){
    modalContenedor.classList.add("mostrar");
    if(palabraAleatoria === ""){
        mostrarTexto(`El juego aún no es iniciado, 
        toque el botón nuevo juego para iniciar`);
    }else{
        mostrarTexto(`La palabra clave es: ${palabraAleatoria}`);
    } 
}

document.getElementById("boton_pista").onclick = function(){
    if(turnos <= 1){
        turnos = 0;
        validarTurnos();
        cambiarImagen();
        document.getElementById("boton_evaluar").disabled = true;
        letraElegida.disabled = true;
    }else{
        turnos--;
        revelarPista();
        cambiarImagen();
    }
    document.getElementById("mostrar_turnos").innerHTML = `Turnos: ${turnos}`;
    document.getElementById("boton_pista").disabled = true;
}

document.getElementById("boton_reiniciar").onclick = function(){
    reiniciarJuego();
    calcularPalabra();
}

document.getElementById("cerrar").onclick = function(){
    modalContenedor.classList.remove("mostrar");
}

addEventListener('DOMContentLoaded', function() {
    const botonMenu = document.querySelector('.boton-menu')
    if(botonMenu){
        botonMenu.addEventListener('click', function(){
            const menuLista = document.querySelector('.lista')
            menuLista.classList.toggle('mostrar')
        })
    }
})

calcularPalabra();
