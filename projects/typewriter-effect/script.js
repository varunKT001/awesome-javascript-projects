// class for typing the details in <span data-words>
class TypeWriter{
    constructor(txtElement, words, wait = 1500){
        this.txtElement = txtElement
        this.words = words
        this.txt = ''
        this.wordIndex = 0
        this.wait = parseInt(wait, 10)
        this.type()
        this.isDeleting = false
    }

    // function for typing the words
    type(){
        const current = this.wordIndex % this.words.length                  // current index of the word
        const fullTxt = this.words[current]                                 // entire word to be typed out

        if(this.isDeleting){                                                // check if the text is deleting 
            this.txt = fullTxt.substring(0, this.txt.length - 1)            // remove the text
        }
        else{
            this.txt = fullTxt.substring(0, this.txt.length + 1)            // add the text
        }
        
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`  // insert text to the given element
        let typeSpeed = 500
        if(this.isDeleting){
            typeSpeed /= 2
        }

        if(!this.isDeleting && this.txt === fullTxt){                       // if the word has been fully typed
            typeSpeed = this.wait                                           // wait for the designated time
            this.isDeleting = true                                          // set isDeleting to true so the word can start deleting now 
        }
        else if(this.isDeleting && this.txt === ''){                        // if the word has been fully deleted
            this.isDeleting = false                                         // set isDeleting to false so the word can start typing out now
            this.wordIndex++                                                // move to the next word in array
            typeSpeed = 500
        }

        setTimeout(() => this.type(), typeSpeed)
    }
}

document.addEventListener('DOMContentLoaded', init)

function init(){
    const txtElement = document.querySelector('.txt-type')
    const words = JSON.parse(txtElement.getAttribute('data-words'))
    const wait = txtElement.getAttribute('data-wait')

    new TypeWriter(txtElement, words, wait)
}