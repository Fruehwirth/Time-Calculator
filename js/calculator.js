function timeStringToMinutes(timeStr) {
    const hoursMatch = timeStr.match(/(-?\d+)h/);
    const minutesMatch = timeStr.match(/(-?\d+)m/);
    const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;
    const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;
    return hours * 60 + minutes;
}

function minutesToTimeString(totalMinutes) {
    const sign = totalMinutes < 0 ? '-' : '';
    const absMinutes = Math.abs(totalMinutes);
    const hours = Math.floor(absMinutes / 60);
    const minutes = absMinutes % 60;
    return `${sign}${hours}h${minutes}m`;
}

function evaluateTimeExpression(expression) {
    const terms = expression.match(/([+-]?\s*\d+h\d*m?|[+-]?\s*\d+m)/g);
    if (!terms) return 'Invalid Input';

    let totalMinutes = 0;

    for (const term of terms) {
        const operator = term.trim()[0] === '-' ? -1 : 1;
        const timeValue = term.replace(/^[+-]\s*/, '');
        totalMinutes += operator * timeStringToMinutes(timeValue);
    }

    return totalMinutes;
}

function calculate() {
    try {
        const inputField = document.getElementById('inputField');
        let calculation = inputField.value.replace(/\s/g, '');
        let finalMinutes = evaluateTimeExpression(calculation);
        let finalResult = minutesToTimeString(finalMinutes);
        window.updateHistory(calculation, finalResult); // Make sure it's accessible
        inputField.value = finalResult;
    } catch (error) {
        console.error('Error in calculation:', error);
        alert('Invalid calculation format.');
    }
}

function clearInput() {
    document.getElementById('inputField').value = '';
}
