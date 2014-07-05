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
    strings: _.isString
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
            return undefined;
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

    var inPlace = _.isUndefined(options.inPlace)? true : options.inPlace;
    delete options.inPlace;

    var isDeep = _.isUndefined(options.isDeep)? true : options.isDeep;
    delete options.isDeep;

    function customizeByOptions(x,y) {
        if(!isDeep &&_.isPlainObject(y)){
            return y;
        }

        for(var type in options) {
            if (recoginize[type](y)) {
                var customFunc = getFuncByBehaviour(options[type]);
                if (_.isFunction(customFunc)){
                    return customFunc(x, y);
                }
                break;
            }
        }

        return undefined;
    }

    return function() {
        var newArguments = Array.prototype.slice.call(arguments);

        if (!inPlace){
            newArguments[0] = _.clone(arguments[0], isDeep);
        }

        newArguments.push(customizeByOptions);
        return _.merge.apply(this, newArguments);
    }
}

module.exports = customizeExtend;


