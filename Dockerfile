FROM php

RUN apt-get update && apt-get install -y subversion && apt-get install mysql-server