# MySQL安装和配置

MySQL是当下流行的跨平台高性能的数据库。下面我们简单的介绍以下Ubuntu和mac OS中的安装和配置方法

## 1. 安装MySQL

### 1) mac OS

```sh
# 清理历史。若为首次安装则可跳过此部分
$ brew uninstall mysql
$ brew cleanup
$ sudo rm -rf /usr/local/var/mysql

# 安装
$ brew update
$ brew install mysql
```

### 2) Ubuntu

```sh
# 安装服务端/客户端。服务端安装时按提示设定root用户密码即可
$ sudo apt install mysql-server/mysql-client

# 客户端连接数据库 uid和pwd分别替换为用户名密码，如 mysql -ucolin -p123
$ mysql -uuid -ppwd

# 退出mysql客户端
> quit;
```

连接成功之后进入mysql客户端后可以直接执行SQL指令，如`select now();`，**SQL指令必须已英文分号结尾**。

## 2. 简单配置

### 1) mac OS

```sh
# 修改目录权限。否则会出现类似 "ERROR! Manager of pid-file quit without updating file."
$ sudo chmod -R 757 /usr/local/var/mysql

# 启动mysql服务
$ sudo mysql.server start

$ 设置密码和简单配置。
$ mysql_secure_installation

#
# 设置密码完成后会出现以下选项，可以根据实际情况进行选择。
# 
# 是否删除默认无密码用户
# Remove anonymous users? (Press y|Y for Yes, any other key for No)
# 
# 是否禁止远程root登录
# Disallow root login remotely? (Press y|Y for Yes, any other key for No)
#
# 是否删除默认自带的test数据库
# Remove test database and access to it?
#
# 重新加载配置以应用当前修改
# Reload privilege tables now? (Press y|Y for Yes, any other key for No)
#
```

> 启动停止MySQL服务

* 前台运行

```sh
sudo mysql.server start/stop/restart
```

* 后台运行

```sh
brew services start/stop/restart mysql
```

### 2) Ubuntu

基于安全考虑，mysql默认只能本机连接。如果需要远程连接，需要按照如下步骤修改配置。生产环境中为了安全我们一般会配置为只允许指定IP连接到mysql。

(1) 修改配置文件

```sh
# 不同mysql版本配置文件路径可能不同，可自行搜索
$ sudo vi /etc/mysql/mysql.conf.d/mysqld.cnf 

# 注视掉如下内容
# bind-addres = 127.0.0.1
```

(2)重启mysql服务

```sh
sudo /etc/init.d/mysql restart
```

(3)开放IP

```sh
# 连接到mysql
$ mysql -uuid -ppwd

# 开放IP。 ip,uid,pwd替换为要开放的IP地址和mysql的用户名密码即可。
mysql> grant all privileges on *.* to uid@"ip" identified by "pwd" with grant option;

mysql> flush privileges;
```

## 3. Docker 方式安装

```sh
# 获取mysql镜像
$ docker pull mysql

# 创建mysql容器 指定root密码为123123
$ docker run \
--name mysql-test \
-e MYSQL_ROOT_PASSWORD=123123 \
-d \
-p 3306:3306 \
mysql

# 启动/停止/重启mysql容器
$ docker start/stop/restart mysql-test

# 删除mysql容器
$ docker rm mysql-test
```

详尽的mysql docker配置参见[Docker Hub](https://hub.docker.com/_/mysql)
