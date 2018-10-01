# 软件工具安装

* [1. 设置服务器镜像源](#1-设置服务器镜像源)
* [2. apt命令](#2-apt命令)
* [3. 安装常用软件](#3-安装常用软件)
* [4. deb安装格式](#4-deb安装格式)
* [5. 安装Chrome和Sogou](#5-安装chrome和sogou)
* [6. Nginx安装和配置](#6-nginx安装和配置)
* [7. CentOS配置FTP](#7-centos配置ftp)

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
$ sudo apt-get install gnome-control-center           #如果系统设置打不开，请重新安装gnome-control-center
$ sudo apt-get install unity-control-center           #如果设置里只有很少的几个图标请重新安装unity-control-center
```

## 6. Nginx安装和配置
Nginx是当下流行的跨平台高性能的HTTP和反向代理服务。下面我们简单的介绍以下Ubuntu和mac OS中的安装和配置方法

### 6.1 安装nginx
#### 1) Ubuntu
```sh
# 更新apt
$ sudo apt update

# 安装nginx
$ sudo apt install nginx
```
nginx安装完成之后默认已经启动，可以直接访问 http://localhost/，如果看到欢迎页面说明nginx安装成功。

#### 2) mac OS
```sh
# 更新brew
$ brew update

# 安装nginx
$ brew install nginx
```

nginx安装完成之后默认已经启动，可以直接访问 http://localhost:8080/，如果看到欢迎页面说明nginx安装成功。

### 6.2 简单配置
nginx主配置文件为`nginx.conf`。反代功能只需简单配置 `http`节点即可。简单配置实例如下:

```json
upstream proxygroup {
    server 35.236.93.136:5000 weight=1 max_fails=2 fail_timeout=30s;
    server 35.236.93.138:5001 weight=1 max_fails=2 fail_timeout=30s;
}

server {
    listen        80; 
    server_name   localhost 35.236.93.135 bet518.win www.bet518.win;
    location / {
        proxy_pass         http://proxygroup;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade $http_upgrade;
        proxy_set_header   Connection keep-alive;
        proxy_set_header   Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto $scheme;
    }
}
```
以上配置是将对`localhost,35.236.93.139,bet518.win,www.bet518.win`等地址80端口的访问平均分发到`35.236.93.136:5000`和`35.236.93.138:5001`。

**修改配置之后需要重新加载或重启nginx服务**

> 详细配置含义可以参考
* https://blog.csdn.net/chenweijiSun/article/details/70823482
* https://www.jianshu.com/p/cee15a00728b
* http://tengine.taobao.org/nginx_docs/cn/docs/

#### 1) Ubuntu
* 默认配置文件在`/etc/nginx/`目录中
* 配置文件`include`指令可以将其他文件内容引用的当前指令的位置。nginx/1.14.0 (Ubuntu)的主配置文件中`include /etc/nginx/sites-enabled/*;`将`/etc/nginx/sites-enabled/`目录下所有文件引入，此目录下默认只有`default`文件，此文件是一个软链接指向`/etc/nginx/sites-available/default`。`/etc/nginx/sites-available/default`此文件是nginx的默认配置文件

#### 2) mac OS
* 默认配置文件在`/usr/local/etc/nginx/`目录中
* mac中可以使用`brew uninstall nginx`卸载nginx，但会有配置文件等遗留文件导致重装后存在问题。可以使用`find /usr/local/ -name "*nginx*"`命令查找所有相关文件并手动清理后再重装。
* mac中配置nginx若提示某系目录和文件不存在错误，手动创建相应文件即可

> nginx相关命令

```sh
# 启动
$ sudo nginx

# 停止
$ sudo nginx -s stop

# 退出
$ sudo nginx -s quit

# 重启
$ sudo nginx -s reopen

# 重新加载配置
$ sudo nginx -s reload
```

> 若需通过外网访问nginx需要在服务器防火墙放开对应端口

### 6.3 虚拟主机
虚拟主机是一种特殊的软硬件技术，它可以将网络上的一台物理主机分成多个虚拟主机，每个虚拟主机可以独立对外提供www服务，这样就可以实现一台主机对外提供多个Web服务，每个虚拟主机之间是独立的，互不影响。

#### 6.3.1 nginx支持三种类型的虚拟主机配置
##### 1) 基于ip的虚拟主机， (一台主机绑定多个ip地址)

```json
server{
  listen       192.168.1.1:80;
  server_name  localhost;
}
server{
  listen       192.168.1.2:80;
  server_name  localhost;
}
```

##### 2) 基于域名的虚拟主机(servername)
```json
server{
  listen       80;
  server_name  www.nginx1.com www.nginx2.com;
}
server{
  listen       80;
  server_name  www.nginx3.com;
}
```

##### 3) 基于端口的虚拟主机(listen不写ip的端口模式)
```json
server{
  listen       80;
  server_name  localhost;
}
server{
  listen       81;
  server_name  localhost;
}
```

#### 6.3.2 静态服务器配置

* 使用nginx虚拟主机技术科技在nginx上挂在多个Web服务
* 如果使用nginx挂载网站，其默认文件访问路径一般通过root属性指定。Linux中默认使用绝对路径`/var/www/html/`，Mac中默认使用相对路径`html`。
* **建议将网站文件放在nginx的root指定目录或其子目录下，其他目录可能导致nginx无权访问，造成nginx莫名出现404错误**

> mac OS中相对路径文件定位

mac OS中nginx配置大多使用相对路径，相对路径都是相对与nginx运行程序本身,我们可以通过以下步骤定位文件。

```sh
# 定位nginx程序路径
$ which nginx   # 输出 /usr/local/bin/nginx

# 切换到程序目录
$ cd /usr/local/bin/

# 确认nginx程序文件是否为软链接
$ ls -lh nginx   # 确认为软软链接，链接指向 ../Cellar/nginx/1.15.4/bin/nginx

# 切换到链接目录·
$ cd ../Cellar/nginx/1.15.4/bin/    # 此为nginx程序真正目录

# 查看nginx当前版本目录
$ cd ..     # 切换到nginx当前版本目录
$ ls -lh    # 找到root中使用的html目录，html又是一个软链接，链接指向 ../../../var/www

# 切换到链接目录
$ cd ../../../var/www

# 输出最终网站文件目录
$ pwd   # /usr/local/var/www
```

mac OS中配置大量使用多层相对路径和软连接，导致定位文件或目录十分繁琐，相比之下，Linux中配置要简单许多。

## 7. CentOS配置FTP与Nginx

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
