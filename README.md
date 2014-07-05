# Extendify

#### Deep extend with customizable behavior.


Extedify wraps [lodash](http://lodash.com)'s _.merge with pre-defined common behaviors. Just choose the function you need for each property type. (Arrays, Numbers etc..)

By default, extedify will behave exactly like lodash's _.merge.

--------------

##Installation
```javascript
npm install extendify
```
##Usage
```javascript
var _ = require('lodash'); //underscore's ok too..
var extendify = require('extendify');

_.extend = extendify({
//options
})
```

--------------
##Options

- `inPlace` - `true` (default) /`false`. Will the result override the 'source' object or return a new object.
- `arrays` - `"replace"`/`"concat"`/`"merge"`(default)/`"or"`/`"and"`
- `booleans` - `"replace"`(default)/`"concat"`/`"or"`/`"and"`
- `numbers` - `"replace"`(default)/`"concat"`/`"or"`/`"and"`
- `strings` - `"replace"`(default)/`"concat"`/`"or"`/`"and"`
- `undefineds` - `"replace"`(default)/`"concat"`/`"or"`/`"and"`

--------------
##Examples

Get an _.extend function that:

1. **Is immutable to it's arguments.**

2. **Replaces arrays.** (by default lodash's merge them: [1,2] + [3] -> [3,2])

3. Supports **nested objects**, aka **deep extends.** (given..)

```javascript
_.extend = extendify({
    inPlace: false,
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
```

More examples are available in the 'examples.js' file.

--------------
Your feedback is welcome! email me at: _reshef.shai@gmail.com_
