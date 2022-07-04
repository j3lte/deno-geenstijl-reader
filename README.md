# Mini Geenstijl Reader in Deno

This is a mini-project I created to see if I can use Deno for useful things.
This project will scrape a website (on request) and show it in a
[Fresh](https://fresh.deno.dev/) website.

This is deployed on Deno Deploy (linked to `main.ts`):

[https://geenstijl-reader.deno.dev/](https://geenstijl-reader.deno.dev/)

## Usage

### JSON

```
deno task json
```

Starts a JSON webserver on port 8000;

### Web

```
deno task web
```

Starts a Fresh webserver on port 8000;

## License

MIT License

Copyright (c) 2022 Jelte Lagendijk

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
