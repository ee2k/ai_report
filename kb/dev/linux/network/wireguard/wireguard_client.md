1. Install WireGuard (client side)

Ubuntu / Debian
```sh
sudo apt update
sudo apt install wireguard
```

Fedora
```sh
sudo dnf install wireguard-tools
```

2. Verify installation
```sh
wg --version
```

3. Generate client keys
```sh
wg genkey | tee client_privatekey | wg pubkey > client_publickey
```

4. Create client config
```sh
sudo nano /etc/wireguard/wg0.conf
```

```text
[Interface]
PrivateKey = <CLIENT_PRIVATE_KEY>
Address = 10.0.0.2/24
DNS = 1.1.1.1

[Peer]
PublicKey = <SERVER_PUBLIC_KEY>
Endpoint = <SERVER_IP>:51820
AllowedIPs = 0.0.0.0/0
PersistentKeepalive = 25
```

5. Start WireGuard
```sh
sudo wg-quick up wg0
```

stop:
```sh
sudo wg-quick down wg0
```

6. Enable auto-start (optional)
```sh
sudo systemctl enable wg-quick@wg0
```

7. Quick test
```sh
sudo wg
```

look for:
```text
latest handshake: X seconds ago
```


