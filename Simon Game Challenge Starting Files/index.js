var f = true;
var arr = ["red", "green", "blue", "yellow"];
var temp = [];
var id = 0;
var lev = 1;
var started = false;


function gameover() {
    $("#level-title").text("Game Over press A to play again .");
    $("body").addClass("pressed");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function() {
        $("body").removeClass("pressed");
    }, 100);
    lev = 1;

}

$(document).keypress(function(event) {
    console.log(started);
    if (!started) {
        started = true;
        nextSimulation();
    }
});

// $("body").click(function() {
//     console.log(started);
//     if (!started) {
//         started = true;
//         nextSimulation();
//     }
// });



function nextSimulation() {
    $("#level-title").text("Level " + lev);
    temp = [];
    id = 0;
    for (let i = 0; i < lev; i++) {
        setTimeout(function() {
            makeRandom();
        }, 500 * i);
    }
    lev++;
}


$(".btn").click(function() {
    playKey(this.id);
    if (this.id == arr[temp[id]]) {
        id++;
        if (id == temp.length) {
            setTimeout(function() {
                $("#level-title").text("Well done !! press any key for next level ");
            }, 100);
            started = false;
        }
    } else {
        gameover();
        started = false;
    }
});


async function makeRandom() {
    var random = Math.floor(Math.random() * 4);
    playKey(arr[random]);
    temp.push(random);
}

async function test() {

    // for (let i = 0; i < 2; i++) {
    //     setTimeout(makeRandom, 500 * i);
    // }

    // for (let i = 0; i < 2; i++) {
    //     setTimeout(makeRandom, 500 * i);
    // }

    // for (let i = 0; i < 2; i++) {
    //     setTimeout(function() {
    //         makeRandom();
    //     }, 500 * i);
    // }
}

function playKey(key) {
    setTimeout(function() {
        console.log("waiting ..")
    }, 2000);
    var audio = new Audio("sounds/" + key + ".mp3");
    audio.play();
    $("#" + key).addClass("pressed");
    setTimeout(function() {
        $("#" + key).removeClass("pressed");
    }, 100);
}