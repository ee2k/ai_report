temporary method:
step1:
```sh
echo 2 | sudo tee /sys/module/hid_apple/parameters/fnmode
```

step2:
restart system

permanent method:

1. Create or edit a configuration file for the hid_apple module, typically
/etc/modprobe.d/hid_apple.conf

```text
options hid_apple fnmode=2
```

2. After saving the configuration, regenerate the initramfs (initial ramdisk) to include this change. The command to regenerate depends on your distribution:

* For Debian/Ubuntu-based: sudo update-initramfs -u

* For Arch Linux: regenerate with mkinitcpio (usually automatically done if configured)

* For Fedora or others using dracut: sudo dracut --regenerate-all --force

3. Reboot the system.
