export function makePausableEntity(pen, x, y, w, spd=0){
    let entity = pen.makeCircleCollider(x,y,w)
    entity.fast = false
    entity.speed = spd
    entity.maxSpeed = spd
    entity.maxSpeed = entity.speed
    entity.oldState = entity.state
    entity.state = "IDLE"
    entity.switchSpeed = function(fast){
        this.speed = fast ? this.maxSpeed * 2 : this.maxSpeed
    }
    entity.pauseUnit = function() {
        this.oldState = this.state
        this.speed = 0
        this.state = "PAUSED"
    }
    entity.unpauseUnit = function(fast) {
        this.state = this.oldState
        this.switchSpeed(fast)
    }

    pen.pausableGroup.push(entity)
    return entity
}