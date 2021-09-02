document.addEventListener('DOMContentLoaded', () => {

//область ввода данных
const fieldset = document.getElementById("fieldset");
fieldset.style.cssText = "display: flex; width: 1170px; height: 55px; margin-bottom: 20px"
const fieldset2 = document.getElementById("fieldset2");
fieldset2.style.cssText = "display: flex; width: 900px; height: 55px; justify-content: space-between; margin-bottom: 20px"
const submitButton = document.getElementById("submit-button");
const errors = document.getElementById("errors-field");

const studentFio_data = document.getElementById("student-fio");
const studentBid_data = document.getElementById("student-bid");
const studentSys_data = document.getElementById("student-sys");
const studentFac_data = document.getElementById("student-fac");

//область таблицы
const table = document.getElementById("main-table");
table.style.cssText = "width: 929px; border: 1px solid black; text-align: center; border-collapse: collapse;"
const th = document.querySelectorAll("tr .table-header");
for (let el of th) {
	el.style.cssText = "border: 1px solid black";
}

//запуск программы
submitButton.addEventListener('click', validate);

let errorsQuantity = 0;
function validate() {

	// обращаемся к таблице
 	const studentFio_data = document.getElementById("student-fio");
  const studentBid_data = document.getElementById("student-bid");
  const studentSys_data = document.getElementById("student-sys");
  const studentFac_data = document.getElementById("student-fac");

  //проверка ФИО (не должно быть пробелов и не пустым)
  if (!studentFio_data.value) {
    errors.innerHTML = "";
  	const message0 = document.createElement("p");
    message0.cssText = "margin: 0;"
    message0.innerHTML = "ФИО не может быть пустым!";
    errors.append(message0);
    errors.style.cssText = "color: red; border: 1px solid red; width: 927px;"
    errorsQuantity++;
    return;
  }
  let studentfio = fioCheck(studentFio_data.value).split(" ");

  //Проверка Даты (не раньше 1900-01-01) + возраст студента
  let studentYearsOld = bidCheck(studentBid_data.value).split(" ");

  //Проверка года начала учебы (не ниже 2000)
  let studentYearStart = sysCheck(+studentSys_data.value);

  //Факультет (без проверок)
  let studentFacult = studentFac_data.value;

  // считаем ошибки, если нет - добавляем студента в базу.
  if (errorsQuantity === 0) {
  	submitButton.setAttribute("disabled", "disabled");
    addStudentBase(studentfio[1], studentfio[0], studentfio[2], studentYearsOld[1], studentYearsOld[0], studentYearStart, studentFacult)
    setTimeout( () => {
    	clearTable();
      submitButton.removeAttribute("disabled", "disabled");
    }, 1000 );
  } else {
   return;
  }
}

function fioCheck(str) {
  errors.innerHTML = "";
	const fioBefore = str;
	const fioEdit= fioBefore.toLowerCase().replace(/[,.]/g, ' ').split(' ').filter(n => n); //убираем все лишнее
	for (let i = 0; i < fioEdit.length; i++) {
    fioEdit[i] = fioEdit[i][0].toUpperCase() + fioEdit[i].substr(1);
  }
  const fioAfter = fioEdit.join(' ');

  if (fioBefore != fioAfter) {
 		studentFio_data.value = fioAfter;
    const message1 = document.createElement("p");
    message1.cssText = "margin: 0;"
    message1.innerHTML = "Проверьте ФИО! Оно было изменено!";
    errors.append(message1);
    errors.style.cssText = "color: red; border: 1px solid red; width: 927px;"
    errorsQuantity++;
    return;
  } else {
  	errors.innerHTML = "";
  	errors.style.cssText = "";
    errorsQuantity = 0;
    return fioAfter;
  }
}

function bidCheck(date) {
	const studentBid_data = document.getElementById("student-bid");

  const currentYear = new Date().getFullYear();

  const arr = date.split("-")
  const inputDate = new Date();
  inputDate.setFullYear(arr[0], arr[1]-1, arr[2]);

  const minDate = new Date();
  minDate.setFullYear(1900, 0, 1);

  const studentYearsOld = new Date().getFullYear() - inputDate.getFullYear();
  console.log(currentYear);

  if (inputDate.getFullYear() < minDate.getFullYear() || inputDate.getFullYear() > currentYear) {
		studentBid_data.value = "1900-01-01";
    const message2 = document.createElement("p");
    message2.cssText = "margin: 0;"
    message2.innerHTML = "Минимальная дата от 01 01 1900 года и не больше текущей";
    errors.append(message2);
    errors.style.cssText = "color: red; border: 1px solid red; width: 927px;"
    errorsQuantity++;
    return;
  } else {
  	studentBid_data.value = date;
  	errors.innerHTML = "";
  	errors.style.cssText = "";
    errorsQuantity = 0;
    return studentYearsOld + " "+date;
  }
}

function sysCheck(number) {
  const currentYear =  new Date().getFullYear();
  number = +number.toString().replace(/\s/g, '');

	if (number <= 1999 || number > currentYear) {
  	studentSys_data.value = "2000";
    const message3 = document.createElement("p");
    message3.cssText = "margin: 0;"
    message3.innerHTML = `Дата начала учебы в пределах 2000 - ${currentYear}. Без пробелов`;
    errors.append(message3);
    errors.style.cssText = "color: red; border: 1px solid red; width: 927px;"
    errorsQuantity++;
    return;
  } else {
    errors.innerHTML = "";
  	errors.style.cssText = "";
    errorsQuantity = 0;
    return number;
  }
}

function clearTable() {
	studentFio_data.value = "";
  studentBid_data.value = "1900-01-01";
  studentSys_data.value = "";
  studentFac_data.value = "";
}

// база студентов, создание и добавление

const studentBase = [];
let studentId = 0;

//создание студента
function addStudentBase(name, secondname, lastname, birthDate, yearsOld, studyStart, facult) {
	studentId++;
	let student = {};
  student.id = studentId;
	student.name = name;
  student.secondname = secondname;
  student.lastname = lastname;
  student.birthDate = birthDate;
  student.yearsOld = yearsOld;
  student.studyStart = studyStart;
  student.facult = facult;
  studentBase.push(student);
  studentTableElement(student.name, student.secondname, student.lastname, student.birthDate, student.yearsOld, student.studyStart, student.facult, student.id);
}

addTestStudents();
function addTestStudents() {
	addStudentBase("Dima", "Polshakov", "Gennadevich", "1989-12-26", 31, 2019, "desing")
  addStudentBase("Misha", "Orel", "Gennadevich", "1990-10-10", 30, 2020, "desing")
  addStudentBase("Sema", "Androsov", "Gennadevich", "1990-31-06", 30, 2021, "programming")
  addStudentBase("Alina", "Sadr", "Gennadevich", "1990-08-23", 30, 2021, "geology")
  addStudentBase("Andrey", "Shest", "Gennadevich", "1988-12-11", 32, 2018, "economy")
  addStudentBase("Piter", "Griffin", "Gennadevich", "1985-12-11", 35, 2010, "programming")
}


function studentTableElement(name, secondname, lastname, birthDate, yearsOld, studyStart, facult, id) {
	const newLine = document.createElement("tr");

  const idstudent = document.createElement('td');
  idstudent.append(id);
  idstudent.classList.add('td-elem');
  const fullName = document.createElement('td');
  fullName.append(secondname + " " + name + " " +lastname);
  fullName.classList.add('td-elem');
  const firstName = document.createElement('td');
  const facultate = document.createElement('td');
  facultate.append(facult);
  facultate.classList.add('td-elem');
  facultate.setAttribute("id", "facultate");
  const fullage = document.createElement('td');
  fullage.append(birthDate + " (" + yearsOld + " лет)");
  fullage.classList.add('td-elem');
  fullage.setAttribute("id", "dateColumn");
  const studycoure = document.createElement('td');
  studycoure.append(studyStart + "-" + (studyStart+4) + " (" + courseCheck(+studyStart) + ")");
  studycoure.classList.add('td-elem');

  newLine.append(idstudent)
  newLine.append(fullName);
  newLine.append(facultate);
  newLine.append(fullage);
  newLine.append(studycoure);


  table.append(newLine);
}

function courseCheck(date) {

	let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth() + 1;

  let endDateYear = date + 4;

  let outputResult;

  if (currentYear > endDateYear) {
  	if (currentMonth >= 9) {
    	outputResult = 'закончил';
    } else {
    	outputResult = +currentYear - +endDateYear + ' курс'
    }
  } else {
  	outputResult = (+currentYear - +date + 1) + ' курс'
  }
  return outputResult;
}
})

//сортировка
function sortTable(n) {
  let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("main-table");
  switching = true;
  dir = "asc";
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
//поля поиска
function searchFIOTable() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput0");
  filter = input.value.toUpperCase();
  table = document.getElementById("main-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[1];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
function searchFacultateTable() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput1");
  filter = input.value.toUpperCase();
  table = document.getElementById("main-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[3];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
function searchStartStudyTable() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput2");
  filter = input.value;
  table = document.getElementById("main-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[5];
    if (td) {
      txtValue = td.textContent.slice(0,4) || td.innerText.slice(0,4);
      if (txtValue.toUpperCase().includes(filter)) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
function searchEndStudyTable() {
  let input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("searchInput3");
  filter = input.value;
  table = document.getElementById("main-table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[5];
    if (td) {
      txtValue = td.textContent.slice(5,9) || td.innerText.slice(5,9);
      if (txtValue.toUpperCase().includes(filter)) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

