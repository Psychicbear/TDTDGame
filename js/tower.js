/*
FSM states
Searching: Awaits target
Shooting: Shoot bullet
Reloading: Awaits reload timer
*/

export function makeTower(pen, x, y, type){
    let tower = pen.makeBoxCollider(x, y, 20, 20)
    tower.typeId = type.id
    tower.asset = pen.assets.towers[type.id]
    tower.attackRange = pen.makeBoxCollider(x,y, type.range, type.range)
    tower.state = "SEARCHING"
    tower.value = type.cost
    tower.sellCost = type.cost * 0.7
    tower.range = type.range
    tower.spd = type.spd
    tower.reloadTimer = null
    tower.targetEnemy = null
    tower.ownShotsGroup = pen.makeGroup()
    tower.shotType = pen.getShotType(type.bulletType)
    tower.switchState = function(newState){
        console.log("Switching state to: " + newState)
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

    tower.shoot = function(){
        this.rotateTo(this.targetEnemy.x, this.targetEnemy.y)
        let bullet = pen.makeShot(pen, this.x, this.y, this.direction, this.shotType.speed, this.shotType.damage)
        pen.allShotGroup.push(bullet)
        this.ownShotsGroup.push(bullet)
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
        if(this.reloadTimer <= this.spd){
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

export function makeShot(pen, x, y, direction, spd, dmg){
    let bullet = pen.makeBoxCollider(x, y, 16, 16)
    bullet.speed = spd
    bullet.friction = 0
    bullet.direction = direction
    bullet.rotation = direction
    bullet.dmg = dmg

    return bullet
}
