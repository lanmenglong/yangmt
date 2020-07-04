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


    // 登陆注册功能
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("user_name") || "";
    console.log(user_id, user_name);
    if (user_id && user_name) {
        $("#deng").text(`${user_name}:欢迎您`);
        $("#zhu").text("注销");
    } else {
        $("#deng").text(`登陆`);
        $("#zhu").text("注册");
    }
    $('#deng').click(function () {
        if ($(this).text() == '登陆') {
            location.href = './html/login.html'
        } else {
            location.href = './html/cart.html'
        }
    })
    $("#zhu").click(function () {
        if ($(this).text() == '注册') {
            location.href = './html/register.html'
        } else {
            if (confirm('是否确认退出')) {
                localStorage.removeItem('user_id')
                localStorage.removeItem('user_name')
                window.location.reload()
            }
        }
    })
    $('#shopChe').click(function () {
        if (user_id && user_name) {
            location.href = './html/cart.html'
        } else {
            location.href = './html/login.html'
        }
    })
    $('#dingDan').click(function () {
        if (user_id && user_name) {
            location.href = './html/cart.html'
        } else {
            location.href = './html/login.html'
        }
    })

})