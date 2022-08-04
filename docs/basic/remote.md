# 远程管理

| 命令 | 说明 |
|:-|:-|
| `logout [n]`|注销登录的shell。不在shell执行报错|
| [`shutdown [-options] [time]`](#_1-shutdown命令)|关机/重启|
| [`ifconfig [-options]`或`ip addr`](#_2-ifconfig命令)|查看或配置网卡信息|
| [`ping [-options] destination`](#_3-1-ping命令)|检测到目标地址连接通讯是否正常|
| [`curl [-options] url`](#_3-2-curl命令)|发送网路请求到指定地址|
| [`ssh [-options] [user@hostname]`](#_4-ssh命令)|远程连接服务器|
| <a href='#_5-scp命令'>`scp [-options] [[user@]host1:]file1 [[user@]host2:]file2`</a>|远程复制文件|

## 1. shutdown命令
```sh
# 命令格式
$ shutdown [-options] [time]
```
* `shutdown`命令一般需要root权限执行
* 远程维护服务器时，最好不要关闭系统(关闭后启动不方便)，一般选择重启系统

#### 1) options

options | 含义
:-|:-
缺省 |  默认行为为关机
`-r` | 重新启动。`shutdown -r now` 等价于 `reboot`
`-c` | 取消代执行的关机或重启任务，必须在关机或重启之前执行

#### 2) time

options | 含义
:-|:-
缺省 |  默认为1分钟后执行
`+m` | `m`分钟后执行
`now` | 现在立即执行
`hh:mm`| 指定时间执行,只能设置小时和分钟

```sh
# 1分钟后关机
$ shutdown

# 立即重启
$ shutdown -r now

# 10分钟后关机
$ shutdown +10

# 今天20:30 重启
$ shutdown -r 20:30

# 取消关机或重启任务
$ shutdown -c
```

## 2. ifconfig命令
```sh
# 命令格式
$ ifconfig [-options]
```

* 如果命令不存在，需要先进行安装`sudo apt install net-tools`
* 一台计算机可能有一个物理网卡和多个虚拟网卡，在Linux中物理网卡名字通常为`ensXX`

```sh
# 查看网卡配置信息
$ ifconfig

# 过滤查看IP地址
$ ifconfig | grep inet
```
除了`ifconfig`命令，也常用`ip addr`来查看网路配置。

## 3. 网络
### 3.1 ping命令
```sh
# 命令格式
$ ping [-options] destination
```

* `ping`一般用于检测当前计算机到目标计算机之间的网络是否通畅。我们给目标IP发送一个数据包，对方返回一个包，根据返回包的时间我们可以确定目标计算机是否存在并且工作正常以及网络链接速度。
* Linux中`ping`命令不会自动停止，可以使用`Ctrl + C`退出。
* `ping 127.0.0.1` 可以测试本机网卡是否正常工作 

### 3.2 curl命令
```sh
# 命令格式
$ curl [options...] url
```

* `curl`一般用于发送网路请求到指定URL，也可以用于检测网路连通性。如果很多人使用浏览器访问百度以检测网络可用性。
* 常用配合`-o`用于下载网路资源。Ubuntu下也可以使用其`wget`命令。

```sh
# 请求 https://a-nomad.com
$ curl https://a-nomad.com

# 下载
$ curl -o index.html https://a-nomad.com
$ wget https://a-nomad.com # Linux only
```

## 4. ssh命令
[ssh小白入门教程一次弄懂ssh入门到精通](https://a-nomad.com/ssh)

## 5. scp命令
[scp远程拷贝命令详解](https://a-nomad.com/ssh#heading-3-scp)