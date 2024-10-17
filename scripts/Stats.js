class Stats {
    constructor() {
        this.score = 0
        this.games = Stats.getGames()
        this.wins = Stats.getWins()
        this.bestScore = Stats.getBestScore()
        this.steak = 0

        this.loadHTMLElements()
    }

    loadHTMLElements() {
        this.scoreContainer = document.getElementById("score")
        this.gamesContaier = document.getElementById("games")
        this.winsContainer = document.getElementById("wins")
        this.bestScoreContainer = document.getElementById("best-score") 
        this.updateScore()
        this.updateGames()
        this.updateWins()
        this.updateBestScore()
    }

    increaseScore(apparences) {
        this.score += apparences + this.steak
        this.steak++
        this.updateScore()
    }

    decreaseScore() {
        if (this.score == 0) return
        this.score--
        this.updateScore()
    }

    increaseGames() {
        this.games++
        this.updateGames()
        localStorage.setItem("games",this.games)
    }

    increaseWins() {
        this.wins++
        this.updateWins()
        localStorage.setItem("wins",this.wins)
    }

    updateScore() {
        this.scoreContainer.innerText = this.score
    }

    updateGames() {
        this.gamesContaier.innerText = this.games
    }

    updateWins() {
        this.winsContainer.innerText = this.wins
    }

    updateBestScore() {
        this.bestScoreContainer.innerText = `${this.bestScore.day} ${this.bestScore.hour} ${this.bestScore.score} punts`
    }

    static getWins() {
        const storage = localStorage.getItem("wins")
        return storage ? JSON.parse(storage) : 0
    }

    static getGames() {
        const storage = localStorage.getItem("games")
        return storage ? JSON.parse(storage) : 0
    }
    
    static getBestScore() {
        const date = new Date()
        const day = date.toLocaleDateString()
        const hour = date.toLocaleTimeString()
        const storage = localStorage.getItem("best-score")
        return storage ? JSON.parse(storage) : {"day": day, "hour": hour, "score": 0}
    }

    setBestScore() {
        const date = new Date()
        const day = date.toLocaleDateString()
        const hour = date.toLocaleTimeString()
        this.bestScore = {"day": day, "hour": hour, "score": this.score}
        localStorage.setItem("best-score",JSON.stringify(this.bestScore))
    }
}