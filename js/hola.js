document.addEventListener('DOMContentLoaded', function() {
    let teams = [];
    let matches = [];
    let pointsTable = {};

    // Function to generate fixtures randomly
    function generateFixtures() {
        matches = [];
        pointsTable = {};
        const teamInputs = document.getElementById('teams').value.split('\n').filter(team => team.trim() !== '');
        teams = teamInputs.map(team => team.trim());

        for (let team of teams) {
            pointsTable[team] = 0;
        }

        for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                matches.push([teams[i], teams[j]]);
            }
        }

        // Shuffle matches
        for (let i = matches.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [matches[i], matches[j]] = [matches[j], matches[i]];
        }

        displayFixtures();
    }

    // Function to display fixtures
    function displayFixtures() {
        const fixtureContainer = document.getElementById('fixtures');
        fixtureContainer.innerHTML = '';

        matches.forEach((match, index) => {
            const matchDiv = document.createElement('div');
            matchDiv.className = 'match';
            matchDiv.innerHTML = `
                <div>${match[0]} vs ${match[1]}</div>
                <input type="number" id="score-${index}-${match[0]}" placeholder="Score ${match[0]}" class="score-input">
                <input type="number" id="score-${index}-${match[1]}" placeholder="Score ${match[1]}" class="score-input">
                <button onclick="submitScore(${index})">Submit Score</button>
            `;
            fixtureContainer.appendChild(matchDiv);
        });
    }

    // Function to submit score
    window.submitScore = function(index) {
        const team1 = matches[index][0];
        const team2 = matches[index][1];
        const score1 = parseInt(document.getElementById(`score-${index}-${team1}`).value);
        const score2 = parseInt(document.getElementById(`score-${index}-${team2}`).value);

        if (isNaN(score1) || isNaN(score2)) {
            alert('Please enter valid scores.');
            return;
        }

        if (score1 > score2) {
            pointsTable[team1] += 1;
        } else if (score2 > score1) {
            pointsTable[team2] += 1;
        } else {
            pointsTable[team1] += 0.5;
            pointsTable[team2] += 0.5;
        }

        displayPointsTable();
    };

    // Function to display points table
    function displayPointsTable() {
        const pointsContainer = document.getElementById('points');
        pointsContainer.innerHTML = '';
        
        for (let team in pointsTable) {
            const teamDiv = document.createElement('div');
            teamDiv.innerText = `${team}: ${pointsTable[team]} points`;
            pointsContainer.appendChild(teamDiv);
        }
    }

    document.getElementById('generate').addEventListener('click', generateFixtures);
});
