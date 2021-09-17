'use strict';

const section = document.querySelector('.container');
const main = document.querySelector('.main');
const headerBtn = document.querySelector('.header__button');
const headerTimer = document.querySelector('.header__timer');
const remain = document.querySelector('.header__remain');
const resultBox = document.querySelector('.div__result');

const bgSound = new Audio('./sound/bg.mp3');
const winSound = new Audio('./sound/game_win.mp3');
const alertSound = new Audio('./sound/alert.wav');
const carrotSound = new Audio('./sound/carrot_pull.mp3');
const bugSound = new Audio('./sound/bug_pull.mp3');
const redoBtn = document.querySelector('.div__result').querySelector('i');

let carrotCnt = 10;
remain.innerText = carrotCnt;

let isBugClicked = false;
let timer;

headerBtn.addEventListener('click', event => {
  soundPlay(bgSound);
  const btnState = event.target.dataset.state;
  if (!btnState) {
    init();
  } else if (btnState === 'pause') {
    clearInterval(timer);
    handlePlayBtn();
    finishGame('retry');
  } else if (btnState === 'play') {
    clearInterval(timer);
    handlePlayBtn();
  }
});

function handlePlayBtn() {
  headerBtn.classList.toggle('pause');
  const pauseBtn = document.querySelector('.pause');
  if (pauseBtn) {
    pauseBtn.innerHTML = `<i class="fas fa-stop" data-state="pause"></i>`;
    headerBtn.setAttribute('data-state', 'pause');
  } else {
    headerBtn.innerHTML = `<i class="fas fa-play" data-state="play"></i>`;
    headerBtn.setAttribute('data-state', 'play');
  }
}

function countDown(remainTime) {
  const timer_display = document.querySelector('.timer-display');
  timer_display.innerText = `${remainTime}`;

  function showRemaining() {
    if (remainTime === 0 || carrotCnt === 0 || isBugClicked) {
      isBugClicked = false;
      clearInterval(timer); //함수 멈춤
      if (carrotCnt != 0) finishGame('lose', carrotCnt);
      return;
    }
    remainTime--;
    timer_display.innerText = `${remainTime}`;
  }
  timer = setInterval(showRemaining, 1000); //1초에 한번 함수 실행
}

function makeTarget() {
  //남은 자식 노드 지우고 새로 그리기
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
  carrotCnt = 10;
  remain.innerText = carrotCnt;

  addItem(10, 'carrot', './img/carrot.png');
  addItem(10, 'bug', './img/bug.png');
}

function addItem(count, className, imgPath) {
  for (let i = 0; i < count; i++) {
    const item = document.createElement('img');
    item.setAttribute('class', className);
    item.setAttribute('src', imgPath);
    let randomX = Math.floor(Math.random() * 760);
    let randomY = Math.floor(Math.random() * 185);
    item.style.transform = `translate(${randomX}px, ${randomY}px)`;
    main.appendChild(item);
  }
}

main.addEventListener('click', event => {
  const target = event.target;
  if (target.matches('.bug')) {
    finishGame('lose', carrotCnt);
    handlePlayBtn();
    soundPlay(bugSound);
    isBugClicked = true;
  } else if (target.matches('.carrot')) {
    soundPlay(carrotSound);
    carrotCnt--;
    remain.innerText = carrotCnt;
    target.remove();
    if (carrotCnt === 0) {
      handlePlayBtn();
      finishGame('win', carrotCnt);
    }
  }
});

function finishGame(result, carrotCnt) {
  const resultMessage = document.querySelector('.result-message');
  headerBtn.style.visibility = 'hidden';
  resultBox.style.visibility = 'visible';
  main.style.pointerEvents = 'none';

  soundStop(bgSound);
  if (result === 'lose') {
    resultMessage.innerText = `🤣 ${carrotCnt} carrots left 😝
    ${'\u00a0\u00a0\u00a0\u00a0'}YOU LOST 👎`;
    return;
  } else if (result === 'win') {
    soundPlay(winSound);
    soundStop(bgSound);
    resultMessage.innerText = `🎉You found all the carrots🎉  
    ${'\u00a0\u00a0\u00a0'} YOU WON ! 👍`; //공백처리
    return;
  } else if (result === 'retry') {
    soundStop(bgSound);
    soundPlay(alertSound);
    resultMessage.innerText = `🧡
    RETRY?`;
    return;
  }
}

function init() {
  headerBtn.style.visibility = 'visible';
  main.style.pointerEvents = 'auto';
  countDown(10);
  handlePlayBtn();
  makeTarget();
}

redoBtn.addEventListener('click', event => {
  resultBox.style.visibility = 'hidden';
  soundPlay(bgSound);
  init();
});

function soundPlay(sound) {
  sound.currentTime = 0;
  sound.play();
}

function soundStop(sound) {
  sound.pause();
}
