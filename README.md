# [arc4](https://github.com/hex7c0/arc4)

[![NPM version](https://img.shields.io/npm/v/arc4.svg)](https://www.npmjs.com/package/arc4)
[![Linux Status](https://img.shields.io/travis/hex7c0/arc4.svg?label=linux-osx)](https://travis-ci.org/hex7c0/arc4)
[![Windows Status](https://img.shields.io/appveyor/ci/hex7c0/arc4.svg?label=windows)](https://ci.appveyor.com/project/hex7c0/arc4)
[![Dependency Status](https://img.shields.io/david/hex7c0/arc4.svg)](https://david-dm.org/hex7c0/arc4)
[![Coveralls](https://img.shields.io/coveralls/hex7c0/arc4.svg)](https://coveralls.io/r/hex7c0/arc4)

[RC4](https://en.wikipedia.org/wiki/RC4) stream cipher.
You can select from ["[arc4](https://en.wikipedia.org/wiki/RC4)", "[rc4a](https://en.wikipedia.org/wiki/RC4#RC4A)", "[vmpc](https://en.wikipedia.org/wiki/RC4#VMPC)", "[rc4+](https://en.wikipedia.org/wiki/RC4#RC4.2B)"] algorithm

Encode/decode with different [encodings](http://nodejs.org/api/buffer.html#apicontent) _for *String only_, from nodejs doc:
> - 'ascii' - for 7 bit ASCII data only. This encoding method is very fast, and will strip the high bit if set.
> - 'utf8' - Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.
> - 'utf16le' - 2 or 4 bytes, little endian encoded Unicode characters. Surrogate pairs (U+10000 to U+10FFFF) are supported.
> - 'ucs2' - Alias of 'utf16le'.
> - 'base64' - Base64 string encoding.
> - 'binary' - A way of encoding raw binary data into strings by using only the first 8 bits of each character. This encoding method is deprecated and should be avoided in favor of Buffer objects where possible. This encoding will be removed in future versions of Node.
> - 'hex' - Encode each byte as two hexadecimal characters.

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

change your key and reload [gKsa](https://en.wikipedia.org/wiki/RC4#Key-scheduling_algorithm_.28KSA.29) (warning)
```js
cipher.change('foo');
cipher.change([30, 31]);
cipher.change(new Buffer('foo'));
```

encode a plaintext string, you can optionally choose input (defaults to 'utf8') and output (defaults to 'hex') [encoding](http://nodejs.org/api/buffer.html#apicontent)
```js
cipher.encodeString(plaintext [, input_encoding [, output_encoding]]);
cipher.encodeString('string', 'utf8', 'base64');
```

encode a plaintext array
```js
cipher.encodeArray([49, 50, 51]);
```

encode a plaintext buffer data
```js
cipher.encodeBuffer(new Buffer('ciao'));
```

select right function according with plaintext data type. Set input and output [encoding](http://nodejs.org/api/buffer.html#apicontent) only if data is a String
```js
cipher.encode(your_data [, input_encoding [, output_encoding]]);
```

decode a ciphertext string, you can optionally choose input (defaults to 'hex') and output (defaults to 'utf8') [encoding](http://nodejs.org/api/buffer.html#apicontent)
```js
cipher.decodeString(ciphertext [, input_encoding [, output_encoding]]);
cipher.decodeString('string', 'utf8', 'base64');
```

decode a ciphertext array
```js
cipher.decodeArray([49,50,51]);
```

decode a ciphertext buffer data
```js
cipher.decodeBuffer(new Buffer('ciao'));
```

select right function according with ciphertext data type. Set input and output [encoding](http://nodejs.org/api/buffer.html#apicontent) only if data is a String
```js
cipher.decode(your_data [, input_encoding [, output_encoding]]);
```

### rc4(algorithm, password [, lodash])

#### algorithm

 - `algorithm` - **String** Choose between ["[arc4](https://en.wikipedia.org/wiki/RC4)", "[rc4a](https://en.wikipedia.org/wiki/RC4#RC4A)", "[vmpc](https://en.wikipedia.org/wiki/RC4#VMPC)", "[rc4+](https://en.wikipedia.org/wiki/RC4#RC4.2B)"] *(default "throw Error")*

#### password

 - `password` - **String | Array | Buffer** Your key *(default "throw Error")*

#### [lodash]

 - `lodash` - **Boolean** Use [lodash](http://lodash.com/) library (check [benchmark](test/benchmark.js) test for right decision) *(default "disabled")*

## Examples

Take a look at my [examples](examples)

### [License GPLv3](license)
