## README

- [English](README.md)
- [Русский](README-ru.md)

## Starting the Jekyll server (Terminal 1)

```bash
sudo docker-compose -f docker-compose-jekyll-serve.yml up
```

## Start Node to compile JS (Terminal 2)

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

## Send to production

Using webpack
- creating CSS files
- creating JS files
- loading fonts

```bash
sudo docker build . -t my_node_container
sudo docker run -v $(pwd):/content --rm --entrypoint bash -it my_node_container
cd /content
npm run prod
exit
```

Creating a website using the Jekyll website generator.

```bash
sudo docker-compose -f docker-compose-jekyll-build.yml up
```

The finished site is located in the folder `_site`.
