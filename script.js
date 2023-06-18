let currentStep = 0
const formSteps = document.querySelectorAll('.form-step')
const form = document.querySelector('form');

// Steps 
form.addEventListener('click', (e) => {
    if(!e.target.matches('[data-action]')){
        return
    }

    const actions = {
        next() {
                if(!isValidInputs()){
                    return
                }
                currentStep++
        },
        prev() {
                currentStep--
            }
        }
    const action = e.target.dataset.action
    actions[action]()

    // console.log(currentStep)
    updateActiveStep()
    updateProgressStep()
})

// add event listner to keyboard enter
const handleFormSubmit = (e) => {
    if(e.keyCode === 13) {
        e.preventDefault()
        var button = document.querySelector('.form .btn-secondary')
        button.click() 
    }
}
// Envio do formulario e tratamento de dados
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(form)

    // for (let [key, value] of data) {
    //     console.log(key, value)
    // }

    alert(`Obrigado ${data.get('name')}!`)
})

// update steps

function updateActiveStep() {
    formSteps.forEach(step => {
        step.classList.remove('active')
        // console.log(currentStep)
        formSteps[currentStep].classList.add('active')
    })
}

// atualizar bolinhas
const progressStep = document.querySelectorAll('.step-progress [data-step]')
function updateProgressStep() {
    progressStep.forEach((step, idx) => {
        step.classList.remove('active')
        step.classList.remove('done')

        if(idx < currentStep + 1){
            step.classList.add('active')
        }

        if(idx < currentStep) {
            step.classList.add('done')
        }
    })
    // console.log(progressStep)
}


// validation

function isValidInputs() {
    const currentFormStep = formSteps[currentStep]
    const formFields = [...currentFormStep.querySelectorAll('input'), ...currentFormStep.querySelectorAll('textarea')]
    
    return formFields.every((input) => input.reportValidity())
}

// animation

formSteps.forEach(formStep => {
    function addHide(){
        formStep.classList.add('hide')
    }

    formStep.addEventListener('animationend', () => {
        addHide()
        formSteps[currentStep].classList.remove('hide')
    })
})