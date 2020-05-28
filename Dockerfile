FROM php:7.3.11-cli-alpine

RUN apt-get update && apt-get install -y subversion