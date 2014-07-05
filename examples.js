var _ = require('lodash');
var extendify = require('./app.js');

var obj1,obj2,obj3,res;

//Example #1 - replace arrays
_.extend = extendify({
    inPlace: true,
    arrays : "replace"
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
console.log(JSON.stringify(res)); //{"a":{"arr":[3]},"b":4}
console.log(obj1 === res); //false

//Exmaple #2 - or booleans
_.extend = extendify({
    booleans : "or"
});

var obj1 = {
    bool: true
};

var obj2 = {
    bool: false
};

var res = _.extend(obj1,obj2);
console.log(JSON.stringify(res)); //{"bool":false}

//Exmaple #3 - deep replace arrays
_.extend = extendify({
    arrays : "replace" //also the default
});

var obj1 = {
    a:{
        arr: [1,2]
    }
};

var obj2 = {
    a:{
        arr: [3]
    }
};

var res = _.extend(obj1,obj2);
console.log(JSON.stringify(res)); //{"a":{"arr":[3]}}