class Game {

    MAX_ATTEMPS = 10

    constructor() {
        this.secretWord = null
        this.foundLetters = null
        this.attemps = 0
        this.stats = new Stats()
        this.loadHTMLElements()
    }

    loadHTMLElements() {
        this.foundLettersContainer = document.getElementById("found-letters")
        this.imgProgress = document.getElementById("img-progress")

        this.btnStartGame = document.getElementById("btn-start-game")
        this.inputSecretWord = document.getElementById("input-secret-word")

        this.btnToggleSecretWordType = document.getElementById("btn-toggle-secret-word-type")
        this.btnStartGame.addEventListener("click", () => {
            let word = this.inputSecretWord.value.trim().toUpperCase()
            if (!this.isValidWord(word)) return
            this.setSecretWord(word)
            this.updateFoundLetters()
        })
        this.btnToggleSecretWordType.addEventListener("click", () => this.toggleVisibleWord())
        this.updateImgProgress()
    }

    setSecretWord(word) {
        this.secretWord = word.split("")
        this.foundLetters = []
        Keyboard.resetAllKeys()
        this.attemps = 0
        this.stats = new Stats()
        this.updateImgProgress()
        for (let i=0;i<word.length;i++) this.foundLetters.push("_")
    }

    isValidWord(word) {
        if (!word) {
            alert("Has d'introduir una paraula per començar el joc.")
            return
        }

        if (word.length <=3) {
            alert("Has d'introduir una paraula amb més de 3 lletres.")
            return false
        }
        if (!/^[A-Z]+$/.test(word)) {
            alert("No pots introduir caracters que no siguin lletres.")
            return false
        }
        return true
    }

    toggleVisibleWord() {
        const icon = document.querySelector("#btn-toggle-secret-word-type > span");
        this.inputSecretWord.type = (icon.innerText === "visibility") ? "text" : "password";
        icon.innerText = (icon.innerText === "visibility") ? "visibility_off" : "visibility";
    }

    checkLetter(letter) {
        if (!this.secretWord) return
        let apparences = 0
        for (let i=0;i<this.secretWord.length;i++) {
            if (this.secretWord[i] === letter) {
                this.foundLetters[i] = letter
                apparences++
            }
        }
        
        if (apparences == 0) {
            this.increaseAttemps()
            this.stats.decreaseScore()
        } else this.stats.increaseScore(apparences)

        this.checkGameState()
        this.updateFoundLetters()
    }

    increaseAttemps() {
        this.attemps++
        this.updateImgProgress()
    }

    updateImgProgress() {
        if (this.attemps >= 0 && this.attemps <= this.MAX_ATTEMPS) {
            this.imgProgress.src = `../img/penjat_${this.attemps}.jpg`
        }
    }

    checkGameState() {
        if (compareArrays(this.secretWord,this.foundLetters)) this.win()
        if (this.attemps == this.MAX_ATTEMPS) this.lose()
    }

    win() {
        this.stats.increaseWins()
        this.stats.increaseGames()
        alert("Has ganado")

        if (this.stats.score > this.stats.bestScore.score) {
            this.stats.setBestScore()
            this.stats.updateBestScore()
        }
    }

    lose() {
        this.stats.increaseGames()
        alert("Has perdut")
    }

    updateFoundLetters() {
        this.foundLettersContainer.innerText = this.foundLetters.toString().replace(/,/g, " ")
    }
}

const game = new Game()