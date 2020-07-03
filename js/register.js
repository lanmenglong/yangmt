$(() => {

    $('#LoginId').val('oklogo')
    $('#password').val('666666')
    $('#ConfirmPwd').val('666666')
    $('#mobile').val('15078558357')


    // 验证码
    let imgCodeTarget;
    let captcha = new Captcha({
        lineWidth: 1,   //线条宽度
        lineNum: 0,       //线条数量
        dotR: 0,          //点的半径
        dotNum: 0,       //点的数量
        preGroundColor: [10, 80],    //前景色区间
        backGroundColor: [150, 250], //背景色区间
        fontSize: 30,           //字体大小
        fontFamily: ['Georgia', '微软雅黑', 'Helvetica', 'Arial'],  //字体类型
        fontStyle: 'stroke',      //字体绘制方法，有fill和stroke
        content: '0123456789',  //验证码内容
        length: 4    //验证码长度
    });
    // 传值

    captcha.draw(document.querySelector('#captcha'), r => {
        imgCodeTarge = r
        $("#VCode").trigger("blur")
    })





    $('#mobile').focus(function () {
        let val = $.trim($(this).val())
        if (val == '') {
            $(this).next().text('请输入有效的手机号码').css('display', 'inline-block').addClass('greybg')
        }
    }).blur(function () {
        $(this).next().removeClass('greybg')
        let val = $.trim($(this).val())
        if (/^[1][3,4,5,7,8,9][0-9]{9}$/.test(val)) {
            $(this).next().text('').css('display', 'none')

        } else {
            $(this).next().text('请输入正确的手机号码').css('display', 'inline-block')
        }
    })
    // 手机号码

    // 密码
    $('#password,#ConfirmPwd').focus(function () {
        let val = $.trim($(this).val())
        if (val == '') {
            $(this).next().text('6-16位字符').css('display', 'inline-block').addClass('greybg')
        }
    }).blur(function () {
        let val = $.trim($(this).val())

        if (val == '') {

            $(this).next().removeClass('greybg').text('请输入密码').css('display', 'inline-block')
        }
        if (/^.{6,16}$/.test(val)) {
            $(this).next().removeClass('greybg').css('display', 'none')
        } else {
            $(this).next().removeClass('greybg').text('密码格式不正确').css('display', 'inline-block')
        }
    })

    // 用户名
    $('#LoginId').focus(function () {
        let val = $.trim($(this).val())
        if (val == '') {
            $(this).next().text('6~16位字符').css('display', 'inline-block').addClass('greybg')
        }
    }).blur(function () {
        let val = $.trim($(this).val())
        if (val == '') {
            $(this).next().removeClass('greybg').text('请输入用户名').css('display', 'inline-block')
        } if (/^.{6,16}$/.test(val)) {
            $(this).next().removeClass('greybg').css('display', 'none')
        } else {
            $(this).next().removeClass('greybg').text('请输入正确的昵称').css('display', 'inline-block')
        }
    })
    // 验证码

    $('#VCode').focus(function () {
        let val = $.trim($(this).val())
        $(this).siblings('span').text('请输入有效验证码').css('display', 'inline-block').addClass('greybg')
    }).blur(function () {
        let val = $.trim($(this).val())
        if (val == '') {
            $(this).siblings('span').removeClass('greybg').text('请输入验证码').css('display', 'inline-block')
        }
        else if (imgCodeTarge == val) {

            $(this).siblings('span').removeClass('greybg').css('display', 'none')
        } else {

            $(this).siblings('span').removeClass('greybg').text('验证码错误').css('display', 'inline-block')
        }
    })


    // 验证码

    // 同意协议
    // 注册按钮
    $('#registerbtnPhone').click(() => {
        $('#VCode,#LoginId,#password,#ConfirmPwd,#mobile').trigger('blur')
        if (!$('#IsAgreeContract').is(':checked')) {
            alert('需同意协议后才能注册')
            return
        }
        let span = $('#mobileForm .verifi')
        let spans = Array.from(span)
        for (let i = 0; i < spans.length; i++) {
            if (spans[i].style.display == 'inline-block') {
                return
            }
        }
        let data = {
            username: $.trim($('#LoginId').val()),
            password: md5($.trim($('#password').val())).slice(0, 15),
            phone: $.trim($('#mobile').val())
        }
        console.log($.trim($('#mobile').val()))

        $.ajax({
            type: 'POST',
            url: '../server/register.php',
            data,
            dataType: 'json',

            success(response) {
                if (response.status == 'success') {
                    alert(response.msg)
                    window.location.href = '../html/login.html'
                } else {
                    alert(response.msg)
                }
            }
        })


    })


})
