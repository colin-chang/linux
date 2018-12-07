# 打包压缩

| 命令 | 说明 |
|:-|:-|
| [`tar [-options] [file]`](#1-打包解包)|打包解包文件|
|[`zip [-options] [file]`](#3-zipuzip)|压缩或解压zip文件

## 1. 打包解包
```sh
# 命令格式
$ tar [-options] [file]
```
* `tar`是Linux最常用的备份工具。其功能是把一系列文件或目录归档到一个tar包文件中，也可以将tar包解档
* `tar`归档操作只是打包并不会压缩文件
* `[file]`如有多个文件或目录,使用空格分割依次排列即可

options|含义
:-|:-
`-c`|生成档案文件
`-x`|解开档案文件
`-v`|列出归档解档
`-f`|指定档案文件名称。`-f`后面是tar包名称，所以在options中放在最后
`-t`|列出档案中包含的文件
`-z`|使用`gzip`压缩或解压
`-j`|使用`bzip2`压缩或解压
`-C`|解档或解压到指定目录。**目录必须存在**

```sh
# 将English.txt,Chinese.txt,Europe(目录)归档为languages.tar
$ tar -cvf languages.tar English.txt Chinese.txt Europe

# 将languages.tar解档到当前目录
$ tar -xvf languages.tar
```

## 2. 压缩解压
### 1) gzip
`gzip`是Linux下一种流行的压缩方式。
* 用`gzip`压缩`tar`包文件后的压缩文件扩展名是`.tar.gz`，这是Linux中最常见的压缩格式
* `tar`命令使用`-z`可以调用`gzip`对tar包进行压缩，方便实现打包压缩
* 也可单独使用`gzip`压缩tar包或解压压缩文件，单使用较少。一般联合`tar`命令使用较多

```sh
# 将English.txt,Chinese.txt,Europe(目录)压缩为languages.tar.gz
$ tar -zcvf languages.tar.gz English.txt Chinese.txt Europe

# 将languages.tar.gz解压到用户桌面
$ tar -zxvf languages.tar.gz -C ~/Desktop
```

### 2) bzip2
`bzip2`与`gzip`类似也是一种流行压缩方式。
* 用`bzip2`压缩`tar`包文件后压缩文件扩展名是`.tar.bz2`
* `tar`命令使用`-j`可以调用`bzip2`对tar包进行压缩。

```sh
# 将English.txt,Chinese.txt,Europe(目录)压缩为languages.tar.bz2
$ tar -jcvf languages.tar.bz2 English.txt Chinese.txt Europe

# 将languages.tar.bz2解压到用户桌面
$ tar -jxvf languages.tar.bz2 -C ~/Desktop
```

### 3) zip/unzip
zip压缩格式不同于gzip和bzip2联合`tar`命令使用，zip可以指定文件或目录压缩到指定的压缩包中。`zip`格式的压缩包常用于各大平台操作系统。

```sh
# 命令格式
$ zip [-options] zip path
$ unzip [-options] path zip
```

通过zip压缩文件的目标文件不需要指定扩展名，默认扩展名为zip。

```sh
# 将用户Download目录递归压缩到test.zip中
$ zip -r test ~/Download

# 将test.zip解压到temp目录中
$ unzip -d temp test 
```