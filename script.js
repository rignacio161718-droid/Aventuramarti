
// IMÁGENES

const fondoGalaga = new Image();
fondoGalaga.src = "img/fondogalaga.jpg";

const marti = new Image();
marti.src = "img/marti.png";

const shrek = new Image();
shrek.src = "img/sherkboss.jpg";

const dulce = new Image();
dulce.src = "img/dulces.jfif";

const miguel = new Image();
miguel.src = "img/Miguel.png";

const fondoBoss = new Image();
fondoBoss.src = "img/Fondobossfinal.jpg";

// VARIABLES NIVEL 2

let dulcesRestantes = 5;

let enemigos = [];

let disparos = [];

let contadorSpawn = 0;

let tiempoRestante = 60;
let ultimoSegundo = Date.now();

let nivel2Terminado = false;

let canvasLaberinto;
let ctxLaberinto;

let shrekX = 275;
let shrekDireccion = 1; 

let disparosShrek = [];
let contadorAtaqueShrek = 0;

const laberinto = [

[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
[1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
[1,0,1,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,0,1],
[1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,1],
[1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1],
[1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1],
[1,1,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1],
[1,0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,1],
[1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1],
[1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1],
[1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,0,1],
[1,0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1],
[1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1],
[1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,2,1],
[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

];

let miguelX = 1;
let miguelY = 1;


function comenzar() {

    document.getElementById("inicio").style.display = "none";
    document.getElementById("menu").style.display = "block";

}

function abrirStitch() {

    document.getElementById("menu").style.display = "none";
    document.getElementById("stitchJuego").style.display = "block";

    generarStitch();

}

function generarStitch() {

    let animales = [
        "🐱","🐶","🐭","🐹",
        "🐰","🐼","🐸","🐨",
        "🦊","🐯","🐵"
    ];

    let posicion = Math.floor(Math.random() * 12);

    let html = "";

    for(let i = 0; i < 12; i++) {

        if(i === posicion) {

            html += `
                <button onclick="ganarStitch()">
                    💙
                </button>
            `;

        } else {

            let animal =
            animales[Math.floor(Math.random() * animales.length)];

            html += `
                <button onclick="perder()">
                    ${animal}
                </button>
            `;
        }
    }

    document.getElementById("cuadriculaStitch").innerHTML = html;

    document.getElementById("resultadoStitch").innerHTML = "";
}

function ganarStitch() {


    document.getElementById("resultadoStitch").innerHTML =
    "🎉 ¡Encontraste a Stitch! <br><br> 💙 Muy bien, completaste el primer nivel. Este era fácil para ir empezando. Ahora iremos a los siguientes desafíos.";
    setTimeout(() => {

    document.getElementById("stitchJuego").style.display = "none";

    document.getElementById("introGalaga").style.display = "block";

}, 4000);

}
function perder() {

    document.getElementById("resultadoStitch").innerHTML =
        "❌ Ese no era Stitch";

}

let canvas;
let ctx;

let jugadorX = 375;
let jugadorY = 430;

let izquierda = false;
let derecha = false;

// BOSS FINAL

let bossCanvas;
let bossCtx;

let bossJugadorX = 420;

let shrekVida = 100;
let vidaMarti = 100;


let bossDisparos = [];



function abrirGalaga() {

    document.getElementById("introGalaga").style.display = "none";

    document.getElementById("galagaJuego").style.display = "block";

    canvas = document.getElementById("canvasGalaga");

    ctx = canvas.getContext("2d");

    actualizarGalaga();
}

function actualizarGalaga() {

    if(nivel2Terminado){
    return;
}

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fondo
    ctx.drawImage(
        fondoGalaga,
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Marti
    ctx.drawImage(
        marti,
        jugadorX,
        jugadorY,
        70,
        70
    );

    // Movimiento
    if (izquierda) jugadorX -= 5;
    if (derecha) jugadorX += 5;

    if (jugadorX < 0) jugadorX = 0;
    if (jugadorX > canvas.width - 70)
        jugadorX = canvas.width - 70;

    // Crear Shrek
    contadorSpawn++;

    if(contadorSpawn > 60){

        enemigos.push({
            x: Math.random() * (canvas.width - 80),
            y: -80
        });

        contadorSpawn = 0;
    }

    // Dibujar enemigos
    for(let i = enemigos.length - 1; i >= 0; i--){

        let enemigo = enemigos[i];

        enemigo.y += 3;

        ctx.drawImage(
            shrek,
            enemigo.x,
            enemigo.y,
            80,
            80
        );

        // Colisión disparo vs Shrek
        for(let j = disparos.length - 1; j >= 0; j--){

            let disparo = disparos[j];

            if(
                disparo.x < enemigo.x + 80 &&
                disparo.x + 8 > enemigo.x &&
                disparo.y < enemigo.y + 80 &&
                disparo.y + 20 > enemigo.y
            ){

                enemigos.splice(i,1);
                disparos.splice(j,1);

                break;
            }
        }

        // Si llega abajo destruye un dulce
        if(enemigo.y > canvas.height){

            enemigos.splice(i,1);

            dulcesRestantes--;

           if(dulcesRestantes <= 0 && !nivel2Terminado){

    alert(
        "💔 Shrek destruyó todos los dulces favoritos de Marti"
    );

    location.reload();

}
        }
    }

    // Dibujar disparos
    for(let i = disparos.length - 1; i >= 0; i--){

        let disparo = disparos[i];

        disparo.y -= 10;

        ctx.fillStyle = "#ff69b4";

        ctx.fillRect(
            disparo.x,
            disparo.y,
            8,
            20
        );

        if(disparo.y < 0){

            disparos.splice(i,1);

        }
    }

    // Dibujar dulces (vidas)
    for(let i = 0; i < dulcesRestantes; i++){

        ctx.drawImage(
            dulce,
            10 + (i * 60),
            10,
            50,
            50
        );
    }

// TEMPORIZADOR

if(Date.now() - ultimoSegundo >= 1000){

    tiempoRestante--;

    ultimoSegundo = Date.now();

  if(tiempoRestante <= 0 && !nivel2Terminado){

    nivel2Terminado = true;

    document.getElementById("galagaJuego").style.display = "none";

    document.getElementById("introLaberinto").style.display = "block";

    return;
}


}

// MOSTRAR TIEMPO

ctx.fillStyle = "white";

ctx.font = "30px Arial";

ctx.fillText(
    "⏰ " + tiempoRestante,
    canvas.width - 150,
    45
);

    requestAnimationFrame(actualizarGalaga);
}

document.addEventListener(
    "keydown",
    function(event){

        if(event.key === "ArrowLeft"){
            izquierda = true;
        }

        if(event.key === "ArrowRight"){
            derecha = true;
        }

    }
);

document.addEventListener(
    "keyup",
    function(event){

        if(event.key === "ArrowLeft"){
            izquierda = false;
        }

        if(event.key === "ArrowRight"){
            derecha = false;
        }

    }
)

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key === "z" ||
            event.key === "Z"
        ){

            // NIVEL GALAGA

            if(
                document.getElementById("galagaJuego")
                .style.display === "block"
            ){

                disparos.push({

                    x: jugadorX + 35,
                    y: jugadorY

                });

            }

            // BOSS FINAL

            if(
                document.getElementById("bossJuego")
                .style.display === "block"
            ){

                bossDisparos.push({

                    x: bossJugadorX + 35,
                    y: 550

                });

            }

        }

    }
);
function abrirLaberinto(){

    document.getElementById("introLaberinto").style.display = "none";

    document.getElementById("laberintoJuego").style.display = "block";

    canvasLaberinto =
        document.getElementById("canvasLaberinto");

    ctxLaberinto =
        canvasLaberinto.getContext("2d");

    dibujarLaberinto();
}

function dibujarLaberinto(){

    ctxLaberinto.clearRect(
        0,
        0,
        canvasLaberinto.width,
        canvasLaberinto.height
    );

    let tam = 50;

    for(let fila = 0; fila < laberinto.length; fila++){

        for(let col = 0; col < laberinto[fila].length; col++){

            let celda = laberinto[fila][col];

            if(celda === 1){

                ctxLaberinto.fillStyle = "#4b5563";

                ctxLaberinto.fillRect(
                    col * tam,
                    fila * tam,
                    tam,
                    tam
                );
            }

            if(celda === 0){

                ctxLaberinto.fillStyle = "#d1fae5";

                ctxLaberinto.fillRect(
                    col * tam,
                    fila * tam,
                    tam,
                    tam
                );
            }

            if(celda === 2){

                ctxLaberinto.fillStyle = "gold";

                ctxLaberinto.fillRect(
                    col * tam,
                    fila * tam,
                    tam,
                    tam
                );

                ctxLaberinto.fillStyle = "black";

                ctxLaberinto.font = "40px Arial";

                ctxLaberinto.fillText(
                    "⭐",
                    col * tam + 10,
                    fila * tam + 45
                );
            }

        }

    }

  ctxLaberinto.drawImage(
    miguel,
    miguelX * tam + 3,
    miguelY * tam + 3,
    tam - 6,
    tam - 6
);

}

document.addEventListener(
    "keydown",
    function(event){

        if(
            document.getElementById("laberintoJuego")
            .style.display !== "block"
        ){
            return;
        }

        let nuevoX = miguelX;
        let nuevoY = miguelY;

        if(event.key === "ArrowUp"){
            nuevoY--;
        }

        if(event.key === "ArrowDown"){
            nuevoY++;
        }

        if(event.key === "ArrowLeft"){
            nuevoX--;
        }

        if(event.key === "ArrowRight"){
            nuevoX++;
        }

        if(
            laberinto[nuevoY][nuevoX] !== 1
        ){

            miguelX = nuevoX;
            miguelY = nuevoY;

         if(laberinto[miguelY][miguelX] === 2){

    alert(
        "⚔️ Miguel Rider encontró la salida. Pero Shrek sigue esperando..."
    );

    document.getElementById("introLaberinto").style.display = "none";

    document.getElementById("laberintoJuego").style.display = "none";

    document.getElementById("introBoss").style.display = "block";

    window.scrollTo(0,0);

    return;
}

            dibujarLaberinto();

        }

    }
)

function abrirBoss(){

    // Ocultar pantallas anteriores
    document.getElementById("introLaberinto").style.display = "none";
    document.getElementById("laberintoJuego").style.display = "none";
    document.getElementById("introBoss").style.display = "none";

    // Mostrar boss
    document.getElementById("bossJuego").style.display = "block";

    izquierda = false;
    derecha = false;

    bossJugadorX = 420;

    shrekVida = 100;
    vidaMarti = 100;

    bossDisparos = [];
    disparosShrek = [];

    bossCanvas =
        document.getElementById("canvasBoss");

    bossCtx =
        bossCanvas.getContext("2d");

    actualizarBoss();
}

function victoriaFinal(){

    document.getElementById("introLaberinto").style.display = "none";
    document.getElementById("laberintoJuego").style.display = "none";
    document.getElementById("introBoss").style.display = "none";
    document.getElementById("bossJuego").style.display = "none";

    document.getElementById("finalJuego").style.display = "block";

    window.scrollTo(0,0);
}
function actualizarBoss(){

    bossCtx.clearRect(
        0,
        0,
        bossCanvas.width,
        bossCanvas.height
    );

    // FONDO

    bossCtx.drawImage(
        fondoBoss,
        0,
        0,
        bossCanvas.width,
        bossCanvas.height
    );

    bossCtx.fillStyle = "rgba(0,0,0,0.3)";

    bossCtx.fillRect(
        0,
        0,
        bossCanvas.width,
        bossCanvas.height
    );

    // MOVIMIENTO SHREK

    shrekX += shrekDireccion * 2;

    if(shrekX < 100){
        shrekDireccion = 1;
    }

    if(shrekX > 600){
        shrekDireccion = -1;
    }

    // SHREK

    bossCtx.drawImage(
        shrek,
        shrekX,
        50,
        500,
        550
    );

    // MARTI

    bossCtx.drawImage(
        marti,
        bossJugadorX,
        700,
        80,
        80
    );

    // MOVIMIENTO MARTI

    if(izquierda){
        bossJugadorX -= 6;
    }

    if(derecha){
        bossJugadorX += 6;
    }

    if(bossJugadorX < 0){
        bossJugadorX = 0;
    }

    if(bossJugadorX > bossCanvas.width - 80){
        bossJugadorX = bossCanvas.width - 80;
    }

    // BARRA VIDA SHREK

    bossCtx.fillStyle = "#444";

    bossCtx.fillRect(
        350,
        20,
        400,
        30
    );

    bossCtx.fillStyle = "red";

    bossCtx.fillRect(
        350,
        20,
        shrekVida * 4,
        30
    );

    bossCtx.fillStyle = "white";

    bossCtx.font = "20px Arial";

    bossCtx.fillText(
        "👹 SHREK",
        350,
        15
    );

    // BARRA VIDA MARTI

    bossCtx.fillStyle = "#444";

    bossCtx.fillRect(
        20,
        20,
        200,
        25
    );

    bossCtx.fillStyle = "deepskyblue";

    bossCtx.fillRect(
        20,
        20,
        vidaMarti * 2,
        25
    );

    bossCtx.fillStyle = "white";

    bossCtx.fillText(
        "💙 MARTI",
        20,
        15
    );

    // DISPAROS MARTI

    for(
        let i = bossDisparos.length - 1;
        i >= 0;
        i--
    ){

        let d = bossDisparos[i];

        d.y -= 10;

        bossCtx.fillStyle = "#ff69b4";

        bossCtx.fillRect(
            d.x,
            d.y,
            8,
            20
        );

        if(

            d.x > shrekX &&
            d.x < shrekX + 500 &&

            d.y < 550

        ){

            shrekVida -= 1;

            bossDisparos.splice(i,1);

            if(shrekVida <= 0){

                victoriaFinal();

                return;

            }

        }

    }

    // SHREK ATACA

    contadorAtaqueShrek++;

    if(contadorAtaqueShrek > 50){

        disparosShrek.push({

            x: shrekX + 250,
            y: 350

        });

        contadorAtaqueShrek = 0;
    }

    // CEBOLLAS

    for(
        let i = disparosShrek.length - 1;
        i >= 0;
        i--
    ){

        let d = disparosShrek[i];

        d.y += 8;

        bossCtx.font = "40px Arial";

        bossCtx.fillText(
            "🧅",
            d.x,
            d.y
        );

        if(

            d.x > bossJugadorX &&
            d.x < bossJugadorX + 80 &&

            d.y > 700

        ){

            vidaMarti -= 10;

            disparosShrek.splice(i,1);

        }

        if(d.y > bossCanvas.height){

            disparosShrek.splice(i,1);

        }

    }

    // DERROTA

    if(vidaMarti <= 0){

        alert(
            "💀 Shrek derrotó a Marti"
        );

        location.reload();

        return;
    }

    requestAnimationFrame(
        actualizarBoss
    );
}