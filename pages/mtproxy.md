# Telegram 代理 MTProxy
```sh
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sudo sh get-docker.sh
$ docker pull telegrammessenger/proxy
$ docker run -d -p443:443 --name=mtproto-proxy --restart=always -v proxy-config:/data telegrammessenger/proxy:latest
$ docker logs mtproto-proxy
# 拷贝配置信息。 tg://proxy?server=35.220.152.192&port=443&s
ecret=716d1b82337856cc172034d5a8180a3a
```

tg://proxy?server=35.220.174.154&port=443&s
ecret=2312baa7938dd4700cfc95786b946dc9