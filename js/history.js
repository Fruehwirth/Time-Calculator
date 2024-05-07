function updateHistory(calculation, result) {
    var history = document.getElementById('history');
    var entry = document.createElement('div');
    entry.textContent = `${calculation} = ${result}`;
    entry.setAttribute('data-result', result);
    entry.onclick = function () {
        window.addToInput(result); // Ensure global accessibility
    };
    history.insertBefore(entry, history.firstChild);
    saveHistory();
}

function saveHistory() {
    const history = document.getElementById('history');
    const entries = Array.from(history.children).map(entry => ({
        calculation: entry.textContent,
        result: entry.getAttribute('data-result')
    }));
    localStorage.setItem('historyEntries', JSON.stringify(entries));
}

function loadHistory() {
    const history = document.getElementById('history');
    const savedEntries = JSON.parse(localStorage.getItem('historyEntries') || '[]');
    savedEntries.forEach(entry => {
        var div = document.createElement('div');
        div.textContent = entry.calculation;
        div.setAttribute('data-result', entry.result);
        div.onclick = function () {
            window.addToInput(entry.result);
        };
        history.appendChild(div);
    });
}

function addToInput(result) {
    var inputField = document.getElementById('inputField');
    inputField.value += result;
}

// Toggle History Event Listener
document.getElementById('toggleHistory').addEventListener('click', function () {
    var history = document.getElementById('history');
    const expanded = history.style.maxHeight !== '0px' && history.style.maxHeight !== '';
    this.textContent = expanded ? 'Show History' : 'Hide History';
    this.setAttribute('aria-pressed', !expanded);

    if (expanded) {
        history.style.maxHeight = '0';
    } else {
        const maxVisibleHeight = '200px'; // Adjust this to the height of 4 items
        history.style.maxHeight = maxVisibleHeight;
    }
});

// Load history when this module is executed
loadHistory();
