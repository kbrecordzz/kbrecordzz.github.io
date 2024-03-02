#!/bin/bash

for file in *;
#do echo ${file};
do curl -F "${file}=@${file}" https://juntogawa:sucramsakul@neocities.org/api/upload --insecure;
done
