//const globalStateEventExpression = /^onGlobalState\w+$/;
const globalStateListeners = {};
const globalStateComponents = new WeakMap();
const globalStateData = {};

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function getEventName(property, action) {
    return `onGlobalState${capitalize(property)}${capitalize(action)}`;
}

function fireEvent(name, ...args) {

    //console.log('FIRING')
    //console.log(globalStateListeners)

    const listeners = globalStateListeners[name] || [];
    try {
        listeners.forEach(component => {
            component[name](...args);
        });
    }
    catch (e) {
        //console.log(e)
    }
}
const globalStateHandler = {
    deleteProperty: function(target, property) {
        const eventName = getEventName(property, 'change');
        fireEvent(eventName);
        delete target[property];
        return true;
    },
    set(target, property, value) {
        if (property in target) {
            const eventName = getEventName(property, 'change');
            fireEvent(eventName, value, target[property]);
        }
        else {
            const eventName = getEventName(property, 'change');
            fireEvent(eventName, value, target[property]);
        }
        target[property] = value;
        return true;
    },
    get(target, property) {
        return target[property];
    }
};
export const globalState = new Proxy(globalStateData, globalStateHandler);
export function registerGlobalState(component) {
    var listeners = [];

    //console.log("registering:", globalStateListeners);

    const method = 'onGlobalStateDataChange';

    if (!globalStateListeners[method]) {
        globalStateListeners[method] = [];
    }
    else {

    }

    globalStateListeners[method].push(component);
    listeners.push(method);
    //}

    Object.keys(component).forEach(name => {
        /*
        var matches = name.match(globalStateEventExpression);
        if(matches) {
            const method = matches[0];
            if(!globalStateListeners[method]) {
                globalStateListeners[method] = [];
            }
            globalStateListeners[method].push(component);
            listeners.push(method);
        }
        */
    }, this);
    globalStateComponents.set(component, listeners);
    component.globalState = globalState;
}
export function unregisterGlobalState(component) {
    var listeners = globalStateComponents.get(component);
    listeners.forEach(name => {

        //console.log("unregistering", component, "from", name)

        var idx = globalStateListeners[name].indexOf(component);

        if (~idx) {
            globalStateListeners[name].splice(idx, 1);
        }
        else {
            console.log(`Component ${name} is not registered`);
        }

        /*
                        if (globalStateListeners[name]) {
                            var idx = globalStateListeners[name].indexOf(component);
                            if (~idx) {
                                globalStateListeners[name].splice(idx, 1);
                            }
                            else {
                                console.log(`Component ${name} is not registered`);
                            }
                        }
                        else {
                            console.log(`Event ${name} does not exists`);
                        }
                      */
    }, this);
    globalStateComponents.delete(component);
}
export function subscribe(property) {
    return getEventName(property, 'change');
}
