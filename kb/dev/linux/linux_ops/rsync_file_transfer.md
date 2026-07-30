
### **Using `rsync` (Remote Synchronization)**

If you want more control over the download (e.g., resuming interrupted transfers, verifying file integrity), **`rsync`** is a great option. It works over SSH and can resume partially completed transfers, making it more reliable for large files.

```bash
rsync -avz username@server:/path/to/remote/file /path/to/local/destination
```

* **`-avz`**: Archive mode (preserves file permissions and timestamps), verbose output, and compression to speed up the transfer.
* **`username@server:/path/to/remote/file`**: Remote file path.
* **`/path/to/local/destination`**: Local directory to save the file.

#### Example:

```bash
rsync -avz user@192.168.1.100:/remote/file/Nobara-43-Official-2026-03-28.iso ~/Downloads/
```

- Checking Transfer Progress

You can also see detailed progress during the transfer by adding the --progress flag:
```bash
rsync -avz --progress user@192.168.1.100:/home/user/Nobara-43-Official-2026-03-28.iso ~/Downloads/
```

