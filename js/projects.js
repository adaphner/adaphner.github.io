//to process and update navigation tabs
document.querySelectorAll('.projects-tab').forEach(subNav => subNav.addEventListener('click', (e) => {
    const subPage = e.target.innerText;
    updateSubPage(subPage, subNav);
}));

//to display the home subPage by default
document.getElementById('default-projects').click();

function updateSubPage(subPage, subNav) {

    document.querySelectorAll('.projects-content').forEach((subPage) => subPage.style.display = 'none');
    document.querySelectorAll('.projects-tab').forEach((subNav) => {
        subNav.style.backgroundColor = '#f5f5f5';
        // subNav.style.borderTop = '1px solid #f5f5f5';
    });

    const showPage = document.getElementById(subPage);
    showPage.style.display = 'flex';
    subNav.style.backgroundColor = '#ffffff';
    // subNav.style.borderTop = '1px solid #204666';
}


//Change background color
function changeBackgroundColor() {
    const bgColor = ['#222222'];
    const rand = Math.floor(Math.random() * bgColor.length);
    return bgColor[rand];
}

// to generate random color palette
function randomColors() {
    let hex = '#';
    const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    for (let i = 0; i < 6; i++) {
        const rand = Math.floor(Math.random() * hexValues.length);
        hex += hexValues[rand];
    }
    return hex;
}

const bgColorButton = document.getElementById('bg-color-button').addEventListener('click', () => {

    //Hex color generator one
    const hexColorOne = randomColors();
    document.getElementById('hex-one').style.backgroundColor = hexColorOne;
    document.getElementById('hex-one-text').innerText = hexColorOne;

    //Hex color generator two
    const hexColorTwo = randomColors();
    document.getElementById('hex-two').style.backgroundColor = hexColorTwo;
    document.getElementById('hex-two-text').innerText = hexColorTwo;

    //Hex color generator three
    const hexColorThree = randomColors();
    document.getElementById('hex-three').style.backgroundColor = hexColorThree;
    document.getElementById('hex-three-text').innerText = hexColorThree;

    //Hex color generator four
    const hexColorFour = randomColors();
    document.getElementById('hex-four').style.backgroundColor = hexColorFour;
    document.getElementById('hex-four-text').innerText = hexColorFour;

    //Hex color generator five
    const hexColorFive = randomColors();
    document.getElementById('hex-five').style.backgroundColor = hexColorFive;
    document.getElementById('hex-five-text').innerText = hexColorFive;

    //Hex color generator six
    const hexColorSix = randomColors();
    document.getElementById('hex-six').style.backgroundColor = hexColorSix;
    document.getElementById('hex-six-text').innerText = hexColorSix;

});


//Calculator function
function Calculator(output) {
    let outputValues = output;

    let currentValue = '';
    let temp = '';
    let operation = null;

    return {
        appendNumber(input) {
            if (currentValue.length === 26) return;
            if (input === '±') return;
            if (input === '.' && currentValue.includes('.')) return;
            currentValue += input;
        },
        updateDisplay() {
            if (currentValue === undefined || isNaN(currentValue) || temp === undefined) return;
            outputValues.innerText = currentValue;
            if (operation) {
                outputValues.innerText = `${temp} ${operation} ${currentValue}`
            }
            if (!currentValue && !temp) outputValues.innerText = 0;
        },
        chooseOperation(input) {
            if (!currentValue) return;
            if (temp) this.compute();
            operation = input;
            temp = currentValue;
            currentValue = '';
        },
        compute() {
            if (!currentValue || !temp) return;
            let floatOne = parseFloat(temp);
            let floatTwo = parseFloat(currentValue);
            let result;

            switch (operation) {
                case '+':
                    result = floatOne + floatTwo;
                    break;
                case '-':
                    result = floatOne - floatTwo;
                    break;
                case '×':
                    result = floatOne * floatTwo;
                    break;
                case '÷':
                    result = floatOne / floatTwo;
                    break;
                case '%':
                    result = floatOne % floatTwo;
                    break;
            }
            currentValue = result.toString();
            temp = '';
            operation = null
        },
        clear() {
            currentValue = '';
            temp = '';
            operation = null;
        },
        delete() {
            currentValue = currentValue.slice(0, -1);
        }
    }
}

