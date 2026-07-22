let temporizador = document.getElementById("timer");

let BtnIniciar = document.getElementById("iniciar");

let BtnParar = document.getElementById("parar");

let BtnResetar = document.getElementById("resetar");

let tempoRestante = 1500;

let ciclos = 0;

let modo = "foco"; //foco (1500), longo(900), descanso(300)

let rodando = false;

let intervalo = null;

let audioCtx = new AudioContext();

function Iniciar(){
    BtnIniciar.textContent = "Iniciar";
    BtnParar.textContent = "Pausar";
    if (rodando == true){
        console.log("Já está rodando");
    }
    else{
        rodando = true;
        intervalo = setInterval(function(){
            tempoRestante = tempoRestante - 1;
            atualizarDisplay();
            if (tempoRestante == 0){
                clearInterval(intervalo);
                rodando = false;
                intervalo = null;
                console.log("acabou");
                if (modo == "foco"){
                    ciclos = ciclos + 1;
                    if (ciclos % 4 == 0){
                        modo = "longo";
                    }
                    else{
                        modo = "descanso";
                    }
                }
                else if (modo == "descanso" || modo == "longo"){
                    modo = "foco";
                }
                tocarSom();
                Resetar();
                Iniciar();
            };
        }, 1000);
    };
};

function Parar(){
    if (rodando == true){
        clearInterval(intervalo);
        rodando = false;
    };
    BtnParar.textContent = "Pausado";
    BtnIniciar.textContent = "Continuar";
};

function Resetar(){
    clearInterval(intervalo);
    rodando = false;
    intervalo = null

    if (modo == "foco"){
        tempoRestante = 1500;
    }
    else if (modo == "longo"){
        tempoRestante = 900;
    }
    else{
        tempoRestante = 300;
    }

    atualizarDisplay();
};

async function tocarSom(){
    let oscillator = audioCtx.createOscillator();
    await audioCtx.resume();
    oscillator.frequency.value = 800;
    oscillator.type = "sine";
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
    
};

function atualizarDisplay(){
    let minutos = Math.floor(tempoRestante/60);

    let segundos = tempoRestante % 60;

    if (segundos < 10){
        segundos = String(segundos).padStart(2, "0");
    }

    if (minutos < 10){
        minutos = String(minutos).padStart(2, "0");
    }

    temporizador.textContent = minutos+":"+segundos;
};

BtnIniciar.addEventListener("click", Iniciar);
BtnParar.addEventListener("click", Parar);
BtnResetar.addEventListener("click", Resetar);
atualizarDisplay();