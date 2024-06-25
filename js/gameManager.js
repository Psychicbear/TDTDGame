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
    spawnTimer = 0
    spawnAt = 500
    state
    pen
    pathGroup
    constructor(pen, waves, enemyTypes, enemyConstructor){
        this.pen = pen
        this.state = this.states.IDLE
        this.pathGroup = this.pen.makeGroup()
        this.waves = waves
        this.enemyData = enemyTypes
        this.makeEnemy = enemyConstructor
        this.enemyGroup = this.pen.makeGroup()
    }

    runState(){
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

    createMap(mapData,tiles){
        let i = 0;
        let x = 16;
        let y = 16;
        for(let i=0; i<mapData.length; i++){
            let line = mapData[i]
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
    }

    idleState(){
        if($.keys.down("space")){
            this.state = "NORMAL"
        }
        this.pen.text.print(this.pen.w/4, this.pen.h/5, "Press SPACE to spawn a wave")
    }
    
    waveState(fast = false){
        let spawnSpd = fast ? 250 : 500
        //Creates Enemies and iteratres through wave
        if(this.currentEnemy < this.waves[this.waveIndex].length){
            if(this.spawnTimer >= spawnSpd){
                let waveEnemy = this.waves[this.waveIndex][this.enemyIndex]
                let enemyType = fnd(this.enemyData, (enemy) => {return enemy.id == waveEnemy})
                let enemy = this.pen.makeEnemy(this.pen, this.pen.w-48, this.pen.h-16, 32, 32, enemyType.hp, enemyType.spd, enemyType.dmg, enemyType.scale, enemyType.value)
                this.enemyGroup.push(enemy)
                this.enemyIndex += 1
                this.spawnTimer = 0
            } else {this.spawnTime += $.time.msElapsed}
        } else if(this.enemyGroup.length < 1){
            this.waveIndex += 1
            this.enemyIndex = 0
            if(this.waveIndex == this.waves.length){
                this.state = "GAMEOVER"
            } else {this.state = "IDLE"}
        } 
    }

    pauseState(){

    }

    gameoverState(){

    }

    spawnWave(fast = false){

    }

    findEnemy(id){
        this.enemyData.find()
    }

}