```sh
sudo apt update
sudo apt install wireguard
```

After installing, check again if the wg-quick tool is available:
```sh
wg --version
```

Steps to Create the wg0.conf File

1.Generate WireGuard Keys
```sh
wg genkey | tee privatekey | wg pubkey > publickey
```

2.Create the WireGuard Configuration File

```sh
sudo nano /etc/wireguard/wg0.conf
```

```text
[Interface]
Address = 10.0.0.1/24        # Change to your desired IP address range
PrivateKey = <your_private_key>
ListenPort = 51820            # You can change this if needed

[Peer]
PublicKey = <peer_public_key> # This will be the client's public key
AllowedIPs = 10.0.0.2/32      # The client's IP address (change accordingly)
```

3.bring up the interface
```sh
sudo wg-quick up wg0
```

4.Verify the Interface
```sh
sudo wg show
```

to start the interface automatically on boot, you can enable the service:
```sh
sudo systemctl enable wg-quick@wg0
```

Add client PERMANENTLY (recommended):
```sh
sudo nano /etc/wireguard/wg0.conf
```

Add:
```text
[Peer]
PublicKey = <CLIENT_PUBLIC_KEY>
AllowedIPs = 10.0.0.2/32
```

Apply changes WITHOUT disconnecting
```sh
sudo wg syncconf wg0 <(wg-quick strip wg0)
```

---
1. Add NAT rule

On the server:
```sh
sudo iptables -t nat -A POSTROUTING -s 10.0.0.0/24 -o eth0 -j MASQUERADE
```
👉 Replace:

10.0.0.0/24 → your WireGuard subnet
eth0 → your real internet interface

🔍 Find your real interface
```sh
ip route get 8.8.8.8
```

Example output:
```text
dev ens3 src x.x.x.x
```

👉 Then use:
```
-o ens3
```

