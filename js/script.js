// list of variables segmented by form area
const form = document.querySelector('form')

const nameField = document.querySelector('#name');
const nameHint = document.querySelector('#name-hint')

const email = document.querySelector('#email');

const jobRoleSelect = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');

const registerFieldset = document.querySelector('#activities')
let total = document.querySelector('#activities-cost')
const checkBoxes = document.querySelectorAll("input[type=checkbox]")
let newTotal = 0

const sizeSelect = document.querySelector('#size')
const designSelect = document.querySelector('#design')
const colorDiv = document.querySelector('#shirt-colors')
const colorSelect = document.querySelector('#color')
const colorOptions = colorSelect.children

const paymentSelect = document.querySelector('#payment')
const creditCardDiv = document.querySelector('#credit-card')
const cardNumber = document.querySelector('#cc-num')
const zip = document.querySelector('#zip')
const cvv = document.querySelector('#cvv')

const paypal = document.querySelector('#paypal')
const bitcoin = document.querySelector('#bitcoin')


// default setup.  
nameField.focus()
otherJobRole.style.display = 'none'
colorDiv.style.display = 'none'
paymentSelect.value = 'credit-card'
paypal.style.display = 'none'
bitcoin.style.display = 'none'
cardNumber.maxLength = 16
zip.maxLength = 5
cvv.maxLength = 3


// hides and displays otherJobRole textfield depending on jobRole selection
jobRoleSelect.addEventListener('change', e => {
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

        colorSelect.selectedIndex = 0
    } else if (e.target.value === 'heart js') {
        for (let i = 0; i < color.length; i++) {
            if (colorOptions[i].getAttribute('data-theme') === 'heart js') {
                colorOptions[i].style.display = ''
            } else {
                colorOptions[i].style.display = 'none'
            }
        }
        colorSelect.selectedIndex = 0
    } else {
        colorDiv.style.display = 'none'
    }

})

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

// Validation functions: check appropriate fields against regex for accepted user input.  
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
const cardNumberValidator = () => {
    const cardNumberIsValid = /^[0-9]{13,16}$/g.test(cardNumber.value)
    return cardNumberIsValid
}
const zipValidator = () => {
    const zipIsValid = /^\d{5}$/.test(zip.value)
    return zipIsValid
}
const cvvValidator = () => {
    const cvvIsValid = /^\d{3}$/.test(cvv.value)
    return cvvIsValid
}

// isInvalid and isValid change classes and appearance accordingly for accessibility
function isInvalid(element) {
    const parEl = element.parentElement
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

// listens on form submit for all field validations.
form.addEventListener('submit', e => {
    if (!nameValidator()) {
        if (nameField.value.length > 0) {
            nameHint.innerHTML = 'Name cannot contain numbers'
        } else {
            nameHint.innerHTML = 'Name field cannot be left blank'
        }
        isInvalid(nameField)
        e.preventDefault();
    } else {
        isValid(nameField)
    }

    if (!emailValidator()) {
        isInvalid(email)
        e.preventDefault();
    } else {
        isValid(email)
    }

    if (!registerValidator()) {
        const parEl = e.target.parentElement
        parEl.classList.add('not-valid')
        parEl.classList.remove('valid')
        e.preventDefault();
        document.querySelector('#activities-hint').style.display = 'block'
    } else {
        const parEl = e.target.parentElement
        parEl.classList.add('valid')
        parEl.classList.remove('not-valid')
        document.querySelector('#activities-hint').style.display = 'none'
    }

    if (paymentSelect.value === 'credit-card') {
        if (!cardNumberValidator()) {
            isInvalid(cardNumber)
            e.preventDefault();
        } else {
            isValid(cardNumber)
        }
        if (!zipValidator()) {
            isInvalid(zip)
            e.preventDefault();
        } else {
            isValid(zip)
        }
        if (!cvvValidator()) {
            isInvalid(cvv)
            e.preventDefault();
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

// validates nameField on keyup.  Changes nameHint based on error type
nameField.addEventListener('keyup', e => {
    if (!nameValidator()) {
        if (nameField.value.length > 0) {
            nameHint.innerHTML = 'Name cannot contain numbers'
        } else if (nameField.value.length === 0) {
            nameHint.innerHTML = 'Name field cannot be left blank'
        }
        isInvalid(nameField)
    } else {
        isValid(nameField)
    }
})

// validates email on keyup.
email.addEventListener('keyup', e => {
    if (!emailValidator()) {
        isInvalid(email)
    } else {
        isValid(email)
    }
})

// validates register on change.  
registerFieldset.addEventListener('change', e => {
    const clicked = e.target
    const clickedType = e.target.getAttribute('data-day-and-time')

    // disable and style change for ineligable selections, based on time-slot conflict
    for (let i = 0; i < checkBoxes.length; i++) {
        const checkBoxType = checkBoxes[i].getAttribute('data-day-and-time')
        if (checkBoxType === clickedType && checkBoxes[i] !== clicked) {
            if (clicked.checked) {
                checkBoxes[i].disabled = true
                checkBoxes[i].parentElement.style.backgroundColor = 'gray'
            } else {
                checkBoxes[i].disabled = false
                checkBoxes[i].parentElement.style.backgroundColor = ''
            }
        }
    }

    if (!registerValidator()) {
        const parEl = registerFieldset
        parEl.classList.add('not-valid')
        parEl.classList.remove('valid')
        e.preventDefault();
        document.querySelector('#activities-hint').style.display = 'block'
    } else {
        const parEl = registerFieldset
        parEl.classList.add('valid')
        parEl.classList.remove('not-valid')
        document.querySelector('#activities-hint').style.display = 'none'
    }
})

// validates cardNumber on keyup
cardNumber.addEventListener('keyup', e => {
    if (!cardNumberValidator()) {
        isInvalid(cardNumber)
        e.preventDefault();
    } else {
        isValid(cardNumber)
    }
})

// validates zip on keyup
zip.addEventListener('keyup', e => {
    if (!zipValidator()) {
        isInvalid(zip)
        e.preventDefault();
    } else {
        isValid(zip)
    }
})

// validates cvv on keyup
cvv.addEventListener('keyup', e => {
    if (!cvvValidator()) {
        isInvalid(cvv)
        e.preventDefault();
    } else {
        isValid(cvv)
    }
})

