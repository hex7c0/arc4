# [arc4](http://supergiovane.tk/#/arc4)
[![NPM version](https://badge.fury.io/js/arc4.svg)](http://badge.fury.io/js/arc4)
[![Build Status](https://travis-ci.org/hex7c0/arc4.svg?branch=master)](https://travis-ci.org/hex7c0/arc4)
[![devDependency Status](https://david-dm.org/hex7c0/arc4/dev-status.svg)](https://david-dm.org/hex7c0/arc4#info=devDependencies)

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
or
```
http://supergiovane.tk/#/arc4
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
encode array data
```js
rc4.codeArray([49,50,51]);
```
encode buffer data
```js
rc4.codeBuffer(new Buffer('ciao'));
```
encode string, byte or buffer
```js
rc4.code(your_data);
```
same methods with `RC4A` postifx for [RC4A](https://en.wikipedia.org/wiki/RC4#RC4A)
```js
rc4.codeRC4A(your_data);
```
same methods with `VMPC` postifx for [VMPC](https://en.wikipedia.org/wiki/RC4#VMPC)
```js
rc4.codeVMPC(your_data);
```
same methods with `RC4P` postifx for [RC4+](https://en.wikipedia.org/wiki/RC4#RC4.2B)
```js
rc4.codeRC4P(your_data);
```

### rc4(key,[lodash])

 - `key` - **String | Array | Buffer** Your key *(default "throw Error")*
 - `lodash` - **Boolean** Use lodash library (check [performance](https://github.com/hex7c0/arc4/tree/master/test/performance.js) test for right decision) *(default "disabled")*

#### Examples

Take a look at my [examples](https://github.com/hex7c0/arc4/tree/master/examples)

## License
Copyright (c) 2014 hex7c0

Licensed under the GPLv3 license
