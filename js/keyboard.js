function pressKey(key) {
    const inputField = document.getElementById('inputField');
    const value = inputField.value;
    const lastChar = value.slice(-1);

    // Handle h or m key separately
    if (key === 'h' || key === 'm') {
        if (lastChar === 'h' || lastChar === 'm') {
            // If the last character is already 'h' or 'm', replace it with the opposite
            inputField.value = value.slice(0, -1) + key;
        } else {
            // If not, add the 'h' or 'm' character normally
            inputField.value += key;
        }
    } else {
        // Otherwise, append the key as usual
        inputField.value += key;
    }
}

function handleBackspace() {
    const inputField = document.getElementById('inputField');
    const value = inputField.value;
    const lastThreeChars = value.slice(-3);

    // Check if the last three characters are " + " or " - "
    if (lastThreeChars === ' + ' || lastThreeChars === ' - ') {
        // Remove the last three characters if they are " + " or " - "
        inputField.value = value.slice(0, -3);
    } else {
        // Otherwise, just remove the last character
        inputField.value = value.slice(0, -1);
    }
}

// Add an event listener for keyboard input
document.addEventListener('keydown', function (event) {
    const allowedKeys = {
        "1": "1", "2": "2", "3": "3", "4": "4", "5": "5",
        "6": "6", "7": "7", "8": "8", "9": "9", "0": "0",
        "h": "h", "m": "m", "+": " + ", "-": " - "
    };

    if (allowedKeys.hasOwnProperty(event.key)) {
        pressKey(allowedKeys[event.key]);
    } else if (event.key === "Enter") {
        window.calculate();
    } else if (event.key === "Escape") {
        window.clearInput();
    } else if (event.key === "Backspace") {
        handleBackspace();
        event.preventDefault(); // Prevent the default Backspace behavior
    }
});
