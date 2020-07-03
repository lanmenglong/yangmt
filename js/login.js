$(() => {
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
    })
    $('#LoginName').val('oklogo')
    $('#PassWord').val(666666)
    $('#loginBtn').click(() => {

        let nameVal = $.trim($('#LoginName').val())
        let passWord = md5($.trim($('#PassWord').val())).slice(0, 15)
        let vcVal = $.trim($('#vc').val())

        if (nameVal.length == 0) {
            $('#errorMsgOut').css('display', '').children().text('请输入用户名')
            return
        }
        if (passWord.length == 0) {
            $('#errorMsgOut').css('display', '').children().text('请输入密码')
            return
        }
        if (vcVal != imgCodeTarge) {
            $('#errorMsgOut').css('display', '').children().text('验证码不正确')
            $('#captcha').trigger("click")
            return
        }
        let data = {
            username: nameVal,
            password: passWord
        }
        $.ajax({
            type: 'post',
            url: '../server/login.php',
            dataType: 'json',
            data
        }).done(data => {
            console.log(data);
            if (data.status == "success") {
                alert(data.data.msg);
                localStorage.setItem("user_id", data.data.id);
                localStorage.setItem("user_name", data.data.username);

                location.href = "../index.html";
            } else {
                alert(data.data.msg);
            }
        })


    })
})
