⚠️ _This package is not for production use yet._

# xss-lang

An experimental grammar for parsing XSS attacks.

## TL; DR

This package provides a single function for **detecting** (not mitigating) XSS threats in your JavaScript strings:

```javascript
const scan = require('@customcommander/xss-lang');

scan("&#x6a;&#x61;&#x76;&#x61;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;:alert('XSS!')");
/*
{ threat: "js_url"
, raw: "&#x6a;&#x61;&#x76;&#x61;&#x73;&#x63;&#x72;&#x69;&#x70;&#x74;:alert('XSS!')"
, found: "javascript:alert('XSS!')"
}
*/
```

## Why?

Your web application _will_ be attacked. Period.

With this parser I wanted to understand the different threats a web application can be exposed to. Knowing what's coming in and out of your application can help you detect and react to potential attacks.

### Example

Say we need to create a function that adds links to a page:

```javascript
function add_link(link) {
  const p = document.createElement('p');
  p.innerHTML = `<a href="${link}">CLICK ME</a>`;
  document.body.appendChild(p);
}
```

To add a link to a page we simply need to call the function as such:

```javascript
add_link("https://example.com");
```

However the attentive reader will notice that this function is vulnerable to XSS attacks:

```javascript
add_link("javascript:alert('XSS!')");
```

When the user clicks on that link, an alert box will be displayed. This example is harmless but it demonstrates that code can be executed with full user privileges. If that code comes from an untrusted source there is a high probability that it will cause some damage.

Here's a naive approach to mitigate this threat:

```javascript
function add_link(link) {
  if (link.startsWith('javascript:')){
    return;
  }
  const p = document.createElement('p');
  p.innerHTML = `<a href="${link}">CLICK ME</a>`;
  document.body.appendChild(p);
}
```

However this will defeat the check yet still allow code to be executed:

```javascript
add_link("jaVAscRIpt:alert('XSS!')");
```

And so will this:

```javascript
add_link("jaVA&#0000009;scRIpt:alert('XSS!')");
```

There's plenty more variations of this than you can handle...
