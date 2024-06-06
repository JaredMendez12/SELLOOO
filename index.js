const numPeople = 6;
let people = [...Array(numPeople).keys()].map(i => String.fromCharCode(65 + i));
let combinations = [];
let currentIndex = 0;

function initialize() {
    combinations = getUniqueCombinations(people);
    document.getElementById("process").innerText = `Total combinaciones: ${combinations.length}`;
}

function getUniqueCombinations(array) {
    let uniqueCombinations = new Set();

    // Generar rotaciones y sus reflexiones
    for (let i = 0; i < array.length; i++) {
        let rotated = array.slice(i).concat(array.slice(0, i));
        let reversed = rotated.slice().reverse();

        uniqueCombinations.add(JSON.stringify(rotated));
        uniqueCombinations.add(JSON.stringify(reversed)); // Agregar la inversión de cada rotación
    }

    // Convertir Set a Array de objetos únicos
    return Array.from(uniqueCombinations).map(JSON.parse);
}

function showNextCombination() {
    if (currentIndex >= combinations.length) {
        alert("Se han mostrado todas las combinaciones.");
        return;
    }

    let combination = combinations[currentIndex];
    let reversedCombination = JSON.stringify(combination.slice().reverse());

    let circle = document.getElementById("circle");
    circle.innerHTML = '';

    let angleStep = 360 / numPeople;
    combination.forEach((person, index) => {
        let angle = angleStep * index;
        let x = 125 + 100 * Math.cos(angle * Math.PI / 180);
        let y = 125 + 100 * Math.sin(angle * Math.PI / 180);

        let personElement = document.createElement("div");
        personElement.className = "person";
        personElement.style.left = `${x}px`;
        personElement.style.top = `${y}px`;
        personElement.innerText = person;
        circle.appendChild(personElement);
    });

    let combinationsList = document.getElementById("combinationsList");
    let listItem = document.createElement("li");
    listItem.className = "list-group-item";

    // Resaltar si es igual a su inverso
    if (JSON.stringify(combination) === reversedCombination) {
        listItem.style.color = 'red'; // Cambia el color para resaltar
        listItem.style.fontWeight = 'bold';
    }

    listItem.innerText = combination.join(", ");
    combinationsList.appendChild(listItem);

    currentIndex++;
}

initialize();
