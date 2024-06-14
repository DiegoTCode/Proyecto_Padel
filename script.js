var teams = [];

function addTeam() {
    var teamName = document.getElementById("team").value.trim();
    if (teamName !== "") {
        teams.push({ name: teamName, points: 0 });
        document.getElementById("team").value = "";
        displayTeams();
    }
}

function generateFixtures() {
    matches = [];
    for (var i = 0; i < teams.length; i++) {
        for (var j = i + 1; j < teams.length; j++) {
            matches.push({ team1: teams[i].name, team2: teams[j].name, points1: 0, points2: 0 });
        }
    }
    displayMatchesAndResults();
}
// Eliminar la función simulateMatches()

// Agregar la función para mostrar el equipo con mayor puntuación
function displayWinner() {
    var maxPoints = -1;
    var winner = null;
    teams.forEach(function (team) {
        if (team.points > maxPoints) {
            maxPoints = team.points;
            winner = team;
        }
    });
    var winnerContainer = document.getElementById("winner");
    winnerContainer.innerHTML = "<h3>Ganador del Torneo:</h3>";
    if (winner !== null) {
        var winnerDiv = document.createElement("div");
        winnerDiv.textContent = "Equipo: " + winner.name + " - Puntos: " + winner.points;
        winnerContainer.appendChild(winnerDiv);
    } else {
        winnerContainer.textContent = "No hay ganador aún.";
    }
}


function displayTeams() {
    var teamList = document.getElementById("teamList");
    teamList.innerHTML = "<h3>Equipos:</h3>";
    teams.forEach(function (team) {
        var teamDiv = document.createElement("div");
        teamDiv.textContent = team.name + " - Puntos: " + team.points;
        teamList.appendChild(teamDiv);
    });
}

function addMatchPoints(matchIndex) {
    var points1 = parseInt(prompt("Ingrese los puntos del equipo 1:"));
    var points2 = parseInt(prompt("Ingrese los puntos del equipo 2:"));

    if (!isNaN(points1) && !isNaN(points2)) {
        matches[matchIndex].points1 = points1;
        matches[matchIndex].points2 = points2;
        // Actualizar los puntos de los equipos involucrados
        updateTeamPoints(matches[matchIndex].team1, points1);
        updateTeamPoints(matches[matchIndex].team2, points2);
        displayMatchesAndResults();
    } else {
        alert("Por favor ingrese números válidos para los puntos.");
    }
}

function updateTeamPoints(teamName, points) {
    var team = teams.find(function (team) {
        return team.name === teamName;
    });
    team.points += points;
    // Llamar a la función para mostrar los equipos actualizados
    displayTeams();
}


function displayMatchesAndResults() {
    var matchesContainer = document.getElementById("matches");
    matchesContainer.innerHTML = "<h3>Fixture:</h3>";
    matches.forEach(function (match, index) {
        var matchDiv = document.createElement("div");
        matchDiv.textContent = match.team1 + " vs " + match.team2;
        var pointsButton = document.createElement("button");
        pointsButton.textContent = "Agregar Puntos";
        pointsButton.className = "points-button";
        pointsButton.onclick = function() {
            addMatchPoints(index);
        };
        matchDiv.appendChild(pointsButton);
        matchesContainer.appendChild(matchDiv);
    });

    var resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "<h3>Resultados:</h3>";
    matches.forEach(function (match) {
        var resultDiv = document.createElement("div");
        resultDiv.textContent = match.team1 + " " + match.points1 + " - " + match.points2 + " " + match.team2;
        resultsContainer.appendChild(resultDiv);
    });
}
