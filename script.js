const cardsArray = [
    { name: 'bruxa', img: '<img src="images/bruxa.jpg" alt="Bruxa">' },
    { name: 'bruxa', img: '<img src="images/bruxa.jpg" alt="Bruxa">' },
    { name: 'evellyn', img: '<img src="images/evellyn.jpg" alt="Evellyn">' },
    { name: 'evellyn', img: '<img src="images/evellyn.jpg" alt="Evellyn">' },
    { name: 'Jinx', img: '<img src="images/jinx.jpg" alt="Jinx">' },
    { name: 'Jinx', img: '<img src="images/jinx.jpg" alt="Jinx">' },
    { name: 'Yasuo', img: '<img src="images/yasuo.jpg" alt="Play">' },
    { name: 'Yasuo', img: '<img src="images/yasuo.jpg" alt="Play">' },
    { name: 'Menina', img: '<img src="images/menina.jpg" alt="Menina">' },
    { name: 'Menina', img: '<img src="images/menina.jpg" alt="Menina">' },
    { name: 'Yone', img: '<img src="images/Yone.jpg" alt="Fantasma">' },
    { name: 'Yone', img: '<img src="images/Yone.jpg" alt="Fantasma">' },
];

let grid = document.getElementById('grid');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

function startGame() {
    // Reiniciar variáveis
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    moves = 0;
    matchedPairs = 0;

    // Embaralhar cartas
    cardsArray.sort(() => 0.5 - Math.random());

    // Resetar o grid e adicionar cartas
    grid.innerHTML = '';
    cardsArray.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.name = card.name;
        cardElement.dataset.index = index;

        cardElement.addEventListener('click', flipCard);
        grid.appendChild(cardElement);
    });

    // Resetar informações do jogo
    document.getElementById('moves').innerText = `Jogadas: ${moves}`;
    document.getElementById('victory-message').style.display = 'none';
    document.getElementById('restart-button').style.display = 'none';
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.innerHTML = cardsArray[this.dataset.index].img;

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;
        moves++;
        document.getElementById('moves').innerText = `Jogadas: ${moves}`;
        checkForMatch();
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        matchedPairs++;

        if (matchedPairs === cardsArray.length / 2) {
            setTimeout(() => {
                document.getElementById('victory-message').style.display = 'block';
                document.getElementById('restart-button').style.display = 'block';
            }, 1000);
        }

    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        firstCard.innerHTML = '';
        secondCard.innerHTML = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Iniciar o jogo ao carregar a página
startGame();
