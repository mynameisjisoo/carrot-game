'use strict';

const section = document.querySelector('.container');
const main = document.querySelector('.main');
const headerBtn = document.querySelector('.header__button');
const headerTimer = document.querySelector('.header__timer');
const remain = document.querySelector('.header__remain');
const resultBox = document.querySelector('.div__result');

let carrotCnt = 10;
remain.innerText = carrotCnt;

headerBtn.addEventListener('click', () => {
  countDown();
});

function handlePlayBtn() {
  headerBtn.classList.toggle('pause');
  const pauseBtn = document.querySelector('.pause');
  if (pauseBtn) {
    pauseBtn.innerHTML = `<i class="fas fa-stop"></i>`;
  } else {
    headerBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

function countDown() {
  let timer;
  let remainTime = 10;
  handlePlayBtn();
  makeTarget();
  gamePlay();

  function showRemaining() {
    if (remainTime === 0 || carrotCnt === 0 || isBugClicked) {
      clearInterval(timer); //함수 멈춤

      return;
    }
    remainTime--;
    headerTimer.innerText = `${remainTime}`;
  }
  timer = setInterval(showRemaining, 1000); //1초에 한번 함수 실행
}

function gamePlay() {
  for (let i = 0; i < 7; i++) {
    const bug = document.querySelector(`.bug[data-bug="${i}"]`);
    changeArrangement(bug);
  }

  for (let i = 0; i < 10; i++) {
    const carrot = document.querySelector(`.carrot[data-carrot="${i}"]`);
    changeArrangement(carrot);
  }
}

function changeArrangement(element) {
  if (element.dataset.bug) {
    let randomX = Math.floor(Math.random() * 770);
    let randomY = Math.floor(Math.random() * 220);
    element.style.transform = `translate(${randomX}px, ${randomY}px)`;
  } else if (element.dataset.carrot) {
    for (let i = 0; i < 10; i++) {
      let randomX = Math.floor(Math.random() * 760);
      let randomY = Math.floor(Math.random() * 185);
      element.style.transform = `translate(${randomX}px, ${randomY}px)`;
      element.style.visibility = 'visible';
    }
    carrotCnt = 10;
    remain.innerText = carrotCnt;
  }
}

function makeTarget() {
  if (document.querySelectorAll('.bug').length > 0) return;
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
  const carrotCnt = document.querySelectorAll('.carrot').length;
  if (carrotCnt > 0) return;
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

  if (bug) {
    showResult('lose', carrotCnt);
    isBugClicked = true;
  } else if (carrot) {
    carrotCnt--;
    remain.innerText = carrotCnt;
    const clickedCarrot = document.querySelector(
      `.carrot[data-carrot="${carrot}"]`
    );
    clickedCarrot.style.visibility = 'hidden';
    if (carrotCnt === 0) {
      showResult('win', carrotCnt);
    }
  }
});

function showResult(result, carrotCnt) {
  const resultMessage = document.querySelector('.result-message');
  if (result === 'lose') {
    handlePlayBtn();
    resultMessage.innerText = `🤣 ${carrotCnt} carrots left 😝
    ${'\u00a0\u00a0\u00a0\u00a0'}YOU LOSE 👎`;
    resultBox.style.visibility = 'visible';
    return;
  } else if (result === 'win') {
    handlePlayBtn();
    resultMessage.innerText = `🎉 ${carrotCnt} carrots left 🎉  
    ${'\u00a0\u00a0\u00a0\u00a0'} YOU WIN ! 👍`; //공백처리

    resultBox.style.visibility = 'visible';
    return;
  } else if (result === null) {
    handlePlayBtn();

    resultMessage.innerText = `🧡
    RETRY?`; //공백처리
    resultBox.style.visibility = 'visible';
    return;
  }
}

const redoBtn = document.querySelector('.div__result').querySelector('i');
redoBtn.addEventListener('click', event => {
  resultBox.style.visibility = 'hidden';
  handlePlayBtn();
  makeTarget();
  gamePlay();
});
