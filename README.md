# extendify

**Deep extend with customizable behavior for Node.js.**

Extedify is a lightweight wrapper over [lodash](http://lodash.com)'s `_.merge` (like a *deep* `_.extend`) with customizable handling of arrays, booleans, numbers and strings.

By default, *extedify* will behave exactly like lodash's `_.merge`.


## Installation

```javascript
npm install extendify
```

## Usage

```javascript
var extendify = require('extendify');

myExtend = extendify({
    // options
});
```


## Options

- `inPlace` – Override the 'source' with the result?
    - `true` *default*
    - `false`
- `inDeep` – Use deep extend?
    - `true` *default*
    - `false`
- `arrays` – How to handle arrays?
    - `'replace'`
    - `'concat'`
    - `'merge'` *default*
    - `'or'`
    - `'and'`
- `booleans` – How to handle booleans?
    - `'replace'` *default*
    - `'concat'`
    - `'or'`
    - `'and'`
- `numbers` – How to handle numbers?
    - `'replace'` *default*
    - `'concat'`
    - `'or'`
    - `'and'`
- `strings` – How to handle strings?
    - `'replace'` *default*
    - `'concat'`
    - `'or'`
    - `'and'`


## Examples

Let's get an _.extend function that
- is **immutable to it's arguments**,
- **replaces arrays**,
- supports **nested objects** (also known as **deep extends**).

```javascript
myExtend = extendify({
    inPlace: false,
    arrays : 'replace'
});

object1 = {
    a:{
        list: [1, 2]
    },
    b: 4
};

object2 = {
    a:{
        list: [3]
    }
};
```

`myExtend(object1, object2);` will give you the following. `obj1 === res` is `false`.

```
{
    a: {
        list: [3]
    },
    b: 4
}
```

More examples are available in the 'examples.js' file.


## Contributions

Your feedback is welcome, email me at [_reshef.shai@gmail.com_](mailto:reshef.shai@gmail.com).
