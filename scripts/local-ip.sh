#!/bin/bash

# Get the current IP.
if [[ "$(uname)" == "Darwin" ]]; then
  echo $(ifconfig en0 | grep "inet " | awk -F'[: ]+' '{ print $2 }')
else 
  echo $(hostname -I | awk '{print $1}')
fi
