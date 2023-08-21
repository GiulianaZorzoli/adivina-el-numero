//start game
const startGameBTN = document.getElementById("startGameBTN")
const startScreen = document.getElementById("startScreen")
const gameScreen = document.getElementById("gameScreen")
const winScreen = document.getElementById("winScreen")
const loseScreen = document.getElementById("loseScreen")
const winningNumber = document.querySelectorAll(".winningNumber")
startGameBTN.addEventListener("click",()=>{
    startScreen.classList.add("hidden")
    gameScreen.classList.remove("hidden")
})
let tries=1
//obtener un numero aleatorio
function getRandomInt (max){
    return Math.floor(Math.random ()*max);
}
var num= ""
var numList =[]
newNumber()
function newNumber(){
    for (let i = 0; i < 4;) {
        let newNum = getRandomInt(10)
        let incluye = numList.includes(newNum)
        if (!incluye && newNum != 0){
            let newNumStr = newNum.toString();
            num = num + newNumStr
            numList.push(newNum)
            i++
        } 
    }console.log(num)
}


//escuchar los clicks en cada tecla, reset y X
const tecs = document.querySelectorAll(".tec")
const back = document.getElementById("back")
const reset =document.getElementById("reset")

let rowPos = 0
let actualRow = 1
let tecCant = 0
let tecIndex=0
tecs.forEach((tec, index) => {
    tec.addEventListener("click",()=>{
        if (!tec.classList.contains('inactive') && actualRow<11 && tecCant<4){
            rowWrite(tec.textContent)
            tec.classList.add("inactive")
            tecCant= tecCant+1
            tecIndex=index
        }
    })
});


var numTry = ""
var numTryList = []
function rowWrite (tec){
    if (rowPos < 4 && actualRow<11){
        const thisRow = ".row"+(actualRow.toString())
        const rowList = document.querySelectorAll(thisRow)
        rowList[rowPos].textContent=tec
        if(tec!=""){
            rowPos=rowPos+1
            numTry= numTry + (tec.toString())
            numTryList.push(tec)
        }else{
            tecs[tecIndex].classList.remove("inactive")
        }
    }
}
back.addEventListener("click",()=>{
    console.log("hi")
    const borrar =numTryList.pop()
    console.log(numTryList)
    rowPos=rowPos-1
    tecCant=tecCant-1
    rowWrite("")
})
reset.addEventListener("click",()=>{
    clearGame()
})
var posCorrect=0
var numCorrect=0
var indexCorrect=0
//escuchar clicks en enter
const enterBtn = document.getElementById("enterBtn")
enterBtn.addEventListener("click",()=>{
    if (numTryList.length==4 && actualRow<11){
        const numInt = parseInt(num,10)
        const guessInt =parseInt(numTry,10)
        posCorrect=0
        numCorrect=0
        indexCorrect=0
        numList.forEach(function (num){
            numTryList.forEach(function(guess){
                if(num==guess){
                    if(numList[indexCorrect]==numTryList[indexCorrect]){
                        posCorrect=posCorrect+1
                        numCorrect= numCorrect+1
                    }else{
                        numCorrect= numCorrect+1
                    }
                }
            })
            indexCorrect=indexCorrect+1
        })    
        if (posCorrect==4) {
            winScreen.classList.remove("hidden")
            gameScreen.classList.add("hidden")
            winningNumber.forEach(win=>win.textContent=num)
        }
        const thisRowA = ".row"+(actualRow.toString())+"A"
        const rowListA =document.querySelectorAll(thisRowA)
        rowListA[0].textContent=numCorrect
        rowListA[1].textContent=posCorrect
        console.log(posCorrect,numCorrect,indexCorrect)
        if(actualRow<11){
            actualRow=actualRow+1
            rowPos=0
            document.querySelectorAll(".tec").forEach(tec => tec.classList.remove("inactive"))
        
        }
        numTryList=[]
        tecCant=0
        tries=tries+1
        if (tries>10 && numInt != guessInt) {
            console.log("hola")
            gameScreen.classList.add("hidden")
            loseScreen.classList.remove("hidden")
        }
    }
})

const playAgainBTN = document.getElementById("playAgainBTN")
playAgainBTN.addEventListener("click",()=>{
    loseScreen.classList.add("hidden")
    gameScreen.classList.remove("hidden")
    clearGame()
})
const playAgainBTNWin = document.getElementById("playAgainBTNWin")
playAgainBTNWin.addEventListener("click",()=>{
    winScreen.classList.add("hidden")
    gameScreen.classList.remove("hidden")
    clearGame()
})
function clearGame(){
    const numbGuessList=document.querySelectorAll(".numbGuess")
    const numbAnsList = document.querySelectorAll(".numbAns")
    tries=1
    numbGuessList.forEach(num=>num.textContent="")
    numbAnsList.forEach(num=>num.textContent="")
    num= ""
    numList =[]
    newNumber()
    rowPos = 0
    actualRow = 1
    tecCant = 0
    tecIndex=0
    numTry = ""
    numTryList = []
    posCorrect=0
    numCorrect=0
    indexCorrect=0
}