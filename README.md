#arc4 [![Build Status](https://travis-ci.org/hex7c0/arc4.svg?branch=master)](https://travis-ci.org/hex7c0/arc4) [![NPM version](https://badge.fury.io/js/arc4.svg)](http://badge.fury.io/js/arc4)

[RC4](https://en.wikipedia.org/wiki/RC4) stream cipher

my original [python code](https://github.com/hex7c0/EncryptoPy/blob/master/modules/rc/rc4.py)

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

change your key (warning)
```js
rc4.change('foo');
```

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

same methods with `RC4A` postifx for [RC4A](https://en.wikipedia.org/wiki/RC4#RC4A)
```js
rc4.codeRC4A('string or byte');
```

same methods with `VMPC` postifx for [VMPC](https://en.wikipedia.org/wiki/RC4#VMPC)
```js
rc4.codeVMPC('string or byte');
```

same methods with `RC4p` postifx for [RC4+](https://en.wikipedia.org/wiki/RC4#RC4.2B)
```js
rc4.codeRC4p('string or byte');
```

### rc4(param)

 - `param` - **String | Array** Your key *(default "throw Error")*

#### Examples

Take a look at my [examples](https://github.com/hex7c0/arc4/tree/master/examples)

## License
Copyright (c) 2014 hex7c0

Licensed under the GPLv3 license
