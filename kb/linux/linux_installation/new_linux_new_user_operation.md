# Create the User with sudo access

Create the User:
```shell
sudo useradd -m newuser
```

Set a Password for the User:
```shell
sudo passwd newuser
```

Add the User to the sudo Group:
```shell
sudo usermod -aG sudo newuser
```

# User SSH Access without password

Generate SSH Key Pair for local user:
```shell
ssh-keygen
```

Copy the Public Key to the Remote System:
```shell
ssh-copy-id newuser@remote_host
```

# Fail2Ban

Install Fail2Ban:
```shell
sudo apt update
sudo apt install fail2ban
```

Start and Enable Fail2Ban Service:
```shell
sudo systemctl start fail2ban
sudo systemctl enable fail2ban
```

Configure Fail2Ban:
Create a jail.local file:
```shell
sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

open the jail.local file for editing:
```shell
sudo nano /etc/fail2ban/jail.local
```

SSH protection: This is to protect against brute-force attacks on SSH.
```text
[sshd]
enabled  = true
port     = ssh
logpath  = /var/log/auth.log
maxretry = 3
```

Set the bantime and findtime:
```text
bantime  = 600  # Ban for 10 minutes
findtime = 600  # Look for failures in the last 10 minutes
maxretry = 3    # Ban after 3 failed attempts
```

Restart Fail2Ban to Apply the Configuration:
```shell
sudo systemctl restart fail2ban
```

Verify the Configuration:
```shell
sudo systemctl status fail2ban
```

Disable Root Login Over SSH:
```shell
sudo nano /etc/ssh/sshd_config
```

Find the line that starts with "PermitRootLogin" and change it to:
```text
PermitRootLogin no
```

Restart the SSH service to apply the changes:
```shell
sudo systemctl restart sshd
```

# UFW Firewall:

Install ufw:
```shell
sudo apt install ufw
```

Allow SSH Access:
```shell
sudo ufw allow ssh
```

Allow HTTP and HTTPS Access:
```shell
sudo ufw allow http
sudo ufw allow https
```

Enable UFW Firewall:
```shell
sudo ufw enable
```

Verify UFW Status:
```shell
sudo ufw status
```

# Change bash as default for console
```shell
sudo apt install bash
chsh -s /bin/bash
```
then relogin into shell.
