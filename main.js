'use strict';

const section = document.querySelector('.container');
const playBtn = document.querySelector('.header__play');
const timer = document.querySelector('.header__timer');
const remain = document.querySelector('.header__remain');
// const main = document.querySelector('.main');
const redo = document.querySelector('.redo');
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
  gamePlay();
});

function gamePlay() {
  makeTarget();
}

function makeTarget() {
  const main = document.createElement('main');
  main.setAttribute('class', 'main');
  section.appendChild(main);

  for (let i = 0; i < 7; i++) {
    const element = document.createElement('img');
    element.setAttribute('class', 'bug');
    element.setAttribute('src', './img/bug.png');
    element.setAttribute('data-bug', i);
    main.appendChild(element);

    let randomX = Math.floor(Math.random() * 770);
    let randomY = Math.floor(Math.random() * 220);

    let bugTarget = document.querySelector(`.bug[data-bug="${i}"]`);

    bugTarget.style.transform = `translate(${randomX}px, ${randomY}px)`;
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
  }
  //   section.appendChild(main);

  const tmp = onclick(main);
}
// makeTarget();

let carrotCnt = 10;
remain.innerText = carrotCnt;

function onclick(main) {
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
}

function lose(carrotCnt) {}
