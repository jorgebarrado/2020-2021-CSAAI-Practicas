 # Práctica 3
 
  //-- Estado Fin de Partida
  if (estado == ESTADO.FIN){ 
    //-- Ganar la Paritda: Destruir todos los ladrillos 
    if (Puntuación == 2){
      ctx.font = "100px Arial Black";
      ctx.fillStyle = 'Green'
      ctx.fillText("HAS GANADO", 200, 40);

    //-- Perder la partida: Quedarse sin vidas
    }else{ 
      ctx.font = "100px Arial Black";
      ctx.fillStyle = 'red'
      ctx.fillText("HAS PERDIDO", 200, 40);
      }
    }