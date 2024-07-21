//all button fields and button are get to access through JS
let boxes = document.querySelectorAll(".boxes");
let rstBtn = document.querySelector("#reset");
let msg = document.querySelectorAll(".Msg");
let newGame = document.querySelector("#newGame")

//always first turn for player 'X'
let currentPlayer = "X";
//for counting the no of entries
let count = 0;
let isWinner = false;


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


//This function is used when the player try to reset the game or start a new game
resetingGame = () =>{
    boxes.forEach((box) =>{
        //This makes all the boxes empty
        box.innerText = "";
        //this enable the buttons
        box.disabled = false;
        //the reset button will again visible
        rstBtn.setAttribute("id", "reset");
        //The winning msg and new Game are hidden now
        msg[0].setAttribute("class", "Msg");
        msg[1].setAttribute("class", "Msg");
    })
}

//adding event listener for the two button New Game and Reset
newGame.addEventListener("click",resetingGame);
rstBtn.addEventListener("click", resetingGame);


DrawGame = () =>{
    if(count == 9 && !isWinner){
        msg[0].innerText =  "The match was Draw!";
        //the winner msg and new game button will visible
        msg[0].setAttribute("class", "winMsg");
        msg[1].setAttribute("class", "winMsg");
        //the reset button will hidden
        rstBtn.setAttribute("id", "hiddenReset");
    }
}


//It will check the current state with the winning pattern
checkWinner = () =>{
    for(let pattern of winningPattern){
        //storing the values of the boxes according to the pattern
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;
        //Checking wheather any position is empty or not
        if(pos1 != "" && pos2 != "" && pos3 != "")
            if(pos1 === pos2 && pos2 === pos3){
                //printing the winner message
                isWinner = true;
                msg[0].innerText =  `Congtats the Winner is : ${pos1}`;
                //the winner msg and new game button will visible
                msg[0].setAttribute("class", "winMsg");
                msg[1].setAttribute("class", "winMsg");
                //the reset button will hidden
                rstBtn.setAttribute("id", "hiddenReset");
            }
        }
}

//this makes the alternate turn for each player
boxes.forEach((box) =>{
    box.addEventListener("click", ()=>{
        if(currentPlayer === "X"){
            box.style.color = "#553E4E";
            box.innerHTML = "<b>X</b>";
            currentPlayer = "O";
            count++;
        }
        else if(currentPlayer === "O"){
            box.innerHTML = "<b>O</b>";
            box.style.color = "#B9314F";
            currentPlayer = "X";
            count++;
        }
        box.disabled = true;
        //after every entry it check wheather the winning pattern is matching or not
        checkWinner();
        DrawGame();
    })
})