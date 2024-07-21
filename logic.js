//all boxes and reset button are get to acces through JS
let boxes = document.querySelectorAll(".boxes");
let rstBtn = document.querySelector("#reset");
let msg = document.querySelectorAll(".Msg");
let newGame = document.querySelector("#newGame")

let currentPlayer = "X";//always first turn for player 'X'


//These are the winning patterns to be a winner
let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
];

resetingGame = () =>{
    boxes.forEach((box) =>{
        box.innerText = "";
        box.disabled = false;
        rstBtn.setAttribute("id", "reset");
        msg[0].setAttribute("class", "Msg");
        msg[1].setAttribute("class", "Msg");
    })
}

newGame.addEventListener("click",resetingGame);
rstBtn.addEventListener("click", resetingGame);

checkWinner = () =>{
    for(let pattern of winningPattern){
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != "")
            if(pos1 === pos2 && pos2 === pos3){
                console.log(`winner is ${pos1}`);
                msg[0].innerText = msg[0].textContent + `${pos1}`;
                msg[0].setAttribute("class", "winMsg");
                msg[1].setAttribute("class", "winMsg");
                rstBtn.setAttribute("id", "hiddenReset");
            }
        }
}

boxes.forEach((box) =>{
    box.addEventListener("click", ()=>{
        if(currentPlayer === "X"){
            box.innerText = "X";
            currentPlayer = "O";
        }
        else if(currentPlayer === "O"){
            box.innerText = "O";
            currentPlayer = "X";
        }
        box.disabled = true;
        checkWinner();
    })
})