let prog = 0;
const checkboxes = document.querySelectorAll('.checkbox-input');
const inputElements = document.querySelector('#input-elements');
const progress = document.querySelector('.progress');
const progressText = document.querySelector('#progress-text');
const progressFullText = document.querySelector('#progress-full-text');
const noTaskError = document.querySelector('#no-task-error');
const allGoalsError = document.querySelector('#all-goals-error');
inputElements.addEventListener('click', () => {
    prog = 0;
    let hasInput = true;
    checkboxes.forEach((checkbox, index) => {
        const inputText = document.querySelector(`#text-input-${index + 1}`);
        if (checkbox.checked && !inputText.value) {
            noTaskError.classList.remove('hidden');
        }
        else if (checkbox.checked && inputText.value) {
            noTaskError.classList.add('hidden');
            prog++;
        }
        else {
            noTaskError.classList.add('hidden');
            
        }
        if (!inputText.value) {
            hasInput = false;
        }
    });
    if (hasInput === true) {
        allGoalsError.classList.add('hidden');
    }
    updateProgress(prog);
})
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
