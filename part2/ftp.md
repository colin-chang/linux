# FTP安装和配置

## 1. Debian/Ubuntu
### 1) 安装vsftp
``` sh
$ sudo apt install vsftpd
```

### 2) 配置vsftp
```sh
# 编辑vsftp配置文件
$ vi /etc/vsftpd.conf
```
作以下配置：

配置|作用
:-|:-
`anonymous_enable=NO`|禁用匿名用户
`local_enable=YES`|允许本机登录
`write_enable=YES`|允许写入操作(上传或删除)

前两项配置为默认值，一般只需要修改`write_enable`即可。

```sh
# 修改配置后需要重启服务
$ sudo service vsftpd restart
```
### 3) 用户配置
安装vsftp时会自动创建`ftp`用户组。在`ftp`组中的用户都可以进行ftp连接。用户的ftp目录默认限制为用户的主目录。所以只需要将现有用户添加到`ftp`组或创建用户指定到`ftp`组中即可。

* 现有用户

    ```sh
    # 将用户colin添加到ftp组
    $ sudo gpasswd -a colin ftp

    # 完成后colin可以登录ftp，共享目录默认为 /home/colin
    ```

* 新建用户

    ```sh
    # 添加test用户
    $ sudo useradd -m -g ftp test

    # 完成后test可以登录ftp，共享目录默认为 /home/test
    ```

如果想多用户共享同个ftp目录，可以创建多个用户主目录指向共享目录即可。可以将共享目录的用户组设置为`ftp`组,以保证所有ftp用户的都有此目录权限。

* 多用户共享目录

    ```sh
    # 创建共享目录
    $ mkdir /usr/share/ftp
    # 修改目录所在组
    $ sudo chgrp -R ftp /usr/share/ftp/
    # 修改共享目录权限
    $ chmod -R 470 /usr/share/ftp

    # 创建user1,user2用户到ftp组并指定主目录为共享目录
    $ sudo useradd -d /usr/share/ftp/ -g ftp user1
    $ sudo passwd user1
    $ sudo useradd -d /usr/share/ftp/ -g ftp user2
    $ sudo passwd user2
    
    # user1,user2 都可登录ftp并共享/usr/share/ftp/目录
    ```

ftp用户一般只可进行ftp操作。如果常规用户(非ftp用户)想使用ftp，添加到ftp组即可使用主目录使用ftp功能。如果想访问其他ftp用户的共享目录，如上面案例的`/usr/share/ftp/`,添加相应权限即可。

> ftp服务器配置完成后，务必开放ftp端口(默认21)，不同服务器开放方式不同，在此不再赘述


## 2. Windows Server
我们推进使用FileZilla在Windows Server中快速搭建FTP服务器。

FileZilla是一个免费开源的FTP软件，分为客户端版本和服务器版本，具备所有的FTP软件功能。可控性、有条理的界面和管理多站点的简化方式使得Filezilla客户端版成为一个方便高效的FTP客户端工具，而FileZilla Server则是一个小巧并且可靠的支持FTP&SFTP的FTP服务器软件。

FileZilla服务端仅支持Windows平台，客户端支持Windows/mac OS/Linux。
### 1) 安装
https://filezilla-project.org/download.php?type=server 下载服务端软件后，直接安装即可。
### 2) 配置
点击工具栏上的user按钮小图标，进入用户配置界面；点击【Add】按钮新增用户；在弹出的对话框中输入用户名（本例测试用户名为tencent-qcloud），点击【OK】进入下一步：
![添加用户](https://i.loli.net/2020/02/25/ncDbWRhJa4AL5CF.png '添加FileZilla用户')

勾选“password”，为新增的用户设置密码，点击【OK】按钮：
![设置密码](https://i.loli.net/2020/02/25/4JOw8AdsVGfloFm.jpg '设置FileZilla用户密码')

切换到Shared folders，添加共享目录并勾选相应权限：
![添加共享目录](https://i.loli.net/2020/02/26/73tHJmhwLEfWaGO.jpg '设置FileZilla共享目录')
![设置共享目录权限](https://i.loli.net/2020/02/25/vin2w4IBuke9Uba.jpg '设置FileZilla权限')

被动模式设置(Passive mode)。FTP的客户端默认以Passive mode连接服务器，Filezilla会随机打开1-65535之间的一个端口。可以根据实际客户端连接数调整开放端口数量。设置完成之后需要在**服务器防火墙放开对应的端口**。Google Cloud等服务器，另外还需要在服务器控制台中放开指定端口。
![被动模式设置](https://i.loli.net/2020/02/25/DqKnehVjzXJNyfU.jpg '设置FileZilla被动模式')

启动TLS模式。解决"FTP over TLS is not enabled, users cannot securely"问题。
![启动TLS模式](https://i.loli.net/2020/02/25/8qoRGYaThUwBcVQ.jpg '设置TLS模式')
![TLS证书](https://i.loli.net/2020/02/25/uhfd9ayJe2FMDI7.jpg '生成证书')
按照图示启用TLS模式并生成TLS证书。在FTP客户端连接服务器，并信任证书即可。

## 3. Docker 方式安装
### 3.1 FTP
```sh
# 获取vsftpd镜像
$ docker pull fauria/vsftpd
# 创建目录开放权限
$ cd && mkdir ftp-repository && chmod -R 777 ftp-repository
# 创建vsftpd容器
$ docker run -d -v $PWD/ftp-repository:/home/vsftpd \
--name vsftpd --restart=always \
-p 20:20 -p 21:21 -p 21100-21110:21100-21110 \
-e PASV_ADDRESS=127.0.0.1 -e PASV_MIN_PORT=21100 -e PASV_MAX_PORT=21110 \
-e FTP_USER=colin -e FTP_PASS=123123 \
fauria/vsftpd

# 启动/停止/重启vsftpd容器
$ docker start/stop/restart vsftpd

# 删除vsftpd容器
$ docker rm vsftpd
```

以上可以使用 colin/123123 登录FTP并使用`~/ftp-repository/colin`目录。

使用FileZilla客户端连接时如果出现"FileZilla尝试连接“ECONNREFUSED - 连接被服务器拒绝”错误，修改传输模式为主动模式即可。

![主动模式](https://i.loli.net/2020/02/25/YrTLDIG56Bw2Wjz.jpg)

如果使用Windows客户端出现如下图所示的问题，可以尝试从防火墙放开Filezilla FTP Cliet。

![FTP读取目录列表失败](https://i.loli.net/2020/02/25/wYPig4x815vqNsz.jpg)

![开放防火墙](https://i.loli.net/2020/02/25/Qk3ZXl79mA4E2Y5.jpg)

详尽的vsftpd docker配置参见[Docker Hub](https://hub.docker.com/r/fauria/vsftpd)。

### 3.2 SFTP
我们可以尝试使用SFTP协议，即使用SSH协议传输。通过以下方式启动vsftpd容器即可，不需要指定用户名密码和目录。

```sh
$ docker run -d -p 21:21 --name vsftpd fauria/vsftpd
```

此时我们使用客户端通过SFTP协议连接，任何系统用户都可以使用自身用户名密码登录FTP服务器，目录为用户主目录。与SSH连接相同。

![SFTP](https://i.loli.net/2020/02/25/o1xhkiTznA5QXvZ.jpg)