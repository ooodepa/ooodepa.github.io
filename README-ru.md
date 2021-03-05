## README

- [English](README.md)
- [Русский](README-ru.md)

## Запуск сервера Jekyll (Терминал 1)

```bash
sudo docker-compose up
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
