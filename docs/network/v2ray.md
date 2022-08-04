# 全能翻墙工具 - V2Ray

## 1. 前言
最近GFW一直持续发威，据说SSR数据包已经被识别。导致大批鸡鸡和VPS被墙。大家都在寻找更好的科学上网的一个方式。

就目前来讲，v2ray+ws+tls的一个方式只要是配置好了，伪装能力那是相当的强。。。但所有东西没有绝对，只能说，能让你更大几率的避免被墙。

## 2. V2Ray 上手
### 2.1 服务端
除了使用第三方提供的V2Ray节点外，相信小伙伴们已经迫不及待的想自建服务器，小试身手了，话不多说，这就操练起来吧...

系统环境： Debian 8
```sh
$ sudo -i
$ cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

# 开启Debian自带的BBR：
$ echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf && echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf && sysctl -p && sysctl net.ipv4.tcp_available_congestion_control && lsmod | grep bbr

# 安装 v2-ui (包含V2Ray官方包) https://github.com/sprov065/v2-ui
$ bash <(curl -Ls https://blog.sprov.xyz/v2-ui.sh)
```

> v2-ui https://github.com/sprov065/v2-ui
> 免费Https证书 https://freessl.cn/
> 免费的国际域名 https://freenom.com/

v2-ui安装完成后即可痛过界面化配置v2ray，并作域名解析。

### 2.2 客户端
V2Ray 搭建好了，自然要配置客户端使用咯~

V2Ray支持
[Windows](https://github.com/2dust/v2rayN/releases)/
[mac OS](https://github.com/yanue/V2rayU/releases)/
[Linux](https://github.com/jiangxufeng/v2rayL)/
[Android](https://github.com/2dust/v2rayNG/releases)/
[iOS](https://apps.apple.com/us/app/shadowrocket/id932747118)
等主流平台。

所有客户端都是简单的图形界面操作，在此不再赘述。有不明白读者，点击参考以上连接即可。