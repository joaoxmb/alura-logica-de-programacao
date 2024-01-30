const startButton = document.querySelector("#start-btn");
const statusBar = document.querySelector("#status");
const titleBar = document.querySelector("#title");
const attemptsContainer = document.querySelector("#attempts-container");
const attemptsBox = document.querySelector(".attempts");

const Game = class {
  randomNumber = 0;
  attempts = [];
  maxNumber = 0;
  completed = false;

  constructor(maxNumber) {
    this.maxNumber = maxNumber;
    this.generateRandomNumber();
  }

  startGame(){
    while(true) {
      const [input, number] = this.askNumber();
      
      if (input === null && this.cancelGame()) {
        this.completed = true;
        break;
      }
      
      if (input !== '' && input !== null) {
        const isCorrect = this.verifyNumber(number);
        
        if (isCorrect) {
          this.endGame();      
          break;
        }
      }
    }
  }
  endGame(){
    attemptsBox.style = "display: block;";
    this.domMessage("Parabéns!", "Você acertou o número secreto!!", "Jogar novamente");
    this.completed = true;
  }
  cancelGame(){
    const isCanceled = confirm("Você deseja encerrar realmente o jogo por aqui?");
    
    if (isCanceled) {
      alert(`Jogo cancelado! O número secreto era ${this.randomNumber}.`);
      this.resetDOM();
      this.domMessage("Que pena, você estava perto!", "Não desista agora, tente novamente.", "Volte ao jogo!");
    } else {
      alert("Vamos voltar para o jogo!!");
    }

    return isCanceled;
  }

  // DOM
  domMessage(title, status, button){
    titleBar.textContent = title;
    statusBar.textContent = status;
    startButton.textContent = button;
  }
  resetDOM(){
    attemptsContainer.innerHTML = "";
    statusBar.textContent = `Teste suas habilidades em adivinhar números aleatórios de 0 a ${this.maxNumber}.`;
    attemptsBox.style = "display: none;";
  }

  // Number
  generateRandomNumber(){
    this.randomNumber = parseInt((Math.random() * this.maxNumber) + 0.5);
  }
  askNumber(){
    const input = prompt(`Digite um número de 0 a ${this.maxNumber}, tente a sorte!`);
    const number = parseInt(input);

    return [input, number];
  }
  verifyNumber(number){
    if (number < 0 || number > this.maxNumber) {
      alert(`O valor digitado está fora do intervalo de 0 a ${this.maxNumber}.`);
      return false;
    }

    this.pushAttempts(number);
    
    if (number === this.randomNumber) {
      const attemptsQuanty = this.attempts.length;
      alert(`Você acertou o número secreto com ${attemptsQuanty} ${attemptsQuanty > 1 ? 'tentativas' : 'tentativa'}.`);
      return true;
    }
    
    if (number > this.randomNumber) {
      alert("O número secreto é menor.");
      return false;
    } else {
      alert("O número secreto é maior.");
      return false;
    }
  }
  pushAttempts(number) {
    attemptsContainer.innerHTML += `<li>${number}</li>`;
    this.attempts.push(number);
  }
}

export default Game;