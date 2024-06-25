import { $ } from "../lib/Pen.js";
import { GameManager } from "./gameManager.js";
import { makeEnemy } from "./enemy.js";
const states = {
    LOADING: 0,
    MENU: 1,
    GAME: 2
}
let gameManager
$.use(update)
$.width = 1280
$.height = 720
$.makeEnemy = makeEnemy

// $.debug = true
const gameState = states.GAME
let track = $.loadTextFile("../data/track.txt")
let waves = $.loadTextFile("../data/waves.txt")
let enemyTypes = $.loadJsonFile("../data/enemies.json")
let tiles = [
    $.loadImage(0,0, "../images/tiles0.png"),
    $.loadImage(0,0, "../images/tiles1.png"),
    $.loadImage(0,0, "../images/tiles2.png"),
    $.loadImage(0,0, "../images/tiles3.png"),
    $.loadImage(0,0, "../images/tiles4.png"),
    $.loadImage(0,0, "../images/tiles5.png"),
    $.loadImage(0,0, "../images/tiles6.png"),
    $.loadImage(0,0, "../images/tiles7.png"),
]

function update(){
    switch (gameState) {
        case states.LOADING:
            drawLoading()
            break;
        case states.MENU:
            drawMenu()
            break;
        case states.GAME:
            drawGame()
            break;
    }
}

function drawLoading(){

}

function drawMenu(){

}

function drawGame(){
    if(gameManager == undefined){
        gameManager = new GameManager($,waves,enemyTypes,makeEnemy)
        gameManager.createMap(track, tiles)
        console.log(gameManager.grassGroup)
    }
    gameManager.pathGroup.draw()
}