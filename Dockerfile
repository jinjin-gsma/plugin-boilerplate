FROM php:7.3.11

RUN apt-get update && apt-get install -y subversion && apt-get install mysql-server