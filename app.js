import Game from "./game.js";

const startButton = document.querySelector("#start-btn");
const maxNumber = 100;

let gameNow = new Game(maxNumber);

startButton.addEventListener("click", (e) => {
  if (gameNow.completed) {
    gameNow = new Game(maxNumber);
  }
  gameNow.startGame();
})

gameNow.resetDOM();