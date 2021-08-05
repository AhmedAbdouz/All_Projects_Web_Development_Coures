var p1 = Math.floor(Math.random() * 6 + 1);
var p2 = Math.floor(Math.random() * 6 + 1);
document.querySelector("h1").innerHTML = "Ahmed" + p2;

if (p1 === p2) {
    document.querySelector("#title").innerHTML = "Draw";
} else if (p1 > p2) {
    document.querySelector("#title").innerHTML = "Player1 Wins";
} else {
    document.querySelector("#title").innerHTML = "Player2 Wins";
}
document.querySelector(".div1 img").setAttribute("src", "Dice1.png");

document.querySelector(".div1 h2").innerHTML = "Player1 == " + p1;
document.querySelector(".div1 img").setAttribute("src", "Dice" + p1 + ".png");
document.querySelector(".div2 h2").innerHTML = "Player2 == " + p2;
document.querySelector(".div2 img").setAttribute("src", "Dice" + p2 + ".png");

document.addEventListener("keydown", function(evet) {
    alert("pressed   " + evet.key)
});

document.querySelector("button").addEventListener("click", function() {
    alert("hello")
});