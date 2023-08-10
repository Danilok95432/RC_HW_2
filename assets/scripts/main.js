import {Player} from './player.mjs'
import {Game} from './game.mjs'


let firstPlayer, secondPlayer, game;
let counter = 0
let hash = [];
let row = 3;
let col = 3;
for (let i = 0; i < row; i++) {
    hash[i] = [];
    for (let j = 0; j < col; j++) {
        hash[i][j] = 0;
    }
}

let playBtn = document.querySelector('.switch-btn')
let header = document.querySelector('.container-header')
let logo = document.querySelector('.logo')
let titleLogo = document.querySelector('.title-logo')


let optionsBlock = document.querySelector('.options-game')
let setOptionsBtn = document.getElementById("setBtn")

let choosePriority = document.querySelector('.choose-priority')
let chooseTitlePriority = document.getElementById("player-choose-priority")

let chooseBlock = document.querySelector('.choose-symbol')
let inputNames = document.querySelectorAll('.setName')
let chooseTitle = document.getElementById("player-choose-symbol")

let whoseMoveBlock = document.querySelector('.whose-move')
let whoseMoveTitle = document.getElementById("whose-move-title")

let modalArea = document.querySelector('.modal-area')
let modalTitle = document.getElementById("modal-title")
let restartBtn = document.querySelector('.restart')
let backToMenuBtn = document.querySelector('.to-menu')



let playerNames = []
let playerSymbols = []
let playerPriorities = []

playBtn.addEventListener("click", () => {
    playBtn.style.display = "none";
    logo.style.scale = '0.6'
    header.style.padding = '8px'
    header.style.gap = '5px'
    titleLogo.style.display = 'none'
    let gameZone = document.querySelector('.gamezone')
    let hashZone = document.querySelector('.hash')
    gameZone.removeChild(hashZone)   
    let newHashZone = document.createElement('div')
    newHashZone.classList.add('hash') 
    gameZone.appendChild(newHashZone)
    for( let i = 0; i < 9; i++)
    {
        let newNode = document.createElement('div')
        newNode.classList.add('node')
        newHashZone.appendChild(newNode)
    }
    optionsBlock.style.display = 'flex'
})

setOptionsBtn.addEventListener("click", () => {
    for(let i = 0; i < inputNames.length; i++)
    {
        playerNames[i] = inputNames[i].value
    }
    optionsBlock.style.display = 'none'
    choosePriority.style.display = 'flex'
    chooseTitlePriority.innerHTML = 'Who will be the first?'
    let chooseElemPrio = document.querySelectorAll('.choose-elem-prio')
    chooseElemPrio[0].innerHTML = playerNames[0]
    chooseElemPrio[1].innerHTML = playerNames[1]
    for(let i = 0; i < chooseElemPrio.length; i++)
        chooseElemPrio[i].addEventListener('click', () => {
            if(i)
                playerPriorities = ['second', 'first']
            else playerPriorities = ['first', 'second']
            choosePriority.style.display = 'none'
            chooseBlock.style.display = 'flex'
            chooseTitle.innerHTML = playerNames[i] + ' are choosing the symbol now'
            let symbolBtn = document.querySelectorAll('.choose-elem');
            for(let i = 0; i < symbolBtn.length; i++)
                symbolBtn[i].addEventListener('click', () => {
                    if(i == 1 && playerPriorities[0] == 'first') playerSymbols = ['tac', 'tic']
                    else if(i == 1 && playerPriorities[0] == 'second') playerSymbols = ['tic', 'tac']
                    else if(i == 0 && playerPriorities[0] == 'first') playerSymbols = ['tic', 'tac']
                    else if(i == 0 && playerPriorities[0] == 'second') playerSymbols = ['tac', 'tic']
                    console.log(playerSymbols)
                    chooseBlock.style.display = 'none'
                    firstPlayer = new Player(playerNames[0],playerSymbols[0],playerPriorities[0])
                    secondPlayer = new Player(playerNames[1],playerSymbols[1],playerPriorities[1])
                    game = new Game(firstPlayer, secondPlayer, hash)
                    startGame(game)
                })
        })
})

