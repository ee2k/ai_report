=== enable snapd:

sudo dnf install snapd

=== To enable classic snap support, enter the following to create a symbolic link between /var/lib/snapd/snap and /snap:

sudo ln -s /var/lib/snapd/snap /snap

=== Install StarCraft - Brood War (Installer):

sudo snap install starcraft-brood-war

=== start starcraft:

snap run starcraft-brood-war
