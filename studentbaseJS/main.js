document.addEventListener('DOMContentLoaded', () => {
  // ERRORS
  const errorField = document.getElementById('errors');
  function createError(str) {
    errorField.innerHTML = '';
    const errorMessage = document.createElement('p');
    errorMessage.innerHTML = `${str}`;
    errorMessage.style.cssText = 'border: 1px solid red; color: red; font-size: 20px; padding: 10px';
    errorField.append(errorMessage);
  }
  function createChanges(str) {
    errorField.innerHTML = '';
    const errorMessage = document.createElement('p');
    errorMessage.innerHTML = `${str}`;
    errorMessage.style.cssText = 'border: 1px solid orange; color: orange; font-size: 20px; padding: 10px';
    errorField.append(errorMessage);
  }
  function blink(el) {
    el.style.backgroundColor = 'red';
    setTimeout(() => {
      el.style.backgroundColor = '';
    }, 1000);
  }

  // ADD_STUDENT_FORM and VALIDATE
  const addStudentForm = document.getElementById('add_student_form');
  addStudentForm.style.cssText = 'display: flex; width: fit-content;';

  const inputFiledset = document.createElement('fieldset');
  const inputFieldsetLegend = document.createElement('legend');
  const inputFullname = document.createElement('input');
  const inputBirthdate = document.createElement('input');
  const inputStartstudy = document.createElement('input');
  const inputFacult = document.createElement('input');
  const inputButton = document.createElement('button');
  inputFullname.style.cssText = 'width: 350px; height: 100%; transition: all 1s linear;';
  inputBirthdate.style.cssText = 'width: 120px; height: 100%; transition: all 1s linear;';
  inputStartstudy.style.cssText = 'width: 120px; height: 100%; transition: all 1s linear;';
  inputFacult.style.cssText = 'width: 350px; height: 100%; transition: all 1s linear;';
  inputFiledset.style.cssText = 'width: 100%; height: 100%; transition: all 1s linear;';
  inputButton.style.cssText = 'width: 100px; height: 100%; transition: all 1s linear;';
  inputButton.innerHTML = 'Добавить';

  inputFieldsetLegend.innerHTML = 'Добавить студента';
  inputFullname.setAttribute('type', 'text');
  inputBirthdate.setAttribute('type', 'date');
  inputStartstudy.setAttribute('type', 'number');
  inputFacult.setAttribute('type', 'text');

  inputFiledset.append(inputFieldsetLegend);
  inputFiledset.append(inputFullname);
  inputFiledset.append(inputBirthdate);
  inputFiledset.append(inputStartstudy);
  inputFiledset.append(inputFacult);
  inputFiledset.append(inputButton);

  addStudentForm.append(inputFiledset);

  // eslint-disable-next-line no-use-before-define
  inputButton.addEventListener('click', getDataFromInput);

  // получение даты из input и проверка пустых значений
  let inputData = [];
  let validatedData = [];
  function getDataFromInput() {
    if (!inputFullname.value) {
      createError('ФИО не заполнено!'); // ОШИБКА ПУСТОГО ФИО
      blink(inputFullname);
      inputData = [];
      return;
    }
    inputData.push(inputFullname.value);

    if (!inputBirthdate.value) {
      createError('Дата рождения не заполнена'); // ОШИБКА ПУСТОЙ ДАТЫ
      blink(inputBirthdate);
      inputData = [];
      return;
    }
    inputData.push(inputBirthdate.value);

    if (!inputStartstudy.value) {
      createError('Год начала учебы не заполнен'); // ОШИБКА ПУСТОЙ ДАТЫ УЧЕБЫ
      blink(inputStartstudy);
      inputData = [];
      return;
    }
    inputData.push(inputStartstudy.value);

    if (!inputFacult.value) {
      createError('Факультет не заполнен!'); // ОШИБКА ПУСТОГО ФАКУЛЬТЕТА
      blink(inputFacult);
      inputData = [];
      return;
    }
    inputData.push(inputFacult.value);

    validateData(inputData);
    inputData = [];
  }

  // валидация данных
  function validateData(arr) {
    const innerData = arr;
    validatedData = [];
    checkFio(innerData[0]);
    checkBirthdate(innerData[1]);
    checkStudystartYear(innerData[2]);
    checkFacult(innerData[3]);
    if (validatedData.length === 4) {
      // eslint-disable-next-line no-shadow
      const errorField = document.getElementById('errors');
      // eslint-disable-next-line no-use-before-define,max-len
      createStudent(validatedData[0][1], validatedData[0][0], validatedData[0][2], validatedData[1], validatedData[2], validatedData[3]);
      errorField.innerHTML = '';
      // eslint-disable-next-line no-use-before-define
      clearInputs();
      validatedData = [];
    }
  }

  // проверка всех значений
  function checkFio(str) {
    const fioBefore = str;
    const fioEdit = fioBefore.toLowerCase().replace(/[,.]/g, ' ').split(' ').filter((n) => n);
    if (fioEdit.length < 3) {
      createError('ФИО заполнено не полностью!');
      blink(inputFullname);
      return;
    }
    if (fioEdit.length > 3) {
      createError('ФИО слишком длинное! Либо записать фамилию через дефис');
      blink(inputFullname);
      return;
    }
    for (let i = 0; i < fioEdit.length; i++) {
      fioEdit[i] = fioEdit[i][0].toUpperCase() + fioEdit[i].substr(1);
    }
    const fioAfter = fioEdit.join(' ');
    if (fioBefore != fioAfter) {
      createChanges('Проверьте ФИО, оно было изменено');
      inputFullname.value = fioAfter;
      return;
    }
    return validatedData.push(fioEdit);
  }

  function checkBirthdate(date) {
    const minDate = new Date('1900-01-01');
    const inputDateArray = date.split('-');
    const inputDate = new Date(inputDateArray[0] - 7, inputDateArray[1] + 1, inputDateArray[2]);
    const today = new Date();
    const currentDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());

    if (inputDate.getFullYear() < minDate.getFullYear() || inputDate.getFullYear() > currentDate.getFullYear()) {
      createError(`Дата рождения должна быть в пределах ${minDate.toLocaleDateString()} и ${currentDate.toLocaleDateString()}`);
      blink(inputBirthdate);
      return;
    }
    return validatedData.push(date);
  }

  function checkStudystartYear(year) {
    const today = new Date();
    const currentYear = new Date().getFullYear();

    if (+year < 2000 || +year > currentYear) {
      createError(`Дата учебы должна быть в диапазоне 2000 и ${currentYear}`);
      blink(inputStartstudy);
      return;
    }

    return validatedData.push(+year);
  }

  function checkFacult(str) {
    const facultBefore = str;
    const facultEdit = facultBefore.toLowerCase().replace(/[,.]/g, ' ').split(' ').filter((n) => n);
    for (let i = 0; i < facultEdit.length; i++) {
      facultEdit[i] = facultEdit[i][0].toUpperCase() + facultEdit[i].substr(1);
    }
    const facultAfter = facultEdit.join(' ');
    if (facultBefore != facultAfter) {
      createChanges('Проверьте Факультет, он был изменен');
      inputFacult.value = facultAfter;
      return;
    }
    return validatedData.push(facultAfter);
  }

  let id = 0;
  const studentsBase = [];
  function createStudent(firstname, secondname, lastname, birthdate, studystartyear, faculty) {
    id++;
    const birthdateConv = birthdate.split('-');

    const student = {
      id: '',
      firstname: '',
      secondname: '',
      lastname: '',
      studystartyear: '',
      faculty: '',
      birthdate: new Date(birthdateConv[0], birthdateConv[1], birthdateConv[2]),
    };

    student.id = id;
    student.firstname = firstname;
    student.secondname = secondname;
    student.lastname = lastname;
    student.birthdate = birthdate;
    student.studystartyear = studystartyear;
    student.faculty = faculty;

    studentsBase.push(student);

    // передача в таблицу
    const fullnameconv = `${student.secondname} ${student.firstname} ${student.lastname}`;
    const sendArr = [fullnameconv, student.faculty, student.birthdate, student.studystartyear, student.id];
    addStudentinTable(student);
  }

  // очистка полей
  function clearInputs() {
    inputFullname.value = '';
    inputBirthdate.value = '';
    inputStartstudy.value = '';
    inputFacult.value = '';
  }

  // FILTER_STUDENT_FORM (SEARCH)

  const filterStudentForm = document.getElementById('filter_student-form');

  const searchFiledset = document.createElement('fieldset');
  const legendsearchFiledset = document.createElement('legend');
  const nameSearch = document.createElement('input');
  const facultySearch = document.createElement('input');
  const startStudySearch = document.createElement('input');
  const endStudySearch = document.createElement('input');

  nameSearch.style.cssText = 'width: 350px; height: 100%; padding: 0;';
  facultySearch.style.cssText = 'width: 120px; height: 100%; padding: 0;';
  startStudySearch.style.cssText = 'width: 120px; height: 100%; padding: 0;';
  endStudySearch.style.cssText = 'width: 120px; height: 100%; padding: 0;';
  searchFiledset.style.cssText = 'width: 100%; height: 100%;';

  legendsearchFiledset.innerHTML = 'Поиск студента';
  nameSearch.setAttribute('type', 'text');
  facultySearch.setAttribute('type', 'text');
  startStudySearch.setAttribute('type', 'text');
  endStudySearch.setAttribute('type', 'text');

  nameSearch.setAttribute('id', 'searchInput0');
  facultySearch.setAttribute('id', 'searchInput1');
  startStudySearch.setAttribute('id', 'searchInput2');
  endStudySearch.setAttribute('id', 'searchInput3');

  nameSearch.setAttribute('oninput', 'allSearch()');
  facultySearch.setAttribute('oninput', 'allSearch()');
  startStudySearch.setAttribute('oninput', 'allSearch()');
  endStudySearch.setAttribute('oninput', 'allSearch()');

  nameSearch.classList.add('searchInput');
  facultySearch.classList.add('searchInput');
  startStudySearch.classList.add('searchInput');
  endStudySearch.classList.add('searchInput');

  searchFiledset.append(legendsearchFiledset);
  searchFiledset.append(nameSearch);
  searchFiledset.append(facultySearch);
  searchFiledset.append(startStudySearch);
  searchFiledset.append(endStudySearch);

  filterStudentForm.append(searchFiledset);

  // STUDENT_TABLE
  const studentTable = document.getElementById('student_table');

  const mainTable = document.createElement('table');
  const thead = document.createElement('thead');
  mainTable.style.cssText = 'width: 929px; border: 1px solid black; text-align: center; border-collapse: collapse;';
  mainTable.setAttribute('id', 'mainTable');
  const tr = document.createElement('tr');
  const th1 = document.createElement('th');
  const th2 = document.createElement('th');
  const th3 = document.createElement('th');
  const th4 = document.createElement('th');
  const th5 = document.createElement('th');

  th1.classList.add('table-header');
  th2.classList.add('table-header');
  th3.classList.add('table-header');
  th4.classList.add('table-header');
  th5.classList.add('table-header');

  th2.setAttribute('onclick', 'sortTable(1)');
  th3.setAttribute('onclick', 'sortTable(2)');
  th4.setAttribute('onclick', 'sortTable(3)');
  th5.setAttribute('onclick', 'sortTable(4)');

  th1.innerHTML = 'ID';
  th2.innerHTML = 'ФИО';
  th3.innerHTML = 'Факультет';
  th4.innerHTML = 'Дата рождения (возраст)';
  th5.innerHTML = 'Годы обучения (курс)';

  mainTable.setAttribute('id', 'maintable');

  tr.append(th1);
  tr.append(th2);
  tr.append(th3);
  tr.append(th4);
  tr.append(th5);

  thead.append(tr);
  mainTable.append(thead);
  studentTable.append(mainTable);

  const tbody = document.createElement('tbody');

  //  const sendArr = [fullnameconv, student.faculty, student.birthdate, student.studystartyear, student.id]
  function addStudentinTable(arr) {
    const currentYear = new Date().getFullYear();
    const birthYear = arr.birthdate.substr(0, 4);
    let yearsOld = +currentYear - +birthYear;
    if (yearsOld === 0) {
      yearsOld = 1;
    }

    const newLine = document.createElement('tr');

    const idCol = document.createElement('td');
    const fullnameCol = document.createElement('td');
    const facultyCol = document.createElement('td');
    const birthdateCol = document.createElement('td');
    const studyyearsCol = document.createElement('td');

    fullnameCol.classList.add('student_data_fullname');
    facultyCol.classList.add('student_data_faculty');
    birthdateCol.classList.add('student_data');
    studyyearsCol.classList.add('student_data');

    idCol.append(arr.id);
    fullnameCol.append(`${arr.secondname} ${arr.firstname} ${arr.lastname}`);
    facultyCol.append(arr.faculty);
    birthdateCol.append(`${arr.birthdate} (${yearsOld} ${datePlural(yearsOld)})`);
    studyyearsCol.append(`${`${arr.studystartyear}-${+arr.studystartyear + 4}` + ' ('}${courseCheck(+arr.studystartyear)})`);

    newLine.append(idCol);
    newLine.append(fullnameCol);
    newLine.append(facultyCol);
    newLine.append(birthdateCol);
    newLine.append(studyyearsCol);

    tbody.append(newLine);
    mainTable.append(tbody);
  }

  function datePlural(age) {
    let plu;
    count = age % 100;
    // eslint-disable-next-line no-undef
    if (count >= 5 && count <= 20) {
      plu = 'лет';
    } else {
      count %= 10;
      if (count === 1) {
        plu = 'год';
      } else if (count >= 2 && count <= 4) {
        plu = 'года';
      } else {
        plu = 'лет';
      }
    }
    return plu;
  }

  function courseCheck(date) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    const endDateYear = date + 4;
    let outputResult;

    if (currentYear > endDateYear) {
      if (currentMonth >= 9) {
        outputResult = 'закончил';
      } else {
        outputResult = `${+currentYear - +endDateYear} курс`;
      }
    } else {
      outputResult = `${+currentYear - +date + 1} курс`;
    }
    return outputResult;
  }

  createStudent('Виктор', 'СамыйСтариковый', 'Проверочный', '1900-01-02', 2000, 'Дизайн');
  createStudent('Дима', 'Большаков', 'Геннадьевич', '1971-12-26', 2007, 'Дизайн');
  createStudent('Петр', 'Вальчук', 'Евгеньевич', '1988-12-26', 2018, 'Дизайн');
  createStudent('Диана', 'Королевна', 'Елизаветовна', '1971-12-26', 2019, 'Астрология');
  createStudent('Алина', 'Садри', 'Дмитриевна', '1986-12-26', 2020, 'Антропология');
  createStudent('Алик', 'Абдурах', 'Зарубович', '1985-12-26', 2011, 'Геология');
  createStudent('Зуруб', 'Зольдович', 'Яксмен', '1976-12-26', 2012, 'Гомеопатизм');
  createStudent('Питер', 'Гриффин', 'Грифинович', '1989-12-26', 2013, 'Поэзия');
  createStudent('Гомер', 'Симпсон', 'Базлайтович', '1945-12-26', 2014, 'Поэзия');
  createStudent('Эндрю', 'Абрахам', 'Базлайтович', '1945-12-26', 2014, 'Философия');
  createStudent('Квентин', 'Тарантино', 'Бешенопсович', '1963-03-27', 2001, 'Режисер');
});

