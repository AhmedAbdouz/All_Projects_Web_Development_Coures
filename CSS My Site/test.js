
function outer(){
    let num1=15;
    return function(num2){
        console.log(num1+num2);
    };
}
let result =outer();
result(5);
