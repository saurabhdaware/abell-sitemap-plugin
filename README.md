# abell-sitemap-plugin
a plugin for [Abell](https://abelljs.org) that builds sitemap

## Installation
```
npm install --save-dev abell-sitemap-plugin
```

## Setup

In your `abell.config.js` file, add following values,
```js
module.exports = {
  globalMeta: {
    domain: 'https://example.com'
  },
  plugins: ['abell-sitemap-plugin']
}
```

replace `domain` with your website's domain that you want search engines to see. Add `abell-sitemap-plugin` to plugins array.