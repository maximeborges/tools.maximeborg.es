# [WIP] [tools.maximeborg.es](https://tools.maximeborg.es)

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


## Serving

Since this application use `preact-router`, you can access any page with a simple rewrite rule from your reverse-proxy.  There is an example using Caddy: 

```haskell
tools.maximeborg.es {
    header / server "AN AMAZING UNICORN"
    tls contact@maximeborg.es
    root /var/www/tools.maximeborg.es/build
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
