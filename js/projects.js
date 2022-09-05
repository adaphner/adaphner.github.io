//to process and update navigation tabs
document.querySelectorAll('.projects-tab').forEach(subNav => subNav.addEventListener('click', (e) => {
    const subPage = e.target.innerText;
    updateSubPage(subPage, subNav);
}));

//to display Basics subPage by default
document.getElementById('default-projects').click();

function updateSubPage(subPage, subNav) {

    document.querySelectorAll('.projects-content').forEach((subPage) => subPage.style.display = 'none');
    document.querySelectorAll('.projects-tab').forEach((subNav) => {
        subNav.style.backgroundColor = '#ffffff';
        subNav.style.borderBottom = '1px solid #ffffff';
    });

    const showPage = document.getElementById(subPage);
    showPage.style.display = 'flex';
    subNav.style.borderBottom = '1px solid #204666';
}

//to initialize background color and display initial hex values
function displayInitialColors() {
    const bgColor = ['#35788C', '#6398AA', '#5E8379', '#79A1C7', '#204666', '#3F6B9B'];

    const hexData = document.querySelectorAll('.hex-number');

    hexData.forEach((el, index) => {
        const initialColor = bgColor[index];
        el.parentElement.style.backgroundColor = initialColor;
        el.innerText = initialColor;
    });
}
displayInitialColors();

// to generate random hex color values
function randomColors() {
    let hex = '#';
    const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
    for (let i = 0; i < 6; i++) {
        const rand = Math.floor(Math.random() * hexValues.length);
        hex += hexValues[rand];
    }
    return hex;
}

// to display new hex values when button is clicked
document.getElementById('bg-color-button').addEventListener('click', () => {

    const hexData = document.querySelectorAll('.hex-number');

    hexData.forEach(el => {
        const hexColor = randomColors();
        el.parentElement.style.backgroundColor = hexColor;
        el.innerText = hexColor;
    });
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
            displayFunFact.innerText = `${fact[randomFact].funfact}`;
        })
        .catch((err) => console.log("Something went wrong." + err));
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
