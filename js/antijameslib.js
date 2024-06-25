export function fe(iter, fn){
    for(let i=0; i<=iter.length; i++){
        fn(iter[i])
    }
}

export function mp(iter, fn){
    for(let i=0; i<=iter.length; i++){
       iter[i] = fn(iter[i])
    }
}

export function fnd(iter, cond){
    let found = false
    for(let i=0; i<iter.length; i++){
        if(cond(iter[i])){
            let found = iter[i]
        }
    }
    return found ? found : null
}