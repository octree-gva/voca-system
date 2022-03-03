
######## HTTP SECTION PROTOTYPE ########

http {
	server_tokens off ;
        include /etc/nginx/mime.types;
        default_type application/octet-stream;

        set_real_ip_from  192.168.0.0/16;
        set_real_ip_from  10.0.0.0/8;
        set_real_ip_from  172.16.0.0/16;
        real_ip_header    X-Forwarded-For;
        real_ip_recursive on;

	log_format  main  '$remote_addr:$http_x_remote_port - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for" '
                      '"$host" sn="$server_name" '
                      'rt=$request_time '
                      'ua="$upstream_addr" us="$upstream_status" '
                      'ut="$upstream_response_time" ul="$upstream_response_length" '
                      'cs=$upstream_cache_status' ;

        client_header_timeout 10m;
        client_body_timeout 10m;
        send_timeout 10m;
        client_max_body_size 100m;
        proxy_read_timeout 300s;

        connection_pool_size 256;
        client_header_buffer_size 1k;
        large_client_header_buffers 4 2k;
        request_pool_size 4k;

#        gzip on;
        gzip_min_length 1100;
        gzip_buffers 4 8k;
        gzip_types text/plain;

        output_buffers 1 32k;
        postpone_output 1460;

        sendfile on;
        tcp_nopush on;
        tcp_nodelay on;

        keepalive_timeout 75 20;

        ignore_invalid_headers on;

    map $upstream_addr        $group {
        default               "";
    ### MAPPING FOLLOWS HERE ###
    ### ~XXX\.XXX\.XXX\.XXX\:XX$   $GROUPNAME; ### MAPPROTO ### This is mappings prototype line, do not remove this! 
    }

    ### DEFAULT UPSTREAM FOLLOWS HERE ###
    upstream default_upstream{
    ### server XXX.XXX.XXX.XXX; ### $GROUPNAME ### DEFUPPROTO ###
    sticky path=/; keepalive 100;
}



    ### UPSTREAMS LIST FOLLOWS HERE ###
        #upstream nodes{ server XXX.XXX.XXX.XXX; server 127.0.0.1:8001 backup # UPSTREAMPROTO # This is upstream prototype line, do not remove this! }


        #GFADMIN

        server {
                listen *:80;
                listen [::]:80;
                server_name  _;
                # Discourage deep links by using a permanent redirect to home page of HTTPS site
                return 301 https://$host;

                #USERLOCATIONS
        }

 include /etc/nginx/conf.d/*.conf;

}

######## TCP SECTION PROTOTYPE ########
