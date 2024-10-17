class Keyboard {

    constructor() {
        this.keyboardContainer = document.getElementById("keyboard")
        this.addAllKeys()
    }

    addAllKeys() {
        for (let i=0; i<26;i++) {
            const letter = String.fromCharCode(65+i)
            this.addKey(letter)
        }
    }

    static resetKey(character) {
        const button = document.getElementById(`key-${character}`)
        button.disabled = false
    }

    static resetAllKeys() {
        for (let i=0; i<26;i++) {
            const letter = String.fromCharCode(65+i)
            this.resetKey(letter)
        }
    }

    addKey(character) {
        const button = document.createElement("button")
        button.id = `key-${character}`
        button.innerText = character

        button.addEventListener("click", ()=> {
            if (!game.secretWord) return
            button.disabled = true
            game.checkLetter(character)
        })

        this.keyboardContainer.appendChild(button)
    }
}

new Keyboard()