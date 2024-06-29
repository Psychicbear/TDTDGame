import { $ } from "../lib/Pen.js";
import { GameManager } from "./gameManager.js";
import { makeEnemy } from "./enemy.js";
import { enemies, towers, bullets } from "./fakeJson.js";
import { Pathfinding } from "./pathfinding.js";
import { makeShot, makeTower } from "./tower.js";
import { makeUiButton } from "./button.js";
import { makeShop } from "./shop.js";
const states = {
    LOADING: 0,
    MENU: 1,
    GAME: 2
}
let gameManager
$.use(update)
preload()
setup()

// $.debug = true
const gameState = states.GAME
// let enemyTypes = $.loadJsonFile("../data/enemies.json")
let tiles

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
    if($.game == undefined){
        $.game = new GameManager($, new Pathfinding())
        $.game.spawnTower(1090,620,0)
        $.shop = makeShop($)
    }
    $.game.runState()
}

function preload(){
    $.data = {
        enemy: enemies,
        tower: towers,
        bullet: bullets,
        waves: $.loadTextFile("../data/waves.txt"),
        map: $.loadTextFile("../data/mapTiles.txt"),
        path: $.loadTextFile("../data/pathNodes.txt")
    }
    $.assets = {
        tiles: [
            $.loadImage(0,0, "../images/tiles0.png"),
            $.loadImage(0,0, "../images/tiles1.png"),
            $.loadImage(0,0, "../images/tiles2.png"),
            $.loadImage(0,0, "../images/tiles3.png"),
            $.loadImage(0,0, "../images/tiles4.png"),
            $.loadImage(0,0, "../images/tiles5.png"),
            $.loadImage(0,0, "../images/tiles6.png"),
            $.loadImage(0,0, "../images/tiles7.png"),
        ],
        enemies: [
            $.loadImage(0,0, "../images/white0001.png"),
            $.loadImage(0,0, "../images/brown0001.png"),
            $.loadImage(0,0, "../images/black0001.png"),
        ],
        towers: [
            $.loadImage(0,0, "../images/tower0001.png"),
            $.loadImage(0,0, "../images/tower0002.png"),
            $.loadImage(0,0, "../images/tower0003.png"),
            $.loadImage(0,0, "../images/tower0004.png"),
            $.loadImage(0,0, "../images/tower0005.png"),
        ]
    }
}

//Sets up Pen instance with additional methods and attributes
function setup(){
    $.width = 1280
    $.height = 720

    //Gets percentage of Canvas width
    $.wP = function(num){
        if(num > 0 && num<=100){
            return (this.width/100) * num
        } 
        return Error("Invalid number for canvas width percentage")
    }
    //Gets percentage of Canvas height
    $.hP = function(num){
        if(num > 0 && num<=100){
            return (this.height/100) * num
        } 
        return Error("Invalid number for canvas height percentage")
    }

    //Initialises pathfinding lib
    $.pathfinding = new Pathfinding()
    
    //Declaring global groups
    $.pausableGroup = $.makeGroup()
    $.enemyGroup = $.makeGroup()
    $.allShotGroup = $.makeGroup()
    $.towerGroup = $.makeGroup()
    $.pathGroup = $.makeGroup()

    //Group Debug names
    $.enemyGroup.name = "Enemies"
    $.allShotGroup.name = "All Shots"
    $.towerGroup.name = "Live Towers"
    $.pathGroup.name = "Path Tiles"

    //Gets enemy data by ID
    $.getEnemyType = function(id){
        let enemies = this.data.enemy
        for(const i in enemies){
            if(enemies[i].id == id){
                return enemies[i]
            }
        }
        return null
    }

    //Gets tower data by ID
    $.getTowerType = function(id){
        let towers = this.data.tower
        for(const i in towers){
            if(towers[i].id == id){
                return towers[i]
            }
        }
        return null
    }
    
    //Gets shot data by ID
    $.getShotType = function(id){
        let bullets = this.data.bullet
        for(const i in bullets){
            if(bullets[i].id == id){
                return bullets[i]
            }
        }
        return null
    }

    //Adds attribute to live units enabling the pause feature
    $.allowPausing = function(unit){
        unit.maxSpeed = unit.speed
        unit.oldState = unit.state
        unit.pauseUnit = function() {
            this.oldState = this.state
            this.speed = 0
            this.state = "PAUSED"
        }
        unit.unpauseUnit = function() {
            this.state = this.oldState
            this.speed = this.maxSpeed
        }
    
        this.pausableGroup.push(unit)
    }

    $.makeEnemy = makeEnemy
    $.makeTower = makeTower
    $.makeShot = makeShot
    $.makeUiButton = makeUiButton
    $.game = undefined
    $.shop = undefined
}