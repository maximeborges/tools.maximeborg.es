# [WIP] [tools.maximeborg.es](https://tools.maximeborg.es)

test

> :rocket: Based on [preact-cli](https://github.com/developit/preact-cli). Ready to deploy using [Webpack] and [Preact]
>
> **:boom: Should be live on [tools.maximeborg.es](https://tools.maximeborg.es) :boom:**


---


## Run !

**1. Clone this repo:**

```sh
git clone https://github.com/maximeborges/tools.maximeborg.es.git tools.maximeborg.es
cd tools.maximeborg.es
```

**2. Install dependencies:**
```sh
yarn
```
or (slower)
```sh
npm install
```

**3. Build !:**

```sh
yarn build
```

> You're done! Now serve the `build` folder from wherever you want!

## Make it your own

**1. Edit src/manifest.json: (default)**

```json
{
  "name": "Tools @ maximeborg.es",
  "short_name": "Tools",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait",
  "background_color": "#fff",
  "theme_color": "#333745",
  "icons": [{
    "src": "/assets/icons/android-chrome-192x192.png",
    "type": "image/png",
    "sizes": "192x192"
  },
  {
    "src": "/assets/icons/android-chrome-512x512.png",
    "type": "image/png",
    "sizes": "512x512"
  }]
}

```

**2. Do whatever the fuck you want:**

```
src
├── assets
│   ├── favicon.ico
│   └── icons
│       ├── android-chrome-192x192.png
│       ├── android-chrome-512x512.png
│       ├── apple-touch-icon.png
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── menu.svg
│       └── mstile-150x150.png
├── components
│   ├── app.js
│   ├── layout
│   │   ├── Header
│   │   │   ├── index.js
│   │   │   └── style.scss
│   │   └── Sidebar
│   │       ├── index.js
│   │       └── style.scss
│   └── routes
│       ├── Converter
│       │   ├── index.js
│       │   └── style.scss
│       ├── Crypto
│       │   ├── index.js
│       │   └── style.scss
│       ├── Error
│       │   ├── index.js
│       │   └── style.scss
│       └── Home
│           ├── index.js
│           └── style.scss
├── index.js
├── manifest.json
└── style
    ├── helpers.scss
    ├── index.scss
    ├── mixins.scss
    └── variables.scss
```

## Deploy

After building the app, you can use the `deploy.sh` script to deploy the `build/` directory directly to your server using `rsync`. The format is `./deploy.sh <dry-run|live> <username@server> <port> <dist_path>`.

Example:
```
./deploy.sh live myuser@tools.maximeborg.es 22 /var/www/tools.maximeborg.es
```

## Serving

Since this application use `preact-router`, you can access any page with a simple rewrite rule from your reverse-proxy.  There is an example using Caddy: 

```haskell
tools.maximeborg.es {
    header / server "AN AMAZING UNICORN"
    tls contact@maximeborg.es
    root /var/www/tools.maximeborg.es
    gzip
    rewrite / {
        to {path} /
    }
}
```


---


## License

MIT


## Tools used

* [Preact-cli](https://github.com/developit/preact-cli)
* [Preact](https://github.com/developit/preact)
* [preact-compat](https://github.com/developit/preact-compat)
* [webpack](https://webpack.github.io)
