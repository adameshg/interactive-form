const form = document.querySelector('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const jobSelectElement = document.getElementById('title');
const jobOptionElements = document.querySelectorAll('#title option');
const jobOptionOther = document.getElementById('other-job-role');
const colorSelectElement = document.getElementById('color');
const colorOptionElements = document.querySelectorAll('#color option')
const designSelectElement = document.getElementById('design');
const designOptionElements = document.querySelectorAll('#design option');
const jsPuns = document.querySelectorAll('[data-theme="js puns"]');
const heartJs = document.querySelectorAll('[data-theme="heart js"]');
const activities = document.getElementById('activities');
const price = document.querySelectorAll('[data-cost]');
const cost = document.getElementById('activities-cost');
let totalPrice = 0;
let totalActivities = 0;
const paymentSelectElement = document.getElementById('payment');
const paymentOptionElements = document.querySelectorAll('#payment option');
const creditcardOption = document.querySelector('[value="credit-card"]');
const creditcard = document.getElementById('credit-card');
const paypal = document.getElementById('paypal');
const bitcoin = document.getElementById('bitcoin');

// Sets default focus to 'name' input box
name.focus();

// Hides 'Other job role' textbox by default
jobOptionOther.classList.add('hidden');

/* Displays 'Other job role' textbox when 'Other' option is selected and
hides it when it isn't selected */
jobSelectElement.addEventListener('change', e => {
    if (e.target.value === 'other') {
        jobOptionOther.classList.remove('hidden');
        jobOptionOther.value = '';
        
    } else {
        jobOptionOther.classList.add('hidden');
    }
})

// Disables 'Color' select option by default
colorSelectElement.disabled = true;

// Helper function to show/hide corresponding 'Design'/'Color' options
function showColor(e, show, hide) {
    show.forEach(color => {
        if (e.target.value === color.getAttribute('data-theme')) {
            colorSelectElement.disabled = false;
            hide.forEach(design => {
                design.classList.add('hidden');
            })
            show.forEach(design => {
                design.classList.remove('hidden');
            })
        }
    })
}

/* Tests that the value of the selected design option matches data-theme 
attribute of corresponding color options */
designSelectElement.addEventListener('change', e => {
    if (e.target.value === 'js puns') {
        showColor(e, jsPuns, heartJs);
    } else if (e.target.value === 'heart js') {
        showColor(e, heartJs, jsPuns);
    }
})

/* Adds/subtracts price of checked/unchecked activity to total and
displays total */
activities.addEventListener('change', e => {
    const activityLabels = document.getElementById('activities-box').children;
    const selectedActivityTime = e.target.getAttribute('data-day-and-time');
    const allActivityTimes = document.querySelectorAll('[data-day-and-time]');
    if (e.target.checked) {
        totalPrice += parseInt(e.target.getAttribute('data-cost'));
    } else {
        totalPrice -= parseInt(e.target.getAttribute('data-cost'));
    }
    cost.innerHTML = `Total: $${totalPrice}`;
    
    /* TODO: Set document.querySelector('[name="INSERT NAME"]').disabled = true
    and the parent label's class to '.disabled' if times overlap */
    // for (let i = 0; i < activityLabels.length; i++) {
    //     if (activityLabels[i].children[2].innerHTML === selectedActivityTime) {
    //         console.log(true);
    //     }
    // }

    // console.log(e.target.getAttribute('data-day-and-time'));
})

// Sets default payment to 'Credit Card'
creditcardOption.selected = true;

// Hides PayPal payment instructions by default
paypal.classList.add('hidden');

// Hides bitcoin payment instructions by default
bitcoin.classList.add('hidden');

// Helper function to show/hide corresponding payment method
function showPayment (e, str, payment1, payment2, payment3) {
    if (e.target.value === str) {
        payment1.classList.remove('hidden');
        payment2.classList.add('hidden');
        payment3.classList.add('hidden');
    }
}

/* Displays/hides payment input/instructions depending on corresponding
payment method option */
paymentSelectElement.addEventListener('change', e => {
    showPayment(e, 'paypal', paypal, creditcard, bitcoin);
    showPayment(e, 'bitcoin', bitcoin, creditcard, paypal);
    showPayment(e, 'credit-card', creditcard, paypal, bitcoin);
})

// Adds visual hint that input was valid
function validationPass(element) {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
}

// Adds visual hint that input was invalid
function validationFail(element) {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.classList.remove('hint');
}

// Validates name input
function nameValidator() {
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name.value);
    if (nameIsValid) {
        validationPass(name);
    } else {
        validationFail(name);
    }
    return nameIsValid;
}

// Validates email input
function emailValidator() {
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email.value);
    if (emailIsValid) {
        validationPass(email);
    } else {
        validationFail(email);
    }
    return emailIsValid;
}

// Updates total number of activities selected
activities.addEventListener('change', e => {
    if (e.target.checked) {
        totalActivities++;
    } else {
        totalActivities--;
    }
})

// Validates activities section
function activitiesValidator() {
    const activitiesSectionIsValid = totalActivities > 0;
    const activitiesBox = document.querySelector('#activities-box');
    if (activitiesSectionIsValid) {
        validationPass(activitiesBox);
    } else {
        validationFail(activitiesBox);
    }
    return activitiesSectionIsValid;
}

// Validates payment section
function paymentValidator() {
    const card = document.querySelector('#cc-num');
    const zip = document.querySelector('#zip');
    const cvv = document.querySelector('#cvv');
    const paymentMethodBox = document.querySelector('.payment-method-box');
    const cardIsValid = /^\d{13,16}$/.test(card.value);
    const zipIsValid = /^\d{5}$/.test(zip.value);
    const cvvIsValid = /^\d{3}$/.test(cvv.value);
    if (creditcardOption.selected && cardIsValid && zipIsValid && cvvIsValid) {
        validationPass(paymentMethodBox);
    } 
    
    if (!cardIsValid) {
        validationFail(card);
    } else {
        card.parentNode.classList.remove('not-valid');
        card.parentElement.lastElementChild.classList.add('hint');
    }
    
    if (!zipIsValid) {
        validationFail(zip);
    } else {
        zip.parentNode.classList.remove('not-valid');
        zip.parentElement.lastElementChild.classList.add('hint');
    }
    
    if (!cvvIsValid) {
        validationFail(cvv);
    } else {
        cvv.parentNode.classList.remove('not-valid');
        cvv.parentElement.lastElementChild.classList.add('hint');
    }
}

// TODO: Add real-time validation

// Enables/prevents form submission pending validation
form.addEventListener('submit', e => {
    if (!nameValidator()) {
        console.log('Invalid submission: name');
        e.preventDefault();
    }

    if (!emailValidator()) {
        console.log('Invalid submission: email');
        e.preventDefault();
    }

    if (!activitiesValidator()) {
        console.log('Invalid submission: activities');
        e.preventDefault();
    }

    if (!paymentValidator()) {
        console.log('Invalid submission: payment');
        e.preventDefault();
    }
})