function calculatorDriver() {

    const calculator = Calculator(document.getElementById('calculator-total'));

    document.querySelectorAll('.buttons').forEach((button) => button.addEventListener('click', e => {
        const val = e.target.innerText;
        calculator.appendNumber(val);
        calculator.updateDisplay();
    }));

    document.querySelectorAll('.btn-operation').forEach((btn) => btn.addEventListener('click', e => {
        const val = e.target.innerText;
        calculator.chooseOperation(val);
        calculator.updateDisplay();
    }));

    document.getElementById('clear-btn').addEventListener('click', () => {
        calculator.clear();
        calculator.updateDisplay();
    });
    document.getElementById('delete-btn').addEventListener('click', () => {
        calculator.delete();
        calculator.updateDisplay();
    });
    document.getElementById('equal-btn').addEventListener('click', () => {
        calculator.compute();
        calculator.updateDisplay();
    });
}
calculatorDriver();

//to display time

function displayTime() {
    // const days = ["SUN", "MON", "TUES", "WED", "THU", "FRI", "SAT"];
    setInterval(() => {
        let date = new Date();
        // document.getElementById("timer").innerText = days[date.getDay()] + " " + date.toLocaleTimeString();
        document.getElementById("timer").innerText = date.toLocaleTimeString();
    }, 1000);
};
displayTime();

// counter App
function counterApp() {
    let counter = 0;

    document.getElementById("btn-increment").addEventListener("click", (e) => {
        console.log(e);
        counter++;
        let increaseCounter = document.getElementById("count");
        increaseCounter.innerText = counter;
    });

    document.getElementById("btn-reset").addEventListener("click", () => {
        counter = 0;
        let resetCounter = document.getElementById("count");
        resetCounter.innerText = counter;
    });
}
counterApp();


//Change the light bulb on mouse over and mouse leave
const lightBulb = document.getElementById("dyk-lb");
lightBulb.addEventListener("mouseover", () => lightBulb.setAttribute("src", "images/lb-on.png"));
lightBulb.addEventListener("mouseleave", () => lightBulb.setAttribute("src", "images/lbg.png"));

//to fetch random funfacts
function getFunFacts() {
    fetch("/files/funfacts.json")
        .then(response => response.json())
        .then(fact => {
            let displayFunFact = document.getElementById("fun-fact");
            let randomFact = Math.floor(Math.random() * fact.length);

            displayFunFact.innerText = `${fact[randomFact].funfact.toUpperCase()}`;
        })
        .catch((err) => console.log("Something went wrong. " + err));
};
getFunFacts();
setInterval(getFunFacts, 60000);

document.getElementById("dyk-lb").addEventListener("click", () => getFunFacts());

//to fetch JS Q&A - sequencial order
let index = 0;

function updateOutput(question, answer) {
    document.getElementById("question").innerText = question;
    document.getElementById("answer").innerText = answer;
}

const question = document.getElementById("question-btn");
question.addEventListener("click", () => {
    fetch("/files/jsquestions.json")
        .then(resp => resp.json())
        .then(data => {
            if (index < data.length && index > 0) {
                prevQuestionBtn.style.backgroundColor = "#478e91";
                updateOutput(`${data[index].question}`, `${data[index].answer}`);
                index++;
            }
            else {
                index = 0;
                updateOutput(`${data[index].question}`, `${data[index].answer}`);
                index++;
            }
        })
        .catch((err) => console.log("Something went wrong. " + err));
});
question.click();



//to fetch previous JS Q&A
const prevQuestionBtn = document.getElementById("prev-question-btn");
prevQuestionBtn.addEventListener("click", () => {
    fetch("/files/jsquestions.json")
        .then(resp => resp.json())
        .then(data => {
            if (index > 1) {
                index--;
                updateOutput(`${data[index - 1].question}`, `${data[index - 1].answer}`);
            }
            else {
                index--;
                updateOutput(`${data[index].question}`, `${data[index].answer}`);
                index++;
                prevQuestionBtn.style.backgroundColor = "#b83143";
            }
        })
        .catch((err) => console.log("Something went wrong. Try again later." + err));
});


//to fetch random quotes
function getQuotes() {
    fetch("/files/quotes.json")
        .then(response => response.json())
        .then(data => {
            let random = Math.floor(Math.random() * data.length);
            document.getElementById("p-quote").innerHTML = `<q> ${data[random].quote.toUpperCase()} </q>`;
            document.getElementById("p-author").innerText = `${data[random].author}`;
        })
        .catch((err) => console.log("Something went wrong. " + err));
}
getQuotes();
setInterval(getQuotes, 100000);

document.getElementById("quote-btn").addEventListener("click", () => getQuotes());
