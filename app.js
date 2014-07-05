var _ = require('lodash');

const REPLACE = 'replace';
const CONCAT = 'concat';
const MERGE = 'merge';
const OR = 'or';
const AND = 'and';

var recoginize = {
    arrays : _.isArray,
    booleans : _.isBoolean,
    numbers : _.isNumber,
    strings: _.isString,
    undefineds : _.isUndefined
};

function getFuncByBehaviour(behaviour){
    switch (behaviour) {
        case REPLACE:
            return function(x,y) {
                return y;
            };
        case CONCAT:
            return function(x,y) {
                x = (_.isArray(x) || _.isString(x))? x : [x];
                y = (_.isArray(y) || _.isString(y))? y : [y];
                return x.concat(y);
            };
        case MERGE:
            return function(x,y) {
                return undefined;
            };
        case OR:
            return function(x,y) {
                return x || y;
            };
        case AND:
            return function(x,y) {
                return x && y;
            };
    }
}

function customizeExtend(options) {
    options = options || {};

    var inPlace = options.inPlace || false;
    delete options.inPlace;

    options.arrays = options.arrays || REPLACE;
    options.booleans = options.booleans || REPLACE;
    options.numbers = options.numbers || REPLACE;
    options.strings = options.strings || REPLACE;
    options.undefineds = options.undefineds || REPLACE;



    function customizeByOptions(x,y) {
        for(var type in options) {
            if (recoginize[type](y)) {
                return getFuncByBehaviour(options[type])(x, y);
            }
        }
    }

    return function() {
        var newArguments = Array.prototype.slice.call(arguments);

        if (!inPlace){
            newArguments[0] = _.clone(arguments[0], true);
        }

        newArguments.push(customizeByOptions);
        return _.merge.apply(this, newArguments);
    }
}

module.exports = customizeExtend;


