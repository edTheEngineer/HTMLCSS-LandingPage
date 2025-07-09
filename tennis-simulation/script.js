// Tennis Tournament Simulation Script
class TournamentManager {
    constructor() {
        this.tournament = null;
        this.currentMatchId = null;
        this.initializeEventListeners();
    }

    // Player names pool for random generation
    playerNames = {
        firstNames: [
            'Alexander', 'Benjamin', 'Christopher', 'Daniel', 'Ethan', 'Felix', 'Gabriel', 'Henry',
            'Isaac', 'James', 'Kevin', 'Lucas', 'Michael', 'Nathan', 'Oliver', 'Patrick',
            'Quincy', 'Robert', 'Samuel', 'Thomas', 'Ulrich', 'Victor', 'William', 'Xavier',
            'Yasmin', 'Zachary', 'Adrian', 'Blake', 'Carlos', 'Diego', 'Edgar', 'Francisco',
            'Giovanni', 'Hugo', 'Ivan', 'Jorge', 'Klaus', 'Leonardo', 'Marco', 'Nicolas',
            'Orlando', 'Pablo', 'Quinn', 'Ricardo', 'Stefan', 'Tomas', 'Umberto', 'Valentino',
            'Wesley', 'Ximeno', 'Yolanda', 'Zara', 'Emma', 'Sophia', 'Isabella', 'Charlotte',
            'Amelia', 'Mia', 'Harper', 'Evelyn', 'Abigail', 'Emily', 'Elizabeth', 'Sofia',
            'Avery', 'Ella', 'Scarlett', 'Grace', 'Chloe', 'Victoria', 'Riley', 'Aria',
            'Lily', 'Aubrey', 'Zoey', 'Penelope', 'Lillian', 'Addison', 'Layla', 'Natalie',
            'Camila', 'Hannah', 'Brooklyn', 'Zoe', 'Nora', 'Leah', 'Savannah', 'Audrey',
            'Claire', 'Eleanor', 'Skylar', 'Ellie', 'Samantha', 'Stella', 'Paisley', 'Violet',
            'Mila', 'Allison', 'Alexa', 'Anna', 'Hazel', 'Aaliyah', 'Ariana', 'Elena',
            'Gabriella', 'Naomi', 'Alice', 'Sadie', 'Hailey', 'Eva', 'Emilia', 'Autumn'
        ],
        lastNames: [
            'Anderson', 'Brown', 'Clark', 'Davis', 'Evans', 'Foster', 'Garcia', 'Harris',
            'Jackson', 'Johnson', 'Kelly', 'Lewis', 'Martinez', 'Nelson', 'O\'Connor', 'Parker',
            'Quinn', 'Rodriguez', 'Smith', 'Taylor', 'Underwood', 'Valdez', 'Wilson', 'Xavier',
            'Young', 'Zhang', 'Adams', 'Baker', 'Cooper', 'Diaz', 'Edwards', 'Fisher',
            'Green', 'Hill', 'Ivanov', 'Jones', 'King', 'Lopez', 'Miller', 'Nguyen',
            'Olsen', 'Perez', 'Roberts', 'Scott', 'Thompson', 'Turner', 'Vasquez', 'White',
            'Williams', 'Petrov', 'Novak', 'Mueller', 'Schmidt', 'Wagner', 'Becker', 'Weber',
            'Schulz', 'Koch', 'Richter', 'Klein', 'Wolf', 'Schroeder', 'Neumann', 'Schwarz',
            'Zimmermann', 'Braun', 'Krueger', 'Hofmann', 'Hartmann', 'Lange', 'Schmitt', 'Werner',
            'Schubert', 'Koehler', 'Walter', 'Stein', 'Gross', 'Hahn', 'Keller', 'Herrmann',
            'Weiss', 'Lehmann', 'Stark', 'Sommer', 'Schaefer', 'Huber', 'Mayer', 'Winkler'
        ]
    };

