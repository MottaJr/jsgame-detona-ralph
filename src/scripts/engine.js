const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    life: document.querySelector("#life"),
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    curretTime: 60,
    curretLife: 3,
  },
  actions: {
    //timerId: setInterval(randomSquare, 1000),
    //countDownTimerId: setInterval(countDown, 1000),
    timerId: null,           // Alterado para null inicialmente
    countDownTimerId: null,  // Alterado para null inicialmente
  },
};

state.view.life.textContent = state.values.curretLife;

function initialize() {
  // Resetando os valores de tempo, vidas e resultado
  state.values.curretTime = 60; // Exemplo: 60 segundos de tempo inicial
  state.values.curretLife = 3;  // Exemplo: 3 vidas iniciais
  state.values.result = 0;       // Resetando a pontuação para 0

  // Atualizando a interface do usuário com os novos valores
  state.view.timeLeft.textContent = state.values.curretTime;
  state.view.life.textContent = state.values.curretLife;
  state.view.score.textContent = state.values.result;

  // Resetando o inimigo
  randomSquare();

  // Reiniciando os intervalos
  clearInterval(state.actions.countDownTimerId);
  clearInterval(state.actions.timerId);

  state.actions.countDownTimerId = setInterval(countDown, 1000);
  state.actions.timerId = setInterval(randomSquare, 1000);

  // Removendo os ouvintes antigos, se houver
  removeListeners();

  // Adicionando os ouvintes novamente
  addListenerHitBox();
}

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  // Verifica se o tempo ou as vidas acabaram
  if (state.values.curretTime <= 0 || state.values.curretLife <= 0) {
    // Para os intervalos de tempo
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);

    // Exibe o resultado final (se você ainda quiser mostrar um alerta)
    alert("Game Over! O seu resultado foi: " + state.values.result);

    // Chama a função para reiniciar o jogo
    initialize(); // Chama a função de reinício aqui, após a finalização do jogo

  }

}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.1;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}


// Função nomeada para o clique, que será usada tanto para adicionar quanto para remover o evento
function handleSquareClick(event) {
  const square = event.target;
  if (square.id === state.values.hitPosition) {
    state.values.result++;
    state.view.score.textContent = state.values.result;
    state.values.hitPosition = null;
    playSound("hit");
  } else {
    state.values.curretLife--;
    state.view.life.textContent = state.values.curretLife;
    playSound("errou");
  }
};

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", handleSquareClick);  // Usando a função nomeada
  });
}

// Função para remover os ouvintes antes de adicionar novamente
function removeListeners() {
  state.view.squares.forEach((square) => {
    square.removeEventListener("mousedown", () => { });  // Remover todos os ouvintes antigos
  });
}

// function initialize() {
//   addListenerHitBox();
// }

initialize();
//initialize();
