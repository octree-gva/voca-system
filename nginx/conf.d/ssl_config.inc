# TODO change path to your wildcard certificate.
ssl_certificate      /etc/letsencrypt/live/custom.domain/fullchain.pem;
ssl_certificate_key   /etc/letsencrypt/live/custom.domain/privkey.pem;
ssl_session_timeout  5m;
ssl_protocols TLSv1.2 TLSv1.3;
ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
ssl_prefer_server_ciphers off;
ssl_session_cache shared:SSL:10m;
add_header alt-svc 'h3=":443"; ma=86400';
access_log /var/log/nginx/localhost.access_log main;
error_log /var/log/nginx/localhost.error_log info;
proxy_temp_path /var/nginx/tmp/;