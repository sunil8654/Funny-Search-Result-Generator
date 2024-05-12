// SELECTORS
let buttonSelector = document.querySelector('#button');
let inputSelector = document.querySelector('#input');
let answerSelector = document.querySelector('#answer');
let errorSelector = document.querySelector('#error');

// API
let APIlink = 'https://yesno.wtf/api';

// FLAGS
let isRequestInProgress = false;

let setIsRequestInProgress = value => {
    isRequestInProgress = value;
};

let setDisableButtonState = isDisabling => {
    if (isDisabling) {
        buttonSelector.setAttribute('disabled', 'disabled');
    } else {
        buttonSelector.removeAttribute('disabled');
    }
};

let cleanupResponse = () => {
    setTimeout(() => {
        answerSelector.innerHTML = '';
        inputSelector.value = '';
        setIsRequestInProgress(false);
        setDisableButtonState(false);
    },5000 );
};

let showAnswer = answer => {
    setTimeout(() => {
        answerSelector.innerHTML = `<img src=\"${answer}\" width=\"800px\" height=\"500px\">`;
        cleanupResponse();
    },1000 );
};

let fetchAnswer = () => {
    setIsRequestInProgress(true);

    setDisableButtonState(true);

    fetch(APIlink)
        .then(data => data.json())
        .then(data => showAnswer(data.image));
};

let showError = () => {
    errorSelector.innerHTML = 'Write Something First...';

    setTimeout(() => {
        errorSelector.innerHTML = '';
    }, 2000);
};

let getAnswer = () => {
    if (isRequestInProgress) return;
    if (!inputSelector.value) return showError();

    fetchAnswer();
};

let handleKeyEnter = e => {
    if (e.keyCode === 13) {
        getAnswer();
    }
};

buttonSelector.addEventListener('click', getAnswer);


