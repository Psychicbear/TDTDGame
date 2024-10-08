export const enemies = {
    "whiteBasic": {
        "id": 0,
        "spriteIndex": 0,
        "name": "whiteBasic",
        "scale": 1.75,
        "spd": 10,
        "hp": 2,
        "value": 15,
        "dmg": 1,
        "resistances": []
    },
    "whiteTank": {
        "id": 1,
        "spriteIndex": 0,
        "name": "whiteTank",
        "scale": 2,
        "spd": 8,
        "hp": 3,
        "value": 20,
        "dmg": 2,
        "resistances": []
    },
    "whiteFast": {
        "id": 2,
        "spriteIndex": 0,
        "name": "whiteFast",
        "scale": 1.5,
        "spd": 20,
        "hp": 1,
        "value": 20,
        "dmg": 2,
        "resistances": []
    },
    "whiteBoss": {
        "id": 3,
        "spriteIndex": 0,
        "name": "whiteBoss",
        "scale": 3.5,
        "spd": 8,
        "hp": 75,
        "value": 75,
        "dmg": 10,
        "resistances": []
    },
    "brownBasic": {
        "id": 4,
        "spriteIndex": 1,
        "name": "brownBasic",
        "scale": 1.5,
        "spd": 15,
        "hp": 6,
        "value": 35,
        "dmg": 4,
        "resistances": []
    },
    "brownTank":{
        "id": 5,
        "spriteIndex": 1,
        "name": "brownTank",
        "scale": 2,
        "spd": 10,
        "hp": 12,
        "value": 50,
        "dmg": 6,
        "resistances": []
    },
    "brownFast": {
        "id": 6,
        "spriteIndex": 1,
        "name": "brownFast",
        "scale": 1.25,
        "spd": 30,
        "hp": 3,
        "value": 20,
        "dmg": 6,
        "resistances": []
    },
    "brownBoss": {
        "id": 7,
        "spriteIndex": 1,
        "name": "brownBoss",
        "scale": 3.5,
        "spd": 12,
        "hp": 125,
        "value": 20,
        "dmg": 15,
        "resistances": []
    }
}

export const bullets = {
    "main":{
        "id": 0,
        "spriteIndex": 0,
        "name": "biscuit",
        "speed": 50,
        "life": 300,
        "damage": 1
    },
    "water":{
        "id": 1,
        "spriteIndex": 0,
        "name": "water",
        "speed": 40,
        "life": 100,
        "damage": 0,
        "scary": true
    },
    "fast":{
        "id": 2,
        "spriteIndex": 0,
        "name": "50 Calibre Biscuit",
        "speed": 700,
        "life": 200,
        "damage": 3
    }
}

