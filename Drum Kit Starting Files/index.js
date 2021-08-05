var size = document.getElementsByTagName("button").length;
for (let i = 0; i < size; i++) {
    document.getElementsByTagName("button")[i].addEventListener("click", function() {
        playsound(this.innerHTML);
        animateButton(this.innerHTML);
    });
}

document.addEventListener("keydown", function(envet) {
    playsound(event.key);
    animateButton(event.key);
});

function playsound(key) {
    var audio = null;
    switch (key) {
        case 'w':
            audio = new Audio('sounds/crash.mp3');
            audio.play();
            break;
        case 'a':

            audio = new Audio('sounds/kick-bass.mp3');
            audio.play();
            break;
        case 's':
            audio = new Audio('sounds/snare.mp3');
            audio.play();
            break;
        case 'd':

            audio = new Audio('sounds/tom-1.mp3');
            audio.play();
            break;
        case 'j':

            audio = new Audio('sounds/tom-2.mp3');
            audio.play();
            break;
        case 'k':
            audio = new Audio('sounds/tom-3.mp3');
            audio.play();
            break;
        case 'l':

            audio = new Audio('sounds/tom-4.mp3');
            audio.play();
            break;

        default:

            break;
    }
}

function animateButton(classname) {
    document.getElementsByClassName(classname)[0].classList.add("pressed");
    setTimeout(function() {
        document.getElementsByClassName(classname)[0].classList.remove("pressed");
    }, 100);
}

$("button").on("click", function() {
    $("h1").slideUp();
});