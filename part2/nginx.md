# Nginx安装和配置
Nginx是当下流行的跨平台高性能的HTTP和反向代理服务。下面我们简单的介绍以下Ubuntu和mac OS中的安装和配置方法

## 1. 安装 nginx
### 1) Ubuntu
```sh
# 更新apt
$ sudo apt update

# 安装nginx
$ sudo apt install nginx
```
nginx安装完成之后默认已经启动，可以直接访问 http://localhost/， 如果看到欢迎页面说明nginx安装成功。

### 2) mac OS
```sh
# 更新brew
$ brew update

# 安装nginx
$ brew install nginx
```

nginx安装完成之后默认已经启动，可以直接访问 http://localhost:8080/， 如果看到欢迎页面说明nginx安装成功。

## 2. 简单配置
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
        proxy_set_header   Connection $http_connection;
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

### 1) Ubuntu
* 默认配置文件在`/etc/nginx/`目录中
* 配置文件`include`指令可以将其他文件内容引用的当前指令的位置。nginx/1.14.0 (Ubuntu)的主配置文件中`include /etc/nginx/sites-enabled/*;`将`/etc/nginx/sites-enabled/`目录下所有文件引入，此目录下默认只有`default`文件，此文件是一个软链接指向`/etc/nginx/sites-available/default`。`/etc/nginx/sites-available/default`此文件是nginx的默认配置文件

### 2) mac OS
* 默认配置文件在`/usr/local/etc/nginx/`目录中
* mac中可以使用`brew uninstall nginx`卸载nginx，但会有配置文件等遗留文件导致重装后存在问题。使用`rm -rf $(find /usr/local/ -name "*nginx*")`命令查找所有相关文件并清理后再重装。
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

## 3. Docker 方式安装

```sh
# 获取nginx镜像
$ docker pull nginx

# 创建nginx容器
$ sudo docker run \
--name my-nginx \
-d \                                                      # 后台运行容器
-p 8000:80 \                                              # 映射宿主8000端口到容器80端口
-v ~/nginx/default.conf:/etc/nginx/conf.d/default.conf \  # 挂载宿主配置文件~/nginx/default.conf到容器中
--link lottery:web \                                      # 链接到lottery容器并命名为web
nginx

# 启动/停止/重启mysql容器
$ docker start/stop/restart my-nginx

# 删除mysql容器
$ docker rm my-nginx
```

详尽的nginx docker配置参见[Docker Hub](https://hub.docker.com/_/nginx)

## 4. 虚拟主机
虚拟主机是一种特殊的软硬件技术，它可以将网络上的一台物理主机分成多个虚拟主机，每个虚拟主机可以独立对外提供www服务，这样就可以实现一台主机对外提供多个Web服务，每个虚拟主机之间是独立的，互不影响。

### 3.1 三种虚拟主机
#### 1) 基于ip的虚拟主机， (一台主机绑定多个ip地址)

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

#### 2) 基于域名的虚拟主机(servername)
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

#### 3) 基于端口的虚拟主机(listen不写ip的端口模式)
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

### 3.2 静态服务器配置

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