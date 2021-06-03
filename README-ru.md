## README

- [English](README.md)
- [Русский](README-ru.md)

## Дерево проекта

```bash
tree --charset ascii -I "dist|node_modules|src|src-jekyll"
```

```
.
|-- dist                // Готовый сайт
|-- src                 // Исходный код
|-- src-jekyll          // Исходный код Jekyll
|-- README*.md          // Файл инструкций
|-- _config.yml         // Файл конфигурации Jekyll
|-- babel.config.json   // Файл конфигурации Babel
|-- docker-compose.yml  // Файл конфигурации Docker-compose
|-- package.json        // Версии пакетов
|-- postcss.config.js   // Файл конфигурации Post CSS
|-- webpack.config.js   // Файл конфигурации Webpack
|-- webpack.dev.js      // Файл конфигурации Webpack для dev mode
`-- webpack.prod.js     // Файл конфигурации Webpack для prod mode
```

## Установка пакетов (1 раз)

```bash
sudo docker-compose run node /bin/bash
cd /content
npm i
exit
```

## Запуск Jekyll сервера (Терминал 1)

```bash
sudo docker-compose up jekyll
```

## Запуск Webpack (Терминал 2)

```bash
sudo docker-compose up node
```

## Отправка на продакшен

Запускаем Jekyll.

```bash
sudo docker-compose run jekyll /bin/bash
jekyll build
exit
```

Запускаем Webpack.

```bash
sudo docker-compose run node /bin/bash
npm run prod
exit
```

Готовый сайт находится в папке `dist`.
