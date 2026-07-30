```sh
sudo setsebool -P httpd_read_user_content 1

sudo setfacl -m u:nginx:--x /home/username
sudo setfacl -m u:nginx:--x /home/username/Documents
sudo setfacl -m u:nginx:--x /home/username/Documents/repo
sudo setfacl -R -m u:nginx:rX /home/username/Documents/repo/tech-base
```