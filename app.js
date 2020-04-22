const clone         = require('lodash/clone');
const isArray       = require('lodash/isArray');
const isBoolean     = require('lodash/isBoolean');
const isNumber      = require('lodash/isNumber');
const isString      = require('lodash/isString');
const isUndefined   = require('lodash/isUndefined');
const isPlainObject = require('lodash/isPlainObject');
const isFunction    = require('lodash/isFunction');
const mergeWith     = require('lodash/mergeWith');
const union         = require('lodash/union');

const REPLACE = 'replace';
const CONCAT = 'concat';
const MERGE = 'merge';
const OR = 'or';
const AND = 'and';
const UNION = 'union'


var recoginize = {
    arrays: isArray,
    booleans: isBoolean,
    numbers: isNumber,
    strings: isString
};

function getFuncByBehaviour(behaviour) {
    switch (behaviour) {
        case REPLACE:
            return function(x, y) {
                return y;
            };
        case CONCAT:
            return function(x, y) {
                x = (isArray(x) || isString(x)) ? x : (isUndefined(x) ? [] : [x]);
                y = (isArray(y) || isString(y)) ? y : (isUndefined(y) ? [] : [y]);
                return x.concat(y);
            };
        case UNION:
            return function(x, y) {
                if (!isArray(x) && !isArray(y)) {
                    return undefined;
                }
                x = (isArray(x) || isString(x)) ? x : (isUndefined(x) ? [] : [x]);
                y = (isArray(y) || isString(y)) ? y : (isUndefined(y) ? [] : [y]);
                return union(x, y);
            };
        case MERGE:
            return undefined;
        case OR:
            return function(x, y) {
                return x || y;
            };
        case AND:
            return function(x, y) {
                return x && y;
            };
    }
}

function customizeExtend(options) {
    options = options || {};

    var inPlace = isUndefined(options.inPlace) ? true : options.inPlace;
    delete options.inPlace;

    var isDeep = isUndefined(options.isDeep) ? true : options.isDeep;
    delete options.isDeep;

    function customizeByOptions(x, y) {
        if (!isDeep && isPlainObject(y)) {
            return y;
        }

        for (var type in options) {
            if (recoginize[type](y)) {
                var customFunc = getFuncByBehaviour(options[type]);
                if (isFunction(customFunc)) {
                    return customFunc(x, y);
                }
                break;
            }
        }

        return undefined;
    }

    return function() {
        var newArguments = Array.prototype.slice.call(arguments);

        if (!inPlace) {
            newArguments[0] = clone(arguments[0], isDeep);
        }

        newArguments.push(customizeByOptions);
        return mergeWith.apply(this, newArguments);
    }
}

module.exports = customizeExtend;
