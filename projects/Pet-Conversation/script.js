(function () {
    //Dom elements that need to be selected
    let pets = document.getElementsByName("pet-choice");
    let btn = document.getElementById("btn-send");
    let conversation = document.getElementById("conversation");
    let message = document.getElementById("my-message");

    const possibleCatAnswers = [
        "meow",
        "meoooooowwwwww",
        "MEOW! MEOW!",
        "Meow?",
        "Meow meow?",
        "MEEEEEEEEOOOOOOOOOWWWWWWWWWWWW!!!",
        "PUURRRRRR...",
        "meow meow meow meow meow",
    ];
    const possiblDogAnswers = [
        "woof",
        "WOOF! WOOF!",
        "Woof?",
        "Woof woof?",
        "WOOOOOOFF!!!",
        "woof woof woof woof woof",
    ];
    let currentPet = document.querySelector("input[type='radio']:checked").value;

    pets.forEach((pet) => {
        pet.addEventListener("change", (event) => {
            currentPet = event.target.value;
            message.value = "";
            conversation.innerHTML = "";
        });
    });

    function sendMessage() {
        //User input
        const text = message.value;
        if (!text) {
            return;
        }
        message.value = "";
        conversation.innerHTML += `<p class="user-message">You: ${text}</p>`;

        //Pet input
        let currentPetAnswers =
            currentPet === "cat" ? possibleCatAnswers : possiblDogAnswers;
        let randomIndex = Math.floor(
            Math.random(currentPetAnswers.length) * currentPetAnswers.length
        );
        let currentAnswer = currentPetAnswers[randomIndex];
        conversation.innerHTML += `<p class="pet-message">${currentPet}: ${currentAnswer}</p>`;
        
        //scroll
        conversation.scrollTop = conversation.scrollHeight;
    }

    btn.addEventListener("click", function () {
        sendMessage();
    });

    message.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
})();
