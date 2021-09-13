'use strict';

const section = document.querySelector('.container');
const main = document.querySelector('.main');
const headerBtn = document.querySelector('.header__button');
const headerTimer = document.querySelector('.header__timer');
const remain = document.querySelector('.header__remain');
const resultBox = document.querySelector('.div__result');
const bgm = new Audio('./sound/bg.mp3');
let carrotCnt = 10;
remain.innerText = carrotCnt;

headerBtn.addEventListener('click', event => {
  bgm.play();
  bgm.loop = true;

  if (!event.target.dataset.state) {
    init();
  } else if (event.target.dataset.state === 'pause') {
    clearInterval(timer);
    handlePlayBtn();
    showResult('retry');
  } else if (event.target.dataset.state === 'play') {
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

let timer;
function countDown(remainTime) {
  const timer_display = document.querySelector('.timer-display');
  timer_display.innerText = `${remainTime}`;

  function showRemaining() {
    if (remainTime === 0 || carrotCnt === 0 || isBugClicked) {
      isBugClicked = false;
      clearInterval(timer); //함수 멈춤
      if (carrotCnt != 0) showResult('lose', carrotCnt);
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

  for (let i = 0; i < 7; i++) {
    const element = document.createElement('img');
    element.setAttribute('class', 'bug');
    element.setAttribute('src', './img/bug.png');
    element.setAttribute('data-bug', i);

    let randomX = Math.floor(Math.random() * 770);
    let randomY = Math.floor(Math.random() * 220);
    element.style.transform = `translate(${randomX}px, ${randomY}px)`;

    main.appendChild(element);
  }
  for (let i = 0; i < 10; i++) {
    const element = document.createElement('img');
    element.setAttribute('class', 'carrot');
    element.setAttribute('src', './img/carrot.png');
    element.setAttribute('data-carrot', i);
    main.appendChild(element);

    let randomX = Math.floor(Math.random() * 760);
    let randomY = Math.floor(Math.random() * 185);

    let carrotTarget = document.querySelector(`.carrot[data-carrot="${i}"]`);

    carrotTarget.style.transform = `translate(${randomX}px, ${randomY}px)`;
    main.appendChild(carrotTarget);
  }
}

let isBugClicked = false;
main.addEventListener('click', event => {
  const bug = event.target.dataset.bug;
  const carrot = event.target.dataset.carrot;
  const audio_bug = new Audio('./sound/bug_pull.mp3');
  const audio_carrot = new Audio('./sound/carrot_pull.mp3');
  if (bug) {
    showResult('lose', carrotCnt);
    handlePlayBtn();
    audio_bug.play();
    bgm.pause();
    isBugClicked = true;
  } else if (carrot) {
    audio_carrot.play();
    carrotCnt--;
    remain.innerText = carrotCnt;
    const clickedCarrot = document.querySelector(
      `.carrot[data-carrot="${carrot}"]`
    );
    clickedCarrot.remove();
    if (carrotCnt === 0) {
      handlePlayBtn();
      showResult('win', carrotCnt);
    }
  }
});

function showResult(result, carrotCnt) {
  const resultMessage = document.querySelector('.result-message');

  headerBtn.style.visibility = 'hidden';
  resultBox.style.visibility = 'visible';
  main.style.pointerEvents = 'none';
  if (result === 'lose') {
    resultMessage.innerText = `🤣 ${carrotCnt} carrots left 😝
    ${'\u00a0\u00a0\u00a0\u00a0'}YOU LOSE 👎`;
    return;
  } else if (result === 'win') {
    const audio_win = new Audio('./sound/game_win.mp3');
    audio_win.play();
    bgm.pause();
    resultMessage.innerText = `🎉You find all carrots🎉  
    ${'\u00a0\u00a0\u00a0'} YOU WIN ! 👍`; //공백처리
    return;
  } else if (result === 'retry') {
    bgm.pause();
    const audio_alert = new Audio('./sound/alert.wav');
    audio_alert.play();
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

const redoBtn = document.querySelector('.div__result').querySelector('i');
redoBtn.addEventListener('click', event => {
  resultBox.style.visibility = 'hidden';
  bgm.play();
  init();
});
