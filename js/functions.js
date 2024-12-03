const carousel = document.querySelector('.stepsForm__carousel');
const btnNext1 = document.querySelector('#btnNext1');
const btnNext2 = document.querySelector('#btnNext2');
const codInput = document.querySelector('#codInput');
const btnCopy = document.querySelector('#btnCopy');
const countDown = document.querySelector('#countDown');
const countElement = document.querySelector('.stepsForm__count');
const warningElement = document.querySelector('.stepsForm__warning');
const btnReset = document.querySelector('#btnReset');
let cod;
let remainingTime = 0.15 * 60;

btnNext1.addEventListener('click', () => {
	actionStep1();
});
btnNext2.addEventListener('click', () => {
	actionStep2();
});

btnCopy.addEventListener('click', () => {
  let textToCopy = codInput.textContent;
  navigator.clipboard.writeText(textToCopy);
});

function actionStep1() {
	let year = stepsForm.year.value;
	cod = parseInt(year.substring(2, 3)) + parseInt(year.substring(3, 4)) ;
	cod = cod.toString();
	carousel.style.setProperty("--posLeft", '-104%');
}

function actionStep2() {
	let actionText = stepsForm.action.value;
	actionText = actionText.trim();
	let lettersArray = actionText.split('');
	let finalArray = lettersArray.filter(char => /[b-zB-Z0-9áéíóúüñÁÉÍÓÚÜÑ]/.test(char));
	let finalCharacters = finalArray.slice(-4);
	finalCharacters = finalCharacters.join('').toUpperCase();
	cod = cod + finalCharacters;
	codInput.innerHTML = cod;
	carousel.style.setProperty("--posLeft", '-208%');
	initCountdown();
}

function initCountdown() {
  countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

function updateCountdown() {
  let minutes = Math.floor(remainingTime / 60);
  let seconds = remainingTime % 60;

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  countDown.innerHTML = formattedTime;

  if (remainingTime > 0) {
    remainingTime--;
  } else {
    clearInterval(countdownInterval);
		countElement.classList.add("hide");
		warningElement.classList.remove("hide");
		btnCopy.classList.add("hide");
		codInput.classList.add("notSelectable");
  }
}

btnReset.addEventListener('click', () => {
	carousel.style.setProperty("--posLeft", '0');
	remainingTime = 0.1 * 60;
	stepsForm.year2016.checked = true;
	stepsForm.action1.checked = true;
	countElement.classList.remove("hide");
	warningElement.classList.add("hide");
	btnCopy.classList.remove("hide");
	codInput.classList.remove("notSelectable");
});