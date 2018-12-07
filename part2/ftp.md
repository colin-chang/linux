# FTP安装和配置

## 1. CentOS
### 1) 更新yum源
更新yum源，便捷工具下载地址：http://help.aliyun.com/manual?spm=0.0.0.0.zJ3dBU&helpId=1692

### 2) 安装vsftp
``` sh
# yum install vsftpd -y
```

### 3) 添加ftp帐号和目录
先检查一下nologin的位置，通常在 `/usr/sbin/nologin` 或 `/sbin/nologin` 目录下。
```sh
# useradd -d /web -s /sbin/nologin test #创建帐户，该命令指定了/web 为用户test的家目录，您可以自己定义帐户名和目录
# passwd test                           #修改该帐户密码
# chown -R test.test /web               #修改指定目录的权限
```

### 4) 配置vsftp
编辑vsftp配置文件
```sh
# vi /etc/vsftpd/vsftpd.conf
```
* 配置项 `anonymous_enable=YES` 改为 `anonymous_enable=NO`
* 启用以下配置(反注释)
    * `local_enable=YES`
    * `write_enable=YES`
    * `chroot_local_user=YES`

* 添加配置项 `allow_writeable_chroot=YES`

### 5) 设置vsftpd开机启动
```sh
# systemctl enable vsftpd
```

### 6) 修改shell配置
如果该文件里没有 `/usr/sbin/nologin` 或者 `/sbin/nologin` (具体看当前系统配置)则追加进去
```sh
# vi /etc/shells 
```

### 7) 配置防火墙和SELinux
```sh
# firewall-cmd --permanent --zone=public --add-service=ftp  #添加ftp入站规则
# firewall-cmd --reload                                     #重启防火墙
# setsebool -P ftp_home_dir 1
# setsebool -P allow_ftpd_full_access 1
```

### 8) 启动vsftp服务并测试登录
```sh
# service vsftpd start	#启动vsftp服务
```
用帐号test测试下是否可以登陆ftp。目录是 `/web`

> 相关命令

```sh
# systemctl start firewalld.service       #启动firewall
# systemctl stop firewalld.service        #停止firewall
# systemctl disable firewalld.service     #禁止firewall开机启动
```

## 2. Windows Server
我们推进使用FileZilla在Windows Server中快速搭建FTP服务器。

FileZilla是一个免费开源的FTP软件，分为客户端版本和服务器版本，具备所有的FTP软件功能。可控性、有条理的界面和管理多站点的简化方式使得Filezilla客户端版成为一个方便高效的FTP客户端工具，而FileZilla Server则是一个小巧并且可靠的支持FTP&SFTP的FTP服务器软件。

FileZilla服务端仅支持Windows平台，客户端支持Windows/mac OS/Linux。
### 1) 安装
https://filezilla-project.org/download.php?type=server 下载服务端软件后，直接安装即可。
### 2) 配置
点击工具栏上的user按钮小图标，进入用户配置界面；点击【Add】按钮新增用户；在弹出的对话框中输入用户名（本例测试用户名为tencent-qcloud），点击【OK】进入下一步：
![添加用户](../img/useradd.png '添加FileZilla用户')

勾选“password”，为新增的用户设置密码，点击【OK】按钮：
![设置密码](../img/passwd.jpg '设置FileZilla用户密码')

切换到Shared folders，添加共享目录并勾选相应权限：
![添加共享目录](../img/choosefolder.jpg '设置FileZilla共享目录')
![设置共享目录权限](../img/setpermission.jpg '设置FileZilla权限')

被动模式设置(Passive mode)。FTP的客户端默认以Passive mode连接服务器，Filezilla会随机打开1-65535之间的一个端口。可以根据实际客户端连接数调整开放端口数量。设置完成之后需要在**服务器防火墙放开对应的端口**。Google Cloud等服务器，另外还需要在服务器控制台中放开指定端口。
![被动模式设置](../img/passive.jpg '设置FileZilla被动模式')

启动TLS模式。解决"FTP over TLS is not enabled, users cannot securely"问题。
![启动TLS模式](../img/tls.jpg '设置TLS模式')
![TLS证书](../img/certification.jpg '生成证书')
按照图示启用TLS模式并生成TLS证书。在FTP客户端连接服务器，并信任证书即可。