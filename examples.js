var _ = require('lodash');
var extendify = require('./app.js');

var obj1,obj2,obj3,res;

/*
Example #1
Get an _.extend function that:
1. Is immutable to it's arguments.
2. Replaces arrays. (by default lodash's merge them: [1,2] + [3] -> [3,2])
3. Supports nested objects, aka deep extends. (given..)
*/
_.extend = extendify({
    inPlace: false,
    arrays : 'replace'
});

obj1 = {
    a:{
        arr: [1,2]
    },
    b: 4
};

obj2 = {
    a:{
        arr: [3]
    }
};

res = _.extend(obj1,obj2);
console.log(JSON.stringify(res)); //{'a':{'arr':[3]},'b':4}
console.log(obj1 === res); //false

/*
Example #2
Get an _.extend function that:
1. Concats arrays
2. Concats strings
3. 'Or' booleans
4. changes the source obj itself.
*/
_.extend = extendify({
    inPlace: true, //also the default
    booleans : 'or',
    arrays : 'concat',
    strings: 'concat'
});

obj1 = {
    bool: true,
    a: ['e','x','t'],
    s: 'ext'
};

obj2 = {
    bool: false,
    a: ['e','n','d']
};

obj3 = {
    bool: false,
    a: ['i','f','y'],
    s: 'endify'
};

_.extend(obj1,obj2,obj3);
console.log(JSON.stringify(obj1)); //{"bool":true,"a":["e","x","t","e","n","d","i","f","y"],"s":"extendify"}

/*
 Example #3
 Get an _.extend function that:
 1. Is immutable to it's arguments.
 2. Merges arrays. (default)
 3. concats numbers (even if inside arrays)
 */
_.extend = extendify({
    inPlace: false,
    arrays : 'merge', //also the default
    numbers: "concat"
});

var obj1 = {
    n: 2,
    a: [1,2]
};

var obj2 = {
    n: 2,
    a: [3]
};

var res = _.extend(obj1,obj2);
console.log(JSON.stringify(res)); //{"n":[2,2],"a":[[1,3],2]} (Notice [1,3] used the numbers "concat" option)

/*
 Example #4
 Get an _.extend function that:
 1. Changes the source object itself
 2. Is shallow - no deep extending
 */
_.extend = extendify({
    inPlace: true,
    isDeep: false
});

var obj1 = {
    n: 1,
    a: {
        q: "1"
    }
};

var obj2 = {
    n: 2,
    a: {
        s: "2"
    }
};

_.extend(obj1,obj2);
console.log(JSON.stringify(obj1)); //{"n":2,"a":{"s":"2"}}