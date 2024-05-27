const images = ['1.png', '2.png', '3.png', '4.png', '5.png'];
let cards = images.concat(images); // Duplicar las imágenes para crear pares
cards = cards.sort(() => 0.5 - Math.random()); // Mezclar las cartas

const gameTitle = document.getElementById('game-title');
const message = document.getElementById('message');
const gameBoard = document.getElementById('game-board');

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let attempts = 0;
let matchedPairs = 0;

function initGame() {
    gameTitle.textContent = '¡Comience el juego!';
    message.textContent = '';
    attempts = 0;
    matchedPairs = 0;
    renderCards();
}

function renderCards() {
    gameBoard.innerHTML = ''; // Limpiar el tablero antes de agregar nuevas cartas

    cards.forEach(image => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.image = image;

        const backElement = document.createElement('div');
        backElement.classList.add('back');

        const frontImgElement = document.createElement('img');
        frontImgElement.src = image;
        frontImgElement.classList.add('front');

        cardElement.appendChild(backElement);
        cardElement.appendChild(frontImgElement);

        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    attempts++;

    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs++;

    resetBoard();

    if (matchedPairs === images.length) {
        gameTitle.textContent = '¡Ganaste!';
        message.textContent = '';
    }
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();

        if (attempts > 2) {
            message.textContent = 'Siga intentando';
        }
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

initGame(); // Iniciar el juego cuando se carga la página
