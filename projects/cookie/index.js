/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

let filter = '';

function updTable(filter = '') {
  listTable.innerHTML = '';
  const fragment = document.createDocumentFragment();

  const cookies = document.cookie.split('; ').reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});

  if (document.cookie !== '') {
    for (const key in cookies) {
      const newTR = document.createElement('tr');

      const newTHnam = document.createElement('th');
      const newTHval = document.createElement('th');
      const newTHbut = document.createElement('th');

      const newBUT = document.createElement('button');

      newTHnam.textContent = key;
      newTHval.textContent = cookies[key];

      if (
        key.toLowerCase().includes(filter.toLowerCase()) ||
        cookies[key].toLowerCase().includes(filter.toLowerCase()) ||
        filter === ''
      ) {
        newBUT.textContent = 'удалить cookie';
        newBUT.setAttribute('data-role', 'delete');
        newBUT.setAttribute('data-cook', key);
        newTHbut.append(newBUT);

        newTR.append(newTHnam);
        newTR.append(newTHval);
        newTR.append(newTHbut);

        fragment.append(newTR);
      }
    }
    listTable.append(fragment);
  }
}

filterNameInput.addEventListener('input', function () {
  filter = filterNameInput.value.trim();
  updTable(filter);
});

addButton.addEventListener('click', () => {
  if (addNameInput.value && addValueInput.value) {
    document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  }
  // Очистка значений мешает работе теста
  // addNameInput.value = '';
  // addValueInput.value = '';
  updTable(filter);
});

listTable.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && e.target.getAttribute('data-role') === 'delete') {
    const currentName = e.target.getAttribute('data-cook');
    document.cookie = `${currentName}=deleted; max-age=-1`;
    updTable(filter);
  }
});

updTable(filter);
