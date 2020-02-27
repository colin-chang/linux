> "开启Linux之旅"

## Linux—流行的服务器操作系统
我们常用的操作系统是微软的 Windows 或是苹果的 OS X，因为它容易操作，所以使用者很多。 其实还有一种操作系统，这个操作系统本身就是开源免费的，谁都可以免费使用和安装，它就是 linux。 

Linux是一套免费使用和自由传播的类Unix操作系统，是一个基于POSIX和UNIX的多用户、多任务、支持多线程和多CPU的操作系统。Linux能运行主要的UNIX工具软件、应用程序和网络协议。它支持32位和64位硬件。Linux继承了Unix以网络为核心的设计思想，是一个性能稳定的多用户网络操作系统。

可是国内很少有用户使用 linux，主要是这个需要学习，不然很难操作。 本教程，坚持“理论够用、侧重实用”的原则，对 Linux 常用功能做了较为简略阐述，来帮助大家快速学习和入门这个操作系统。

![Linux入门](https://i.loli.net/2020/02/26/YDdWFQ6IN3Bxyab.jpg 'Linux入门教程')

## Linux内核与发行版
#### 内核版本
* **内核(kernel)**是Linux系统的核心，是运行程序和管理硬件设备的核心程序，它提供了一个在裸设备与应用程序的抽象层
* Linux内核版本分为 **稳定版** 和 **开发版**
    * **稳定版：** 具有工业级强度，可以广泛的应用和部署。新的稳定版相对于旧版只是修正bug和加入新的驱动程序
    * **开发版：** 由于要试验各种解决方案，所以更新和变化很快

> 内核源码网址：[https://www.kernel.org](https://www.kernel.org)

#### 发行版本
* **Linux发行版(也称GNU/Linux发行版)** 是基于Linux内核版本之上，Linux发行版则是基于内核版本之上又添加了一些工具软件共同构成的一套庞大复杂的操作系统。虽然内核都是一样的，但添加部分各不相同，这就构成了不同的发行版本。

* 常见的发行版有 Ubuntu、RedHat、CentOS、Debian、Fedora、SuSE、OpenSUSE、Arch Linux、SolusOS 等

> How to run?

```sh
npm install gitbook-cli -g
gitbook install
gitbook serve
```