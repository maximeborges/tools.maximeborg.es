#!/bin/bash

SERVER=$2
PORT=$3
PATH=$4

ERRORSTRING="Error: format is $0 <dry-run|live> <username@server> <port> <dist_path>"
if [ $# -lt 4 ]
    then
        echo $ERRORSTRING;
elif [[ $1 == "dry-run" ]] 
    then
        echo "Running dry-run"
        /usr/bin/rsync --dry-run -az --force --delete --progress -e "/usr/bin/ssh -p$PORT" ./build/ $SERVER:$PATH
elif [ $1 == "live" ] 
    then
        echo "Running actual deploy"
        /usr/bin/rsync -az --force --delete --progress -e "/usr/bin/ssh -p$PORT" ./build/ $SERVER:$PATH
else
    echo $ERRORSTRING;
fi