    // Initialize event listeners
    initializeEventListeners() {
        document.getElementById('generateTournament').addEventListener('click', () => this.generateNewTournament());
        document.getElementById('exportDraw').addEventListener('click', () => this.exportTournament());
        document.getElementById('resetTournament').addEventListener('click', () => this.resetTournament());
        
        // Modal event listeners
        document.querySelectorAll('.modal-close').forEach(closeBtn => {
            closeBtn.addEventListener('click', () => this.closeModal());
        });
        
        document.getElementById('saveScore').addEventListener('click', () => this.saveMatchScore());
        document.getElementById('cancelScore').addEventListener('click', () => this.closeModal());
        
        document.getElementById('exportFinalDraw').addEventListener('click', () => this.exportTournament());
        document.getElementById('newTournament').addEventListener('click', () => {
            this.closeModal();
            this.generateNewTournament();
        });

        // Close modal when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    }

    // Generate random player names
    generateRandomPlayer(seed) {
        const firstName = this.playerNames.firstNames[Math.floor(Math.random() * this.playerNames.firstNames.length)];
        const lastName = this.playerNames.lastNames[Math.floor(Math.random() * this.playerNames.lastNames.length)];
        return {
            id: `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: `${firstName} ${lastName}`,
            seed: seed,
            eliminated: false
        };
    }

    // Generate new tournament
    async generateNewTournament() {
        this.showLoading(true);
        
        // Simulate loading time for better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        this.tournament = this.createTournament();
        this.renderTournament();
        this.showLoading(false);
    }

    // Create tournament structure
    createTournament() {
        const players = [];
        
        // Generate 128 players with seeds
        for (let i = 1; i <= 128; i++) {
            players.push(this.generateRandomPlayer(i));
        }

        // Shuffle players for random draw
        this.shuffleArray(players);

        const tournament = {
            players: players,
            rounds: [],
            completed: false,
            champion: null
        };

        // Create 7 rounds
        for (let round = 1; round <= 7; round++) {
            tournament.rounds.push({
                roundNumber: round,
                matches: [],
                completed: false
            });
        }

        // Generate first round matches
        this.generateRoundMatches(tournament, 1, players);

        return tournament;
    }

    // Generate matches for a specific round
    generateRoundMatches(tournament, roundNumber, players) {
        const round = tournament.rounds[roundNumber - 1];
        const matchCount = players.length / 2;

        for (let i = 0; i < matchCount; i++) {
            const match = {
                id: `r${roundNumber}_m${i + 1}`,
                roundNumber: roundNumber,
                matchNumber: i + 1,
                player1: players[i * 2],
                player2: players[i * 2 + 1],
                winner: null,
                score: null,
                completed: false,
                available: roundNumber === 1 // Only first round matches are initially available
            };
            round.matches.push(match);
        }
    }

    // Shuffle array using Fisher-Yates algorithm
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Render tournament bracket
    renderTournament() {
        if (!this.tournament) return;

        for (let roundNumber = 1; roundNumber <= 7; roundNumber++) {
            const container = document.getElementById(`round${roundNumber}Matches`);
            const round = this.tournament.rounds[roundNumber - 1];
            
            container.innerHTML = '';
            
            round.matches.forEach(match => {
                const matchElement = this.createMatchElement(match);
                container.appendChild(matchElement);
            });
        }
    }

    // Create match HTML element
    createMatchElement(match) {
        const matchDiv = document.createElement('div');
        matchDiv.className = `match ${match.completed ? 'completed' : match.available ? 'available' : 'unavailable'}`;
        matchDiv.dataset.matchId = match.id;

        const player1 = match.player1 || { name: 'TBD', seed: '' };
        const player2 = match.player2 || { name: 'TBD', seed: '' };

        matchDiv.innerHTML = `
            <div class="player ${match.winner?.id === player1.id ? 'winner' : match.completed ? 'loser' : ''}">
                <div class="player-info">
                    ${player1.seed ? `<span class="player-seed">${player1.seed}</span>` : ''}
                    <span class="player-name ${!player1.name || player1.name === 'TBD' ? 'tbd-player' : ''}">${player1.name || 'TBD'}</span>
                </div>
                ${match.score && match.winner?.id === player1.id ? `<span class="player-score">${match.score}</span>` : ''}
            </div>
            <div class="player ${match.winner?.id === player2.id ? 'winner' : match.completed ? 'loser' : ''}">
                <div class="player-info">
                    ${player2.seed ? `<span class="player-seed">${player2.seed}</span>` : ''}
                    <span class="player-name ${!player2.name || player2.name === 'TBD' ? 'tbd-player' : ''}">${player2.name || 'TBD'}</span>
                </div>
                ${match.score && match.winner?.id === player2.id ? `<span class="player-score">${match.score}</span>` : ''}
            </div>
        `;

        // Add click event for available matches
        if (match.available && !match.completed && match.player1 && match.player2) {
            matchDiv.addEventListener('click', () => this.openScoreModal(match));
            matchDiv.style.cursor = 'pointer';
            matchDiv.setAttribute('aria-label', `Enter score for match between ${player1.name} and ${player2.name}`);
            matchDiv.setAttribute('tabindex', '0');
            matchDiv.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.openScoreModal(match);
                }
            });
        }

        return matchDiv;
    }

    // Open score input modal
    openScoreModal(match) {
        this.currentMatchId = match.id;
        
        const modal = document.getElementById('scoreModal');
        const player1Name = document.getElementById('player1Name');
        const player2Name = document.getElementById('player2Name');
        const winnerPlayer1Name = document.getElementById('winnerPlayer1Name');
        const winnerPlayer2Name = document.getElementById('winnerPlayer2Name');
        
        player1Name.textContent = match.player1.name;
        player2Name.textContent = match.player2.name;
        winnerPlayer1Name.textContent = match.player1.name;
        winnerPlayer2Name.textContent = match.player2.name;
        
        // Clear previous input
        this.clearScoreInputs();
        
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        
        // Focus first input
        document.getElementById('set1p1').focus();
    }

    // Clear score inputs
    clearScoreInputs() {
        const inputs = ['set1p1', 'set1p2', 'set2p1', 'set2p2', 'set3p1', 'set3p2'];
        inputs.forEach(id => {
            document.getElementById(id).value = '';
        });
        
        document.querySelectorAll('input[name="winner"]').forEach(radio => {
            radio.checked = false;
        });
        
        this.hideError();
    }

    // Validate tennis score
    validateTennisScore(sets) {
        let validSets = 0;
        let player1Sets = 0;
        let player2Sets = 0;

        for (const set of sets) {
            if (set.p1 === '' && set.p2 === '') continue;
            
            const p1Score = parseInt(set.p1) || 0;
            const p2Score = parseInt(set.p2) || 0;
            
            if (p1Score < 0 || p2Score < 0) {
                return { valid: false, error: 'Scores cannot be negative' };
            }
            
            if (p1Score > 7 || p2Score > 7) {
                return { valid: false, error: 'Set scores cannot exceed 7' };
            }
            
            // Validate set logic
            if (p1Score === p2Score && p1Score !== 0) {
                return { valid: false, error: 'Sets cannot end in a tie (except 0-0)' };
            }
            
            if (p1Score === 0 && p2Score === 0) continue;
            
            // Check if set is valid
            if (p1Score >= 6 || p2Score >= 6) {
                if (Math.abs(p1Score - p2Score) < 2 && Math.max(p1Score, p2Score) < 7) {
                    return { valid: false, error: `Invalid set score: ${p1Score}-${p2Score}. Need 2 game difference or 7 games` };
                }
            } else if (Math.max(p1Score, p2Score) < 6) {
                return { valid: false, error: `Incomplete set: ${p1Score}-${p2Score}. Sets must reach at least 6 games` };
            }
            
            validSets++;
            if (p1Score > p2Score) player1Sets++;
            else player2Sets++;
        }

        if (validSets < 2) {
            return { valid: false, error: 'At least 2 sets must be played' };
        }

        if (validSets > 3) {
            return { valid: false, error: 'Maximum 3 sets allowed' };
        }

        // Check if match is complete
        const setsToWin = 2;
        if (player1Sets < setsToWin && player2Sets < setsToWin) {
            return { valid: false, error: 'Match is not complete. Need to win 2 sets' };
        }

        return { 
            valid: true, 
            winner: player1Sets > player2Sets ? 'player1' : 'player2',
            sets: validSets,
            score: sets.slice(0, validSets).map(set => `${set.p1}-${set.p2}`).join(', ')
        };
    }

    // Save match score
    saveMatchScore() {
        if (!this.currentMatchId) return;

        const sets = [
            { p1: document.getElementById('set1p1').value, p2: document.getElementById('set1p2').value },
            { p1: document.getElementById('set2p1').value, p2: document.getElementById('set2p2').value },
            { p1: document.getElementById('set3p1').value, p2: document.getElementById('set3p2').value }
        ];

        const selectedWinner = document.querySelector('input[name="winner"]:checked');
        
        if (!selectedWinner) {
            this.showError('Please select a winner');
            return;
        }

        const validation = this.validateTennisScore(sets);
        if (!validation.valid) {
            this.showError(validation.error);
            return;
        }

        // Check if selected winner matches score
        if (selectedWinner.value !== validation.winner) {
            this.showError('Selected winner does not match the score');
            return;
        }

        // Update match
        this.updateMatch(this.currentMatchId, selectedWinner.value, validation.score);
        this.closeModal();
    }

    // Update match with result
    updateMatch(matchId, winnerType, score) {
        const match = this.findMatch(matchId);
        if (!match) return;

        match.completed = true;
        match.winner = winnerType === 'player1' ? match.player1 : match.player2;
        match.score = score;

        // Mark loser as eliminated
        const loser = winnerType === 'player1' ? match.player2 : match.player1;
        loser.eliminated = true;

        // Check if round is complete
        const round = this.tournament.rounds[match.roundNumber - 1];
        const roundComplete = round.matches.every(m => m.completed);

        if (roundComplete) {
            round.completed = true;
            
            // Generate next round if not final
            if (match.roundNumber < 7) {
                this.generateNextRound(match.roundNumber);
            } else {
                // Tournament complete
                this.tournament.completed = true;
                this.tournament.champion = match.winner;
                this.showTournamentComplete();
            }
        }

        this.renderTournament();
    }

    // Generate next round
    generateNextRound(currentRound) {
        const winners = this.tournament.rounds[currentRound - 1].matches.map(match => match.winner);
        const nextRound = currentRound + 1;
        
        this.generateRoundMatches(this.tournament, nextRound, winners);
        
        // Make next round matches available
        this.tournament.rounds[nextRound - 1].matches.forEach(match => {
            match.available = true;
        });
    }

    // Find match by ID
    findMatch(matchId) {
        for (const round of this.tournament.rounds) {
            const match = round.matches.find(m => m.id === matchId);
            if (match) return match;
        }
        return null;
    }

    // Show error message
    showError(message) {
        const errorDiv = document.getElementById('scoreError');
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
    }

    // Hide error message
    hideError() {
        const errorDiv = document.getElementById('scoreError');
        errorDiv.classList.remove('show');
    }

    // Close modal
    closeModal() {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
        });
        this.currentMatchId = null;
        this.hideError();
    }

    // Show loading indicator
    showLoading(show) {
        const loadingDiv = document.getElementById('loadingIndicator');
        if (show) {
            loadingDiv.classList.add('show');
            loadingDiv.setAttribute('aria-hidden', 'false');
        } else {
            loadingDiv.classList.remove('show');
            loadingDiv.setAttribute('aria-hidden', 'true');
        }
    }

    // Show tournament completion modal
    showTournamentComplete() {
        const modal = document.getElementById('completionModal');
        const championName = document.getElementById('championName');
        
        championName.textContent = this.tournament.champion.name;
        
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
    }

    // Export tournament
    exportTournament() {
        if (!this.tournament) {
            alert('No tournament to export. Please generate a tournament first.');
            return;
        }

        const exportData = {
            tournament: {
                completed: this.tournament.completed,
                champion: this.tournament.champion,
                exportDate: new Date().toISOString(),
                rounds: this.tournament.rounds.map(round => ({
                    roundNumber: round.roundNumber,
                    completed: round.completed,
                    matches: round.matches.map(match => ({
                        matchId: match.id,
                        player1: {
                            name: match.player1?.name || 'TBD',
                            seed: match.player1?.seed || null
                        },
                        player2: {
                            name: match.player2?.name || 'TBD',
                            seed: match.player2?.seed || null
                        },
                        winner: match.winner?.name || null,
                        score: match.score || null,
                        completed: match.completed
                    }))
                }))
            }
        };

        // Create and download JSON file
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `tennis-tournament-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        // Also create CSV export
        this.exportToCSV(exportData);
    }

    // Export to CSV format
    exportToCSV(exportData) {
        const csvRows = [];
        csvRows.push('Round,Match,Player 1,Player 1 Seed,Player 2,Player 2 Seed,Winner,Score,Completed');

        exportData.tournament.rounds.forEach(round => {
            round.matches.forEach(match => {
                csvRows.push([
                    round.roundNumber,
                    match.matchId,
                    match.player1.name,
                    match.player1.seed || '',
                    match.player2.name,
                    match.player2.seed || '',
                    match.winner || '',
                    match.score || '',
                    match.completed
                ].join(','));
            });
        });

        const csvContent = csvRows.join('\n');
        const csvBlob = new Blob([csvContent], { type: 'text/csv' });
        const csvUrl = URL.createObjectURL(csvBlob);
        
        const csvLink = document.createElement('a');
        csvLink.href = csvUrl;
        csvLink.download = `tennis-tournament-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(csvLink);
        csvLink.click();
        document.body.removeChild(csvLink);
        URL.revokeObjectURL(csvUrl);
    }

    // Reset tournament
    resetTournament() {
        if (confirm('Are you sure you want to reset the tournament? This will clear all progress.')) {
            this.tournament = null;
            document.querySelectorAll('.matches-container').forEach(container => {
                container.innerHTML = '<p style="text-align: center; color: #6c757d; padding: 2rem;">Generate a new tournament to begin</p>';
            });
            this.closeModal();
        }
    }
}

// Initialize tournament manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const tournamentManager = new TournamentManager();
    
    // Generate initial tournament
    tournamentManager.generateNewTournament();
});

// Add keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
    // Add tab navigation through matches
    if (e.key === 'Tab') {
        const availableMatches = document.querySelectorAll('.match.available');
        if (availableMatches.length > 0) {
            availableMatches.forEach(match => {
                if (!match.hasAttribute('tabindex')) {
                    match.setAttribute('tabindex', '0');
                }
            });
        }
    }
});

// Add visual feedback for keyboard navigation
document.addEventListener('focusin', (e) => {
    if (e.target.classList.contains('match')) {
        e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.5)';
    }
});

document.addEventListener('focusout', (e) => {
    if (e.target.classList.contains('match')) {
        e.target.style.boxShadow = '';
    }
});

// Utility function to format player names for better display
function formatPlayerName(name, maxLength = 20) {
    if (name.length <= maxLength) return name;
    
    const parts = name.split(' ');
    if (parts.length > 1) {
        return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
    }
    
    return name.substring(0, maxLength - 3) + '...';
}

// Console helpers for debugging
window.tournamentDebug = {
    getCurrentTournament: () => window.tournamentManager?.tournament,
    showTournamentStructure: () => {
        if (window.tournamentManager?.tournament) {
            console.table(window.tournamentManager.tournament.rounds.map(round => ({
                Round: round.roundNumber,
                Matches: round.matches.length,
                Completed: round.completed
            })));
        }
    },
    exportToConsole: () => {
        if (window.tournamentManager?.tournament) {
            console.log(JSON.stringify(window.tournamentManager.tournament, null, 2));
        }
    }
};