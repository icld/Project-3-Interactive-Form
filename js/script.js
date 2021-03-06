

const nameField = document.querySelector('#name');
const email = document.querySelector('#email');
const jobRoleSelect = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');
const sizeSelect = document.querySelector('#size')
const designSelect = document.querySelector('#design')
const colorDiv = document.querySelector('#shirt-colors')
const colorSelect = document.querySelector('#color')
const colorOptions = colorSelect.children

// default setup.  focus with nameField. otherJobRole hidden. colorDiv hidden
nameField.focus()
otherJobRole.style.display = 'none'
colorDiv.style.display = 'none'


// hides and displays otherJobRole textfield depending on jobRole selection
jobRoleSelect.addEventListener('change', e => {
    // const optionOther = document.querySelector('#')  
    if (e.target.value === 'other') {
        otherJobRole.style.display = ''
    } else {
        otherJobRole.style.display = 'none'
    }
})

// Listens on designSelect.  Based on selection, displays colorSelect with approriate shirt options
designSelect.addEventListener('change', e => {
    colorDiv.style.display = ''
    if (e.target.value === 'js puns') {
        for (let i = 0; i < color.length; i++) {
            if (colorOptions[i].getAttribute('data-theme') === 'js puns') {
                colorOptions[i].style.display = ''
            } else {
                colorOptions[i].style.display = 'none'
            }
        }
    } else if (e.target.value === 'heart js') {
        for (let i = 0; i < color.length; i++) {
            if (colorOptions[i].getAttribute('data-theme') === 'heart js') {
                colorOptions[i].style.display = ''
            } else {
                colorOptions[i].style.display = 'none'
            }
        }
    } else {
        colorDiv.style.display = 'none'
    }

})

// variables for Register for Activites fieldset to be used in event listener below . 
const registerFieldset = document.querySelector('#activities')
let total = document.querySelector('#activities-cost')
const checkBoxes = document.querySelectorAll("input[type=checkbox]")
let newTotal = 0

// listens on fieldset for changes.  adds itemCost to total
registerFieldset.addEventListener('change', e => {
    const itemCost = parseInt(e.target.getAttribute('data-cost'))

    // could be written like this: (e.target.checked) ? newTotal += itemCost : newTotal -= itemCost
    if (e.target.checked) {
        newTotal += itemCost
    } else {
        newTotal -= itemCost;
    }
    total.innerHTML = `Total: $${newTotal}`
})

// variables for Payment Info Fieldset 
const paymentSelect = document.querySelector('#payment')
const creditCardDiv = document.querySelector('#credit-card')
const paypal = document.querySelector('#paypal')
const bitcoin = document.querySelector('#bitcoin')
paymentSelect.value = 'credit-card'
paypal.style.display = 'none'
bitcoin.style.display = 'none'

// displays payment options based on paymentSelect state
paymentSelect.addEventListener('change', e => {
    const targ = e.target.value
    if (targ === 'paypal') {
        creditCardDiv.style.display = 'none'
        paypal.style.display = ''
        bitcoin.style.display = 'none'
    } else if (targ === 'bitcoin') {
        creditCardDiv.style.display = 'none'
        paypal.style.display = 'none'
        bitcoin.style.display = ''
    } else {
        creditCardDiv.style.display = ''
        paypal.style.display = 'none'
        bitcoin.style.display = 'none'
    }
})

const nameValidator = () => {
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(nameField.value)
    return nameIsValid
}

const emailValidator = () => {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    return emailIsValid
}

const registerValidator = () => {
    const registerIsValid = newTotal > 0
    return registerIsValid
}

const cardNumber = document.querySelector('#cc-num')
const zip = document.querySelector('#zip')
const cvv = document.querySelector('#cvv')

const cardNumberValidator = () => {
    const cardNumberIsValid = /\d{13,16}/.test(cardNumber.value)
    return cardNumberIsValid
}
const zipValidator = () => {
    const zipIsValid = /\d{5}/.test(zip.value)
    return zipIsValid
}
const cvvValidator = () => {
    const cvvIsValid = /\d{3}/.test(cvv.value)
    return cvvIsValid
}



const form = document.querySelector('form')
// listens on form submit for all field validations.
form.addEventListener('submit', e => {

    function isInvalid(element) {
        const parEl = element.parentElement
        e.preventDefault();
        parEl.classList.add('not-valid')
        parEl.classList.remove('valid')
        parEl.lastElementChild.style.display = 'block'
    }
    function isValid(element) {
        const parEl = element.parentElement
        parEl.classList.add('valid')
        parEl.classList.remove('not-valid')
        parEl.lastElementChild.style.display = 'none'
    }
    if (!nameValidator()) {
        isInvalid(nameField)
    } else {
        isValid(nameField)
    }

    if (!emailValidator()) {
        isInvalid(email)
    } else {
        isValid(email)
    }
    if (!registerValidator()) {
        isInvalid(registerFieldset)
        document.querySelector('#activities-hint').style.display = 'block'
    } else {
        isValid(registerFieldset)
        document.querySelector('#activities-hint').style.display = 'none'
    }

    if (paymentSelect.value === 'credit-card') {
        console.log('cc selected')
        if (!cardNumberValidator()) {
            isInvalid(cardNumber)
        } else {
            isValid(cardNumber)
        }
        if (!zipValidator()) {
            isInvalid(zip)
        } else {
            isValid(zip)
        }
        if (!cvvValidator()) {
            isInvalid(cvv)
        } else {
            isValid(cvv)
        }
    }
})
// adds and removes .focus class for checkbox parents for increased accessibility
checkBoxes.forEach(e => {
    e.addEventListener('focus', e => {
        e.target.parentElement.classList.add('focus')
    })
    e.addEventListener('blur', e => {
        const active = document.querySelector('.focus')
        if (active) {
            active.classList.remove('focus')
        }
    })

});