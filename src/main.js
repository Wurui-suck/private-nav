const site = localStorage.getItem('site')
siteObject = JSON.parse(site)
let hashMap = siteObject || [
    { logo: "D", url: "https://douyu.com", link: "https://douyu.com" },
    { logo: "H", url: "https://huya.com", link: "https://huya.com" },
    { logo: "X", url: "https://xiedaimala.com", link: "https://xiedaimala.com" },
    { logo: "G", url: "https://github.com", link: "https://github.com" },
    { logo: "M", url: "https://mail.qq.com/", link: "https://mail.qq.com/" },
    { logo: "B", url: "https://bilibili.com", link: "https://bilibili.com" }
]
simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '')
}
render = () => {
    $('.siteList').find('li:not(.lastLi)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
           <li>
             <div class="site-wrapper">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplifyUrl(node.link)}</div>
                <div class="close"> 
                  <div class="icon-wrapper">
                    <svg class="icon delete">
                      <use xlink:href="#icon-shanchu"></use>
                    </svg>
                   </div>
                </div>
            </div>    
           </li>
        `)
            .insertBefore($('.siteList').find('.lastLi'))
        $li.on('click', () => {
            window.open(node.url, '_self')
        })
        $li.on('click', '.close', (e) => {
            e.stopPropagation()
            hashMap.splice(index, 1)
            render()
        })
    })
}
render()

$('.addButton').on('click', () => {
    let url = window.prompt('请问你要添加的网址是什么？')
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    let newSite = {
        logo: simplifyUrl(url)[0].toUpperCase(), url: url, link: url
    }
    hashMap.push(newSite)
    render()
})

window.onbeforeunload = () => {
    localStorage.setItem('site', JSON.stringify(hashMap))
}

document.addEventListener('keypress', (e) => {
    const { key } = e
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
$('#searchInput').on('keypress', (e) => {
    e.stopPropagation()
})
$('#searchInput').on('focus', () => {
    $('.word').css('display', 'none')
})
$('#searchInput').on('blur', () => {
    if ($('#searchInput').val() === '') {
        $('.word').css('display', 'block')
    }
})
$('button').on('click', () => {
    console.log('12')
    $('#searchInput').val('')
    $('.word').css('display', 'block')
})