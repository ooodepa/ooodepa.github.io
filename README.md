## README

- [English](README.md)
- [Русский](README-ru.md)

## Project Tree

```bash
tree --charset ascii -I "dist|node_modules|src|src-jekyll"
```

```
.
|-- dist                // Ready site
|-- src                 // Source code
|-- src-jekyll          // Jekyll source code
|-- README*. md         // Instructions file
|-- _config.yml         // Jekyll configuration file
|-- babel.config.json   // Babel configuration file
|-- docker-compose. yml // Docker-compose configuration file
|-- package.json        // Package versions
|-- postcss.config.js   // Post CSS configuration file
|-- webpack.config.js   // Webpack configuration file
|-- webpack.dev.js      // Webpack configuration file for dev mode
`-- webpack.prod.js     // Webpack configuration file for prod mode
```

## Install packages (1 time)

```bash
sudo docker-compose run node /bin/bash
cd /content
npm i
exit
```

## Starting the Jekyll server (Terminal 1)

```bash
sudo docker-compose up jekyll
```

## Launch Webpack (Terminal 2)

```bash
sudo docker-compose up node
```

## Send to production

Launch Jekyll.

```bash
sudo docker-compose run jekyll /bin/bash
jekyll clean
jekyll build
exit
```

Launch Webpack.

```bash
sudo docker-compose run node /bin/bash
cd /content
npm run prod
exit
```

The finished site is located in the `dist` folder.
