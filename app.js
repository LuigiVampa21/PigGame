'use strict';

const players = document.querySelectorAll('.player');
const btns = document.querySelectorAll('.btn');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let score0 = document.querySelector('#score--0');
let score1 = document.querySelector('#score--1');

let current0 = document.querySelector('#current--0');
let current1 = document.querySelector('#current--1');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnReset = document.querySelector('.btn--new');

let diceImg = document.querySelector('.dice');

const divWinner = document.querySelector('.winner');

const playerWinner = document.querySelector('.winner p');

const overlay = document.querySelector('.overlay');

// -------------------------------------------------------------------------------

playerWinner.textContent = 'Congrats PLAYER 1 you win';

// --------------------------------------------- HOLD EVENT ----------------------------------------------

function hold(score, current) {
  score.textContent = Number(score.textContent) + Number(current.textContent);
  current.textContent = 0;
}

// btnHold.addEventListener('click', () => {
//   if (player0playing) {
//     hold(score0, current0);
//     switchPlayers(player0, player1);
//   } else if (player1playing) {
//     hold(score1, current1);
//     switchPlayers(player1, player0);
//   }
// });

// ----------------------------------Boolean---------------------------------

var StillPlaying =
  Number(score0.textContent) < 100 && Number(score1.textContent) < 100;
// console.log(StillPlaying);

// ----------------------------------Who is Playing---------------------------------

function whosPlayin(player) {
  if (
    window.getComputedStyle(player).backgroundColor ==
    'rgba(255, 255, 255, 0.4)'
  ) {
    return true;
  } else {
    return false;
  }
}
// const player0playing = whosPlayin(player0);

// console.log(player0playing);

// const player1playing = whosPlayin(player1);

// console.log(whosPlayin(player1));

// ----------------------------------Switch Players---------------------------------

function switchPlayers(playerPlaying, playerWaiting) {
  playerPlaying.classList.remove('player--active');
  playerWaiting.classList.add('player--active');
}

// switchPlayers(player0, player1);
// switchPlayers(player1, player0);

// --------------------------------FunctionReset--------------------------------------
function init() {
  current0.textContent = '0';
  score0.textContent = '0';
  current1.textContent = '0';
  score1.textContent = '0';
  diceImg.classList.add('hide');
  switchPlayers(player1, player0);
  divWinner.classList.remove('show');
  overlay.classList.remove('show');
  for (let pla = 0; pla < 2; pla++) {
    players[pla].classList.remove('show');
  }
  for (let bta = 0; bta < 3; bta++) {
    btns[bta].classList.remove('show');
  }
  console.clear();
}
init();

// --------------------------------FunctionNewGame--------------------------------------
btnReset.addEventListener('click', () => {
  init();
});
// --------------------------------FunctionDice--------------------------------------

function roll() {
  let randomDice = Math.floor(Math.random() * 6 + 1);
  return randomDice;
}

let imgSrc = diceImg.src;

let arrayImgSrc = imgSrc.split('');

let imgSetter;
let imgSet;

let count = 0;
for (let i = 0; i < arrayImgSrc.length; i++) {
  if (arrayImgSrc[i] === '/') {
    count += 1;
  }
  if (count === 3) {
    break;
  }
  imgSetter = arrayImgSrc.slice(i + 1);
  imgSet = imgSetter.join('');
}

btnRoll.addEventListener('click', () => {
  const player0playing = whosPlayin(player0);
  const player1playing = whosPlayin(player1);
  var StillPlaying =
    Number(score0.textContent) < 5 && Number(score1.textContent) < 5;
  console.log(StillPlaying);
  btnHold.addEventListener('click', () => {
    if (player0playing) {
      hold(score0, current0);
      switchPlayers(player0, player1);
    } else if (player1playing) {
      hold(score1, current1);
      switchPlayers(player1, player0);
    }
  });
  // ---------------------------------------------Show Dice---------------------------------------------------
  let numberCurrent0 = current0.textContent;
  let numberCurrent1 = current1.textContent;

  let rollDice = String(roll());
  let imgSe = imgSet.replace(/[`5`]/, `${rollDice}`);
  let DiceEnd = Number(rollDice);
  console.log(DiceEnd);
  document.getElementById('dés').src = imgSe;
  diceImg.classList.remove('hide');
  if (
    player0playing &&
    current0.textContent == 0 &&
    DiceEnd != 1 &&
    StillPlaying
  ) {
    numberCurrent0 = DiceEnd;
    console.log(numberCurrent0);
    console.log(score0.textContent);
    current0.textContent = numberCurrent0;
  } else if (
    player0playing &&
    current0.textContent != 0 &&
    DiceEnd != 1 &&
    StillPlaying
  ) {
    current0.textContent = Number(numberCurrent0) + Number(DiceEnd);
  } else if (player0playing && DiceEnd == 1 && StillPlaying) {
    switchPlayers(player0, player1);
    current0.textContent = 0;
  }
  // ------------------------------------------------Player1Playing---------------------------------------------
  else if (
    player1playing &&
    current1.textContent == 0 &&
    DiceEnd != 1 &&
    StillPlaying
  ) {
    numberCurrent1 = DiceEnd;
    console.log(numberCurrent1);
    current1.textContent = numberCurrent1;
  } else if (
    player1playing &&
    current1.textContent != 0 &&
    DiceEnd != 1 &&
    StillPlaying
  ) {
    current1.textContent = Number(numberCurrent1) + Number(DiceEnd);
  } else if (player1playing && DiceEnd == 1 && StillPlaying) {
    switchPlayers(player1, player0);
    current0.textContent = 0;
  }

  // -------------------------------------------------Winner--------------------------------------------------
  else if (!StillPlaying) {
    for (let p = 0; p < 2; p++) {
      players[p].classList.add('show');
    }
    for (let b = 0; b < 3; b++) {
      btns[b].classList.add('show');
    }
    overlay.classList.add('show');
    winner();
    // init();
  }
});

// --------------------------------FunctionWinner---------------------------------------

function winner() {
  if (score0.textContent >= 5) {
    divWinner.classList.add('show');
    playerWinner.textContent = 'Congrats PLAYER 1 you win';
  } else if (score1.textContent >= 5) {
    divWinner.classList.add('show');
    playerWinner.textContent = 'Congrats PLAYER 2 you win';
  }
}

window.addEventListener('mouseover', winner());

overlay.addEventListener('click', () => {
  divWinner.classList.remove('show');
  for (let pl = 0; pl < 2; pl++) {
    players[pl].classList.remove('show');
  }
  for (let bt = 0; bt < 3; bt++) {
    btns[bt].classList.remove('show');
  }
  overlay.classList.remove('show');
});

window.addEventListener('click', e => {
  console.log(e.target);
});
