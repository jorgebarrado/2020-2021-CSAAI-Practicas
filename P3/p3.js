console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Tamaño del convas
canvas.width = 700;
canvas.height = 700;

const ctx = canvas.getContext("2d");

//-- Estados del juego
const ESTADO = {
  INICIO: 0,
  JUGANDO: 1,
  FIN: 2,
}

let estado = ESTADO.INICIO;

//-- Vidas Inicio
let Vidas = 3;


//-- Puntos Inicio
let Puntuación = 00;

//-- Coordenada inial: Pelota
let x = canvas.width /2;
let y = canvas.height -60;

//-- Coordenada inicial: Raqueta
let l = canvas.width /2 -50;
let p = canvas.height -50;

//-- Velocidad: Pelota
let velx = 5;
let vely = -5;

//-- Velcidad: Raqueta
let vell = 50;

//-- Inicializando teclas NO pulsadas
let rightPressed = false;
let leftPressed = false;

//-- Ladrillos: Numero y Tamaño 
const LADRILLO = {
  Filas: 5,  
  Columnas: 10,  
  Ancho: 60, 
  Alto: 10, 
  origen_x: 10,
  origen_y: 85,
  padding: 9,
  visible: true
};

const ladrillos = [];
for (let i = 0; i < LADRILLO.Filas; i++){
  ladrillos[i] = [];
  for (let j = 0; j < LADRILLO.Columnas; j++){
    ladrillos[i][j]={
      x: (LADRILLO.Ancho + LADRILLO.padding) * j +  LADRILLO.origen_x,
      y: (LADRILLO.Alto + LADRILLO.padding) * i + LADRILLO.origen_y,
      w: LADRILLO.Ancho,
      h: LADRILLO.Alto,
      padding: LADRILLO.padding,
      visible: LADRILLO.visible
    };
  }
}

//-- Funcion principal del Juego
function update(){
  console.log();

  //-- Sacar Pelota

     window.onkeydown = (e) =>{
       if (e.key == ' ' && estado == ESTADO.INICIO){
         estado = ESTADO.JUGANDO;
        }
      }
    
  //-- Rebote: Laterales 
  if (x < 0 || x >= (canvas.width)){
    velx = -velx;
  }

  //-- Rebote: Parte Superior  
  if (y <= 10){
    vely = -vely;
  }
  
  //-- Perder vida: Parte Inferior
  if (y >= canvas.height){
    estado = ESTADO.INICIO;
    x = canvas.width /2;
    y = canvas.height -60;
    vely = -vely;
    velx = -velx;
    Vidas -= 1;

    if (Vidas == 0){
      estado = ESTADO.FIN;
    }
  }

    //-- COLISIONES 
    //-- Rebote: Raqueta
    if ((x + 10) >= l && x <=(l + 100) && (y + 2) >= p && y <=(p + 10)){
    vely = -vely;
    }

    //-- Destruir Ladrillo
    if (estado == ESTADO.JUGANDO){
      for (let i = 0; i < LADRILLO.Filas; i++) {
        for (let j = 0; j < LADRILLO.Columnas; j++) {
            if (ladrillos[i][j].visible == true) {
              if ((x + 10) >= ladrillos[i][j].x && x <=(ladrillos[i][j].x + 70) && (y + 10) >= ladrillos[i][j].y && y <=(ladrillos[i][j].y + 20)){
                  ladrillos[i][j].visible = false;
                  vely = -vely;
                  Puntuación += 1;
                }
              }
          }
        }
    }

  //-- MOVIMIENTOS 
  if (estado == ESTADO.JUGANDO){

    //-- Moviemiento: Pelota
    x = x + velx;
    y = y + vely;
    
    //-- Movimiento: Raqueta DERECHA
    window.onkeydown = (e) =>{
      if(e.keyCode == 39 && l < 600){
        rightPressed = true;
        l = l + vell;
        
    //-- Movimiento: Raqueta IZQUIERDA  
      }else if(e.keyCode == 37 && l > 1){
        leftPressed = true;
        l = l - vell;
      }
    }

    //-- Liberar Teclas 
    window.onkeyup = (e) =>{
      if (e.keyCode == 39){
        rightPressed = false; 
      }else if(e.keyCode == 37){
        leftPressed = false;
      }
    }
  }
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //-- DIBUJAR
  if ( estado == ESTADO.INICIO){
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;
    ctx.textAlign = "center";
    ctx.strokeText("PULSA ESPACIO PARA SACAR ", canvas.width/2, canvas.height/2);
    ctx.closePath();
  }
  //-- Dibujar: Pelota
  ctx.beginPath();
  if (estado == ESTADO.JUGANDO){
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
  }
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.fillStyle = 'Orange';
  ctx.fill()
  ctx.stroke()
  ctx.closePath();

  //-- Dibujar: Raqueta
  ctx.beginPath();
  ctx.rect(l, p, 100, 10);
  ctx.fillStyle = 'white';
  ctx.fill()
  ctx.stroke()
  ctx.closePath();
  
  //-- Dibujar: Marcadores 
  ctx.beginPath();
  ctx.font = "25px Arial";
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1.5;
  ctx.textAlign = "center";
  ctx.strokeText("Puntos: " + Puntuación, 60,  30);
  ctx.strokeText("Vidas: " + Vidas, canvas.width - 60,  30);
  ctx.closePath();


  //-- Dibujar: Ladrillos
  for (let i = 0; i < LADRILLO.Filas; i++) {
    for (let j = 0; j < LADRILLO.Columnas; j++){
      if (ladrillos[i][j].visible == true){
        ctx.beginPath();
        ctx.rect(ladrillos[i][j].x, ladrillos[i][j].y, LADRILLO.Ancho, LADRILLO.Alto);
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'black';
        ctx.fillStyle = 'hsl('+ 100 * Math.random() + ' ,70% ,70%)';
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      }else if(ladrillos[i][j].visible == false){
        ladrillos[i][j] = [];
      }
    }
  }

  //-- Dibujar: Mensajes Fin de partida
  //-- Mensaje: Victoria 
  if (Puntuación == 50){
    ctx.beginPath();
    ctx.font = "50px Arial Black";
    ctx.fillStyle ='hsl('+ (Math.random()*100 + 90) + ' ,70% ,50%)'
    ctx.textAlign = "center";
    ctx.fillText("YOU WIN", canvas.width/2, canvas.height/2);
    ctx.closePath();
    estado = ESTADO.FIN;
  }
  
  //-- Mensaje: Derrota
  if (Vidas == 0){
    ctx.beginPath();
    ctx.font = "50px Arial ";
    ctx.strokeStyle = 'hsl(0 ,100% ,50%)'
    ctx.textAlign = "center";
    ctx.strokeText("YOU LOST ", canvas.width/2, canvas.height/2);
    ctx.closePath();
    estado = ESTADO.FIN;
  }
  requestAnimationFrame(update);
}

update();
