/*
FSM states
Searching: Awaits target
Shooting: Shoot bullet
Reloading: Awaits reload timer
*/

export function makeTower(pen, x, y, type){
    let tower = pen.makePausableEntity(pen, x, y, 20)
    tower.typeId = type.id
    tower.asset = pen.assets.towers[type.id]
    tower.attackRange = pen.makeCircleCollider(x,y, type.range*2)
    tower.attackRange.fill = "#00000080"
    tower.projectiles = type.projectiles ? type.projectiles : 1
    tower.pierce = 2
    tower.spd = CalculatedTrait(type.attackSpeed, 0, function(spd){
        let newVal = spd.base - (spd.base * spd.multiplier)
        console.log(spd.base, newVal)
        return newVal
    })
    tower.availableUpgrades = [[],[],[]]
    for(let i=0; i<= 2; i++){
        for(let upgrade of type.upgrades[i]){
            tower.availableUpgrades[i].push(upgrade.id)
        }
    }
    tower.shootSpd = tower.spd.calculated
    console.log(tower.shootSpd)
    tower.state = "SEARCHING"
    tower.value = type.cost
    tower.sellCost = type.cost * 0.7
    tower.range = type.range
    tower.reloadTimer = type.attackSpeed
    tower.targetEnemy = null
    tower.ownShotsGroup = pen.makeGroup()
    tower.shotType = pen.getShotType(type.bulletType)

    tower.switchSpeed = function(fast){
        this.shootSpd = fast ? this.spd.calculated * 0.5 : this.spd.calculated

    }
    tower.pauseUnit = () =>{}
    tower.unpauseUnit = () =>{}

    tower.switchState = function(newState){
        // console.log(`Tower ${this.id} switching to state: ` + newState)
        this.state = newState
    }

    tower.rotateTo = function(x2,y2){
        let dx = x2 - this.x
        let dy = y2 - this.y
        let angle = pen.math.atan2(dy, dx)
        angle += 90
        this.direction = angle
        this.rotation = angle
    }

    if(type.firetype === "target"){
        tower.shoot = function(){
            this.rotateTo(this.targetEnemy.x, this.targetEnemy.y)
            let bullet = pen.makeShot(pen, this.x, this.y, this.direction, this.shotType, type.shotLife, this.pierce)
            pen.allShotGroup.push(bullet)
            this.ownShotsGroup.push(bullet)
        }
    } else if(type.firetype === "around"){
        tower.shoot = function(){
            let spacing = Math.floor(360 / this.projectiles)
            let angle = 0
            for(let i=0; i<=this.projectiles; i++){
                let bullet = pen.makeShot(pen, this.x, this.y, angle, this.shotType, type.shotLife, this.pierce)
                pen.allShotGroup.push(bullet)
                this.ownShotsGroup.push(bullet)
                angle += spacing
            }
        }
    }



    tower.searchState = function() {
        for (let enemy of pen.enemyGroup){
            if(this.attackRange.overlaps(enemy)){
                this.targetEnemy = enemy
                this.switchState("SHOOTING")
                break
            }
        }
    }

    tower.shootState = function() {
        if(this.targetEnemy){
            if(!this.targetEnemy.exists || !this.attackRange.overlaps(this.targetEnemy)){
                this.targetEnemy = null
                this.switchState("SEARCHING")
            } else {
                this.shoot()
                this.reloadTimer = 0
                this.switchState("RELOADING")
            }
        } else {
            this.switchState("SEARCHING")
        }
    }
    tower.reloadState = function() {
        if(this.reloadTimer <= this.shootSpd){
            this.reloadTimer += pen.time.msElapsed
        } else {
            this.switchState("SHOOTING")
        }
    }
    tower.fsm = function() {
        if(this.exists){
            switch (this.state) {
                case "SEARCHING":
                    this.searchState()
                    break;
                case "SHOOTING":
                    this.shootState()
                    break;
                case "RELOADING":
                    this.reloadState()
                    break;
                case "PAUSED":
                    break;
            }
        }
    }

    return tower
}

export function makeShot(pen, x, y, direction, type, lifetime, hp = 1){ 
    let bullet = pen.makePausableEntity(pen, x, y, 8, type.speed)
    bullet.friction = 0
    bullet.direction = direction
    bullet.rotation = direction
    bullet.dmg = type.damage
    bullet.hp = hp
    bullet.lifetime = lifetime
    bullet.enemiesHit = []
    if(type.scary){
        bullet.scary = true
    }

    return bullet
}

const CalculatedTrait = (val, multiplier, fn) => ({
    base: val,
    multiplier: multiplier,
    calculated: val,
    modify(change){
        this.multiplier += change
        this.calculated = fn(this)
    }
})
