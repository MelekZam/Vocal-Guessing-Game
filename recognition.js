window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
let msg = new SpeechSynthesisUtterance('Hello');
window.speechSynthesis.speak(msg);
recognition.interimResults = true;
let total;
let valueToGuess;
let maxValueChosen;
let result;

setTimeout( () => {
    document.querySelector('img').setAttribute('src','images/robot1.svg');
    say('Choose a difficulty');
},1500);

const startBtn = document.getElementById('start');
startBtn.addEventListener('click',startGame);

function startGame(){
    total = 0;
    valueToGuess = Math.floor((Math.random() * valueToGuess) + 1);
    maxValueChosen = document.getElementById('number-range').value;
    document.querySelector('img').setAttribute('src','images/robot3.svg');
    say('I am Listening');
    recognition.start();
}

recognition.addEventListener('result', e => {
    result = e.results[0][0].transcript;
    if (isNaN(result)){
        document.querySelector('img').setAttribute('src','images/robot4.svg');
        say('Please guess a number');
        recognition.start();
    }
    else {
        total +=1;
        if (result == valueToGuess){
            document.querySelector('img').setAttribute('src','images/robot7.svg');
            say('Congratulations you win');
        }
        else if (total< 5){
            if (Number(result)<valueToGuess){
                document.querySelector('img').setAttribute('src','images/robot5.svg');
                say('Go higher');
            }
            
            else{
                document.querySelector('img').setAttribute('src','images/robot6.svg');
                say('Go lower');
            }
            recognition.start();
        }
        else if (total >=5){
            document.querySelector('img').setAttribute('src','images/robot8.svg');
            say('Ha Ha Ha Ha Ha Ha you have lost');
        }
    }
});

function showVal(val){
    document.querySelector('label').textContent = `You will guess a number between 1 and ${val}`;
    valueToGuess = Number(document.getElementById('number-range').value);
}

function setRangeValue(){
    document.getElementById('number-range').value = '100';
}

function say(something){
    msg = new SpeechSynthesisUtterance(something);
            window.speechSynthesis.speak(msg);
}