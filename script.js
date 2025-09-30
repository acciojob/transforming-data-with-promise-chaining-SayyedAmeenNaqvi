//your JS code here. If required.

// Get references to DOM elements
const inputElement = document.getElementById("ip");
const button = document.getElementById("btn");
const outputDiv = document.getElementById("output");

function promiseWithDelay(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

function startTransformation() {
    // Clear previous output
    outputDiv.textContent = "";

    const initialValue = parseFloat(inputElement.value);

    // Basic validation
    if (isNaN(initialValue)) {
        outputDiv.textContent = "Please enter a valid number.";
        return;
    }

    // Initial Promise (2 seconds): Start the chain with the input value
    new Promise(resolve => {
        // Since the first step requires a 2-second delay *before* the first result is shown, 
        // we use the helper function here.
        setTimeout(() => {
            outputDiv.textContent = `Result: ${initialValue}`;
            resolve(initialValue);
        }, 2000);
    })
    .then(currentValue => {
        // Second Promise (2 seconds): Multiply by 2
        const newValue = currentValue * 2;
        return promiseWithDelay(2000, newValue).then(result => {
            outputDiv.textContent = `Result: ${result}`;
            return result; // Pass result to the next promise
        });
    })
    .then(currentValue => {
        // Third Promise (1 second): Subtract 3
        const newValue = currentValue - 3;
        return promiseWithDelay(1000, newValue).then(result => {
            outputDiv.textContent = `Result: ${result}`;
            return result;
        });
    })
    .then(currentValue => {
        // Fourth Promise (1 second): Divide by 2
        const newValue = currentValue / 2;
        return promiseWithDelay(1000, newValue).then(result => {
            outputDiv.textContent = `Result: ${result}`;
            return result;
        });
    })
    .then(currentValue => {
        // Fifth Promise (1 second): Add 10
        const finalValue = currentValue + 10;
        return promiseWithDelay(1000, finalValue).then(result => {
            // Display the final result with the special text
            outputDiv.textContent = `Final Result: ${result}`;
            return result;
        });
    })
    .catch(error => {
        
        console.error("An error occurred during transformation:", error);
        outputDiv.textContent = "An error occurred during processing.";
    });
}
button.addEventListener("click", startTransformation);