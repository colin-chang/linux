# Linux命令简介

* [1. 命令格式](#1-命令格式)
* [2. 查阅命令帮助信息](#2-查阅命令帮助信息)

> Ubuntu终端快捷键

<small>
`ctrl + shift + =`  放大字体<br/>
`ctrl + -` 缩小字体
</small>

## 1. 命令格式
```sh
$ command [-options] [parameter]
```
<small>说明：</small>
* `command`:命令名，一般为功能英文缩写
* `[-options]`:命令选项，对命令进行控制。可同时使用多个选项，效果叠加。<br/>如：`ls -l -h -a`或`ls -lha`，两者等价，且选项顺序无关
* `[parameter]`:命令参数，可以任意多个

>`[]`代表参数可选

## 2. 查阅命令帮助信息
#### 1) --help
```sh
# 显示command命令的帮助信息
$ command --help
```
#### 2) man
```sh
# 查阅command命令的使用手册
$ man command
```
* `man` 是*manual*缩写，是Linux提供的一个手册，包含了绝大部分的命令、函数的详细使用说明
* 使用 `man` 查看帮助时常用操作键：

|操作键|功能|
|:-|:-|
|`Blank`|下一屏|
|`Enter`|下一行|
|`b`|上一屏|
|`q`|退出|
|`/keyword`|搜索关键字|