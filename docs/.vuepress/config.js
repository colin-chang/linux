module.exports = {
    title: 'Linux入门书',
    description: '最流行的服务器操作系统',
    base: '/',
    head: [
        ['link', {
            rel: 'icon',
            href: 'https://cdn.hashnode.com/res/hashnode/image/upload/v1658902565243/IDyIb_63A.png'
        }]
    ],
    plugins: [
        '@vuepress/active-header-links',
        '@vuepress/back-to-top',
        '@vuepress/last-updated',
        '@vuepress/medium-zoom',
        ['@vuepress/google-analytics', {
            ga: 'UA-131744342-1'
        }]
    ],
    themeConfig: {
        logo:'https://s2.loli.net/2022/08/04/UXqgLBVfzPuvb5A.png',
        repo: 'https://github.com/colin-chang/linux',
        editLinks: true,
        smoothScroll:true,
        nav: [{
            text: 'Get Start',
            link: '/intro'
        },
        {
            text: 'Books',
            items: [{
                text: 'Python',
                link: 'https://python.a-nomad.com'
            },
            {
                text: '.Net',
                link: 'https://dotnet.a-nomad.com'
            },
            {
                text: 'Linux',
                link: 'https://linux.a-nomad.com'
            }
            ]
        },
        {
            text: 'Blog',
            link: 'https://a-nomad.com/'
        }
        ],
        sidebar: [{
            title: 'Linux基础',
            collapsable: false,
            children: [
                '/basic/directive',
                '/basic/file',
                '/basic/permission',
                '/basic/maintenance',
                '/basic/remote',
            ]
        }, {
            title: '常用环境搭建',
            collapsable: false,
            children: [
                '/env/ftp',
                '/env/mysql',
                '/env/nginx',
                '/env/gui',
            ]
        }, {
            title: '科学上网',
            collapsable: false,
            children: [
                '/network/crossgfw',
                '/network/wg',
                '/network/v2ray',
                '/network/brook',
                '/network/tg',
            ]
        }
        ],
        sidebarDepth:3,
        displayAllHeaders: true,
        lastUpdated: '更新时间',
    },
    markdown: {
        lineNumbers: true
    }
}