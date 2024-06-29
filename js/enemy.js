export function makeEnemy(pen, x, y, w, h, hp, spd, dmg, scale, val, asset){
    let enemy = pen.makeBoxCollider(x,y,w,h)
    enemy.asset = asset
    enemy.hp = hp
    enemy.friction = 0
    enemy.speed = spd
    enemy.dmg = dmg
    enemy.scale = scale
    enemy.value = val
    enemy.state = "MOVING"
    enemy.rotateTo = function(x2,y2){
        let dx = x2 - this.x
        let dy = y2 - this.y
        let angle = pen.math.atan2(dy, dx)
        angle += 90
        this.direction = angle
    }
    enemy.nextPoint = {x: pen.w-48, y: pen.h-16}
    enemy.pathIndex = 0
    enemy.path = pen.pathfinding.findPath(enemy.nextPoint.x, enemy.nextPoint.y, 20,50)
    enemy.movingState = function() {
        if(Math.abs(this.x - this.nextPoint.x) + Math.abs(this.y - this.nextPoint.y) < 5){
            this.x = this.nextPoint.x
            this.y = this.nextPoint.y
            this.state = "FINDINGNODE"
        } 
    }

    enemy.findNodeState = function(){
        this.pathIndex += 1
        this.nextPoint = this.path[this.pathIndex]
        this.rotateTo(this.nextPoint.x, this.nextPoint.y)
        this.state = "MOVING"
    }
    enemy.retreatState = () => {
        
    }

    enemy.fsm = function() {
        if(this.exists){
            switch (this.state) {
                case "MOVING":
                    this.movingState()
                    break;
                case "FINDINGNODE":
                    this.findNodeState()
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

