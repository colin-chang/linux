# 权限管理

## 1. 权限介绍

权限|数字代码|缩写|英文
:-|:-|:-|:-
读|4|r|read
写|2|w|write
执行|1|x|execute
无权限|0||

**目录**可读权限表示是否可以读取目录下内容，可写表示是否可以修改目录下内容，**可执行表示是否可以在此目录执行命令**

## 2. 修改权限
Linux修改权限有一下三种方式:

命令|作用
:-|:-
[`chown [-options] [owner] FILE`](#21-chown-命令) |修改所有者
[`chgrp [-options] GROUP FILE`](usermg.html/#1-用户组管理) |修改所在组
[`chmod [-options] MODE FILE`](#22-chmod-命令)|直接修改权限

### 2.1 chown 命令
```sh
# 将123.txt所有者修改为test用户
$ sudo chown test 123.txt

# 将code目录所有者修改为test用户
$ sudo chown test code
```

### 2.2 chmod 命令
`chmod`是change mode缩写，其功能是修改用户(组)对文件或目录的权限
#### 1) 加减方式
```sh
# 命令格式
$ chmod +/-r|w|x file|dir
```

* 添加权限使用`+`,移除权限使用`-`
* 此种方式会同时修改 所有者、所在组、其他组 权限，不能精确修改三者各自权限

```sh
$ chmod +x 123.txt    # 添加123.txt文件的可执行权限
$ chmod -rw demo      # 移除demo目录的读写权限
```

#### 2) 数字方式
```sh
# 命令格式
$ chmod [-options] xxx file
```
* `-R`表示递归修改文件目录权限
* `chmod`可以简单的使用三个数字分别设置 **拥有者/所在组/其他组**权限
* `xxx`代表三个0-7的数字。**每位数字含义为各部分权限数字代码的和值**。权限数字代码结构如下表
<table style='text-align:center'>
<tr><th colspan='3'>所有者权限</th><th colspan='3'>所在组权限</th><th colspan='3'>其他组权限</th></tr>
<tr><td>r</td><td>w</td><td>x</td><td>r</td><td>w</td><td>x</td><td>r</td><td>w</td><td>x</td></tr>
<tr><td>4</td><td>2</td><td>1</td><td>4</td><td>2</td><td>1</td><td>4</td><td>2</td><td>1</td></tr>
</table>
<table style='text-align:center'>
<tr><th>权限</th><td rowspan='9'></td><th colspan='3'>各位权限码</th><th rowspan='9'></th><th>权限值</th></tr>
<tr><td>rwx</td><td>4</td><td>2</td><td>1</td><td>7</td></tr>
<tr><td>rw-</td><td>4</td><td>2</td><td>0</td><td>6</td></tr>
<tr><td>r-x</td><td>4</td><td>0</td><td>1</td><td>5</td></tr>
<tr><td>r--</td><td>4</td><td>0</td><td>0</td><td>4</td></tr>
<tr><td>-wx</td><td>0</td><td>2</td><td>1</td><td>3</td></tr>
<tr><td>-w-</td><td>0</td><td>2</td><td>0</td><td>2</td></tr>
<tr><td>--x</td><td>0</td><td>0</td><td>1</td><td>1</td></tr>
<tr><td>---</td><td>0</td><td>0</td><td>0</td><td>0</td></tr>
</table>

* 常见权限组合有
<table style='text-align:center'>
  <thead>
    <tr><th>权限组合</th><th colspan='3'>所有者权限</th><th colspan='3'>所在组权限</th><th colspan='3'>其他组权限</th></tr>
  </thead>
  <tbody>
    <tr><td>777</td><td>r</td><td>w</td><td>x</td><td>r</td><td>w</td><td>x</td><td>r</td><td>w</td><td>x</td></tr>
    <tr><td>755</td><td>r</td><td>w</td><td>x</td><td>r</td><td>-</td><td>x</td><td>r</td><td>-</td><td>x</td></tr>
    <tr><td>644</td><td>r</td><td>w</td><td>-</td><td>r</td><td>-</td><td>-</td><td>r</td><td>-</td><td>-</td></tr>
  </tbody>
</table>

```sh
# 递归修改ColinBlog目录的权限为 所有者可读可写可执行,所在组可读可执行,其他组可读可执行
$ chmod -R 755 ColinBlog
```