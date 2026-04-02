tun2socks (VPN-Like Experience)

For BadVPN's tun2socks Installation:
```sh
sudo apt install badvpn-tun2socks
```

Create TUN interface:
```sh
sudo ip tuntap add dev tun0 mode tun user $USER
sudo ip addr add 10.0.0.1/24 dev tun0
sudo ip link set tun0 up
```

Launch tun2socks:

```sh
badvpn-tun2socks --tundev tun0 \
                 --netif-ipaddr 10.0.0.2 \
                 --netif-netmask 255.255.255.0 \
                 --socks-server-addr 127.0.0.1:12345
```

Route traffic:

```sh
# Preserve original gateway for SSH/SOCKS traffic
ip route add $(dig +short remote_ip) via $(ip route | grep default | awk '{print $3}')

# Route all other traffic through tun0
sudo ip route add default via 10.0.0.2 metric 6  # Lower metric than main route
```

Disabling the Setup
Remove routes:

```bash
sudo ip route del default via 10.0.0.2
sudo ip route del remote_ip
```

Stop tun2socks:
Ctrl+C in the terminal where it's running.

Remove TUN interface:

```bash
sudo ip link del tun0
```
