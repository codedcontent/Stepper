// First and most important thing is to know the active Step
let activeStep = 0;

// And we need a way to change this active step
const incrementActiveStep = () => {
    activeStep += 1;
    backButton.disabled = activeStep === 0;
    nextButton.disabled = activeStep >= stepDetails.length;
}
const decreamentActiveStep = () => {
    activeStep -= 1;
    backButton.disabled = activeStep === 0;
    nextButton.disabled = activeStep >= stepDetails.length;
}


// Funtion to get the id of a step circle text
const getActiveStepCircleText = () => {
    return (stepDetails[activeStep].name + activeStep + "idText").replace(" ", "");
}

const getActiveStepContent = () => {
    return (stepDetails[activeStep].name + activeStep + "idContent").replace(" ", "");
}


// This are the step details we'll need for the project
const stepDetails = [
    {
        name: "Shipping Address",
        content: `
            <h3>This is the shipping address</h3>
            <em>You can populate this field however you want</em>
        `
    },
    {
        name: "Payment Details",
        content: `
            <h3>This is Payment Details Part</h3>
            <em>You can populate this field however you want</em>
        `
    },
    {
        name: 'Confirmation',
        content: `
            <h3>This is the Confirmation Part</h3>
            <em>You can populate this field however you want</em>
        `
    }
];


// Funtion to generate a horizontal line
const line = (index) => {
    if(index < stepDetails.length -1) {
        return (`<div class="hr-line"></div>`)
    }else {
        return ""
    }
}


// This is the code that should be put in the steps
// &check;
const stepperCode = (
    stepDetails.map(({name}, index) => {
        // console.log(name, index);
        return (
            `<div class="step">
                    <div class="circle-icon undone">
                        <span id=${`${name}${index}idText` .replace(" ", "")}>${index + 1}</span>
                    </div>
                    <span id=id=${`${name}${index}idContent` .replace(" ", "")} class="step-label">
                        ${name}
                    </span>
                </div>
                ${line(index)}
            `
        )
    }).join("")
    // We used .join("") method because with template literals uses the .toString() method which by default joins each item returned bt the map funtion with a comma ==> (,) -- Therefore using .join("") removes it.
);

// Get the steps element
const steps = document.getElementById("steps");
steps.innerHTML = stepperCode;


// Get the step content element
const stepContent = document.getElementById("stepContent");
stepContent.innerHTML = stepDetails[activeStep].content;


// Get the buttons to help transverse through the steps
const backButton = document.getElementById("back");
// The step will start from 0 so the back button should be siabbled b default
backButton.disabled = activeStep === 0;
const nextButton = document.getElementById("next");

// Listening on the back button
backButton.addEventListener("click", () => {
    if(activeStep > 0) {
        decreamentActiveStep();

        // The step icon id and shii
        const activeCircleTextId = getActiveStepCircleText();
        const activeCircleText = document.getElementById(activeCircleTextId);
        activeCircleText.innerHTML = activeStep + 1;
        activeCircleText.parentElement.classList.add("undone");

        setContent();
        
    }
});

// Listening on the next button
next.addEventListener("click", () => {
    console.log(stepDetails.length);
    if(activeStep < stepDetails.length) {
        // The step icon id and shii
        const activeCircleTextId = getActiveStepCircleText();
        const activeCircleText = document.getElementById(activeCircleTextId);
        activeCircleText.innerHTML = "&check;";
        activeCircleText.parentElement.classList.remove("undone");
        incrementActiveStep();

        // Also set the content
        setContent();
    }

});


// Funtion to setContent
function setContent() {
    // Get the step content element
    const stepContent = document.getElementById("stepContent");
    console.log(activeStep, stepDetails.length);
    // The activeStep value is going to be incremented higher than the stepDetails length and it would lead to an error so we should prevent that
    if(activeStep > stepDetails.length - 1) {
        stepContent.innerText = "You're done! 🤗";
    }else {
        stepContent.innerHTML = stepDetails[activeStep].content;
    }
}