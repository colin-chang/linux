#Linux目录结构

* Linux的文件系统是采用层级式的树状目录结构，在此结构中的最上层是根目录"/"。
* Linux文件或目录名称最长有256个字符
* Linux文件和目录名称大小写敏感
* 以`.`开头的文件为隐藏文件
* 同级目录中，**不允许文件和目录同名**。

**常用目录速查表:**

目录 | 说明
:-|:-
/ | 根目录，一般根目录下只存放目录，在Linux下有且只有一个根目录。所有的东西都是从这里开始
/bin(binary)|存放二进制程序和系统常用命令,主要用于具体应用
/sbin(system binary)|存放系统专用二进制程序和命令，需一定权限执行的命令
/usr|存放用户使用的系统命令和应用程序等信息，类似windows的program files
/usr/bin|存放后期安装的一些软件
/usr/sbin|存放超级用户的一些管理程序
/boot|放置linux系统启动时用到的一些文件，如Linux的内核文件：/boot/vmlinuz，系统引导管理器：/boot/grub
/dev|存放linux系统下的设备文件，访问该目录下某个文件，相当于访问某个设备，常用的是挂载光驱 mount /dev/cdrom /mnt
/etc|系统配置文件存放的目录，不建议在此目录下存放可执行文件，重要的配置文件有/etc/inittab、/etc/fstab、/etc/init.d、/etc/X11、/etc/sysconfig、/etc/xinetd.d 
/home|一般用户的主目录或ftp站点目录
/lib、/usr/lib、/usr/local/lib|系统使用的函数库的目录，程序在执行过程中，需要调用一些额外的参数时需要函数库的协助
/lost+fount|系统异常产生错误时，会将一些遗失的片段放置于此目录下
/mnt、/media|光盘默认挂载点，通常光盘挂载于 /mnt/cdrom 下，也不一定，可以选择任意位置进行挂载。 
/proc|此目录的数据都在内存中，如系统核心，外部设备，网络状态，由于数据都存放于内存中，所以不占用磁盘空间，比较重要的目录有 /proc/cpuinfo、/proc/interrupts、/proc/dma、/proc/ioports、/proc/net/* 等
/root|管理员主目录
/tmp|一般用户或正在执行的程序临时存放文件的目录，任何人都可以访问，重要数据不可放置在此目录下
/srv|服务启动之后需要访问的数据目录，如 www 服务需要访问的网页数据存放在 /srv/www 内
/usr|应用程序存放目录，/usr/bin 存放应用程序，/usr/share 存放共享数据，/usr/lib 存放不能直接运行的，却是许多程序运行所必需的一些函数库文件。/usr/local: 存放软件升级包。/usr/share/doc: 系统说明文件存放目录。/usr/share/man: 程序说明文件存放目录。
/var|放置系统执行过程中经常变化的文件，如随时更改的日志文件 /var/log，/var/log/message：所有的登录文件存放目录，/var/spool/mail：邮件存放的目录，/var/run:程序或服务启动后，其PID存放在该目录下
/opt|给主机额外安装软件所存放的目录