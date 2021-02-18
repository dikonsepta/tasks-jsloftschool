/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';
const homeworkContainer = document.querySelector('#app');
const addDivButton = homeworkContainer.querySelector('#addDiv');
let currentDrag;
let startX;
let startY;

function rnd(min, max) {
  return String(Math.floor(Math.random() * (max - min)) + min);
}

document.addEventListener('mousemove', (event) => {
  if (currentDrag) {
    currentDrag.style.top = event.clientY - startY + 'px';
    currentDrag.style.left = event.clientX - startX + 'px';
  }
});

export function createDiv() {
  const newDiv = document.createElement('div');
  newDiv.className = 'draggable-div';

  newDiv.style.top = rnd(100, document.documentElement.clientHeight - 100) + 'px';
  newDiv.style.left = rnd(100, document.documentElement.clientWidth - 100) + 'px';
  newDiv.style.width = rnd(10, 100) + 'px';
  newDiv.style.height = rnd(10, 100) + 'px';
  newDiv.style.backgroundColor = `rgb(${rnd(0, 255)}, ${rnd(0, 255)}, ${rnd(0, 255)})`;

  newDiv.onmousedown = (event) => {
    startX = event.offsetX;
    startY = event.offsetY;
    currentDrag = newDiv;
  };

  newDiv.onmouseup = (event) => {
    currentDrag = false;
  };

  return newDiv;
}

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
