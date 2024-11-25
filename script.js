const buttonContainer = document.getElementById('button-container');
const startBtn = document.getElementById('start-btn');
const result = document.getElementById('result');
const instruction = document.getElementById('instruction');

let currentLevel = 1;
let timeout;
let countdownInterval;

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
    button.style.position = 'absolute';
    button.style.left = `${Math.random() * 320}px`;
    button.style.top = `${Math.random() * 350}px`;
    button.textContent = '클릭!';
    button.onclick = handleSuccess;
    buttonContainer.appendChild(button);
    return button;
}

function startGame() {
    currentLevel = 1;
    startBtn.style.display = 'none';
    result.textContent = '';
    instruction.textContent = '게임이 시작됩니다!';
    setTimeout(() => nextLevel(), 1000); // 1초 후 첫 라운드 시작
}

function nextLevel() {
    if (currentLevel > levels.length) {
        result.textContent = '축하합니다! 모든 단계를 클리어했습니다!';
        startBtn.style.display = 'block';
        return;
    }

    const { timeLimit, colors } = levels[currentLevel - 1];
    startCountdown(3, () => {
        instruction.textContent = `단계 ${currentLevel}: ${timeLimit / 1000}초 안에 버튼 클릭!`;
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const button = createButton(randomColor);

        button.style.display = 'block';

        timeout = setTimeout(() => {
            button.style.display = 'none';
            result.textContent = `실패했습니다! 단계 ${currentLevel}에서 게임 종료!`;
            startBtn.style.display = 'block';
        }, timeLimit);
    });
}

function startCountdown(seconds, callback) {
    let count = seconds;
    instruction.textContent = `다음 라운드 시작까지 ${count}초 남음...`;
    countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            instruction.textContent = `다음 라운드 시작까지 ${count}초 남음...`;
        } else {
            clearInterval(countdownInterval);
            callback();
        }
    }, 1000);
}

function handleSuccess() {
    clearTimeout(timeout);
    result.textContent = `단계 ${currentLevel} 성공!`;
    currentLevel++;
    buttonContainer.innerHTML = '';
    setTimeout(nextLevel, 1000); // 성공 후 1초 대기
}

startBtn.addEventListener('click', startGame);
