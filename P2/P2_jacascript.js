console.log("Ejecutando JS...");


//-- Elementos de la interfaz de la calculadora
display = document.getElementById("display")
display_2 = document.getElementById('display_2')
boton1 = document.getElementById("boton1")
boton2 = document.getElementById("boton2")
boton3 = document.getElementById("boton3")
boton4 = document.getElementById("boton4")
boton5 = document.getElementById("boton5")
boton6 = document.getElementById("boton6")
boton7 = document.getElementById("boton7")
boton8 = document.getElementById("boton8")
boton9 = document.getElementById("boton9")
boton0 = document.getElementById("boton0")
suma = document.getElementById("suma")
resta = document.getElementById("resta")
multiplicacion = document.getElementById("multiplicacion")
division = document.getElementById("division")
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borrar = document.getElementById("borrar")

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
  
// -- Insertar digito 1
boton1.onclick = () => {
    display.innerHTML += boton1.value;
}
//-- Insertar digito 2
boton2.onclick = () => {
    display.innerHTML += boton2.value;
}
// -- Insertar digito 3
boton3.onclick = () => {
    display.innerHTML += boton3.value;
}
//-- Insertar digito 4
boton4.onclick = () => {
    display.innerHTML += boton4.value;
}
// -- Insertar digito 5
boton5.onclick = () => {
    display.innerHTML += boton5.value;
}
//-- Insertar digito 6
boton6.onclick = () => {
    display.innerHTML += boton6.value;
}
// -- Insertar digito 7
boton7.onclick = () => {
    display.innerHTML += boton7.value;
} 
//-- Insertar digito 8
boton8.onclick = () => {
    display.innerHTML += boton8.value;
}
//-- Insertar digito 9
boton9.onclick = () => {
    display.innerHTML += boton9.value;
}
//-- Insertar digito 0
boton0.onclick = () => {
    display.innerHTML += boton0.value;
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
      display.innerHTML = ' ';
    }else{
      for (i=0; i<display.innerHTML.length-1; i++) {
        cadena += display.innerHTML[i];
      }
      display.innerHTML  = cadena;
    }
  }

//-- Evaluar la expresion
igual.onclick = () => {

    let cadena_aux = []
  
    if(n < max_calculos ){
      display_2.innerHTML += display.innerHTML + " = " + eval(display.innerHTML) + "<br>";
      cadena_historial[n] = display.innerHTML + " = " + eval(display.innerHTML) + "<br>";
      n = n + 1;
    }else{
      for (i=0; i<max_calculos; i++) {
        cadena_aux[i] = cadena_historial[i];
      }
  
      for (i=0; i<max_calculos-1; i++) {
        cadena_historial[i] = cadena_aux[1+i];
      }
  
      cadena_historial[max_calculos-1] = display.innerHTML + " = " + eval(display.innerHTML) + "<br>";
      display_2.innerHTML = [];
  
      for (i=0; i<max_calculos; i++) {
        display_2.innerHTML += cadena_historial[i];
      }
    }
    display.innerHTML = eval(display.innerHTML);
  }
//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = ' ';
}


