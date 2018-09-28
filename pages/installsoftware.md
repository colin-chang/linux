# 软件安装

* [1. 设置服务器镜像源](#1-设置服务器镜像源)
* [2. apt命令](#2-apt命令)
* [3. 安装常用软件](#3-安装常用软件)
* [4. deb安装格式](#4-deb安装格式)
* [5. 安装Chrome和Sogou](#5-安装chrome和sogou)
* [6. CentOS配置FTP与Nginx](#6-centos配置ftp与nginx)

## 1. 设置服务器镜像源
Ubuntu官方服务器在境外，连接速度较慢。为此Ubuntu提供了`选择最佳服务器`的功能，方便我们选择一个速度最快的镜像服务器。
步骤如下(Ubuntu 18.04.1 LTS)
* 搜索并打开 `软件和更新`
* 设置 `下载自`->`其他站点...`
* 点击 `选择最佳服务器` 稍后 `选择服务器`
![选择镜像服务器](../img/setmirror.jpg '设置镜像服务器')

<small>**提示**:更换服务器之后，需要一段时间的更新过程，需要耐心等候。更新完毕后再次安装和更新软件都会连接新设置的服务器。</small>

## 2. apt命令
* `apt`是`Advanced Packaging Tool`，是Ubuntu下的**包管理工具**
* Ubuntu中大部分的软件 安装/卸载/更新 都是使用`apt`命令
* `apt-get`和`apt`命令类似，早期使用`apt-get`，Ubuntu16之后官方建议使用`apt`。当前`apt`是强化版本，包含了`apt-get`
* `apt`常用命令如下

    ```sh
    # 1.安装软件
    $ sudo apt install <软件名>

    # 2.卸载软件
    $ sudo apt remove <软件名>

    # 3.更新可用软件列表
    $ sudo apt update

    # 4.更新软件已安装软件
    $ sudo apt upgrade

    ```

## 3. 安装常用软件
**python工具**
```sh
$ sudo apt install ipython
$ sudo apt install ipython3
$ sudo apt install python-pip
$ sudo apt install python3-pip
```
**ssh服务器**
```sh
# 安装ssh后才可以远程登录
$ sudo apt install openssh-server
```

## 4. deb安装格式
deb是Debian Liunx的安装格式，在Ubuntu中同样可以使用。要安装deb安装包，需要使用`dpkg`命令。
```sh
$ sudo dpkg -i <deb安装包>
```

## 5. 安装Chrome和Sogou
### 1) 安装Chrome
* [下载](https://www.google.com/chrome/ 'Chrome官网')Chrome for Linux的Deb安装包

* 执行以下命令
    ```sh
    $ sudo apt install libappindicator1
    $ sudo dpkg -i <Chrome Deb安装包>
    $ sudo apt -f install
    ```

### 2) 安装Sogou
* 搜索并打开`语言支持`修改`键盘输入法系统`为`fcitx`

![语言支持](../img/inputmethod.png '键盘输入法系统')

* 如果没有`fcitx`选项则需要先安装`fctix`。默认有`fctix`选项可以跳过此步

    ```sh
    # 安装fcitx所需组件
    $ sudo apt install fcitx fcitx-tools fcitx-config* fcitx-frontend* fcitx-module* fcitx-ui-* presage   

    # 卸载fctix与sogou冲突的组件
    $ sudo apt remove fcitx-module-autoeng-ng
    $ sudo apt remove fcitx-module-fullwidthchar-enhance
    $ sudo apt remove fcitx-module-punc-ng
    ```

* [下载](https://pinyin.sogou.com/linux/?r=pinyin '搜狗输入法下载')Sogou for Linux的Deb安装包
* 执行以下命令安装
    ```sh
    $ sudo dpkg -i <Sogou Deb安装包>
    # 执行安装命令会存在一个依赖关系配置错误，执行下面的语句可以修复此依稀配置问题
    $ sudo apt -f install
    ```

> 卸载iBus导致系统设置打不开修复方案

<small>安装输入法过程中，不要卸载系统自带的iBus输入法系统选项。如果不小心卸载输入法之后发现系统设置无法打开，可以通过以下方式修复</small>
```sh
sudo apt-get install gnome-control-center           #如果系统设置打不开，请重新安装gnome-control-center
sudo apt-get install unity-control-center           #如果设置里只有很少的几个图标请重新安装unity-control-center
```

## 6. CentOS配置FTP与Nginx
### 6.1 vsftpd安装与配置

#### 1) 更新yum源
更新yum源，便捷工具下载地址：http://help.aliyun.com/manual?spm=0.0.0.0.zJ3dBU&helpId=1692

#### 2) 安装vsftp
``` sh
# yum install vsftpd -y
```

#### 3) 添加ftp帐号和目录
先检查一下nologin的位置，通常在 `/usr/sbin/nologin` 或 `/sbin/nologin` 目录下。
```sh
# useradd -d /web -s /sbin/nologin test #创建帐户，该命令指定了/web 为用户test的家目录，您可以自己定义帐户名和目录
# passwd test                           #修改该帐户密码
# chown -R test.test /web               #修改指定目录的权限
```

#### 4) 配置vsftp
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

#### 5) 设置vsftpd开机启动
```sh
# systemctl enable vsftpd
```

#### 6) 修改shell配置
如果该文件里没有 `/usr/sbin/nologin` 或者 `/sbin/nologin` (具体看当前系统配置)则追加进去
```sh
# vi /etc/shells 
```

#### 7) 配置防火墙和SELinux
```sh
# firewall-cmd --permanent --zone=public --add-service=ftp  #添加ftp入站规则
# firewall-cmd --reload                                     #重启防火墙
# setsebool -P ftp_home_dir 1
# setsebool -P allow_ftpd_full_access 1
```

#### 8) 启动vsftp服务并测试登录
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

### 6.2 Nginx安装与配置

#### 1) 下载对应当前系统版本的nginx包
```sh
# wget http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

#### 2) 建立nginx的yum仓库
```sh
# rpm -ivh nginx-release-centos-7-0.el7.ngx.noarch.rpm
```

#### 3) 下载并安装nginx
```sh
# yum install nginx
```

#### 4) 启动nginx服务
```sh
# systemctl start nginx
```

#### 5) 配置
打开 `nginx.conf`，配置文件里的 `http` 配置区块中用 `include` 指令，把所有的在 `/etc/nginx/conf.d` 这个目录下面的 `.conf` 文件包含到了这里。也就是如果我们想去添加自己的配置，可以把配置放到一个以 `.conf` 结尾的文件里面，再把这个文件放到 `/etc/nginx/conf.d` 这个目录的下面，重新加载 nginx 以后，这些配置就会生效了。

如创建 `taishanlive.conf`,内容如下
```json
upstream taishan.live {
        server chanyikeji.com:50001 weight=1;
}
server {
        listen 80;
        server_name 59.188.252.15 taishan.live www.taishan.live;
        location / {
            proxy_pass http://taishan.live;
            proxy_set_header   Host             #host;
            proxy_set_header   X-Real-IP        #remote_addr;
            proxy_set_header   X-Forwarded-For  #proxy_add_x_forwarded_for;
        }
}
```

#### 6) 权限
负载均衡如果遇到此权限问题，error.log日志：`*** connect() to 127.0.0.1:8080 failed (13: Permission denied) while connecting to upstream**` 这是SeLinux的导致，可用以下命令解决：
```sh
# setsebool -P httpd_can_network_connect 1
```

#### 7) 重启nginx
```sh
# systemctl restart nginx
```