// фильтрация
let arr = [];
function allSearch() {
  const firstData = document.getElementById('searchInput0');
  const firstValue = firstData.value;
  const secondData = document.getElementById('searchInput1');
  const secondValue = secondData.value;
  const thirdData = document.getElementById('searchInput2');
  const thirdValue = thirdData.value;
  const fourData = document.getElementById('searchInput3');
  const fourValue = fourData.value;
  arr.push(firstValue);
  arr.push(secondValue);
  arr.push(thirdValue);
  arr.push(fourValue);

  filterList(arr);
  arr = [];
}

function filterList(arr) {
  const fullnameinput = arr[0];
  const faculty = arr[1];
  const startyear = arr[2];
  const endyear = arr[3];
  const table = document.getElementById('maintable');
  const tr = table.getElementsByTagName('TR');

  for (let i = 1; i < tr.length; i++) {
    const tdname = tr[i].getElementsByTagName('td')[1];
    const tdfacult = tr[i].getElementsByTagName('td')[2];
    const tdstart = tr[i].getElementsByTagName('td')[4];
    const tdend = tr[i].getElementsByTagName('td')[4];
    const checkName = tdname.textContent.toUpperCase();
    const checkValue = tdfacult.textContent.toUpperCase();
    const checkStartyear = tdstart.textContent.slice(0, 4) || tdstart.innerText.slice(0, 4);
    const checkEndyear = tdend.textContent.slice(5, 9) || tdend.innerText.slice(5, 9);
    if (checkName.includes(fullnameinput.toUpperCase())
      & checkValue.includes(faculty.toUpperCase())
      & checkStartyear.includes(startyear.toString())
      & checkEndyear.includes(endyear.toString())) {
      tr[i].style.display = '';
    } else {
      tr[i].style.display = 'none';
    }
    arr = [];
  }
}

// сортировка
// eslint-disable-next-line no-unused-vars
function sortTable(n) {
  let table; let rows; let switching; let i; let x; let y; let shouldSwitch; let dir; let
    switchcount = 0;
  // eslint-disable-next-line prefer-const
  table = document.getElementById('maintable');
  switching = true;
  dir = 'asc';
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName('td')[n];
      y = rows[i + 1].getElementsByTagName('td')[n];
      if (dir === 'asc') {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === 'desc') {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else if (switchcount === 0 && dir === 'asc') {
      dir = 'desc';
      switching = true;
    }
  }
}
