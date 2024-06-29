/*
    FSM
    Idle: Await game start
    Normal: Wave active at normal speed
    Fast: Wave active at 2x speed
    Paused: Game paused, awaiting play
*/
export class GameManager{
    states = {
        IDLE: "IDLE",
        NORMAL: "NORMAL",
        FAST: "FAST",
        PAUSED: "PAUSED",
        GAMEOVER: "GAMEOVER"
    }
    waveActive = false
    health = 100
    money = 300
    waveIndex = 0
    enemyIndex = 0
    spawnTimer = 500
    spawnAt = 500
    state
    pen
    pathGroup
    trigger = false
    goal
    paused = false
    constructor(pen){
        this.pen = pen
        this.speedMultiplier = 1
        this.state = this.states.IDLE
        this.oldState = this.state
        this.pathGroup = pen.pathGroup
        this.towerGroup = pen.towerGroup
        this.towerGroup.name = "Live Towers"
        this.allShotGroup = pen.allShotGroup
        this.pausableGroup = pen.pausableGroup
        this.enemyGroup = pen.enemyGroup
        this.waves = pen.data.waves
        this.dmgCollider = pen.makeBoxCollider(20,50,32,32)
        this.waveButton = pen.makeUiButton(pen, pen.wP(75), pen.hP(5), 80, 50, "Start Wave")
        this.shopButton = pen.makeUiButton(pen, pen.wP(90), pen.hP(5), 100, 75)
        this.createMap()
    }

    runState(){
        this.pathGroup.draw()
        this.enemyGroup.draw()
        for(let tower of this.towerGroup){

        }
        this.towerGroup.draw()
        this.allShotGroup.draw()
        this.drawUi()
        this.pauseGame()
        switch (this.state) {
            case "IDLE":
                this.idleState()
                break;
            case "NORMAL":
                this.waveState()
                break;
            case "FAST":
                this.waveState(true)
                break;
            case "PAUSED":
                this.pauseState()
                break;
            case "GAMEOVER":
                this.gameoverState()
                break;
        }
    }

    calculateValue(enemy){
        return enemy.value += Math.floor(this.pen.math.random(0,enemy.value/3))
    }

    createMap(){
        let {map, path} = this.pen.data
        let tiles = this.pen.assets.tiles

        this.pen.pathfinding.loadGrid(path, 16,16, this.pen.w, this.pen.h, false)
        let i = 0;
        let x = 16;
        let y = 16;
        for(let i=0; i<map.length; i++){
            let line = map[i]
            for(let j=0; j<line.length; j++){
                let tileIndex = parseInt(line[j])
                if(tileIndex != 0){
                    let sprite = this.pen.makeBoxCollider(x, y, 32, 32);
                    sprite.asset = tiles[tileIndex]
                    this.pathGroup.push(sprite)
                }
                x += 32;
            }
            x = 16
            y += 32
        }
        this.goal = this.pen.makeBoxCollider(20,50, 32, 32)
    }

    drawUi(){
        this.pen.text.print(this.pen.wP(20), this.pen.hP(5), `HP: ${this.health}  $$$: ${this.money}`)
        this.waveButton.draw()
    }

    idleState(){
        this.pen.shop.draw()
        if(this.pen.keys.down(" ") || this.waveButton.up){
            this.state = "NORMAL"
        }
        this.pen.text.print(this.pen.wP(40), this.pen.hP(5), "Press SPACE to spawn a wave")
    }

 

    pauseGame(){
        if(this.pen.keys.up("p") && !this.paused){
            console.log("Pause pressed")
            for (let unit of this.pausableGroup){
                unit.pauseUnit()
            }
            this.oldState = this.state
            this.state = "PAUSED"
        } 
        this.paused = false
    }

    pauseState(){
        if(this.pen.keys.up("p") && this.paused){
            console.log("unpause pressed")
            for (let unit of this.pausableGroup){
                unit.unpauseUnit()
            }
            this.state = this.oldState
        }
        if(!this.paused){
            this.paused = true
        }
        this.pen.text.print(this.pen.w/4, this.pen.h/5, "GAME IS PAUSED, PRESS 'P' TO RESUME")
    }

    
    waveState(fast = false){
        this.pen.shop.draw()
        // if(!this.trigger){
        //     this.spawnEnemy(this.pen.w-48, this.pen.h, 0)
        //     this.trigger = true
        // }
        let spawnSpd = fast ? 250 : 500
        // console.log(this.enemyData)
        //Creates Enemies and iteratres through wave
        this.updateUnits()
        if(this.enemyIndex < this.waves[this.waveIndex].length){
            this.waveSpawner(spawnSpd)
        } else if(this.enemyGroup.length < 1){
            this.waveIndex += 1
            this.enemyIndex = 0
            if(this.waveIndex == this.waves.length){
                this.state = "GAMEOVER"
            } else {this.state = "IDLE"}
        } 
    }

    updateUnits(){
        if(this.enemyGroup.length > 0){
            for(let enemy of this.enemyGroup){
                enemy.fsm()
                if(enemy.overlaps(this.goal)){
                    this.health -= enemy.dmg
                    enemy.remove()
                }
                for(let shot of this.pen.allShotGroup){
                    if(shot.overlaps(enemy)){
                        enemy.hp -= shot.dmg
                        shot.remove()
                    }
                }
                if(enemy.hp <=0){
                    this.money += this.calculateValue(enemy)
                    enemy.remove()
                }
            }
        
            if(this.towerGroup.length > 0){
                for(let tower of this.towerGroup){
                    tower.fsm()
                }
            }
        }
    }

    waveSpawner(spd){
        if(this.spawnTimer >= spd){
            let waveEnemy = this.waves[this.waveIndex][this.enemyIndex]
            this.spawnEnemy(this.pen.w-48, this.pen.h-16, waveEnemy)
            this.enemyIndex += 1
            this.spawnTimer = 0
        } else {this.spawnTimer += this.pen.time.msElapsed}
    }

    spawnEnemy(x,y,type){
        let enemyType = this.pen.getEnemyType(type)
        let enemy = this.pen.makeEnemy(this.pen, x,y, 32, 32, enemyType.hp, enemyType.spd, enemyType.dmg, enemyType.scale, enemyType.value, this.pen.assets.enemies[enemyType.spriteIndex])
        this.pen.allowPausing(enemy)
        this.enemyGroup.push(enemy)
    }

    spawnTower(x,y,type){
        let towerType = this.pen.getTowerType(type)
        console.log(towerType)
        let tower = this.pen.makeTower(this.pen, x, y, towerType)
        console.log(tower)
        this.pen.allowPausing(tower)
        this.towerGroup.push(tower)
    }


    gameoverState(){

    }
}