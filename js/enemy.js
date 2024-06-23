import { Collider } from "../lib/Collider";
import { $ } from "../lib/Pen";

export class Enemy extends Collider {
    hp;
    spd;
    constructor(pen, x, y, w, h = w){
        super(pen, x, y, w, h)
    }
}