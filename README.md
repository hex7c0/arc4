#arc4 [![Build Status](https://travis-ci.org/hex7c0/arc4.svg?branch=master)](https://travis-ci.org/hex7c0/arc4) [![NPM version](https://badge.fury.io/js/arc4.svg)](http://badge.fury.io/js/arc4)

[RC4](http://en.wikipedia.org/wiki/RC4) stream cipher

## Installation

Install through NPM

```
npm install arc4
```
or
```
git clone git://github.com/hex7c0/arc4.git
```

## API

inside nodejs project
```js
var rc4 = require('arc4')('secret_key');

rc4.codeString('foo');
```

### methods

encode string data
```js
rc4.codeString('string');
```

encode byte data
```js
rc4.codeByte([49,50,51]);
```

encode string or byte
```js
rc4.code('string or byte');
```

change your key (warning)
```js
rc4.change('foo');
```


### rc4(param)

 - `param` - **String|Array** Your key *(default "throw Error")*

#### Examples

Take a look at my [examples](https://github.com/hex7c0/arc4/tree/master/examples)

## License
Copyright (c) 2014 hex7c0

Licensed under the GPLv3 license
