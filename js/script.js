// Array para almacenar los nombres de los equipos
let teams = [];
// Array para almacenar los fixtures generados
let fixtures = [];

// Función para añadir un equipo
function addTeam() {
    const teamInput = document.getElementById('team-input'); // Obtener el input del equipo
    const teamName = teamInput.value.trim(); // Obtener y limpiar el valor del input
    if (teamName) { // Verificar si el nombre del equipo no está vacío
        teams.push(teamName); // Añadir el equipo al array de equipos
        updateTeamList(); // Actualizar la lista de equipos en la UI
        teamInput.value = ''; // Limpiar el input
    }
}

// Función para actualizar la lista de equipos en la UI
function updateTeamList() {
    const teamList = document.getElementById('team-list'); // Obtener el elemento de la lista de equipos
    teamList.innerHTML = ''; // Limpiar el contenido actual de la lista
    teams.forEach((team, index) => {
        const li = document.createElement('li'); // Crear un elemento de lista
        li.textContent = team; // Establecer el nombre del equipo como contenido del elemento
        teamList.appendChild(li); // Añadir el elemento a la lista
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
    const fixturesDiv = document.getElementById('fixtures'); // Obtener el contenedor de los fixtures
    fixturesDiv.innerHTML = ''; // Limpiar el contenido actual del contenedor

    fixtures.forEach((fixture, index) => {
        const fixtureDiv = document.createElement('div'); // Crear un contenedor para el fixture
        fixtureDiv.classList.add('fixture'); // Añadir clase CSS al contenedor

        const teamsP = document.createElement('p'); // Crear un elemento de párrafo
        teamsP.textContent = `${fixture.team1} vs ${fixture.team2}`; // Establecer el texto del enfrentamiento
        fixtureDiv.appendChild(teamsP); // Añadir el párrafo al contenedor del fixture

        // Crear y configurar el input para el puntaje del equipo 1
        const score1Input = document.createElement('input');
        score1Input.type = 'number';
        score1Input.value = fixture.score1;
        score1Input.onchange = (event) => updateScore(index, 'score1', event.target.value);
        fixtureDiv.appendChild(score1Input); // Añadir el input al contenedor del fixture

        // Crear y configurar el input para el puntaje del equipo 2
        const score2Input = document.createElement('input');
        score2Input.type = 'number';
        score2Input.value = fixture.score2;
        score2Input.onchange = (event) => updateScore(index, 'score2', event.target.value);
        fixtureDiv.appendChild(score2Input); // Añadir el input al contenedor del fixture

        fixturesDiv.appendChild(fixtureDiv); // Añadir el contenedor del fixture al contenedor de fixtures
    });
}

// Función para actualizar el puntaje de un equipo en un fixture
function updateScore(index, scoreKey, value) {
    fixtures[index][scoreKey] = parseInt(value, 10) || 0; // Actualizar el puntaje en el array de fixtures
    calculatePoints(); // Recalcular y mostrar los puntos después de actualizar el puntaje
}

// Función para calcular los puntos de los equipos
function calculatePoints() {
    const points = {}; // Objeto para almacenar los puntos de cada equipo
    teams.forEach(team => points[team] = 0); // Inicializar los puntos de todos los equipos en 0

    // Calcular los puntos basados en los resultados de los fixtures
    fixtures.forEach(fixture => {
        if (fixture.score1 > fixture.score2) {
            points[fixture.team1] += 3; // 3 puntos para el equipo 1 si gana
        } else if (fixture.score2 > fixture.score1) {
            points[fixture.team2] += 3; // 3 puntos para el equipo 2 si gana
        //} else if (fixture.score1 === fixture.score2) {
        //    points[fixture.team1] += 1; // 1 punto para ambos equipos si empatan
        //    points[fixture.team2] += 1;
        }
    });

    displayPoints(points); // Mostrar los puntos en la UI
}

// Función para mostrar los puntos en la UI
function displayPoints(points) {
    let pointsDiv = document.getElementById('points'); // Obtener el contenedor de los puntos
    if (!pointsDiv) {
        pointsDiv = document.createElement('div'); // Crear el contenedor si no existe
        pointsDiv.id = 'points';
        document.getElementById('fixtures').after(pointsDiv); // Añadir el contenedor después de fixtures
    }

    pointsDiv.innerHTML = '<h2>Puntuaciones</h2>'; // Añadir un encabezado al contenedor
    const pointsTable = document.createElement('table'); // Crear una tabla para mostrar los puntos
    for (const team in points) {
        const row = document.createElement('tr'); // Crear una fila para cada equipo
        const teamCell = document.createElement('td'); // Crear una celda para el nombre del equipo
        teamCell.textContent = team; // Establecer el nombre del equipo en la celda
        const pointsCell = document.createElement('td'); // Crear una celda para los puntos del equipo
        pointsCell.textContent = points[team]; // Establecer los puntos en la celda
        row.appendChild(teamCell); // Añadir la celda del equipo a la fila
        row.appendChild(pointsCell); // Añadir la celda de puntos a la fila
        pointsTable.appendChild(row); // Añadir la fila a la tabla
    }

    pointsDiv.appendChild(pointsTable); // Añadir la tabla al contenedor de puntos
}
