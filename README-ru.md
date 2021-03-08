## README

- [English](README.md)
- [Русский](README-ru.md)

## Запуск Jekyll (Терминал 1)

```bash
sudo docker-compose -f docker-compose-jekyll-serve.yml up
```

## Запуск Webpack (Терминал 2)

```bash
sudo docker-compose -f docker-compose-node.yml run myService /bin/bash
npm i
npm run dev
```

## Отправка на продакшен

Запускаем Webpack.

```bash
sudo docker-compose -f docker-compose-node.yml run myService /bin/bash
cd /content
npm run prod
exit
```

Запускаем Jekyll.

```bash
sudo docker-compose -f docker-compose-jekyll-build.yml up
```

Готовый сайт находится в папке `_site`.
