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
    money = 99999
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
        this.startPoint = {x: pen.w-12, y: pen.h-128}
        this.endPoint = {x: 20, y: 82}
        this.fast = false
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
        this.mouse = pen.makeBoxCollider(pen.mouse.x, pen.mouse.y, 1, 1)
        this.waveButton = pen.makeUiButton(pen, pen.wP(75), pen.hP(5), 90, 30, "Start Wave")
        this.waveSpeedButton = pen.makeUiButton(pen, pen.wP(75), pen.hP(5), 90, 30, "Normal Speed")
        this.skipButton = pen.makeUiButton(pen, pen.wP(60), pen.hP(5), 90, 30, "Skip Wave")
        this.info = {x: 0, y: this.pen.hP(90), w: this.pen.w, h: this.pen.hP(10)}
        this.closeInfoButton = pen.makeUiButton(pen, pen.wP(90), pen.hP(95), 30, 30, "Close")
        this.sellButton = pen.makeUiButton(pen, pen.wP(60), this.info.y+50, 40,20, "Sell")
        this.pauseButton = pen.makeUiButton(pen, pen.wP(95), pen.hP(5), 40, 40, "Pause")
        this.unpauseButton = pen.makeUiButton(pen, pen.wP(50), pen.hP(50), 100, 50, "Resume Game")
        this.selected = null
        this.selectedInfo = null
        this.testflag = false
        
        this.createMap()
    }

    updateMouse(){
        this.mouse.x = this.pen.mouse.x
        this.mouse.y = this.pen.mouse.y
    }

    handleButton(button, fn){
        button.draw()
        if(button.up){
            fn()
        }
    }

    drawSelectedInfo(){
        if(this.selected && this.selected.exists){
            if(this.pen.shop.state == "OPEN"){
                this.selected = null
            } else {
                this.selected.attackRange.draw()
                this.selected.draw()
                this.pen.shape.alignment.x = "left"
                this.pen.shape.alignment.y = "top"
                this.pen.colour.fill = "#ffffffb3"
                this.pen.shape.rectangle(this.info.x, this.info.y, this.info.w, this.info.h)
                this.pen.colour.fill = "#1e1e1e"
                this.pen.text.print(this.pen.wP(50), this.info.y + 30, `${this.selectedInfo.name}: ${this.selectedInfo.info}`)
                this.pen.text.print(this.pen.wP(40), this.info.y + 50, `Sell for: $${this.selected.sellCost}`)
                
                this.handleButton(this.closeInfoButton, () => {this.selected = null})
                this.handleButton(this.sellButton, () => {
                    this.money += this.selected.sellCost
                    this.selected.remove()
                })
            }
        } else {this.selected = null}
    }

    towerMouseInteract(){
        for(let tower of this.towerGroup){
            if(this.mouse.overlaps(tower)){
                this.pen.colour.fill = "#ffffffb3"
                this.pen.shape.oval(tower.x, tower.y, 22, 22)
                if(this.pen.mouse.leftReleased){
                    this.selected = tower
                    this.selectedInfo = this.pen.getTowerType(tower.typeId)
                    this.pen.shop.state = "CLOSED"
                }
            }
        }
    }

    cleanupShots(){
        for(let shot of this.allShotGroup){
            shot.lifetime -= this.pen.time.msElapsed
            console.log(shot.hp, shot.lifetime)
            if(shot.lifetime <= 0 || shot.hp <= 0){
                shot.remove()
    
            } else if (shot.lifetime <= 100){
                shot.speed -= 5
            }
        }
    }

    runState(){
        this.pathGroup.draw()
        this.enemyGroup.draw()
        this.towerMouseInteract()
        this.towerGroup.draw()
        this.allShotGroup.draw()
        this.drawUi()
        switch (this.state) {
            case "IDLE":
                this.idleState()
                break;
            case "NORMAL":
                this.waveState()
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
        this.pen.path = this.pen.pathfinding.findPath(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y)
        console.log(this.pen.path)
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
        this.goal = this.pen.makeBoxCollider(-20,116, 32, 32)
    }

    drawUi(){
        this.drawSelectedInfo()
    }

    idleState(){
        this.updateMouse()
        //Draw UI
        this.pen.shop.draw()
        this.waveButton.draw()
        this.cleanupShots()
        this.pen.colour.fill = "#ffffff"
        this.pen.text.print(this.pen.wP(20), this.pen.hP(5), `HP: ${this.health}  $$$: ${this.money}`)
        this.pen.text.print(this.pen.wP(40), this.pen.hP(5), `Next wave: ${this.waveIndex + 1}`)
        this.handleButton(this.pauseButton, () => this.pauseGame())

        if(this.pen.keys.down(" ") || this.waveButton.up){
            this.state = "NORMAL"
        }
    }

 

    pauseGame(){
        for (let unit of this.pausableGroup){
            unit.pauseUnit()
        }
        this.oldState = this.state
        this.state = "PAUSED"
    }

    unpauseGame(){
        for (let unit of this.pausableGroup){
            unit.unpauseUnit(this.fast)
        }
        this.state = this.oldState
    }

    pauseState(){
        this.pen.shop.openButton.draw()
        this.pen.colour.fill = "#00000080"
        this.pen.shape.alignment.x = "left"
        this.pen.shape.alignment.y = "top"
        this.pen.shape.rectangle(0,0,this.pen.w,this.pen.h)
        this.handleButton(this.unpauseButton, ()=> {this.unpauseGame()})
    }

    switchSpeed(){
        this.fast = !this.fast
        for (let unit of this.pausableGroup){
            unit.switchSpeed(this.fast)
        }
        this.waveSpeedButton.label = this.fast ? "Fast Speed" : "Normal Speed"
    }

    skipWave(){
        for(let enemy of this.enemyGroup){
            enemy.position = this.goal
        }
    }

    
    waveState(){
        this.updateMouse()
        this.pen.shop.draw()
        this.handleButton(this.pauseButton, () => this.pauseGame())
        this.handleButton(this.waveSpeedButton, () => this.switchSpeed())
        let spawnSpd = this.fast ? 125 : 250
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
        } else {
            this.handleButton(this.skipButton, () => this.skipWave())
        }

        this.pen.colour.fill = "#ffffff"
        this.pen.text.print(this.pen.wP(20), this.pen.hP(5), `HP: ${this.health}  $$$: ${this.money}`)
    }

    chanceRoll(percent){
        let roll = Math.floor(this.pen.math.random(0,100))
        if(roll <= percent){
            return true
        } else return false
    }

    updateUnits(){
        this.cleanupShots()
        for(let enemy of this.enemyGroup){
            enemy.fsm()
            //Deals damage to player when enemy reaches end of path
            if(enemy.overlaps(this.goal)){
                this.health -= enemy.dmg
                enemy.remove()
            }
            for(let shot of this.pen.allShotGroup){
                if(shot.overlaps(enemy) && shot.hp > 0){
                    let alreadyHit = false
                    //Checks if bullet has pierced enemy already, preventing additional damage
                    for(let i of shot.enemiesHit){
                        if(i === enemy) alreadyHit = true
                    }

                    //Damages enemy and applies status effects
                    if(!alreadyHit){
                        enemy.hp -= shot.dmg
                        shot.hp--
                        shot.enemiesHit.push(enemy)

                        //Water tower effect, pushes enemy back 4-5 path nodes quickly if it succeeds
                        if(shot.scary && this.chanceRoll(50)){
                            enemy.retreat = 5
                            enemy.modifySpeed(speed => speed * 3)
                            enemy.state = "RETREAT"
                        }
                    }
                }
            }
            //Cleans up dead enemies, rewarding player with money
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

    waveSpawner(spd){
        if(this.spawnTimer >= spd){
            let waveEnemy = this.waves[this.waveIndex][this.enemyIndex]
            this.spawnEnemy(this.pen.w, this.pen.h-128, waveEnemy)
            this.enemyIndex += 1
            this.spawnTimer = 0
        } else {this.spawnTimer += this.pen.time.msElapsed}
    }

    spawnEnemy(x,y,type){
        let enemyType = this.pen.getEnemyType(type)
        let enemy = this.pen.makeEnemy(this.pen, x,y, 32, 32, this.goal, enemyType.hp, enemyType.spd, enemyType.dmg, enemyType.scale, enemyType.value, this.pen.assets.enemies[enemyType.spriteIndex])
        enemy.switchSpeed(this.fast)
        this.enemyGroup.push(enemy)
    }

    spawnTower(x,y,typeId){
        let towerType = this.pen.getTowerType(typeId)
        let tower = this.pen.makeTower(this.pen, x, y, towerType)
        this.towerGroup.push(tower)
    }


    gameoverState(){

    }

    testOnce(){
        if(!this.testflag){
            console.log()
            this.testflag = true
        }
    }
}