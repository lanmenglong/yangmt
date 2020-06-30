$(() => {
    $('#classify').hover(function () {
        $('.category-downlist').css('display', 'block')
        $(this).addClass('classifyNO')
    }, () => {
        $('.category-downlist').css('display', 'none')
        $('#classify').removeClass('classifyNO')
    })
    $('.category-downlist').hover(() => {
        $('.category-downlist').css('display', 'block')
        $('#classify').addClass('classifyNO')
    }, () => {
        $('.category-downlist').css('display', 'none')
        $('#classify').removeClass('classifyNO')
    })
    // 分类弹出菜单

    $('#erWei').hover(() => {
        $('#qrcodeContainer').css('display', 'block')
    }, () => {
        $('#qrcodeContainer').css('display', 'none')
    })

    // 二维码弹出

    $('#gouTop').click(() => {
        let timer = setInterval(() => {
            let scrollTop = document.documentElement.scrollTop
            scrollTop -= 50
            document.documentElement.scrollTop = scrollTop
            if (scrollTop <= 0) {
                clearInterval(timer)
            }
        }, 30)

    })
})