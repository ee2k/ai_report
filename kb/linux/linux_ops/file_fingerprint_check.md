```bash
[ "$(sha256sum filename.iso | awk '{print $1}')" = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" ] && echo "OK" || echo "Mismatch"
```
