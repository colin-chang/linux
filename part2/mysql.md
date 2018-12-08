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
$ sudo mysql.server start/stop/restart
```

* 后台运行

```sh
$ brew services start/stop/restart mysql
```