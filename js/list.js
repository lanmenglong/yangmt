$(() => {
    getDataRender('default')
    // 发送网络请求获取服务器端的数据
    // 获取页码的数量
    getPageCount()
    function getPageCount() {
        $.ajax({
            type: "get",
            url: "../server/getPageCount.php",
            success: function (response) {
                // console.log("页码", response);

                /* 创建页码 */
                /* 
                <li class="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">4</a></li>
                <li><a href="#">5</a></li> */
                let pageStr = "";
                for (let i = 0; i < response; i++) {
                    pageStr += `<li class='p-class ${i == 0 ? "active" : ""}'><a href="javascript:void(0)">${i + 1}</a></li>`;
                }

                $(pageStr).insertBefore('#nextPage')

            }
        });
    }



    function getDataRender(sort, page = 0) {
        $.ajax({
            url: "../server/getList.php",
            dataType: "json",
            data: {
                sort,
                page: page
            },
        }).done(data => {
            let liHTML = data.map((item, i) => {
                return `<li class="product-item " data-id=${item.good_id}>
                <a href="../html/xiangqi.html" target="_blank" class="product-img"
                    title="lv 棋盘格手包 96新 公价8500">
                    <img class="lazy" src="${item.img}">
                        
                </a>
                <p class="price"><em class="unit">¥</em>${item.price}
                    <span class="type">
                        
                </p>
                <p class="name"><a href="/product/p5203995.html" target="_blank">${item.name}</a></p>
                <div class="seller-site">
                    <a class="seller sellerinfo" href="/sellerhome/30665551">
                        <span class="avatar"><img
                                src="http://pic1.ymatou.com/G03/M07/77/24/CgzUIF64SpmAI9oHAAF0DY6AM6s144_1_1_o.jpg"
                                alt="欧奢搬运工">
                           
                            <em class="seller-type"><i class="home-icon hi-type-small"></i></em>
                        </span>
                        <span class="txt">${item.shopName}</span>
                    </a>
                        <button class="site ">加入购物车</button>
                    <div class="seller-info-wrap">
                        <i class="home-icon hi-arrow-small"></i>
                        <div class="siw-hd">
                            
                            <span class="siw-type  "><i class="home-icon hi-seller-type"></i>超级买手</span>
                            
                        </div>
                        <div class="siw-bd">
                        </div>
                    </div>
                </div>
            </li>`
            }).join('')
            $('#product-list').html(liHTML)

        })
    }

    $("#product-list").on("click", ".site", function () {
        /* user_id user_name */
        let user_id = localStorage.getItem("user_id") || "";
        let user_name = localStorage.getItem("user_name") || "";
        let good_id = $(this).parent().parent().attr("data-id");

        console.log(user_id, user_name, good_id);
        if (user_id && user_name) {
            /* 发请求，执行添加到购物车 */
            $.ajax({
                url: "../server/addCart.php",
                data: { user_id, good_id }
            }).done(data => {
                console.log("返回值:", data);
            })

        } else {
            /* 跳转去登录 */
            location.href = "../html/login.html"
        }
    })
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

    // 排序功能
    $('.pai').click(function () {
        $(this).addClass('paiColor').siblings().removeClass('paiColor')
        let sortType = $(this).attr('data-sort')
        getDataRender(sortType)
    })

    /* 分页功能 */
    $(".pagination").on("click", ".p-class", function (e) {
        // console.log(this)
        /* 排除上一页和下一页的页面点击事件 */
        // if ($(this).parent()[0].id == "prevPage" || $(this).parent()[0].id == "nextPage") return;

        /* 设置选中状态的切换 */
        $(this).addClass("active").siblings().removeClass("active");
        let page = $(this).text() * 1 - 1;
        console.log(page);
        getDataRender($(".paiColor").data().sort, page)
    })

    $("#prevPage,#nextPage").click(function () {
        /* 设置选中状态 */
        let page = $(".active").text() * 1 - 1;
        if (this.id == "prevPage") {
            page--;

        } else if (this.id == "nextPage") {
            page++;
        }
        if (page < 0) {
            return
        }
        if (page > $('.p-class').length - 1) {
            return
        }
        $(".p-class").eq(page).addClass("active").siblings().removeClass("active")
        getDataRender($(".paiColor").data().sort, page)
    })
})


