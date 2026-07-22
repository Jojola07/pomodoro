let tempoRestante = 1500;

let rodando = false;

let intervalo = null;

let modo = "foco";

let ciclos = 0;

let temporizador = document.getElementById("timer");

let botaoIniciar = document.getElementById("iniciar");

let botaoParar = document.getElementById("parar");

let botaoResetar = document.getElementById("resetar");

function aoClicarIniciar() {
    temporizador.textContent = "25:00";
};

function aoClicarParar() {
    console.log("Parou");
}

function aoClicarResetar() {
    console.log("Resetou");
}

botaoParar.addEventListener("click", aoClicarParar);

botaoResetar.addEventListener("click", aoClicarResetar);

botaoIniciar.addEventListener("click", aoClicarIniciar);