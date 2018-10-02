# 文件目录管理

## 1. Linux目录结构
* Linux的文件系统是采用层级式的树状目录结构，在此结构中的最上层是根目录"/"。
* Linux文件或目录名称最长有256个字符
* Linux文件和目录名称大小写敏感
* 以`.`开头的文件为隐藏文件
* 同级目录中，**不允许文件和目录同名**。

**常用目录速查表:**

目录 | 说明
:-|:-
/bin(binary)|存放二进制程序和系统常用命令,主要用于具体应用
/sbin(system binary)|存放系统专用二进制程序和命令，需一定权限执行的命令
/usr|存放用户使用的系统命令和应用程序等信息，类似windows的program files
/usr/bin|存放后期安装的一些软件
/usr/sbin|存放超级用户的一些管理程序
/boot|存放操作系统引导文件
/dev|设备文件目录，访问该目录文件，相当于访问某个设备。`/dev/cdrom/mnt`常用于挂载光驱
/etc|存放有关系统配置的文件
/home|一般用户的主目录或ftp站点目录
/mnt|装置文件系统的默认挂载点。如`/mnt/cdrom`常用于挂载光驱 
/proc|系统核心与程序执行的信息
/root|管理员主目录
/tmp|用来存放暂存盘的目录
/var|经常变动的文件目录，比如log
/opt|存放额外安装的软件

> which命令

``` sh
# 命令格式
$ which [-a] command
```

which 命令可以用于定位Linux命令文件所在目录。

```sh
$ which ls
# 输出 /bin/ls

$ which useradd
# 输出 /usr/sbin/useradd
```
* 命令文件一般存储在`/bin`,`/sbin`,`/usr/bin`,`/usr/sbin`四个目录中，具体可参照上表
* `cd`命令是内置在系统内核中的没有独立文件,因此`which`无法知道`cd`命令位置

## 2. 文件目录管理命令

