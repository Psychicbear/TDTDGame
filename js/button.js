export function makeUiButton(pen, x, y, w, h, label=undefined) {
    const button = pen.makeButton(x,y,w,h,label)
    let debounceDelay = 300
    let debounceTimeout = null;
    
    const originalDownGetter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(button), 'down').get;
    const originalUpGetter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(button), 'up').get;

    Object.defineProperty(button, 'down', {
        get() {
            if (originalDownGetter.call(button)) {
                if (!debounceTimeout) {
                    debounceTimeout = setTimeout(() => {
                        debounceTimeout = null;
                    }, debounceDelay);
                    return true;
                }
                return false;
            }
            return false;
        },
        configurable: true
    });

    Object.defineProperty(button, 'up', {
        get() {
            if (originalUpGetter.call(button)) {
                if (!debounceTimeout) {
                    debounceTimeout = setTimeout(() => {
                        debounceTimeout = null;
                    }, debounceDelay);
                    return true;
                }
                return false;
            }
            return false;
        },
        configurable: true
    });

    return button;
}