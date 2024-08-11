export function makeShop(pen){
    let shop = {}
    shop.isOpen = false
    shop.x = pen.wP(90)
    shop.y = pen.hP(10)
    shop.w = 200
    shop.h = pen.hP(75)
    shop.win = {x: pen.wP(90), y: pen.hP(10), w: pen.wP(10), h: 100}
    shop.info = {x: 0, y: pen.hP(90), w: pen.wP(100), h: pen.hP(10)}
    shop.openButton = pen.makeUiButton(pen, pen.w-20,shop.win.y+30,40,60, "<<")
    shop.closeButton = pen.makeUiButton(pen, shop.win.x-20,shop.win.y+30,40,60, "X")
    shop.cancelButton = pen.makeUiButton(pen, shop.win.x+(shop.win.w/2),shop.win.y, 100, 100, "CANCEL")
    shop.towerGroup = pen.makeGroup()
    shop.towerGroup.name = "ShopTowers"
    shop.towerButtons = []
    shop.state = "CLOSED"
    shop.selected = null
    shop.selectedInfo = null
    shop.canPlace = true

    let i = 0
    let x = shop.win.x + 40
    let y = shop.win.y + 50
    for(let tower in pen.data.tower){
        let type = pen.data.tower[tower]
        let newTower = pen.makeTower(pen, x, y, type)
        newTower.info = type.info
        newTower.name = type.name
        shop.towerGroup.push(newTower)
        let towerButton = pen.makeUiButton(pen, x, y, 32,32, "")
        shop.towerButtons.push(towerButton)
        if(i%2 == 0){
            x += 50
        } else {
            x -= 50
            y += 50
            shop.win.h += 50
        }
        i++
    }


    shop.drawTowerButtons = function(){
        for(let i=0; i<this.towerGroup.length;i++){
            this.towerButtons[i].draw()
            this.towerGroup[i].draw()

            if(this.towerButtons[i].isHovered()){
                this.drawInfoWindow(this.towerGroup[i], this.towerButtons[i])
            }
        }
    }

    shop.drawInfoWindow = function(unit, btn) {
        pen.colour.fill = "#ffffffb3"
        pen.shape.rectangle(this.info.x, this.info.y, this.info.w, this.info.h)
        pen.colour.fill = "#1e1e1e"
        pen.text.print(pen.wP(50), this.info.y + 30, `${unit.name}: ${unit.info}`)
        pen.text.print(pen.wP(40), this.info.y + 50, `Costs: $${unit.value}`)
        if(unit.value < pen.game.money){
            pen.colour.fill = "#04AF70"
            if(btn.up){
                let tower = pen.getTowerType(unit.typeId)
                this.selected = pen.makeTower(pen, pen.mouse.x, pen.mouse.y, tower)
                this.state = "PURCHASING"
            }
        } else {
            pen.colour.fill = "#FF0000"
        }
        pen.text.print(pen.wP(60), this.info.y + 50, `You have: $${pen.game.money}`)
    }

    shop.drawWindow = function(){
        pen.shape.strokeWidth = 0
        pen.shape.alignment.x = "left"
        pen.shape.alignment.y = "top"
        pen.colour.fill = "#ffffffb3"
        pen.shape.rectangle(this.win.x, this.win.y, this.win.w, this.win.h)
        pen.text.print((this.win.x + this.win.w/2), this.win.y + 20, "SHOP")
    }

    shop.openState = function(){
        if(this.closeButton.up){
            this.state = "CLOSED"
        }
        if(this.selected){
            this.state = "PURCHASING"
        }
        this.closeButton.draw()
        this.drawWindow()
        this.drawTowerButtons()

    }

    shop.closedState = function(){
        this.openButton.draw()
        if(this.openButton.up){
            this.state = "OPEN"
        }
    }

    shop.purchaseState = function(){
        if(!this.selected.exists || this.cancelButton.up){
            this.selected = null
            this.state = "OPEN"
        } else if(!this.cancelButton.isHovered()){
            this.canPlace = (this.selected.overlaps(pen.pathGroup) || this.selected.overlaps(pen.towerGroup)) ? false : true
            this.selected.attackRange.fill = this.canPlace ? "#00000080" : "#ff646480"
            this.selected.x = pen.mouse.x
            this.selected.y = pen.mouse.y
            this.selected.attackRange.x = pen.mouse.x
            this.selected.attackRange.y = pen.mouse.y
            this.selected.attackRange.draw()
            this.selected.draw()
            if(pen.mouse.leftReleased && this.canPlace){
                pen.game.spawnTower(pen.mouse.x, pen.mouse.y, this.selected.typeId)
                pen.game.money -= this.selected.value
                this.selected.remove()
            }
        }
        this.cancelButton.draw()

    }

    shop.draw = function(){
        switch (this.state) {
            case "CLOSED":
                this.closedState()
                break;
            case "OPEN":
                this.openState()
                break;
            case "PURCHASING":
                this.purchaseState()
                break;
        }
        if(this.isOpen){

        } else {
            
            if(this.openButton.up){
                this.isOpen = true
            }
        }
    }

    return shop
}