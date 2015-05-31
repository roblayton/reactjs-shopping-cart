from nginx
ADD dist/build /usr/share/nginx/html
ADD docker/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
