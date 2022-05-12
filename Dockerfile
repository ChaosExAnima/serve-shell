FROM nginx:alpine

RUN mkdir -p /serve

COPY nginx.conf /etc/nginx/conf.d/default.conf
