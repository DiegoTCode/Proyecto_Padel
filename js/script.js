// script.js

// Array para almacenar los nombres de los equipos
let teams = [];
// Array para almacenar los fixtures generados
let fixtures = [];

// Función para añadir un equipo
function addTeam() {
    const teamInput = document.getElementById('team-input');
    const teamName = teamInput.value.trim();
    if (teamName) {
        teams.push(teamName);
        updateTeamList();
        teamInput.value = '';
    }
}

// Función para actualizar la lista de equipos en la UI
function updateTeamList() {
    const teamList = document.getElementById('team-list');
    teamList.innerHTML = '';
    teams.forEach((team, index) => {
        const li = document.createElement('li');
        li.textContent = team;
        teamList.appendChild(li);
    });
}

// Función para generar los fixtures sin repetir partidos
function generateFixtures() {
    if (teams.length < 2) {
        alert('Necesitas al menos 2 equipos para generar fixtures.');
        return;
    }

    fixtures = []; // Reiniciar el array de fixtures

    // Generar todos los enfrentamientos posibles
    for (let i = 0; i < teams.length - 1; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            const fixture = { team1: teams[i], team2: teams[j], score1: 0, score2: 0 };
            fixtures.push(fixture); // Añadir fixture al array
        }
    }

    // Mezclar los fixtures aleatoriamente
    fixtures.sort(() => Math.random() - 0.5);

    displayFixtures(); // Mostrar los fixtures en la UI
    calculatePoints(); // Calcular y mostrar los puntos después de generar los fixtures
}

// Función para mostrar los fixtures en la UI
function displayFixtures() {
    const fixturesDiv = document.getElementById('fixtures');
    fixturesDiv.innerHTML = '';

    fixtures.forEach((fixture, index) => {
        const fixtureDiv = document.createElement('div');
        fixtureDiv.classList.add('fixture');

        const teamsP = document.createElement('p');
        teamsP.textContent = `${fixture.team1} vs ${fixture.team2}`;
        fixtureDiv.appendChild(teamsP);

        const score1Input = document.createElement('input');
        score1Input.type = 'number';
        score1Input.value = fixture.score1;
        score1Input.onchange = (event) => updateScore(index, 'score1', event.target.value);
        fixtureDiv.appendChild(score1Input);

        const score2Input = document.createElement('input');
        score2Input.type = 'number';
        score2Input.value = fixture.score2;
        score2Input.onchange = (event) => updateScore(index, 'score2', event.target.value);
        fixtureDiv.appendChild(score2Input);

        fixturesDiv.appendChild(fixtureDiv);
    });
}

// Función para actualizar el puntaje de un equipo en un fixture
function updateScore(index, scoreKey, value) {
    fixtures[index][scoreKey] = parseInt(value, 10) || 0;
    calculatePoints();
}

// Función para calcular los puntos de los equipos
function calculatePoints() {
    const points = {};
    teams.forEach(team => points[team] = 0);

    fixtures.forEach(fixture => {
        if (fixture.score1 > fixture.score2) {
            points[fixture.team1] += 3; // 3 puntos para el equipo 1 si gana
        } else if (fixture.score2 > fixture.score1) {
            points[fixture.team2] += 3; // 3 puntos para el equipo 2 si gana
        } else if (fixture.score1 === fixture.score2 && fixture.score1 !== 0 && fixture.score2 !== 0) {
            points[fixture.team1] += 1; // 1 punto para ambos equipos si empatan
            points[fixture.team2] += 1;
        }
    });

    displayPoints(points);
}

// Función para mostrar los puntos en la UI
function displayPoints(points) {
    let pointsDiv = document.getElementById('points');
    if (!pointsDiv) {
        pointsDiv = document.createElement('div');
        pointsDiv.id = 'points';
        document.getElementById('fixtures').after(pointsDiv);
    }

    pointsDiv.innerHTML = '<h2>Puntuaciones</h2>';
    const pointsTable = document.createElement('table');
    for (const team in points) {
        const row = document.createElement('tr');
        const teamCell = document.createElement('td');
        teamCell.textContent = team;
        const pointsCell = document.createElement('td');
        pointsCell.textContent = points[team];
        row.appendChild(teamCell);
        row.appendChild(pointsCell);
        pointsTable.appendChild(row);
    }

    pointsDiv.appendChild(pointsTable);
}
