$(() => {
    let user_id = localStorage.getItem('user_id') || ''
    let user_name = localStorage.getItem('user_name') || ''
    if (user_id && user_name) {
        $('#deng').text(`${user_name}:欢迎您`)
        $('#zhuCe').text('退出')
    } else {
        $('#deng').text('匿名用户:欢迎您')
        $('#zhuCe').text('登陆')
    }
    $("#zhuCe").click(function () {
        if ($(this).text() == '登陆') {
            location.href = './login.html'
        } else {
            localStorage.removeItem('user_id')
            localStorage.removeItem('user_name')
            window.location.reload()
        }
    })
    $.ajax({
        url: "../server/getCart.php",
        data: { user_id },
        dataType: "json"
    }).done(data => {
        data = dataTool(data);
    })


    // [
    //     { store: "张大娘的店铺" ,good:[],
    //     { store: "李大爷的店铺" },
    //     { store: "皮皮虾" }
    // ]


    function dataTool(data) {
        let arr = [];
        data.forEach(item => {
            let result = arr.filter((ele) => ele.store == item.shopName);
            if (result.length == 0) {
                arr.push({ store: item.shopName, good: [] });
            }
        })

        /* 把所有的数据依次加入到对象中去 */
        data.forEach(item => {
            arr.forEach(ele => {
                if (ele.store == item.shopName) {
                    ele.good.push(item);
                }
            })
        })
        return arr;
    }
})