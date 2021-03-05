## README

- [English](README.md)
- [Русский](README-ru.md)

## Starting the Jekyll server (Terminal 1)

```bash
sudo docker-compose up
```

## Start Node for JS compilation (Terminal 2)

Creating a Docker container (once).

```bash
sudo docker build -t my_node_container .
```

Launching the Docker container.

```bash
sudo docker run -v $(pwd):/content --rm --entrypoint bash -it my_node_container
```

Installing NPM packages (once).

```bash
npm i
```

- Developer Mode
    ```bash
    npm run dev
    ```
- Production mode
    ```bash
    npm run prod
    ```
