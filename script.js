//HTML reference
const $container = document.getElementById('container')

//Internal variables
const radioButtonTemplate = `<div class='radio-item'><input type='radio'><label></label></div>`

//Question/Answer data
const questionSet = [
    `How do you access an HTML element using its id attribute with JavaScript?`,
    `What is the best practice for assigning event listeners in JavaScript?`
]

const answerSet = [
    [
        `getElementById()`,
        `getAttributeById()`,
        `targetById()`
    ],
    [
        `onclick HTML attrbute`,
        `addEventListener()`,
        `assignEvent()`
    ]
]

const solutionSet = [
    0,
    1
]

function showAnswers(questionNumber, $form, answer) {

    for (let $input of $form.children) {
        if (parseInt($input.children[0].value) === solutionSet[questionNumber]) {
            $input.setAttribute('style', `
            color: green;
            `)
            //leave this out at first, only set colours first
            if (solutionSet[questionNumber] === answer) {
                $input.innerHTML += '<span> Great job!</span>'
            }
        }
        else {
            $input.setAttribute('style', `
            color: red;
            `)
            if (parseInt($input.children[0].value) === answer) {
                $input.innerHTML += '<span> Incorrect :(</span>'
            }
        }
    }
}

function generateMultipleChoiceTemplate(numberOfAnswers) {
    let newElements = []

    newElements.push(`<div id='form-container'><h1></h1><p></p><form>`)
    for (let i = 0; i < numberOfAnswers; i++) {
        newElements.push(radioButtonTemplate)
    }
    newElements.push(`<div><button type='submit'>OK</button><div></form></div>`)
    
    return newElements.join('')
}

function setMultipleChoiceFeatures(questionNumber, question, answers) {
    
    document.querySelector('h1').textContent = `Question ${questionNumber + 1}`
    document.querySelector('p').textContent = question
    let answerCounter = 0
    
    const $form = document.querySelector('form')
    for (let $input of $form.children) {
        if ($input.classList.contains('radio-item')) {
            $input.children[0].setAttribute('value', answerCounter)
            $input.children[0].setAttribute('name', 'answer')
            $input.children[1].textContent += answers[answerCounter]            
        }
        answerCounter++
    }
    
    $form.addEventListener('submit', function (event) {
        event.preventDefault()

        if ($form.elements['answer'].value && answered === false) {
            answered = true
            //start with just the showAnswers() call
            showAnswers(questionNumber, $form, parseInt($form.elements['answer'].value))
        }  
    })
}

function generateQuestionPage(questionNumber) {
    $container.innerHTML = generateMultipleChoiceTemplate(answerSet[questionNumber].length)
    setMultipleChoiceFeatures(questionNumber, questionSet[questionNumber], answerSet[questionNumber])
}

let questionNumber = 0
let answered = false
generateQuestionPage(questionNumber)