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
        this.progress = document.getElementById("progress")

        this.btnStartGame = document.getElementById("btn-start-game")
        this.inputSecretWord = document.getElementById("input-secret-word")

        this.explosionGif = document.getElementById("explosion")
        this.brokenScrenn = document.getElementById("broken-screen")

        this.btnToggleSecretWordType = document.getElementById("btn-toggle-secret-word-type")
        this.btnStartGame.addEventListener("click", () => {
            let word = this.inputSecretWord.value.trim().toUpperCase()
            if (!this.isValidWord(word)) return
            this.setSecretWord(word)
            this.updateFoundLetters()
        })
        this.btnToggleSecretWordType.addEventListener("click", () => this.toggleVisibleWord())
        this.updateProgress()
    }

    setSecretWord(word) {
        this.secretWord = word.split("")
        this.foundLetters = []
        Keyboard.resetAllKeys()
        this.attemps = 0
        this.stats = new Stats()
        this.updateProgress()
        for (let i=0;i<word.length;i++) this.foundLetters.push("_")
        this.brokenScrenn.style.display = "none"
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
        this.updateProgress()
    }

    updateProgress() {
        const str = this.sliceInNParts("del C:\\Windows\\System32",10)
        this.progress.innerHTML = "<b>PS C:\\Usuaris\\Victor> </b>" + str.slice(0,this.attemps).toString().replace(/,/g ,"")
    }

    sliceInNParts(str, parts) {
        let partLength = Math.ceil(str.length / parts)
        let res = []
    
        for (let i = 0; i < str.length; i += partLength) {
            res.push(str.slice(i, i + partLength))
        }
    
        return res
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

        this.explosionGif.style.display = "block"
        setTimeout(() => {
            this.explosionGif.style.display = "none"
        },800)
        this.brokenScrenn.style.display = "block"
    }

    updateFoundLetters() {
        this.foundLettersContainer.innerText = this.foundLetters.toString().replace(/,/g, " ")
    }
}

const game = new Game()