export const towers = {
    "single": {
        "name": "Biscuit Dispenser",
        "id": 0,
        "info": "Ol' reliable, feeds cats till they tire from eating",
        "cost": 200,
        "attackSpeed": 400,
        "firetype": "target",
        "bulletType": 0,
        "shotLife": 300,
        "range": 100,
        "upgrades": [
            [
                {
                    "id": 0,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by 25%",
                    "multiplier": 0.25,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by another 25%",
                    "multiplier": 0.25,
                    "price": 200
                },
                {
                    "id": 2,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by 25%",
                    "multiplier": 0.25,
                    "price": 125
                },
            ],
            [
                {
                    "id": 0,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Doubles the tower's damage",
                    "multiplier": 1,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Doubles the tower's damage again",
                    "multiplier": 2,
                    "price": 125
                },
                {
                    "id": 2,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Makes tower damage deadly",
                    "multiplier": 3,
                    "price": 125
                },
            ],
            [
                {
                    "id": 0,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack faster",
                    "multiplier": 0.33,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack even faster",
                    "multiplier": 0.33,
                    "price": 125
                },
                {
                    "id": 2,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack very fast",
                    "multiplier": 0.34,
                    "price": 125
                },
            ],
        ]
    },
    "circle": {
        "name": "Round Feeder",
        "id": 1,
        "info": "Efficient! This tower feeds multiple cats around it",
        "cost": 300,
        "attackSpeed": 500,
        "firetype": "around",
        "bulletType": 0,
        "projectiles": 8,
        "shotLife": 300,
        "range": 100,
        "upgrades": [
            [
                {
                    "id": 0,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by 25%",
                    "multiplier": 0.25,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by another 25%",
                    "multiplier": 0.25,
                    "price": 200
                },
                {
                    "id": 2,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by 25%",
                    "multiplier": 0.25,
                    "price": 125
                },
            ],
            [
                {
                    "id": 0,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Doubles the tower's damage",
                    "multiplier": 1,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Doubles the tower's damage again",
                    "multiplier": 2,
                    "price": 125
                },
                {
                    "id": 2,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Makes tower damage deadly",
                    "multiplier": 3,
                    "price": 125
                },
            ],
            [
                {
                    "id": 0,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack faster",
                    "multiplier": 0.33,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack even faster",
                    "multiplier": 0.33,
                    "price": 125
                },
                {
                    "id": 2,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack very fast",
                    "multiplier": 0.34,
                    "price": 125
                },
            ],
        ]
    },
    "double":{
        "name": "Double Feeder",
        "id": 2,
        "info": "With two barrels, this tower can feed two cats at once",
        "cost": 550,
        "attackSpeed": 600,
        "bulletType": 0,
        "firetype": "target",
        "shotLife": 300,
        "range": 150,
        "upgrades": [
            [
                {
                    "id": 0,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by 25%",
                    "multiplier": 0.25,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by another 25%",
                    "multiplier": 0.25,
                    "price": 200
                },
                {
                    "id": 2,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by 25%",
                    "multiplier": 0.25,
                    "price": 125
                },
            ],
            [
                {
                    "id": 0,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Doubles the tower's damage",
                    "multiplier": 1,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Doubles the tower's damage again",
                    "multiplier": 2,
                    "price": 125
                },
                {
                    "id": 2,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Makes tower damage deadly",
                    "multiplier": 3,
                    "price": 125
                },
            ],
            [
                {
                    "id": 0,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack faster",
                    "multiplier": 0.33,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack even faster",
                    "multiplier": 0.33,
                    "price": 125
                },
                {
                    "id": 2,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack very fast",
                    "multiplier": 0.34,
                    "price": 125
                },
            ],
        ]
    },
    "spray": {
        "name": "Spray Bottle",
        "id": 3,
        "info": "A cat's biggest fear, this tower has a chance of scaring cats back the way they came",
        "cost": 800,
        "attackSpeed": 700,
        "bulletType": 1,
        "firetype": "target",
        "shotLife": 300,
        "range": 90,
        "upgrades": [
            [
                {
                    "id": 0,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by 25%",
                    "multiplier": 0.25,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by another 25%",
                    "multiplier": 0.25,
                    "price": 200
                },
                {
                    "id": 2,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by 25%",
                    "multiplier": 0.25,
                    "price": 125
                },
            ],
            [
                {
                    "id": 0,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Doubles the tower's damage",
                    "multiplier": 1,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Doubles the tower's damage again",
                    "multiplier": 2,
                    "price": 125
                },
                {
                    "id": 2,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Makes tower damage deadly",
                    "multiplier": 3,
                    "price": 125
                },
            ],
            [
                {
                    "id": 0,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack faster",
                    "multiplier": 0.33,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack even faster",
                    "multiplier": 0.33,
                    "price": 125
                },
                {
                    "id": 2,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack very fast",
                    "multiplier": 0.34,
                    "price": 125
                },
            ],
        ]
    },
    "sniper": {
        "name": "Sniper Feeder",
        "id": 4,
        "info": "High range, high damage, low firerate",
        "cost": 1000,
        "attackSpeed": 1200,
        "bulletType": 2,
        "firetype": "target",
        "shotLife": 300,
        "range": 500,
        "upgrades": [
            [
                {
                    "id": 0,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by 25%",
                    "multiplier": 0.25,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by another 25%",
                    "multiplier": 0.25,
                    "price": 200
                },
                {
                    "id": 2,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by 25%",
                    "multiplier": 0.25,
                    "price": 125
                },
            ],
            [
                {
                    "id": 0,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Doubles the tower's damage",
                    "multiplier": 1,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Doubles the tower's damage again",
                    "multiplier": 2,
                    "price": 125
                },
                {
                    "id": 2,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Makes tower damage deadly",
                    "multiplier": 3,
                    "price": 125
                },
            ],
            [
                {
                    "id": 0,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack faster",
                    "multiplier": 0.33,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack even faster",
                    "multiplier": 0.33,
                    "price": 125
                },
                {
                    "id": 2,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack very fast",
                    "multiplier": 0.34,
                    "price": 125
                },
            ],
        ]
    },
    "super": {
        "name": "Super Tower",
        "id": 5,
        "info": "Crazy fast firerate, the greatest yarn scientists worked together to manufacture this masterpiece",
        "cost": 5000,
        "attackSpeed": 100,
        "bulletType": 0,
        "firetype": "target",
        "shotLife": 700,
        "range": 200,
        "upgrades": [
            [
                {
                    "id": 0,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by 25%",
                    "multiplier": 0.25,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by another 25%",
                    "multiplier": 0.25,
                    "price": 200
                },
                {
                    "id": 2,
                    "type": "range",
                    "name": "Range Up",
                    "desc": "Increases tower range by 25%",
                    "multiplier": 0.25,
                    "price": 125
                },
            ],
            [
                {
                    "id": 0,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Doubles the tower's damage",
                    "multiplier": 1,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Doubles the tower's damage again",
                    "multiplier": 2,
                    "price": 125
                },
                {
                    "id": 2,
                    "type": "damage",
                    "name": "Damage Up",
                    "desc": "Makes tower damage deadly",
                    "multiplier": 3,
                    "price": 125
                },
            ],
            [
                {
                    "id": 0,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack faster",
                    "multiplier": 0.33,
                    "price": 125
                },
                {
                    "id": 1,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack even faster",
                    "multiplier": 0.33,
                    "price": 125
                },
                {
                    "id": 2,
                    "type": "attackspeed",
                    "name": "Speed Up",
                    "desc": "Makes tower attack very fast",
                    "multiplier": 0.34,
                    "price": 125
                },
            ],
        ]
    }
}