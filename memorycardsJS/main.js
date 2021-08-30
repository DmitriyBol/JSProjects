const inputNumber = document.getElementById('inputNumber');
const btn = document.getElementById('btn');
let moves = 0;

btn.addEventListener ('click', getNumber)

//стартуем
let testNumCells;
function getNumber() {
	resetTimer();
	const numberOfCells = +inputNumber.value;
  if (numberOfCells === 0 || numberOfCells % 2 != 0) {
  	makeField(4);
    testNumCells = 4;
  } else {
  	makeField(numberOfCells);
    testNumCells = numberOfCells;
  }
}

function makeField(num) {
	const playfield = document.getElementById('playfield');
  playfield.textContent = "";
  playfield.style.cssText = "display: flex; width: 90px; flex-wrap: wrap; justify-content: space-between;";
  //получаем массив пар чисел, мешаем
  const arr = [];
  for (let i = 1; i <= num / 2; i++) {
  	arr.push(i);
    arr.push(i);
  }
  shuffle(arr);
  //создаем ячейки согласно переданному значению num
	for (let i = 0; i < num; i++) {
  	const fieldCell = document.createElement("div");
    fieldCell.id = "field";
    fieldCell.style.cssText = "width: 20px; height: 20px; border: 1px solid red; text-align: center; cursor: pointer;";
    playfield.append(fieldCell);
    fieldCell.setAttribute("value", arr[i]);
  }
  //создаем событие для каждой карточки
  cellsListener();
}
//событие для каждой карточки
let cards = [];
function cellsListener() {
	let card = document.querySelectorAll("#field");
  let cards = [...card];
  for (let i = 0; i < cards.length; i++)	{
   cards[i].addEventListener("click", openCell);
	}
}
//открываем карточки, стартуем таймер и делаем проверки
let openedCells = [];
function openCell() {
	if (this.classList.contains("match") || this.classList.contains("selected")) {
  	return;
  }
  startTimer();
	this.innerHTML = this.getAttribute("value");
  this.classList.add("selected");
  this.style.backgroundColor = 'yellow';
  openedCells.push(this);
  moves++;

  if (moves === 2) {
  	moves = 0;
    if (openedCells[0].getAttribute("value") === openedCells[1].getAttribute("value")) {
    	matched();
    } else {
    	unmatched();
    }
  }
}
//таймер и сброс игры
let interval;
let seconds = 60;
const timer = document.getElementById("timer");
timer.style.cssText = "width: 100px; height: 20px; border: 1px solid black; text-align: center;"
timer.innerHTML = "60";
function startTimer() {
	clearInterval(interval);
	interval = setInterval( () => {
  	timer.innerHTML = seconds;
    seconds--;
    endGame();
    if (seconds < 0) {
    	alert("Время вышло!");
      clearInterval(interval);
      seconds = 60;
      timer.innerHTML = "60";
      playfield.innerHTML = "";
 		 }
  }, 1000);
}

function resetTimer() {
  clearInterval(interval);
  seconds = 60;
  timer.innerHTML = "60";
  playfield.innerHTML = "";
}
//проверяем сходство, если сошлось - зеленый и оставляем, если нет - красный через 0,5сек и скрываем.
function matched() {
	openedCells[0].classList.add("match");
  openedCells[0].style.backgroundColor = "green";
  openedCells[0].classList.remove("selected");
  openedCells[1].classList.add("match");
  openedCells[1].style.backgroundColor = "green";
  openedCells[1].classList.remove("selected");
  openedCells = [];
}
function unmatched() {
		openedCells[0].classList.add("unmatch");
    openedCells[0].style.backgroundColor = "red";
    openedCells[1].classList.add("unmatch");
    openedCells[1].style.backgroundColor = "red";
    setTimeout( () => {
    	openedCells[0].classList.remove("unmatch", "selected");
      openedCells[1].classList.remove("unmatch", "selected");
      openedCells[0].innerHTML = "";
      openedCells[1].innerHTML = "";
      openedCells[0].style.backgroundColor = "";
      openedCells[1].style.backgroundColor = "";
      openedCells = [];
    }, 500 )
}

//конец игры
function endGame() {
	const countMaches = document.querySelectorAll(".match");
  const arr = [...countMaches];
  if (arr.length === testNumCells) {
  	alert("Вы молодец! Игра пройдена")
    clearInterval(interval);
    seconds = 60;
    timer.innerHTML = "60";
    playfield.innerHTML = "";
  }
}

//StackOverFlow
function shuffle(array) {
  var currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
