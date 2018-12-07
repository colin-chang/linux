# Telegram 代理 MTProxy
```sh
$ sudo -i
$ cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
$ curl -fsSL https://get.docker.com -o get-docker.sh
$ sh get-docker.sh
$ docker pull telegrammessenger/proxy
$ docker run -d -p443:443 --name=mtproto-proxy --restart=always -v proxy-config:/data telegrammessenger/proxy:latest
$ docker logs mtproto-proxy

```