| 命令 | 说明 |
|:-|:-|
| [`cd [dir]`](#21-cd命令)|切换到指定目录|
| [`ls [-options] [dir,file]`](#22-ls命令)|查看指定目录所有内容|
| [`tree [-options] [dir]`](#23-tree命令)|可以以树状图方式展示目录内容(层级子目录及文件)|
| `pwd [-options]`|打印当前工作目录|
| `touch [-options] file`|若文件不存在则创建文件,否则修改文件最后编辑时间|
| `mkdir [-options] dir`|创建目录。`-p`可以**层级创建目录**，如`mkdir -p a/b/c`|
| [`rm [-options] file`](#24-rm命令)|删除文件或目录,删除后**不可恢复**|
| `rmdir [-options] dir`|删除目录,目录必须为空|
| [`cp [-options] source_file target_file`](#25-cp命令)|复制文件或目录|
| [`mv [-options] source_file/dir target_file/dir`](#26-mv命令)|移动/重命名 文件或目录|
| [`cat [-options] [file]`](#27-cat命令)|查看文件内容/创建文件/文件合并/追加文件内容等|
| [`more [-options] file`](#28-more命令)|分页显示文件内容|
| [`grep [-opinions] [pattern] [file]`](#29-grep命令)|在文本文件中查找内容|
| [`vi/vim [-options] [file]`](#210-vivim编辑器)|使用vi/vim编辑器编辑文本文件|
| `echo [-option] [string]`|在终端中打印字符串。通常会和重定向联合使用|
| [重定向和管道](#211-重定向和管道)|重定向:将终端输出保存至文件;管道:对终端输出进行再操作|
| [`find [path] [-options] [expression]`](#212-find命令)|在目录中搜索文件|
| [`ln [-options] source target`](#213-ln命令)|创建文件链接|
| [`tar [-options] [file]`](#214-打包压缩)|打包解包文件|

### 2.1 cd命令
```sh
# 命令格式
$ cd [dir]
```

`cd`是change directory缩写，其功能为改变当前工作目录。

|命令|含义|
|:-|:-|
|`cd`|切换到当前用户主目录(`/home/username`)|
|`cd ~`|切换到当前用户主目录(`/home/username`)|
|`cd .`|保持当前目录不变|
|`cd ..`|切换到上级目录|
|`cd -`|在上次目录和当前目录来换切换|

### 2.2 ls命令
```sh
# 命令格式
$ ls [-options] [dir,file]
```
`ls`是list缩写，其功能为列出目录的内容(文件及子目录)，类似于Dos的`dir`命令

#### 2.2.1 options

|options|含义|
|:-|:-|
|`-a`|显示目录下 **所有** 子目录与文件，包含隐藏文件|
|`-l`|以列表方式显示文件的详细信息|
|`-h`|配合`-l`以人性化的方式显示 **文件大小**,`-h` 单独使用没有效果|

<small>注：options可以叠加使用且顺序无关。</small>

```sh
# 以下所有命令等价
$ ls -a -l -h
$ ls -l -h -a
$ ls -alh
$ ls -lha
```
#### 2.2.2 parameter
* parameter可以为文件或目录。parameter为目录则列出给定目录下的内容，parameter为文件名则列出给定文件。
* parameter可以使用通配符进行模糊匹配。模糊匹配结果为多个时会列出匹配的所有文件和目录。通配符使用方式与正则类似。

|通配符|含义|
|:-|:-|
|`*`|任意多个任意字符|
|`?`|一个任意字符|
|`[]`|匹配字符组中任意一个。`[1,2,3]`等价于`[1-3]`,`[a,b,c]`等价于`[a-c]`|

```sh
$ ls colin*         # 匹配 以colin开头
$ ls colin?         # 匹配 以colin+单个字符
$ ls colin[1-3]     # 匹配 colin1,colin2,colin3
```

#### 2.2.3 ls -l 结果详解
![ls-l详解](../img/lslh.jpg 'ls-l结果详解')

如上图所示，各列依次为 **权限 | 硬链接数 | 所有者 | 所在组 | 文件尺寸 | 修改时间 | 名称**

##### 1) 权限
权限列共有10个字符组成，其含义如下：
<table style='text-align:center'>
<tr><th>类别</th><th colspan='3'>所有者权限</th><th colspan='3'>所在组权限</th><th colspan='3'>其他组权限</th></tr>
<tr><td>d (目录)</td><td>r</td><td>w</td><td>x</td><td>r</td><td>-</td><td>x</td><td>r</td><td>-</td><td>x</td></tr>
<tr><td>- (普通文件)</td><td>r</td><td>w</td><td>-</td><td>r</td><td>-</td><td>-</td><td>r</td><td>-</td><td>-</td></tr>
</table>

* 第一列文件类型速查表如下(仅供查阅)，其中d (目录),- (普通文件)最为常见：

标识符 | 含义
:-|:-
`d` | 目录
`-` | 普通文件
`b` | 块特殊文件
`c` | 字符特殊文件
`l` | 软链接文件。软链接文件名列格式为: `链接名 -> 源文件地址`
`p` | 先进先出（FIFO）的管道特殊文件
`s` | 本地套接字

* 每组 [权限](permision.html#31-权限介绍) 三列依次为 **读|写|执行**。`r`表示可读;`w`表示可写;`x`表示可执行;`-`表示无对应权限

##### 2) 硬链接数
硬链接数表示有多少种方式访问到对应的目录或文件。
* 文件只能通过绝对路径访问，所以文件硬链接数一般为1，有文件[硬链接](#hardlk)同样也会增加文件硬链接数
* 目录可以通过绝对路径访问，`.`方式访问。所以目录的硬链接数至少为2(无子目录)。有直接子目录时也可以通过`..`方式访问，所以每多一个直接子目录硬链接数+1。Linux目录的硬链接数等于直接子目录数量+2。Mac的目录硬链接数与Linux计算方式不同

### 2.3 tree命令
```sh
# 命令格式
$ tree [-options] [dir]
```

* `tree`可以以树状图方式展示目录内容(层级子目录及文件)
* 系统若没有安装`tree`命令，可以通过`sudo apt install tree`来进行安装。

|options|含义|
|:-|:-|
| `-d`|限制只显示目录，忽略文件|

```sh
# 显示当前目录树状图
$ tree

# 显示～/Desktop 的目录树状结构
$ tree -d ~/Desktop
```

### 2.4 rm命令
```sh
# 命令格式
$ rm [-options] file
```

`rm`是remove缩写，其功能是删除文件或目录(不可恢复)。
#### 1) options

|options|含义|
|:-|:-|
|`-r`|删除文件或 **递归删除目录** (包含子目录和文件)|
|`-f`|强制删除，忽略不存在文件|

<small>注：删除目录可以使用`rmdir dir`或`rm -r dir`，前者只能删除空目录，后者则可以递归删除目录(不管是否为空)</small>

#### 2) parameter
`rm`命令的parameter同样可以使用通配符。
```sh
# 删除以ab开头的文本文件
$ rm ab*.txt

# 删除 test目录
$ rm -r test

# 清空当前目录,谨慎使用
$ rm -rf * 
```

### 2.5 cp命令
`cp`是copy缩写，其功能是将拷贝文件或目录。
```sh
# 命令格式
$ cp [-options] source_file target_file
```

#### 1) options

|options|含义|
|:-|:-|
|`-i`|开启覆盖文件提示。`cp`执行时会 **默认覆盖** 同名目标文件。建议每次使用`-i`进行安全复制|
|`-r`|复制文件或 **递归复制目录** (包含子目录和文件)。格式为:`cp -r source_dir target_dir`|

#### 2) parameter
* 目标文件若与源文件同名，则`target_file`参数可以只写目录部分，省略目标文件名。
* **操作对象为目录时，如果`target_dir`存在，则将源目录拷贝至`target_dir`;如果`target_dir`不存在，则将源目录拷贝至`../target_dir`重命名为指定目录。mv操作亦是如此。**

```sh
# 将 ~/Documents/readme.txt 拷贝为 ~/Desktop/readme.txt
$ cp ~/Documents/readme.txt ~/Desktop

# 将 ~/Download/Python 拷贝到 ~/Desktop中
$ cp -r ~/Download/Python ~/Desktop
```

### 2.6 mv命令
```sh
# 命令格式
$ mv [-options] source_file/dir target_file/dir
```
* `mv`命令是move缩写，其功能是移动/重命名文件或目录。如果移动文件或目录的源路径和目标路径一致，仅目标名称不同，可以实现文件或目录重命名。
* `mv`命令默认可以操作文件或目录，不需要提供像 `cp`和`rm`命令一样使用`-r`选项

|options|含义|
|:-|:-|
|`-i`|开启覆盖文件提示。`mv`执行时会 **默认覆盖** 同名目标文件。建议每次使用`-i`进行安全移动|

```sh
# 将～/Download/Python目录移动到 ～/Desktop
# 若~/Desktop/PythonCourse目录存在则拷贝至其中，若不存在则拷贝到～/Desktop中并重命名为PythonCourse
$ mv ~/Download/Python ~/Desktop/PythonCourse

# 将当前目录 test.txt 重命名为 demo.txt
$ mv -i test.txt demo.txt
```

### 2.7 cat命令
```sh
# 命令格式
$ cat [-options] [file]
```
`cat`是Concatenate缩写，其功能包含查看文件内容、创建文件、文件合并、追加文件内容等。其中最常用来查看文本文件内容。
`cat`会一次显示所有内容，适合 **查看内容较少** 的文本文件

|options|含义|
|:-|:-|
|`-b`|显示非空行号,空行也显示但不编行号,可以用于统计有效代码行数|
|`-n`|显示所有行号|

>`nl file` 与 `cat -b file` 效果相同，都可以查看文本文件内容并显示非空行号

### 2.8 more命令
```sh
# 命令格式
$ more [-options] file
```

* `more`命令可以用于分屏显示文本文件内容，每次只显示一页内容
* `more`适合于 **查看内容较多** 的文本文件
* 使用 `more` 查看文件时常用操作键：

|操作键|功能|
|:-|:-|
|`Blank`|下一屏|
|`Enter`|下一行|
|`b`|上一屏|
|`q`|退出|
|`/keyword`|搜索关键字|

### 2.9 grep命令
```sh
# 命令格式
$ grep [-opinions] [pattern] [file]
```
* `grep`命令是一个强大的文本搜索工具
* `grep`允许对文本进行模式查找

#### 1) options

|options|含义|
|:-|:-|
|`-n`|显示行号|
|`-v`|搜索不匹配内容(相当于搜索结果取反)|
|`-i`|忽略字母大小写|

#### 2) pattern
常用的两种搜索模式,正则匹配

|参数|含义|
|:-|:-|
|`^b`|行首，搜索以b开头的行|
|`e$`|行尾, 搜索以e结尾的行|

```sh
# 在test.txt中搜索包含colin的行
$ grep colin test.txt

# 在test.txt中忽略大小写搜素以colin开头的行并显示行号
$ grep -ni ^colin test.txt
```

### 2.10 vi/vim编辑器
vi编辑器是linux下流行的文本编辑器,vim则是基于vi的高级编辑器。所有vim兼容vi所有的命令。Ubuntu部分版本的vi编辑器不太好用，推荐使用vim替代。

```sh
# 安装vim
$ sudo apt install vim
```

#### 1) 查看模式
```sh
# 查看文件,如果文件不存在则新建文件
$ vi [文件名]     # 打开vi命令行编辑器并进入查看模式
```
#### 2) 编辑模式
```sh
i       # 进入编辑模式。在编辑器底部显示 -- INSERT --
esc     # 退出编辑模式，回到查看模式
```

#### 3) 命令模式
```sh
# 所有命令必须进入命令模式后才能执行，命令执行完毕自动进入查看模式
:               # 进入命令模式,可以执行以下命令
wq              # 保存并退出
q!              # 不保存退出
?字符串          # 在文件中查找指定的字符串，按”n”查找下一个
/字符串          # 同 ?字符串
set nu          # 显示行号
set nonu        # 取消行号
%d              # 清空文件内容
输入任意数字      # 光标定位到指定行号的行首位置
```

### 2.11 重定向和管道
重定向和管道都需要配合其他命令使用。
#### 1) 重定向
重定向命令可以将终端输出内容保存到文件中
* `>` 将终端输出保存到文件中。文件不存在则创建，存在则覆盖
* `>>` 将终端输出追加到文件末尾。文件不存在则创建，存在则追加

```sh
# 将“Hello”保存到 a.txt 中
$ echo Hello > a.txt

# 将当前目录树状结构 追加到 a.txt 中
$ tree -d >> a.txt
```

#### 2) 管道
管道是将一个命令的输出作为另一个命令的输入。可以理解为现实生活中一根管子，管子一头塞东西进去，另一头取东西出来。

常用管道命令有：
* `more`:分屏显示输出内容
* `grep`:对输出内容进行查询

```sh
# 分屏显示 当前目录所有内容
$ ls -lha | more

# 在前目录所有内容中 搜索名称包含colin的文件或目录
$ ls -lha | grep colin
```

### 2.12 find命令
```sh
# 命令格式
$ find [path] [-options] [expression]
```

* `find`命令功能非常强大，通常用来在特定目录下搜索符合条件的文件
* 文件查找路径缺省则在当前文件件搜索，**包含子目录**

```sh
# 在桌面及其子目录搜索所有txt文档
$ find ~/Desktop -name "*.txt"

# 在当前目录及子目录搜索文件名包含“app”的文件
$ find -name "*app*"
```

### 2.13 ln命令

```sh
# 命令格式
$ ln [-options] source target 
```

* `ln`命令用于创建文件链接(一般指软链接)
* `-s`表示建立软链接文件，默认建立硬链接文件
* **源文件(目录)要使用绝对路径**。否则链接文件移动后会造成链接文件指向出错而无法使用

```sh
# 在当前目录建立软链接文件ln123并指定/home/colin/Desktop/demo/123.txt
$ ln -s /home/colin/Desktop/demo/123.txt ln123
```

> 软链接与<span id='hardlk'>硬链接</span>

<img src='../img/softhardlk.jpg'>

* 在Linux中文件名与文件内容是分开存储的，如同C#中引用类型的堆栈内存存储方式。文件名如同一个指针指向文件内容。
* 软硬链接也都是文件指针。不同的是软链接指向的是文件名，硬链接指向的文件内容
* Linux中删除文件首先删除文件引用，只有文件没有引用(硬链接数=0)才会被删除。如同C#中文件对象没有引用时才会被GC
* 软硬链接指向同一个源文件，源文件删除后，实际删除的是源文件名，所以软链接会无法使用。硬链接仍指向源文件内容，文件并不会真的删除，所以硬链接仍然正常使用
* Linux软链接类似与Windows中的快捷方式和mac OS的替身，硬链接相当于文件别名。

### 2.14 打包压缩
#### 2.14.1 打包解包
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
`-z`|使用`gzip`压缩或解压
`-j`|使用`bzip2`压缩或解压
`-C`|解档或解压到指定目录。**目录必须存在**

```sh
# 将English.txt,Chinese.txt,Europe(目录)归档为languages.tar
$ tar -cvf languages.tar English.txt Chinese.txt Europe

# 将languages.tar解档到当前目录
$ tar -xvf languages.tar
```

#### 2.14.2 压缩解压
##### 1) gzip
`gzip`是Linux下一种流行的压缩方式。
* 用`gzip`压缩`tar`包文件后的压缩文件扩展名是`.tar.gz`，这是Linux中最常见的压缩格式
* `tar`命令使用`-z`可以调用`gzip`对tar包进行压缩，方便实现打包压缩

```sh
# 将English.txt,Chinese.txt,Europe(目录)压缩为languages.tar.gz
$ tar -zcvf languages.tar.gz English.txt Chinese.txt Europe

# 将languages.tar.gz解压到用户桌面
$ tar -zxvf languages.tar.gz -C ~/Desktop
```

##### 2) bzip2
`bzip2`与`gzip`类似也是一种流行压缩方式。
* 用`bzip2`压缩`tar`包文件后压缩文件扩展名是`.tar.bz2`
* `tar`命令使用`-j`可以调用`bzip2`对tar包进行压缩。

```sh
# 将English.txt,Chinese.txt,Europe(目录)压缩为languages.tar.bz2
$ tar -jcvf languages.tar.bz2 English.txt Chinese.txt Europe

# 将languages.tar.bz2解压到用户桌面
$ tar -jxvf languages.tar.bz2 -C ~/Desktop
```
