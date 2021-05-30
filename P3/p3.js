console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del convas
canvas.width = 700;
canvas.height = 700;

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

const ESTADO = {
  START: 0,
  INIT: 1,
  INGAME: 2,
  FINISH: 3,
}

let estado = ESTADO.START;

//-- Coordenadas de la pelota
let x = 250;
let y = 640;

//-- Velocidades de la pelota
let velx = 5;
let vely = -5;
 
//-- coordenadas Raqueta
let l = 300;
let p = 650;

//-- Velcidad Raqueta
let vell = 30;

//-- Inicializando contador vidas
let lifes = 5;

//-- Inicializando teclas NO pulsadas
let rightPressed = false;
let leftPressed = false;
let Puntuación = 0;

//-- Constantes de los ladrillos
const LADRILLO = {
  F: 5,  // Filas
  C: 10,  // Columnas
  w: 55, // Ancho
  h: 10, // Alto
  origen_x: 10,
  origen_y: 85,
  padding: 5,
  visible: true
};

  //-- Estructura de los ladrillos
//-- Creación de los ladrillos, que inicialmente está vacío
//-- en el objeto ladrillos, que inicialmente está vacío
const ladrillos = [];

//-- Recorrer todas las filas. La veriable i toma valores de 0 hasta F-1 (número de filas)
for (let i = 0; i < LADRILLO.F; i++) {
    ladrillos[i] = [];  //-- Inicilizar la fila. Las filas son a su vez Arrays que inicialmente están vacíos

    //-- Recorrer las C columnas de la fila i. La variable j toma valores de 0 hasta C-1 (numero de columnas)
    for (let j = 0; j < LADRILLO.C; j++) {

        //-- Calcular valores para el ladrillo de la fila i y la columna j
        //-- Algunos valores son constantes. Otros dependen de i y j
      ladrillos[i][j] = {
          x: (LADRILLO.w + LADRILLO.padding) * j +  LADRILLO.origen_x,
          y: (LADRILLO.h + LADRILLO.padding) * i + LADRILLO.origen_y,
          w: LADRILLO.w,
          h: LADRILLO.h,
          padding: LADRILLO.padding,
          visible: LADRILLO.visible
        };
    }
}

//-- Funcion principal de animacion
function update() 
{
    console.log("test");
    //-- Algoritmo de animacion:
    //-- 1) Actualizar posicion del  elemento
    //-- (física del movimiento rectilineo uniforme)
  
     //-- Condicion de rebote en extremos verticales del canvas
     if (x < 0 || x >= (canvas.width - 20) ) {
      velx = -velx;
    }
  
    //-- Condición de rebote en extremos horizontales del canvas
    if (y <= 60) {
      vely = -vely;
    }

    //-- Codición si la bola pasa la raqueta de abajo se reinicia el movimiento
    if (y >= 700 ) {
      console.log("fuera");
      estado = ESTADO.START;
      x = 300;
      y = 640;
      vely = -vely;
      velx = -velx;
      lifes -= 1;
      if (lifes == 0) {
        estado = ESTADO.FINISH;
      }
    }
    if (estado == ESTADO.FINISH){
      //-Mensaje victoria
      if (Puntuación == 50){
      ctx.font = "30px Arial Black";
      ctx.fillStyle = 'RED'
      ctx.fillText("VICTORY", 200, 40);
      console.log("victoria");
      }else{
      //-Mensaje derrota
      ctx.font = "50px Arial Black";
      ctx.fillStyle = 'red'
      ctx.fillText("¡¡GAME OVER!!", 200, 40);
      console.log("Has perdido");
      }
    }

    window.onkeydown = (e) => {
    if (e.key == ' ' && estado == ESTADO.START){
      console.log("DIBUJAR");
      estado = ESTADO.INGAME;
      }
    }

    //-Colision bola con raqueta
    if ((x + 10) >= l && x <=(l + 100) &&
    (y + 5) >= p && y <=(p + 10)) {
    vely = -vely;
    }

    if (estado == ESTADO.INGAME){
      for (let i = 0; i < LADRILLO.F; i++) {
          for (let j = 0; j < LADRILLO.C; j++) {
            if (ladrillos[i][j].visible == true){
                  if ((x + 10) >= ladrillos[i][j].x && x <=(ladrillos[i][j].x + 70) &&
                      (y + 10) >= ladrillos[i][j].y && y <=(ladrillos[i][j].y + 25)) {
                      ladrillos[i][j].visible = false;
                      vely = -vely;
                      Puntuación += 1;
            }
          }
      }
    }
  }

    //-- Actualizar la posición
    if (estado == ESTADO.INGAME) {
      x = x + velx;
      y = y + vely;

      window.onkeydown = (e) => {     // Tecla pulsada
        if(e.keyCode == 39 && l < 507) { // Muro derecha
            rightPressed = true;
            l = l + vell;
          }
          else if(e.keyCode == 37 && l > 2) { // Muro Izquierda
            leftPressed = true;
            l = l - vell;
          } 
        }
    

        window.onkeyup = (e) => {       // Tecla liberada
        if (e.keyCode == 39) {
            rightPressed = false;
            
          }
        else if(e.keyCode == 37) {
            leftPressed = false;
            
            } 
          }
    }
    
    //-- 2) Borrar el canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
    //-- 3) Dibujar los elementos visibles
    ctx.beginPath();

    //-- Dibujar un circulo: coordenadas x,y del centro
    //-- Radio, Angulo inicial y angulo final
    if (estado == ESTADO.INGAME) {
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
    }
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'red';


    //-- Dibujar el relleno
    ctx.fill()

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();

  ctx.beginPath();
    //-- Raqueta
    ctx.rect(l ,p , 90, 8);
    ctx.fillStyle = 'white';

    //-- Dibujar el trazo
    ctx.stroke()

    //-- Dibujar el relleno
    ctx.fill()  
    ctx.closePath()

  ctx.font = "25px Arial";
  ctx.filltyle = 'black';
  ctx.fillText("Score " + Puntuación, 10, 40);
  ctx.fillText("Vidas: " + lifes, 430, 40);

  if (Puntuación == 35){
  ctx.font = "30px Arial Black";
  ctx.fillStyle = 'green'
  ctx.fillText("VICTORY", 200, 40);
  estado = ESTADO.FINISH;
  }

  if (lifes == 0){
      ctx.font = "30px Arial Black";
      ctx.fillStyle = 'red'
      ctx.fillText("FIN DEL JUEGO", 140, 40);
      console.log("Has perdido");
      estado = ESTADO.FINISH;
  }


  //-- Dibujar ladrillos
  for (let i = 0; i < LADRILLO.F; i++) {
    for (let j = 0; j < LADRILLO.C; j++) {
      //-- Si el ladrillo es visible se pinta
      if (ladrillos[i][j].visible == true) {
        ctx.beginPath();
        ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.w, LADRILLO.h);
        var cr = 'rgb('+
        Math.floor(Math.random()*256)+','+
        Math.floor(Math.random()*256)+','+
        Math.floor(Math.random()*256)+')';
    
      ctx.fillStyle = 'hsl(' + 100 * Math.random() + ', 70%, 70%)';


        ctx.fill();
        ctx.closePath();
      }
      else if(ladrillos[i][j].visible == false){
      ladrillos[i][j] = [];
    }
  }
}
  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}
//-- ¡Que empiece la función!
update();