## README

- [English](README.md)
- [Русский](README-ru.md)

## Launch Jekyll (Terminal 1)

```bash
sudo docker-compose -f docker-compose-jekyll-serve.yml up
```

## Launch Webpack (Terminal 2)

```bash
sudo docker-compose -f docker-compose-node.yml run myService /bin/bash
npm i
npm run dev
```

## Send to production

Launch Webpack.

```bash
sudo docker-compose -f docker-compose-node.yml run myService /bin/bash
cd /content
npm run prod
exit
```

Launch Jekyll.

```bash
sudo docker-compose -f docker-compose-jekyll-build.yml up
```

The finished site is located in the `_site` folder.
