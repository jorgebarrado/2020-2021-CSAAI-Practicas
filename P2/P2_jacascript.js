console.log("Ejecutando JS...");


//-- Elementos de la interfaz de la calculadora
display = document.getElementById("display")
display_2 = document.getElementById('display_2')
suma = document.getElementById("suma")
resta = document.getElementById("resta")
multiplicacion = document.getElementById("multiplicacion")
division = document.getElementById("division")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borrar = document.getElementById("borrar")

digito = document.getElementsByClassName("digito")
 
const max_digitos = 99;
const max_calculos = 9;
var n = 0;
var cadena_historial = [];

function Open_Calculadora() {
    document.getElementById('caja_todos_elementos').style.display = 'inline-block';
    document.getElementById('caja_historial').style.display = 'inline-block';
    elementoPadre = contenedor_abrir.parentNode
    elementoPadre.removeChild(contenedor_abrir)
  }
  
// -- Insertar digito 
for (i=0; i<digito.length; i++) {
digito[i].onclick = (ev) => {
  if (display.innerHTML == "0" ){
      display.innerHTML = ev.target.value;
  }else{
    display.innerHTML += ev.target.value;
  }
}
}
//-- Insertar simbolo de sumar
suma.onclick = () => {
  display.innerHTML += suma.value;
}
//-- Insertar simbolo de resta
resta.onclick = () => {
    display.innerHTML += resta.value;
}

//-- Insertar simbolo de multiplicacion
multiplicacion.onclick = () => {
    display.innerHTML += multiplicacion.value;
  }
  //-- Insertar simbolo de division
  division.onclick = () => {
      display.innerHTML += division.value;
  }

borrar.onclick = () => {
 
    document.getElementById('error_maximo_digitios').style.display = 'none';
    let cadena = []
  
    console.log(display.innerHTML.length);
  
    if(display.innerHTML.length == 1){
      display.innerHTML = '0';
    }else{
      for (i=0; i<display.innerHTML.length-1; i++) {
        cadena += display.innerHTML[i];
      }
      display.innerHTML  = cadena;
    }
  }

//-- Evaluar la expresion
igual.onclick = () => {
    display.innerHTML = eval(display.innerHTML);
  }
//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = '0';
}


