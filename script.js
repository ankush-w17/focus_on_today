let prog = 0;
const checkboxes = document.querySelectorAll('.checkbox-input');
const inputTexts = document.querySelectorAll('.text-input');
const inputElements = document.querySelector('#input-elements');
const progress = document.querySelector('.progress');
const progressText = document.querySelector('#progress-text');
const progressFullText = document.querySelector('#progress-full-text');
const noTaskError = document.querySelector('#no-task-error');
const allGoalsError = document.querySelector('#all-goals-error');
inputElements.addEventListener('click', main);
function main(){
  prog = 0;
  let hasInput = true;
  checkboxes.forEach((checkbox, index) => {
    const inputText = document.querySelector(`#text-input-${index + 1}`);
    if (checkbox.checked && !inputText.value) {
      noTaskError.classList.remove("hidden");
    } else if (checkbox.checked && inputText.value) {
      noTaskError.classList.add("hidden");
      prog++;
    } else if (!checkbox.checked && inputText.value) {
      noTaskError.classList.add("hidden");
    }
    if (!inputText.value) {
      hasInput = false;
    }
  });
  if (hasInput === true) {
    allGoalsError.classList.add("hidden");
  }
  updateProgress(prog);
}
function isChecked(checkbox) {
    if (checkbox.checked) {
        return true;
    }
    else {
        return false;
    }
}
function updateProgress(prog) {
    progress.style.width = `${(prog * 100) / 3}%`;
    progressText.textContent = prog;
    if (prog === 0) {
        progressFullText.classList.add('hidden');
    }
    else {
        progressFullText.classList.remove('hidden');
    }
}
let savedData = {
    inputs: [],
    checkboxes:[]
}
function saveData() {
    savedData.checkboxes = [];
    savedData.inputs = [];
    checkboxes.forEach((checkbox, index) => {
        const inputText = document.querySelector(`#text-input-${index + 1}`);
        savedData.inputs.push(inputText.value);
        savedData.checkboxes.push(checkbox.checked);
    })
    localStorage.setItem('savedData', JSON.stringify(savedData));
}
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', saveData);
})
inputTexts.forEach((inputText) => {
    inputText.addEventListener('input', saveData);
})
function loadData() {
    let loadedData = localStorage.getItem('savedData');
    if (loadedData) {
        loadedData = JSON.parse(loadedData);
        checkboxes.forEach((checkbox, index) => {
            const inputText = document.querySelector(`#text-input-${index + 1}`);
            checkbox.checked = loadedData.checkboxes[index];
            inputText.value = loadedData.inputs[index];
        })
    }
    main();
}

window.addEventListener('load', loadData);