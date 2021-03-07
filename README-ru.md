## README

- [English](README.md)
- [Русский](README-ru.md)

## Запуск сервера Jekyll (Терминал 1)

```bash
sudo docker-compose -f docker-compose-jekyll-serve.yml up
```

## Запуск Node для компиляции JS (Терминал 2)

Создаем контейнер Docker (один раз).

```bash
sudo docker build -t my_node_container .
```

Запускаем контейнер Docker.

```bash
sudo docker run -v $(pwd):/content --rm --entrypoint bash -it my_node_container
```

Устанавливаем пакеты NPM (один раз).

```bash
npm i
```

- Режим разработчика
    ```bash
    npm run dev
    ```
- Режим продакшена
    ```bash
    npm run prod
    ```

## Отправка на продакшен

C помощью webpack
- создаём CSS файлы
- создаём JS файлы
- подгружаем шрифты

```bash
sudo docker build . -t my_node_container
sudo docker run -v $(pwd):/content --rm --entrypoint bash -it my_node_container
cd /content
npm run prod
exit
```

Создаем сайт с помощью генератора сайтов Jekyll.

```bash
sudo docker-compose -f docker-compose-jekyll-build.yml up
```

Готовый сайт находится в папке `_site`.
