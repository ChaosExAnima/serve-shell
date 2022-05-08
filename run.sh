#! /bin/bash

RELEASE_URI="https://github.com/ChaosExAnima/serve-shell/releases/download/latest/build.js"
LOCAL_PATH="script.js"

if [[ -f $LOCAL_PATH ]]
then
	curl -L -o $LOCAL_PATH -z $LOCAL_PATH --silent $RELEASE_URI
else
	curl -L -o $LOCAL_PATH --silent $RELEASE_URI
fi

node $LOCAL_PATH $@