function startGame(game){
    whoseMoveBlock.style.display = 'flex'
    counter = 0 
    let first, second;
    if(game.firstPlayer.priority == 'first')
    {
        first = game.firstPlayer
        second = game.secondPlayer
        whoseMoveTitle.innerHTML = 'Player ' + first.name + ' move' 
    }
    else
    {
        first = game.secondPlayer
        second = game.firstPlayer
        whoseMoveTitle.innerHTML = 'Player ' + first.name + ' move' 
    }
    let node = document.querySelectorAll('.node')
    for(let i = 0; i < node.length; i++)
    {

        node[i].addEventListener('click', () => {
            if(node[i].getElementsByTagName('img').length == 0)
            {
                if(counter % 2 == 0){
                    whoseMoveTitle.innerHTML = 'Player ' + second.name + ' move' 
                    if(first.symbol == 'tic'){
                        let ticOrTacDiv = document.createElement('div')
                        ticOrTacDiv.innerHTML = "<img class='img-node' src='assets/res/tic.svg' />"
                        node[i].appendChild(ticOrTacDiv.firstChild)
                    }
                    else{
                        let ticOrTacDiv = document.createElement('div')
                        ticOrTacDiv.innerHTML = "<img class='img-node' src='assets/res/tac.svg' />"
                        node[i].appendChild(ticOrTacDiv.firstChild)
                    }
                    hash = game.updateHash(hash, i, 'first')
                }
                else{
                    whoseMoveTitle.innerHTML = 'Player ' + first.name + ' move' 
                    if(second.symbol == 'tic'){
                        let ticOrTacDiv = document.createElement('div')
                        ticOrTacDiv.innerHTML = "<img class='img-node' src='assets/res/tic.svg' />"
                        node[i].appendChild(ticOrTacDiv.firstChild)
                    }
                    else{
                        let ticOrTacDiv = document.createElement('div')
                        ticOrTacDiv.innerHTML = "<img class='img-node' src='assets/res/tac.svg' />"
                        node[i].appendChild(ticOrTacDiv.firstChild)
                    }
                    hash = game.updateHash(hash, i, 'second')
                } 
                counter++;
                if(game.isGameFinished(hash, counter, first, second))
                    gameFinished(first,second)
            }
        })
    }
}

function cleanGametoRestart(){
    for (let i = 0; i < row; i++) {
        hash[i] = [];
        for (let j = 0; j < col; j++) {
            hash[i][j] = 0;
        }
    }
    let gameZone = document.querySelector('.gamezone')
    let hashZone = document.querySelector('.hash')
    gameZone.removeChild(hashZone)   
    let newHashZone = document.createElement('div')
    newHashZone.classList.add('hash') 
    gameZone.appendChild(newHashZone)
    for( let i = 0; i < 9; i++)
    {
        let newNode = document.createElement('div')
        newNode.classList.add('node')
        newHashZone.appendChild(newNode)
    }
}

function cleanGame(){
    for (let i = 0; i < row; i++) {
        hash[i] = [];
        for (let j = 0; j < col; j++) {
            hash[i][j] = 0;
        }
    }
    playerNames = []
    playerSymbols = []
    playerPriorities = []
}

function gameFinished(first,second){
    modalArea.style.display = 'flex'
    if(first.winner == 1)
        modalTitle.innerHTML = first.name + ' won!'
    else if(second.winner == 1)
        modalTitle.innerHTML = second.name + ' won!'
    else modalTitle.innerHTML = 'The game was ended in a draw!'
    first.winner = 0
    second.winner = 0

    restartBtn.addEventListener('click', () => {
        modalArea.style.display = 'none'
        whoseMoveBlock.style.display = 'none'
        cleanGametoRestart()
        firstPlayer = new Player(playerNames[0],playerSymbols[0],playerPriorities[0])
        secondPlayer = new Player(playerNames[1],playerSymbols[1],playerPriorities[1])
        game = new Game(firstPlayer, secondPlayer, hash)
        startGame(game)
    })

    backToMenuBtn.addEventListener('click', () => {
        modalArea.style.display = 'none'
        whoseMoveBlock.style.display = 'none'
        cleanGame()
        playBtn.style.display = "flex";
        logo.style.scale = '1'
        header.style.padding = '48px 24px 12px 24px'
        header.style.gap = '15px'
        titleLogo.style.display = 'flex'
    })
}





