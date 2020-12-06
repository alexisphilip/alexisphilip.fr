{
    "date": "2019-04-23",
    "title": "How to install LAMP on Linux",
    "slug": "install-lamp-on-linux",
    "categories": [
        "programming"
    ],
    "tags": [
        "LAMP",
        "Sysadmin",
        "Apache",
        "PHP",
        "PHPMyAdmin",
        "MySQL",
        "MariaDB"
    ]
}


*LAMP* stands for *Linux, Apache, MariaDB, PHPMyAdmin*. It is a software bundle named after these four open-source
components.

This tutorial is for Linux operating system distributions only. This will not cover manual install on Windows or OSX.

## Requisites

- A Linux distribution (I will use **Debian** for this tutorial);
- Administrator rights. 

> Please note that commands or paths might slightly vary if you use a distribution other than **Debian** or **Ubuntu**.

## 1. Update your packages

```bash
apt update || apt full-upgrade -y
```

## 2. Install Apache

`apache2` means **Apache version 2.x.x**. 

```bash
apt install apache2
```

Once installed, start Apache.

```bash
service apache2 start
```

Open a web browser and type your server IP the URL.

```bash
http://YOUR.WEB.SERVER.IP
```

If everything worked well, you should see Apache's default landing page, similar to this.

![Apache default page][apache-default-page]

## 3. Install PHP

Install the version you want. Keep in mind you should always install the
[latest stable version of PHP](https://www.php.net/downloads.php) in a production environment.

```bash
apt install php
```

Test PHP install:

```bash
php -v
```

If installed correctly, it will output PHP's version.

## 4. Install MySQL server

Now that Apache and PHP are running, let's install MySQL server (see more about 
[Relational Database Management System](https://en.wikipedia.org/wiki/Database#Database_management_system)).

```bash
apt install mysql-server
```

Once installed, run the MySQL secure installation script which came with the MySQL server installation.

```bash
mysql_secure_installation
```

You will be asked to configure the `VALIDATE PASSWORD PLUGIN`. This plugin serves to improve security by requiring 
account passwords and enabling strength testing of potential passwords ([source](https://dev.mysql.com/doc/refman/5.6/en/validate-password.html)).

It is safe to deny its configuration if you use strong passwords. 

// Do test, mysql -u USER -p
...

// Show users, db, etc

## 5. Install PHPMyAdmin

I highly suggest you get PHPMyAdmin latest version from the [official PHPMyAdmn website](https://www.phpmyadmin.net/downloads/).

Copy the download link, and download the archive with `wget` (if you don't have this package installed, just run `apt install wget`).

Go to Apache's web directory.

```bash
cd /var/www
```

Then download the latest version.

```bash
wget https://files.phpmyadmin.net/phpMyAdmin/4.9.5/phpMyAdmin-4.9.5-all-languages.zip
```

Unzip the archive

## Conclusion

We learned how to install Apache, PHP, MySQL and PHPMyAdmin on a Linux distribution.

Now, you could learn how to configure Apache [https://www.alexisphilip.fr](Virtual Hosts) or how to
[https://www.alexisphilip.fr](administrate MySQL).

[apache-default-page]: https://www.alexisphilip.fr/static/img/articles/2020-04-23-apache-default-page.png
