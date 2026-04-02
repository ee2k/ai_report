```sh
# Update packages
sudo apt update

# Install KVM and related tools
sudo apt install -y qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virtinst virt-manager

# Add your user to the kvm and libvirt groups
sudo adduser $USER kvm
sudo adduser $USER libvirt

# Start and enable libvirt service
sudo systemctl enable --now libvirtd
sudo systemctl enable --now virtlogd
```
