export function makeEnemy(pen, x, y, w, h = w, hp, spd, dmg, scale, val){
    let enemy = $.makeBoxCollider(x,y,w,h)
    enemy.hp = hp
    enemy.spd = spd
    enemy.dmg = dmg
    enemy.scale = scale
    enemy.value = val
    enemy.state = "MOVING"
    enemy.movingState = () => {
        return
    }
    enemy.retreatState = () => {
        return
    }
    enemy.fsm = () => {
        switch (this.state) {
            case "MOVING":
                this.movingState()
                break;
            case "RETREAT":
                this.retreatState()
                break;
        
            default:
                break;
        }
    }

    return enemy
}