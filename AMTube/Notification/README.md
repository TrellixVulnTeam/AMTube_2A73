# Running the Docker container

## To set up RabbitMQ
First, setting up a RabbitMQ container is needed to ensure the proper behavior of the Notification container. So, download the image from Docker Hub through the command (superuser privileges may be necessary in the following commands):

```bash
docker pull rabbitmq:3-management
```

Then, run the container:

```bash
docker run -d -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

Eventually, from the terminal, go to the directory of the Notification service.
## To build the image

```bash
docker build -t notification-docker .
```

## To run the container

```bash
docker run -d -p 8081:8081 notification-docker
```
