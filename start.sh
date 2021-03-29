DOCKER_IMAGE="image_converter:latest"
DOCKER_CONTAINER="image_converter_test"

LOCAL_PATH=$(pwd)
VIRTUAL_PATH="/home"
VOLUME="$LOCAL_PATH:$VIRTUAL_PATH"

SHELL="/bin/bash"

docker pull ubuntu:latest
docker build --tag=$DOCKER_IMAGE .
docker container run --rm -it --name $DOCKER_CONTAINER -w $VIRTUAL_PATH -v $VOLUME $DOCKER_IMAGE $SHELL
