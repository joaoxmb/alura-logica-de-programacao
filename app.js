const gameForm = document.querySelector('form');
const input = document.querySelector('input');
const button = document.querySelector('button');

const attemptsBox = document.querySelector('.attempts');
const attempts = document.querySelector('#attempts-container');
const title = document.querySelector('#title');
const statusBar = document.querySelector('#status');
const speakBtn = document.querySelector('#speak');

const game = {
  max: 100,
  secret: null,
  attempts: 0,
  status: '',
  speak: false,
}

// Game Form
gameForm.addEventListener('submit', e => {
  e.preventDefault();

  const form = e.currentTarget;
  const input = form.querySelector('input');
  const value = parseInt(input.value);
  
  if (game.status != 'start') {
    start();
    return;
  }

  pushAttempts(value);
  checkNumber(value);
  form.reset();
  input.focus();
});

// Validity Input Value
input.addEventListener('input', (e) => {
  const value = parseInt(e.currentTarget.value);

  if (!(value >= 0 && value <= game.max)) {
    const message = `O valor digitado está fora do intervalo de 0 a ${game.max}.`;

    input.setCustomValidity(message);
    speak(message);

    return;
  } 

  input.setCustomValidity('');
});

speakBtn.addEventListener('click', () => {
  speakBtn.classList.toggle('disabled');
  game.speak ? game.speak = false : game.speak = true;
});

function checkNumber(number) {
  const errorMessage = (compare) => {
    bodyFeedback(false);

    if (compare > parseInt(game.max / 5)) {
      write(title, `Passou longe! Mas não desista`);
      return;
    }

    if (compare > parseInt(game.max / 10)) {
      write(title, 'As coisas estão começando a esquentar!');
      return;
    }
    
    if (compare < 4) {
      write(title, 'Passou raspando feito um tiro!');
    }
  }
  const victoryMessage = (attemptsQuanty) => {
    bodyFeedback(true);

    if (attemptsQuanty === 1) {
      write(statusBar, `Deus! Me conte, como você fez isso? Você acertou com ${attemptsQuanty} tentativa.`);
      return;
    }
    if (attemptsQuanty > parseInt(game.max / 8)) {
      write(statusBar, `Foi difícil mas conseguiu, você acertou com ${attemptsQuanty} tentativas.`);
      return;
    }
    if (attemptsQuanty > parseInt(game.max / 12)) {
      write(statusBar, `Sua estratégia é boa, você acertou com ${attemptsQuanty} tentativas.`);
      return;
    }
    if (attemptsQuanty) {
      write(statusBar, `Acima da média! Você acertou com ${attemptsQuanty} tentativas.`);
    }
  }

  if (number === game.secret) {
    const attemptsQuanty = game.attempts;

    write(title, `Você acertou, parabéns!`);
    victoryMessage(attemptsQuanty);
    completed();

    return;
  }
  if (number > game.secret) {
    const compare = number - game.secret;
    write(statusBar, `O número secreto é <span>menor</span> do que ${number}.`);
    errorMessage(compare);

    return;
  }
  if (number < game.secret) {
    const compare = game.secret - number;
    write(statusBar, `O número secreto é <span>maior</span> do que ${number}.`);
    errorMessage(compare);

    return;
  }
}
function generateRandomNumber() {
  game.secret = parseInt((Math.random() * game.max));
}
function pushAttempts(number) {
  game.attempts++

  attempts.innerHTML += `
    <li>${number}</li>
  `;
}
function start() {
  input.classList.add('active');
  input.removeAttribute('disabled');
  attemptsBox.classList.remove('disabled');
  document.body.classList.remove('correct');

  button.textContent = 'Chutar';
  write(title, 'Bora para o Jogo!');
  write(statusBar, `Já está valendo! Digite na caixa de entrada um valor de 0 a ${game.max}, tente a sorte!`);
  attempts.innerHTML = '';
  
  game.attempts = 0;
  game.status = 'start';

  generateRandomNumber();
}
function completed() {
  game.status = 'completed';
  button.textContent = 'Jogar novamente';

  setTimeout(() => {
    reset();
  }, 1000)
}
function reset() {
  input.classList.remove('active');
  input.setAttribute('disabled', true);
}
function loadDOM() {
  attemptsBox.classList.add('disabled');
  write(statusBar, `Tente a sorte tentando adivinhar números aleatórios de 0 a ${game.max}.`);
}
function bodyFeedback(isCorrect) {
  if (isCorrect) {
    document.body.classList.add('correct');
    return;
  }
  
  document.body.classList.add('incorrect');
  setTimeout(() => {
    document.body.classList.remove('incorrect');
  }, 1000);
}
function write(element, text) {
  element.innerHTML = text;
  speak(text);
}
function speak(text) {
  if (game.speak) {
    const formatedText = text.replace(/<[^>]*>/g, '');
    responsiveVoice.speak(formatedText, "Brazilian Portuguese Female", {rate: 1});
  }
}

reset();
loadDOM();