sshuttle

Installation

Debian/Ubuntu:

```bash
sudo apt update && sudo apt install sshuttle  # Official repositories
# Alternative via pip:  
sudo apt install python3-pip && sudo pip3 install sshuttle
```

Basic Usage
Connect to a remote server and route all traffic:

```sh
sudo sshuttle -r user@server 0/0  # Route all IPv4 traffic
```

Include DNS traffic:
```sh
sudo sshuttle --dns -r user@server 0/0  # Prevents DNS leaks
```

Route specific subnets:
```sh
sudo sshuttle -r user@server 192.168.1.0/24  # Only tunnel 192.168.1.x traffic
```

Bind to a specific interface:
```sh
sudo sshuttle --listen 192.168.1.100 -r user@server 0/0
```

Run as a background daemon:
```sh
sudo sshuttle -D -r user@server 0/0  # Detach with -D
```

Exclude specific hosts/subnets:
```sh
sudo sshuttle -r user@server 0/0 --exclude 8.8.8.8 --exclude example.com
```

Use a custom SSH key:
```sh
sudo sshuttle -e "ssh -i ~/.ssh/mykey.pem" -r user@server 0/0
```

Manual termination:
Press Ctrl+C in the terminal where sshuttle is running.

