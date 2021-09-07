'use strict';

const playBtn = document.querySelector('.header__play');
const timer = document.querySelector('.header__timer');
const remain = document.querySelector('.header__remain');
const main = document.querySelector('.main');

let timeCnt = 10;
let counter = setInterval(timeCnt, 1000);

// function timecount() {
//   timeCnt--;

//   if (timeCnt <= 0) {
//     clearInterval(counter); //setinterval로 설정한 작업 취소

//     //타이머끝나면 동작하는 코드?
//     console.log('끝');
//   }
//   header_timer.innerHTML = timeCnt;
// }

playBtn.addEventListener('click', () => {
  console.log('play');
  gamePlay();
});

function gamePlay() {
  makeTarget();
}

function makeTarget() {
  for (let i = 0; i < 7; i++) {
    const element = document.createElement('img');
    element.setAttribute('class', 'bug');
    element.setAttribute('src', './img/bug.png');
    element.setAttribute('data-bug', `bug${i}`);
    main.appendChild(element);

    let randomX = Math.floor(Math.random() * 770);
    let randomY = Math.floor(Math.random() * 220);

    let bugTarget = document.querySelector(`.bug[data-bug="bug${i}"]`);

    bugTarget.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }

  for (let i = 0; i < 10; i++) {
    const element = document.createElement('img');
    element.setAttribute('class', 'carrot');
    element.setAttribute('src', './img/carrot.png');
    element.setAttribute('data-carrot', `carrot${i}`);
    main.appendChild(element);

    let randomX = Math.floor(Math.random() * 760);
    let randomY = Math.floor(Math.random() * 185);

    let carrotTarget = document.querySelector(
      `.carrot[data-carrot="carrot${i}"]`
    );

    carrotTarget.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }
}
makeTarget();

let carrotCnt = 10;
remain.innerText = carrotCnt;

main.addEventListener('click', event => {
  const bug = event.target.dataset.bug;
  const carrot = event.target.dataset.carrot;

  if (bug) {
    console.log('you lose');
  } else if (carrot) {
    carrotCnt--;
    remain.innerText = carrotCnt;
    const clickedCarrot = document.querySelector(
      `.carrot[data-carrot="${carrot}"]`
    );
    clickedCarrot.remove();
  }
});

function lose(carrotCnt) {}
