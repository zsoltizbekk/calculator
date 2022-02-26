const firstLine = document.getElementsByClassName("firstRow");
const secondLine = document.getElementsByClassName("secondRow");
const buttons = document.getElementsByTagName("button");
const numButtons = document.getElementsByClassName("number");
const opButtons = document.getElementsByClassName("operation");
const delButton = document.getElementById("del");
const clearButton = document.getElementById("clear");
const equalButton = document.getElementById("equal");
const dotButton = document.getElementById("bdot");
document.addEventListener('keydown', logKey);

firstLine[0].textContent = "";
secondLine[0].textContent = "0";
let firstOperand = 0;
let secondaOparand = 0;
let num = 0;
let dot = false;
let op = "";
let op2 = "";

function logKey(e){
    console.log(e.key);
    if (Number.isInteger(+e.key)){
        //console.log("yes")
        secondScreen(+e.key);
    } else if (e.key == "-" || e.key == "+" || e.key == "*" || e.key == "/") { 
        if (op == ""){
            op = e.key;
            firstScreen(secondLine[0].textContent, op);
        } else {
            op2 = e.key;
            result();
        }
    } else if (e.key == "Enter") {
        result();
    } else if (e.key == ".") {
        addDot();
    } else if (e.key == "Delete") {
        clear();
    } else if (e.key == "Backspace") {
        del();
    }
}

for (let i = 0; i < numButtons.length; i++){ //add eventlistener to all number
    numButtons[i].addEventListener("click", function (){
        num++;
        console.log(i);
        if (num < 10)
            secondScreen(i);   
    });
}

for (let i = 0; i < opButtons.length; i++){ //add eventlistener to all operations
    opButtons[i].addEventListener("click", function (){
        if (op == ""){
            op = opButtons[i].textContent;
            firstScreen(secondLine[0].textContent, op);
        } else {
            op2 = opButtons[i].textContent;
            result();
        }
    });

}
clearButton.addEventListener("click", clear); //clear eventlistener
function clear(){
    //if (secondLine[0].textContent == "0"){ //if the second line is equal to 0, clear everything
        firstLine[0].textContent = "";
        secondLine[0].textContent = "0";
        op = "";
        op2 = "";
        firstOperand = 0;
    //}
    //    secondLine[0].textContent = "0"; //otherwise
        num = 0;
        dot = false;
        secondaOparand = 0;
};
equalButton.addEventListener("click", result);

dotButton.addEventListener("click", addDot);
function addDot() {
    secondScreen(".");
}

function secondScreen(i) {
    if (i == "." && !dot) { //if its a dot, and it is the only one
        dot = true;
        secondLine[0].textContent += i;
    }
    else if (secondLine[0].textContent == "0" && i == 0){ //if the line is empty and the pressed button was a 0
        ;
    } else if (secondLine[0].textContent == "0" && i != 0){ //if the line is empty and the pressed button wasnt a 0
        secondLine[0].textContent = i;
    } else if (Number.isInteger(i)){
    secondLine[0].textContent += i;
    }
};

function firstScreen(secondLine, op) {
    if (firstOperand == 0){
        firstLine[0].textContent = `${secondLine} ${op}`;
        firstOperand = +secondLine;
    } else {
        console.log(firstOperand)
        firstLine[0].textContent = `${firstOperand} ${op}`;
    }
    clearSecondLine();
}

function clearSecondLine() {
    num = 0;
    secondLine[0].textContent = "0";
    dot = false;
}
//DEL
delButton.addEventListener("click", del);
function del(){
    if (secondLine[0].textContent.length == 0){
        secondLine[0].textContent = "0";
    } else if (secondLine[0].textContent.length == 1){
        secondLine[0].textContent = "0";
    } else {
        secondLine[0].textContent = secondLine[0].textContent.slice(0, -1);
    }
};

function result(){

    switch (op){
        case "+":
            firstLine[0].textContent = `${firstOperand} ${op} ${secondLine[0].textContent} =`;
            secondLine[0].textContent = +firstOperand + +secondLine[0].textContent;
            firstOperand = secondLine[0].textContent;
            op = "";
            break;
        case "-":
            firstLine[0].textContent = `${firstOperand} ${op} ${secondLine[0].textContent} =`;
            secondLine[0].textContent = +firstOperand - +secondLine[0].textContent; 
            firstOperand = secondLine[0].textContent;
            op = "";
            break;
        case "x":
            firstLine[0].textContent = `${firstOperand} ${op} ${secondLine[0].textContent} =`;
            secondLine[0].textContent = +firstOperand * +secondLine[0].textContent; 
            firstOperand = secondLine[0].textContent;
            op = "";
            break;
        case "*":
            firstLine[0].textContent = `${firstOperand} x ${secondLine[0].textContent} =`;
            secondLine[0].textContent = +firstOperand * +secondLine[0].textContent; 
            firstOperand = secondLine[0].textContent;
            op = "";
            break;
        case "÷":
            firstLine[0].textContent = `${firstOperand} ${op} ${secondLine[0].textContent} =`;
            secondLine[0].textContent = Math.round((+firstOperand / +secondLine[0].textContent)*1000000)/1000000; 
            firstOperand = secondLine[0].textContent;
            op = "";
            break;
        case "/":
            firstLine[0].textContent = `${firstOperand} ÷ ${secondLine[0].textContent} =`;
            secondLine[0].textContent = Math.round((+firstOperand / +secondLine[0].textContent)*1000000)/1000000; 
            firstOperand = secondLine[0].textContent;
            op = "";
            break;
        default:
            firstLine[0].textContent = secondLine[0].textContent;
            firstOperand =secondLine[0].textContent;
            op = "";
            break;
    }
    
    if (op2 != ""){
        op = op2;
        op2 = "";
        firstScreen(firstOperand, op);
    }
}