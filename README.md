# [arc4](http://supergiovane.tk/#/arc4)

[![NPM version](https://badge.fury.io/js/arc4.svg)](http://badge.fury.io/js/arc4)
[![Build Status](https://travis-ci.org/hex7c0/arc4.svg?branch=master)](https://travis-ci.org/hex7c0/arc4)
[![Dependency Status](https://david-dm.org/hex7c0/arc4/status.svg)](https://david-dm.org/hex7c0/arc4)

[RC4](https://en.wikipedia.org/wiki/RC4) stream cipher.
You can select from ['[arc4](https://en.wikipedia.org/wiki/RC4)', '[rc4a](https://en.wikipedia.org/wiki/RC4#RC4A)', '[vmpc](https://en.wikipedia.org/wiki/RC4#VMPC)', '[rc4+](https://en.wikipedia.org/wiki/RC4#RC4.2B)'] algorithm, and encode/decode with different [encodings](http://nodejs.org/api/buffer.html#apicontent) for *String only.

My original [python code](https://github.com/hex7c0/EncryptoPy/blob/master/modules/rc/rc4.py)

## Installation

Install through NPM

```bash
npm install arc4
```
or
```bash
git clone git://github.com/hex7c0/arc4.git
```

## API

inside nodejs project
```js
var rc4 = require('arc4');

var cipher = rc4('arc4', 'secret_key');
var d = cipher.encodeString('ciao');
var e = cipher.decodeString(d);
```

### Methods

change your key (warning) and reload gKsa
```js
cipher.change('foo');
```

encode string data
```js
cipher.encodeString('string');
```

encode array data
```js
cipher.encodeArray([49,50,51]);
```

encode buffer data
```js
cipher.encodeBuffer(new Buffer('ciao'));
```

encode string or byte or buffer (switch type)
```js
cipher.encode(your_data);
```

for decoding, change "encode*" to "decode*"
```js
cipher.decode(your_data);
```

### rc4(algorithm,password,[lodash])

#### algorithm

 - `algorithm` - **String | Array | Buffer** Choose between ['[arc4](https://en.wikipedia.org/wiki/RC4)', '[rc4a](https://en.wikipedia.org/wiki/RC4#RC4A)', '[vmpc](https://en.wikipedia.org/wiki/RC4#VMPC)', '[rc4+](https://en.wikipedia.org/wiki/RC4#RC4.2B)'] *(default "throw Error")*

#### password

 - `password` - **String** Your key *(default "throw Error")*

#### [lodash]

 - `lodash` - **Boolean** Use [lodash](http://lodash.com/) library (check [benchmark](https://github.com/hex7c0/arc4/tree/master/test/benchmark.js) test for right decision) *(default "disabled")*

## Examples

Take a look at my [examples](https://github.com/hex7c0/arc4/tree/master/examples)

### [License GPLv3](http://opensource.org/licenses/GPL-3.0)
