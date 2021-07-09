console.log("Ejecutando JS...");


//-- Elementos de la interfaz de la calculadora
display = document.getElementById("display")
display_2 = document.getElementById('display_2')
igual = document.getElementById("igual")
clear = document.getElementById("clear")
borrar = document.getElementById("borrar")

digito = document.getElementsByClassName("digito")
operador = document.getElementsByClassName("operador")

var op = 0;

//-- Estados de la calculadora

const ESTADO = {
  OP0: 0,
  OP1: 1,
}

let estado = ESTADO.OP0;

// -- Insertar digito 
for (i=0; i<digito.length; i++) {
digito[i].onclick = (ev) => {
  if (display.innerHTML == "0"){
      display.innerHTML = ev.target.value;
  }else{
    display.innerHTML += ev.target.value;
  }
  if (estado == ESTADO.OP1){
    op = op + 1;
    display_2.innerHTML = eval(display.innerHTML);
  }else{

    display_2.innerHTML = eval(display.innerHTML);
  }
}
}

// -- Insertar operador 
for (i=0; i<operador.length; i++) {
  operador[i].onclick = (ev) => {
  
    if (estado == ESTADO.OP0){
      display_2.innerHTML =  display.innerHTML ;
        display.innerHTML += ev.target.value;
        estado = ESTADO.OP1;
    }else{
      display_2.innerHTML = 'NO MAS SIGNOS';
    }
  }
  }
  

borrar.onclick = () => {
    let cadena = []
    console.log(display.innerHTML.length);
    if(display.innerHTML.length == 1){
      display.innerHTML = '0';
    }else{
      for (i=0; i<display.innerHTML.length-1; i++) {
        cadena += display.innerHTML[i];
      }
      if (estado = ESTADO.OP1){
        if (op == 0){
          estado = ESTADO.OP0;
            
        }else{
          op = op - 1; 
        }
         display.innerHTML = cadena;
      }else{ 
        display.innerHTML  = cadena;
      }
      
    }
    display_2.innerHTML = eval(display.innerHTML);
  }

//-- Evaluar la expresion
igual.onclick = () => {
   display_2.innerHTML = display.innerHTML + ' =';
    display.innerHTML = eval(display.innerHTML);
    estado = ESTADO.OP0;
    op = 0;
    
  }

//-- Poner a cero la expresion
clear.onclick = () => {
  display.innerHTML = '0';
  display_2.innerHTML = ' ';
  estado = ESTADO.OP0;
  
  op = 0;
}


