export function makeEnemy(pen, x, y, w, goal, hp, spd, dmg, scale, val, asset){
    let enemy = pen.makePausableEntity(pen, x, y, w, spd)
    enemy.asset = asset
    enemy.baseSpeed = spd
    enemy.calculatedSpeed = spd
    enemy.fastSpeed = spd * 2
    enemy.hp = hp
    enemy.friction = 0
    enemy.speed = spd
    enemy.dmg = dmg
    enemy.scale = scale
    enemy.value = val
    enemy.state = "MOVING"
    enemy.retreat = 0
    enemy.rotateTo = function(x2,y2){
        let dx = x2 - this.x
        let dy = y2 - this.y
        let angle = pen.math.atan2(dy, dx)
        angle += 90
        this.direction = angle
    }

    enemy.switchSpeed = function(fast){
        if(fast){
            this.speed = this.fastSpeed
        } else this.speed = this.calculatedSpeed
    }

    //Modifies speed and applies change to fast mode speed, then setting the correct speed to enemy. By default the function sets the speed to the base speed
    enemy.modifySpeed = function(fn = speed => speed){
        this.calculatedSpeed = fn(this.baseSpeed)
        this.fastSpeed = this.calculatedSpeed * 2
        this.switchSpeed(pen.game.fast)
    }

    //Enemy uses a pathfinding algorithm, creating an ordered array of path nodes to travel to
    enemy.nextPoint = {x: pen.w-12, y: pen.h-128}
    enemy.pathIndex = 0
    enemy.path = pen.path

    //State in which enemy is moving towards the next node
    enemy.movingState = function() {
        if(Math.abs(this.x - this.nextPoint.x) + Math.abs(this.y - this.nextPoint.y) < (this.speed * 0.4)){
            this.x = this.nextPoint.x
            this.y = this.nextPoint.y
            if(this.retreat > 0){
                this.state = "RETREAT"
            } else {
                this.state = "FINDINGNODE"
            }
        } 
    }

    //State in which enemy is finding next position to move to
    enemy.findNodeState = function(){
        this.pathIndex += 1
        if(this.pathIndex >= this.path.length){
            this.nextPoint = {x: goal.x, y: goal.y}
        } else {
            this.nextPoint = this.path[this.pathIndex]
        }
        this.rotateTo(this.nextPoint.x, this.nextPoint.y)
        this.state = "MOVING"
    }

    //State in which enemy moves to previous nodes until retreat value is set to zero
    enemy.retreatState = function() {
        this.retreat -= 1
        if(this.retreat > 0){
            this.pathIndex -= 1
            this.nextPoint = this.path[this.pathIndex]
            this.rotateTo(this.nextPoint.x, this.nextPoint.y)
            this.state = "MOVING"
        } else {
            this.modifySpeed()
            this.state = "FINDINGNODE"
        }

    }

    //Runs enemy state logic
    enemy.fsm = function() {
        if(this.exists){
            switch (this.state) {
                case "MOVING":
                    this.movingState()
                    break;
                case "FINDINGNODE":
                    this.findNodeState()
                    break;
                case "RETREAT":
                    this.retreatState()
                    break;
                case "PAUSED":
                    break;
            }
        }
    }

    enemy.rotateTo(enemy.nextPoint.x, enemy.nextPoint.y)
    return enemy
}

