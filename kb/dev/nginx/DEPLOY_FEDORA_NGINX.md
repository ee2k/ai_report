# Serve this site with Nginx on Fedora

This repository is already a static site. Nginx only needs to serve its files
and translate its extensionless page links (such as `/construction`) to the
matching `.html` file.

## 1. Install the web server

```bash
sudo dnf install nginx policycoreutils-python-utils firewalld certbot python3-certbot-nginx
sudo systemctl enable --now nginx firewalld
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

Point the `A`/`AAAA` records for `intuit-mind.cc` (and `www`, if used) to this
server before requesting a certificate.

## 2. Deploy the site

The configured document root is `/var/www/intuit-mind`. Copy the *contents* of
this repository there. Do not copy `.git`.

```bash
sudo install -d -o root -g root -m 0755 /var/www/intuit-mind
sudo rsync -a --delete --exclude '.git' ./ /var/www/intuit-mind/
sudo restorecon -RFv /var/www/intuit-mind
```

Run the commands from the repository root whenever you deploy an update. The
`restorecon` command ensures Fedora SELinux gives Nginx read access; it is safe
to run repeatedly.

## 3. Enable the included Nginx site

```bash
sudo cp nginx/intuit-mind.conf /etc/nginx/conf.d/intuit-mind.conf
sudo nginx -t
sudo systemctl reload nginx
```

Verify locally first:

```bash
curl -I -H 'Host: intuit-mind.cc' http://127.0.0.1/construction
curl -I -H 'Host: intuit-mind.cc' http://127.0.0.1/topic
```

Both should return `200`. `/en` and `/zh` intentionally redirect to their
respective demo landing pages.

## 4. Enable HTTPS

Once DNS points at this server and port 80 is publicly reachable, let Certbot
add the TLS configuration and HTTP-to-HTTPS redirect:

```bash
sudo certbot --nginx -d intuit-mind.cc -d www.intuit-mind.cc
sudo systemctl enable --now certbot-renew.timer
```

If you do not use `www.intuit-mind.cc`, omit its `-d` option and remove it
from `server_name` in `nginx/intuit-mind.conf` before step 3.

## Updating the site

Deploy the changed files, validate Nginx, then reload it:

```bash
sudo rsync -a --delete --exclude '.git' ./ /var/www/intuit-mind/
sudo restorecon -RF /var/www/intuit-mind
sudo nginx -t && sudo systemctl reload nginx
```
