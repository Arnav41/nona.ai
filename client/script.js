const promptEl = document.getElementById("prompt");
const url = "http://localhost:3000/";

promptEl.addEventListener("input", () => {
    promptEl.style.width = promptEl.value.length ? promptEl.value.length + "ch" : "30ch"
});

document.getElementById("prompt-container").addEventListener("submit", async (e) => {
    e.preventDefault();
    // if the data is given as promised it does the work otherwise throws an error.
    document.getElementById("loader").style.display = "block"
    document.getElementById("prompt-style").style.display = "none"
    try {
        const data = await askQuestion(promptEl.value)
        displayInputOutput(data.input, data.output)
    } catch (e) {
        displayError("Didn't work. Please try again.")
    } finally {
        promptEl.value = "";
        promptEl.style.width = "30ch";
        document.getElementById("prompt-style").style.display = "block"
        document.getElementById("loader").style.display = "none"
    }
});

async function askQuestion(input) {
    const req = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "question": input })
    });
    return req.json();
}


//gpt stuff 
function displayInputOutput(input, output) {
    const inputOutputContainer = document.createElement("div");
    inputOutputContainer.className = "input-output-container";
    inputOutputContainer.innerHTML = 
    `
    <div class="inputs">${input}</div>
    <div class="outputs">${output}</div>
    `;
    document.getElementById("history-container").appendChild(inputOutputContainer);
}

function displayError(error) {
    const errorContainer = document.createElement("div");
    errorContainer.className = "error-container";
    errorContainer.innerHTML = `<div class="errors">${error}</div>`
    document.getElementById("history-container").appendChild(errorContainer);
}