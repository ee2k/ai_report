# folder and file encryption

## Encryption

```sh
# how to archive a folder and encrypt it with gpg
tar --create --file=- myfolder | gpg --symmetric > myfolder.tar.gpg

# short form
tar cf - myfolder | gpg -c > myfolder.tar.gpg
```

```sh
# encrypt with specified algorithm
tar --create --file=- myfolder | gpg --symmetric --cipher-algo AES256 > myfolder.tar.gpg

# short form
tar cf - myfolder | gpg -c --cipher-algo AES256 > myfolder.tar.gpg
```

```sh
# check available algorithms
gpg --version
```

## Decryption

```sh
# short form
gpg -d myfolder.tar.gpg | tar xf -
```

```sh
# full form
gpg --decrypt myfolder.tar.gpg | tar --extract --file=-
```

## check encrypted file algorithm

```sh
gpg --list-packets myfolder.tar.gpg
```
