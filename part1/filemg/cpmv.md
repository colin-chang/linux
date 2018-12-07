# 拷贝和移动

| 命令 | 说明 |
|:-|:-|
| [`cp [-options] source_file target_file`](#1-cp-命令)|复制文件或目录|
| [`mv [-options] source_file/dir target_file/dir`](#2-mv-命令)|移动/重命名 文件或目录|


## 1. cp 命令
`cp`是copy缩写，其功能是将拷贝文件或目录。
```sh
# 命令格式
$ cp [-options] source_file target_file
```

### 1) options

|options|含义|
|:-|:-|
|`-a`|	该选项通常在复制目录时使用，它保留链接、文件属性，并递归地复制目录，简单而言，保持文件原有属性。|
|`-i`|开启覆盖文件提示。`cp`执行时会 **默认覆盖** 同名目标文件。建议每次使用`-i`进行安全复制|
|`-r`|复制文件或 **递归复制目录** (包含子目录和文件)。格式为:`cp -r source_dir target_dir`|
|`-v`|显示拷贝进度|

### 2) parameter
* 目标文件若与源文件同名，则`target_file`参数可以只写目录部分，省略目标文件名。
* **操作对象为目录时，如果`target_dir`存在，则将源目录拷贝至`target_dir`;如果`target_dir`不存在，则将源目录拷贝至`../target_dir`重命名为指定目录。mv操作亦是如此。**

```sh
# 将 ~/Documents/readme.txt 拷贝为 ~/Desktop/readme.txt
$ cp ~/Documents/readme.txt ~/Desktop

# 将 ~/Download/Python 拷贝到 ~/Desktop中
$ cp -r ~/Download/Python ~/Desktop
```

## 2. mv 命令
```sh
# 命令格式
$ mv [-options] source_file/dir target_file/dir
```
* `mv`命令是move缩写，其功能是移动/重命名文件或目录。如果移动文件或目录的源路径和目标路径一致，仅目标名称不同，可以实现文件或目录重命名。
* `mv`命令默认可以操作文件或目录，不需要提供像 `cp`和`rm`命令一样使用`-r`选项

|options|含义|
|:-|:-|
|`-i`|开启覆盖文件提示。`mv`执行时会 **默认覆盖** 同名目标文件。建议每次使用`-i`进行安全移动|
|`-v`|显示移动进度|

```sh
# 将～/Download/Python目录移动到 ～/Desktop
# 若~/Desktop/PythonCourse目录存在则拷贝至其中，若不存在则拷贝到～/Desktop中并重命名为PythonCourse
$ mv ~/Download/Python ~/Desktop/PythonCourse

# 将当前目录 test.txt 重命名为 demo.txt
$ mv -i test.txt demo.txt
```