$(() => {
    let user_id = localStorage.getItem("user_id") || "";
    let user_name = localStorage.getItem("user_name") || "";
    console.log(user_id, user_name);
    if (user_id && user_name) {
        $("#deng").text(`${user_name}:欢迎您`);
        $("#zhuCe").text("注销");
    } else {
        $("#deng").text(`登陆`);
        $("#zhuCe").text("注册");
    }
    $("#zhuCe").click(function () {
        if ($(this).text() == '注册') {
            location.href = './html/register.html'
        }
        else if (confirm('是否确认退出')) {
            localStorage.removeItem('user_id')
            localStorage.removeItem('user_name')
            window.location.reload()
        }
    })
    $("#deng").click(function () {
        if ($(this).text() != '登陆') {
            location.href = './html/cart.html'
        }
        else {
            location.href = './html/login.html'
        }
    })
})