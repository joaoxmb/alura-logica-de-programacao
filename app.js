const gameForm = document.querySelector('form');
const input = document.querySelector('input');
const button = document.querySelector('button');

const attemptsBox = document.querySelector('.attempts');
const attempts = document.querySelector('#attempts-container');
const title = document.querySelector('#title');
const statusBar = document.querySelector('#status');

const game = {
  max: 100,
  secret: null,
  attempts: [],
  status: '',
}

// Game Form
gameForm.addEventListener('submit', e => {
  e.preventDefault();

  const form = e.currentTarget;
  const input = form.querySelector('input');
  const value = parseInt(input.value);
  
  if (game.status === '' || game.status === 'completed') {
    start();
    return;
  }
  
  if (game.status === 'start') {
    pushAttempts(value);
    checkNumber(value);
    form.reset();
    input.focus();
  }
});

// Validity Input Value
input.addEventListener('input', (e) => {
  const value = parseInt(e.currentTarget.value);

  if (!(value >= 0 && value <= game.max)) {
    input.setCustomValidity(`O valor digitado está fora do intervalo de 0 a ${game.max}.`);
    return;
  } 

  input.setCustomValidity('');
});

function checkNumber(number) {
  const errorMessage = (compare) => {
    bodyFeedback(false);

    if (compare > parseInt(game.max / 5)) {
      title.textContent = `Passou longe! Mas não desista`;
      return;
    }

    if (compare > parseInt(game.max / 10)) {
      title.textContent = 'As coisas estão começando a esquentar!';
      return;
    }
    
    if (compare < 4) {
      title.textContent = 'Passou raspando feito um tiro!';
    }
  }
  const victoryMessage = (attemptsQuanty) => {
    bodyFeedback(true);

    if (attemptsQuanty === 1) {
      statusBar.textContent = `Deus! Me conte, como você fez isso? Você acertou com ${attemptsQuanty} tentativa.`;
      return;
    }
    if (attemptsQuanty > parseInt(game.max / 8)) {
      statusBar.textContent = `Foi difícil mas conseguiu, você acertou com ${attemptsQuanty} tentativas.`;
      return;
    }
    if (attemptsQuanty > parseInt(game.max / 12)) {
      statusBar.textContent = `Sortudo! Sua estratégia é boa, você acertou com ${attemptsQuanty} tentativas.`;
      return;
    }
    if (attemptsQuanty) {
      statusBar.textContent = `Acima da média! Você acertou com ${attemptsQuanty} tentativas.`;
    }
  }

  if (number === game.secret) {
    const attemptsQuanty = game.attempts.length;

    title.textContent = `Você acertou, parabéns!`;
    victoryMessage(attemptsQuanty);
    completed();

    return;
  }
  if (number > game.secret) {
    const compare = number - game.secret;
    statusBar.innerHTML = `O número secreto é <span>menor</span> do que ${number}.`;
    errorMessage(compare);

    return;
  }
  if (number < game.secret) {
    const compare = game.secret - number;
    statusBar.innerHTML = `O número secreto é <span>maior</span> do que ${number}.`;
    errorMessage(compare);

    return;
  }
}

function generateRandomNumber() {
  game.secret = parseInt((Math.random() * game.max));
}

function pushAttempts(number) {
  game.attempts.push(number);

  attempts.innerHTML += `
    <li>${number}</li>
  `;
}

function bodyFeedback(isCorrect) {

  if (isCorrect) {
    document.body.classList.add('correct');
    return;
  }
  
  document.body.classList.add('incorrect');
  setTimeout(() => {
    document.body.classList.remove('incorrect');
  }, 1000)
}

function start() {
  input.classList.add('active');
  input.removeAttribute('disabled');
  button.textContent = 'Chutar';
  title.textContent = 'Bora para o Jogo!';
  statusBar.textContent = `Já está valendo! Digite na caixa de entrada um valor de 0 a ${game.max}, tente a sorte!`;
  attemptsBox.classList.remove('disabled');
  attempts.innerHTML = '';
  document.body.classList.remove('correct');
  
  game.attempts = [];
  game.status = 'start';

  generateRandomNumber();
}

function completed() {
  game.status = 'completed';

  setTimeout(() => {
    reset();
  }, 1000)
}

function reset() {
  button.textContent = 'Iniciar jogo';
  input.classList.remove('active');
  input.setAttribute('disabled', true);
}

function loadDOM() {
  attemptsBox.classList.add('disabled');
  title.textContent = 'Jogo da Adivinhação';
  statusBar.textContent = `Tente a sorte tentando adivinhar números aleatórios de 0 a ${game.max}.`;
}

reset();
loadDOM();