import { TASKS, SIMBOLS, OPERATIONS } from "./const";


const mainDiv = document.getElementById('app');
const gameDiv = document.getElementById('game');
const enterBtn = document.getElementById('enter1');
const logo = document.getElementById('logo');
let score = 0;
let interval = 15;

const image = document.createElement('img');

const createKeyboard = () => {
    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    keyboard.id = 'keyboard';

    const keyboardHTML = SIMBOLS.reduce((acc, curr) => {
        return acc + `<button class = "button-primary keyboard-button" id = "${curr}">${curr}</button>`    
    }, '')

    keyboard.innerHTML = keyboardHTML;
    return keyboard;
}

const generateTask = () => {
    const operation = OPERATIONS[Math.floor(Math.random() * OPERATIONS.length)];
    let problem = [];

    // plus
    if (operation == "+") {
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
        problem.push(`${x} + ${y}`);
        problem.push(x + y);
    }

    //minus
    if (operation == "-") {
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);
        problem.push(`${x} - ${y}`);
        problem.push(x - y);
    }

    //multiply 
    if (operation == "*") {
        const x = Math.floor(Math.random() * 20);
        const y = Math.floor(Math.random() * 10);
        problem.push(`${x} * ${y}`);
        problem.push(x * y);
    }

    //division
    if (operation == "/") {
        const x = Math.floor(Math.random() * 20);
        const y = Math.floor(Math.random() * 10) + 1;
        problem.push(`${x * y} / ${y}`);
        problem.push(x);
    }

    //power
    if (operation == "^") {
        const x = Math.floor(Math.random() * 5 + 1);
        const y = Math.floor(Math.random() * 5 + 1);
        problem.push(`${x} ^ ${y}`);
        problem.push(x ** y);
    }


    console.log(problem);
    return problem;
}

const lose = () => {
    gameDiv.innerHTML = '';
    console.log("You lose!")
    const restartDiv = document.createElement('button');
    restartDiv.classList.add("button-primary");
    restartDiv.innerHTML = "Restart!";

    logo.classList.remove("logosm");
    logo.classList.add("logo");

    const youLose = document.createElement('p');
    youLose.innerHTML = "You lose! Try to think better and faster!"
    youLose.classList.add('lose');
    gameDiv.appendChild(youLose);
    gameDiv.appendChild(restartDiv);

    restartDiv.addEventListener('click', () => {
        youLose.remove();
        restartDiv.addEventListener('click', startGame())
    });

}


export const startGame = () => {

    gameDiv.innerHTML = '';

    logo.classList.remove("logo");
    logo.classList.add("logosm");

    const enemyDiv = document.createElement('div');
    enemyDiv.classList.add("enemy");

    const image = document.createElement('img');
    image.src = "images/skeleton.png";
    image.classList.add('image');

    const timer = document.createElement('div');
    timer.classList.add("timer");

    const timerBar = document.createElement('div');
    timerBar.classList.add("timerBar");

    const task = generateTask();
    const problem = task[0];
    const solution = task[1].toString();

    const scoreDiv = document.createElement('div');
    scoreDiv.classList.add("score");
    scoreDiv.innerHTML = `Your score: ${score}`;

    const problemDiv = document.createElement('div');
    problemDiv.classList.add("problem");
    problemDiv.innerHTML = problem;

    const keyboardDiv = createKeyboard();
    
    const playDiv = document.createElement('div');
    playDiv.classList.add("playDiv");

    const attackDiv = document.createElement('div');
    attackDiv.classList.add("attack");
    attackDiv.innerHTML = "Attack!";

    const answerDiv = document.createElement('div');
    answerDiv.classList.add("answer");
    answerDiv.innerHTML = "Answer";

    const clearDiv = document.createElement('div');
    clearDiv.classList.add("clear");
    clearDiv.innerHTML = "Clear";

    clearDiv.addEventListener('click', () => {
        answerDiv.innerHTML = "Answer";
    })

    attackDiv.addEventListener('click', () => {
        if (answerDiv.innerHTML == solution) {
            console.log("OK");
            clearInterval(countDown);
            score += 1;
            image.src= "images/sword.png";
            setTimeout(startGame, 1000);
        } else {
            console.log("NOT OK", answerDiv.innerHTML, solution);
            score = 0;
            clearInterval(countDown);
            lose();
        }
        
    })

    keyboardDiv.addEventListener('click', (event) => {
        console.log(event.target.id);
        if (answerDiv.innerHTML == 'Answer' && event.target.id != 'keyboard') {
            answerDiv.innerHTML = '';
        }
        if (event.target.id != 'keyboard') {
            answerDiv.innerHTML += event.target.id;
        }

    })

    window.addEventListener('keydown', (event) => {
        if (event.key == 'Backspace') {
            answerDiv.innerHTML = 'Answer';
        }
        if (!(isNaN(event.key)) ||  event.key == "-") {
            if (answerDiv.innerHTML == 'Answer') {
                answerDiv.innerHTML = '';
            }
            answerDiv.innerHTML += event.key;
        }
        console.log(event.key);
    })

    gameDiv.appendChild(scoreDiv);
    gameDiv.appendChild(enemyDiv);
    enemyDiv.appendChild(image);
    enemyDiv.appendChild(timer);
    timer.appendChild(timerBar);
    gameDiv.appendChild(problemDiv);
    gameDiv.appendChild(playDiv);
    playDiv.appendChild(attackDiv);
    playDiv.appendChild(answerDiv);
    playDiv.appendChild(clearDiv);
    gameDiv.appendChild(keyboardDiv);

    interval = 15;
    let countDown = setInterval(() => {
        interval--;
        
        let timerBarHeight = (15 - interval) / 15 * 100;
        if (interval > 0) {
            if (interval <= 10 && interval > 5) {
                timer.style.backgroundColor = "#F4D160";
            } else if (interval <= 5) {
                timer.style.backgroundColor = "#F31559";
            }
            timerBar.style.height = timerBarHeight + "%";
        } else {
            clearInterval(countDown);
            lose();
        }

        // console.log(interval);
    }, 1000)
}

