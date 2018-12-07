# 新建和删除

| 命令 | 说明 |
|:-|:-|
| `touch [-options] file`|若文件不存在则创建文件,否则修改文件最后编辑时间|
| `mkdir [-options] dir`|创建目录。`-p`可以**层级创建目录**，如`mkdir -p a/b/c`|
| [`rm [-options] file`](#1-rm-命令)|删除文件或目录,删除后**不可恢复**|
| `rmdir [-options] dir`|删除目录,目录必须为空|

## 1. rm 命令
```sh
# 命令格式
$ rm [-options] file
```

`rm`是remove缩写，其功能是删除文件或目录(不可恢复)。
### 1) options

|options|含义|
|:-|:-|
|`-i`|开启删除确认提示，所有待删除文件将逐次提示
|`-r`|删除文件或 **递归删除目录** (包含子目录和文件)|
|`-f`|强制删除，忽略不存在文件|

<small>注：删除目录可以使用`rmdir dir`或`rm -r dir`，前者只能删除空目录，后者则可以递归删除目录(不管是否为空)</small>

### 2) parameter
`rm`命令的parameter同样可以使用通配符。
```sh
# 删除以ab开头的文本文件
$ rm ab*.txt

# 删除 test目录
$ rm -r test

# 清空当前目录,谨慎使用
$ rm -rf * 
```
