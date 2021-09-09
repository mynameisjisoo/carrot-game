'use strict';

const section = document.querySelector('.container');
const main = document.querySelector('.main');
const headerBtn = document.querySelector('.header__button');
const headerTimer = document.querySelector('.header__timer');
const remain = document.querySelector('.header__remain');
const redo = document.querySelector('.redo');

function handlePlayBtn() {
  headerBtn.classList.toggle('pause');
  const pauseBtn = document.querySelector('.pause');
  if (pauseBtn) {
    pauseBtn.innerHTML = `<i class="fas fa-stop"></i>`;
  } else {
    headerBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

headerBtn.addEventListener('click', () => {
  handlePlayBtn();
  makeTarget();
  // countDown();
});

function countDown() {
  let timer;
  let remainTime = 10;

  function showRemaining() {
    if (remainTime === 0) {
      clearInterval(timer); //함수 멈춤
      // alert('타이머 종료'); //시간종료하면 나오는 창
      return;
    }
    remainTime--;
    headerTimer.innerText = `00:${remainTime}`;
  }
  timer = setInterval(showRemaining, 1000); //1초에 한번 함수 실행
}

// function whenLose

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
      // element.style.visibility = '';
    }
  }
}

function makeTarget() {
  // console.log(document.querySelectorAll('.bug').length);
  if (document.querySelectorAll('.bug').length < 7) {
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
  }
  const carrotCnt = document.querySelectorAll('.carrot').length;
  const forCnt = 10 - carrotCnt; // 당근갯수 세서 모자란 갯수만큼만 만들도록
  for (let i = 0; i < forCnt; i++) {
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

let carrotCnt = 10;
remain.innerText = carrotCnt;

main.addEventListener('click', event => {
  const bug = event.target.dataset.bug;
  const carrot = event.target.dataset.carrot;

  if (bug) {
    console.log('you lose');
    lose(carrotCnt);
  } else if (carrot) {
    carrotCnt--;
    remain.innerText = carrotCnt;
    const clickedCarrot = document.querySelector(
      `.carrot[data-carrot="${carrot}"]`
    );
    clickedCarrot.style.visibility = 'hidden';
    if (carrotCnt === 0) {
      alert('끝!');
    }
  }
});

function lose(carrotCnt) {
  redo.innerText = `YOU LOSE👎
  ${carrotCnt}carrots left`;
  redo.style.visibility = '';
}
