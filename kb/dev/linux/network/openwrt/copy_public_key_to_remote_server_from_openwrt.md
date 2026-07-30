linux default:

```shell
ssh-copy-id user@ip
```

openwrt shell:

```sh
cat ~/.ssh/id_ed25519.pub | ssh user@ip "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```
