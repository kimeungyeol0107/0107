const buttonContainer = document.getElementById('button-container');
const startBtn = document.getElementById('start-btn');
const result = document.getElementById('result');
const instruction = document.getElementById('instruction');

let currentLevel = 1;
let timeout;

const levels = [
    { timeLimit: 4000, colors: ['red'] },
    { timeLimit: 3000, colors: ['red'] },
    { timeLimit: 2000, colors: ['red'] },
    { timeLimit: 1500, colors: ['red'] },
    { timeLimit: 1000, colors: ['red'] },
    { timeLimit: 400, colors: ['red', 'blue', 'green'] },
];

function createButton(color) {
    const button = document.createElement('button');
    button.style.backgroundColor = color;
    button.style.left = `${Math.random() * 320}px`;
    button.style.top = `${Math.random() * 350}px`;
    button.textContent = color === 'red' ? 'Click!' : '';
    button.onclick = handleSuccess;
    buttonContainer.appendChild(button);
    return button;
}

function startGame() {
    currentLevel = 1;
    startBtn.style.display = 'none';
    nextLevel();
}

function nextLevel() {
    if (currentLevel > levels.length) {
        result.textContent = '축하합니다! 모든 단계를 클리어했습니다!';
        startBtn.style.display = 'block';
        return;
    }

    const { timeLimit, colors } = levels[currentLevel - 1];
    instruction.textContent = `단계 ${currentLevel}: ${timeLimit / 1000}초 안에 버튼 클릭!`;

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const button = createButton(randomColor);

    button.style.display = 'block';

    timeout = setTimeout(() => {
        button.style.display = 'none';
        result.textContent = `실패했습니다! 단계 ${currentLevel}에서 게임 종료!`;
        startBtn.style.display = 'block';
    }, timeLimit);
}

function handleSuccess() {
    clearTimeout(timeout);
    result.textContent = `단계 ${currentLevel} 성공!`;
    currentLevel++;
    buttonContainer.innerHTML = '';
    setTimeout(nextLevel, 1000);
}

startBtn.addEventListener('click', startGame);
