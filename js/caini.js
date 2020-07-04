// 猜你喜欢数据

class Caini {
    constructor(data) {
        this.data = data

    }
    init() {
        this.renderUI()
    }
    renderUI() {
        let liHtml = this.data.map((item, index) => {
            return `<li class="product-item">
        <a href="" title="" class="product-img">
            <img src="${item.img}"
                alt="">
        </a>
        <a href="" title="">
            <p class="lineClamp">${item.title}</p>
        </a>
        <p class="price">
            <span class="unit">${item.price}</span>
            
        </p>
    </li>`
        }).join('')
        let ulHtml = `<ul class="product-list" id="ulList">${liHtml}</ul>`
        $(ulHtml).appendTo("#caiNi")
    }


}

// 小轮播图
$(() => {
    $('.bl-item').hover(function () {
        $(this).children('span').css('display', 'block')
    }, function () {
        $(this).children('span').css('display', 'none')
    })
    let index = 0
    $('.bl-prev').click(function () {
        index--
        if (index < 0) index = $(this).siblings('.bl-item-bd').children().length - 1
        $(this).siblings('.bl-item-bd').children().css('display', 'none')
        $(this).siblings('.bl-item-bd').children().eq(index).css('display', 'block')

    })
    $('.bl-next').click(function () {
        index++
        if (index > $(this).siblings('.bl-item-bd').children().length - 1) index = 0
        $(this).siblings('.bl-item-bd').children().css('display', 'none')
        $(this).siblings('.bl-item-bd').children().eq(index).css('display', 'block')

    })
})

// 限时抢时间

setInterval(() => {
    let date = new Date()
    let starDate = date.getTime()
    let endDate = new Date(2020, 6, 6, 0, 0, 0)
    let thenDate = endDate.getTime()
    let time = (thenDate - starDate) / 1000
    let hours = parseInt(time / 3600)
    let minutes = parseInt((time % 3600) / 60)
    let second = parseInt(time % 3600 % 60)
    $('.hours').text(`${hours < 10 ? '0' + hours : hours}`)
    $('.minutes').text(`${minutes < 10 ? '0' + minutes : minutes}`)
    $('.second').text(`${second < 10 ? '0' + second : second}`)
}, 1000)

// 最大轮播图



