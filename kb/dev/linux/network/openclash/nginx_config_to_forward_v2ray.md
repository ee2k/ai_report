If we need to let nginx forward traffic to v2ray, like
https://domain.com/myv2raysecret -> http://127.0.0.1:10001

Nginx config:
```text
location /myv2raysecret { # <-- MUST match the path you set in X-UI
    proxy_redirect off;
    proxy_pass http://127.0.0.1:10001; # <-- MUST match the internal port for V2Ray
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

OpenClash profile (not tested):

   1. Go back to OpenClash's Manage Proxies / Servers tab and edit the server you added.
   2. Update the settings:
       * Server: Your domain name (yourdomain.com), not your IP address.
       * Port: 443.
       * Type: vmess (should still be the same).
       * TLS: Set this to true (or check the box).
       * Network: Change from tcp to ws.
       * WebSocket Path: Enter the exact path you used before: /myv2raysecret.
       * Host/SNI: Enter your domain name again here: yourdomain.com.
