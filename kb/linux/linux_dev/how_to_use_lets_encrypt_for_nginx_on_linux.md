# how to use let's encrypt for nginx on linux?

To use Let's Encrypt for Nginx on Linux, follow these steps:

1. Install Certbot (Let's Encrypt Client) and the Nginx plugin:
    - Update your package list:

```
sudo apt update
```

    - Install Certbot and the Nginx plugin:

```
sudo apt install certbot python3-certbot-nginx
```

2. Ensure your Nginx server block is properly configured for your domain:
    - Check or create the server block in `/etc/nginx/sites-available/your_domain`
    - Make sure the `server_name` directive includes your domain.
    - Test Nginx configuration:

```
sudo nginx -t
```

    - Reload Nginx:

```
sudo systemctl reload nginx
```

3. Allow HTTPS traffic through your firewall, if you have one:
    - For UFW, use:

```
sudo ufw allow 'Nginx HTTPS'
```

4. Obtain and install the SSL certificate using Certbot:
    - Run Certbot with Nginx plugin, replacing `your_domain` with your actual domain:

```
sudo certbot --nginx -d your_domain -d www.your_domain
```

    - Follow prompts to enter your email and agree to terms.
    - Certbot will automatically edit your Nginx configuration to enable HTTPS.
    - You will be asked if you want to redirect HTTP traffic to HTTPS (recommended).
5. Certbot certificates last 90 days, but it sets up automatic renewal. To test renewal:

```
sudo certbot renew --dry-run
```


This process automates securing your Nginx website with a free Let's Encrypt SSL certificate on Linux.[^1][^2][^5]
