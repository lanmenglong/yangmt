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
        renderUI(data)
    })


    // [
    //     { store: "张大娘的店铺" ,good:[],
    //     { store: "李大爷的店铺" },
    //     { store: "皮皮虾" }
    // ]
    function renderUI(orderData) {
        console.log(orderData)
        orderData.forEach(daTa => {
            // `<div class="product-list-wrap" id="prodListContainer" data-promotion="1">
            let lisHtml = daTa.good.map((item) => {

                return `<li class="item" data-cartitemid="${item.good_id}" data-catalogid="c6165457">
                    <span class="check"><i class="blackfive-icon bi-checkbox hookCheckbox"></i></span>
                    <div class="check-product-info">
                
                        <dl class="product-info">
                            <dt class="pi-img"><a href="/Product/p1725519.html" target="_blank"><img src="${item.img}"></a>
                                    
                                    
                            </dt>
                            <dd class="pi-info">
                                <p class="pi-name">
                                        <em class="pi-type">
                                            
                                            
                                            包邮包税
                                        </em>
                                    ${item.name}
                                </p>
                                <p class="pi-icon">
                                        <input type="hidden" value="1">
                                        <span>
                                            <i class="logistics-icon li-inland-kd"></i>
                                            进口贸易
                                    </span>
                                        <span><i class="logistics-icon li-tuihuo"></i>
                                            
                                            本土退货
                                            
                                    </span>
                                </p>
                            </dd>
                
                
                            <p class="product-time hkRestTime" id="prod5eff002a3cb8d62effa9914d" data-time="-1"></p>
                        </dl>
                
                
                        <div class="price">
                            <p class="current-price hookCurPrice">${item.price}</p>
                        </div>
                
                        <div class="count">
                            <div class="count-check hookPurchaseNum">
                                <span class="reduce" title="减少"><em></em></span><input type="text" readonly="readonly" value="${item.num}"><span class="add" title="增加">+</span>
                            </div>
                
                
                        </div>
                        <div class="sum hookProdTotalPrice">${item.num * item.price}</div>
                        <div class="operate">
                            <p class="delete hookToDelete">删除</p>
                            <!-- <p class="find-similar hookFindSimilar" id="p1725519">找相似<i class="blackfive-icon bi-find-similar"></i></p> -->
                        </div>
                    </div>
                    
                </li>`


            }).join('')
            let boxHtml = `<div class="product-hd hookSeller">
                <span class="checkbox-w"><i class="blackfive-icon bi-checkbox hookCheckbox"></i></span>

                <a href="javascript://#!" title="店铺正在建设中..." class="seller">
                    <img title="买手头像" class="avatar" src="http://pic1.ymatou.com/G02/M03/1F/23/CgzUDF0XMz2AHeRFAAA2L5e6PT8055_1_1_m.jpg">
                    <span class="name">${daTa.store}</span>
                </a>
                <a href="javascript://#!" class="seller-site">
                    <img src="http://img.ymatou.com/app/flag/circle/importtrade.png" width="16" height="16" class="country">
                    <span class="name">进口贸易</span>
                </a>

                <a href="/product/imyy/dialog?sellerId=25201569&amp;sellerName=枫泊居易" target="_blank" class="blackfive-icon bi-seller"></a>

            </div>
            <ul class="product-bd hookProdList">${lisHtml}</ul>`
            $('#prodListContainer').append(boxHtml)
        })




    }

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

    $('.bi-checkbox').click(function () {
        $('.check-all').toggleClass('checkbox-checked')
        if ($('.check-all').hasClass('checkbox-checked')) {
            $('.product-hd').addClass('checkbox-checked')
            $('.item').addClass('item-checked')
        } else {
            $('.product-hd').removeClass('checkbox-checked')
            $('.item').removeClass('item-checked')
        }
        priceAll()
    })

    $('#prodListContainer').on('click', '.checkbox-w', function () {
        $(this).parent().toggleClass('checkbox-checked')
        if ($(this).parent().hasClass('checkbox-checked')) {
            $(this).parent().next().children('.item').addClass('item-checked')
        } else {
            $(this).parent().next().children('.item').removeClass('item-checked')
        }
        priceAll()
        liClass()
    })


    // function liClass() {
    //     let ele = 0
    //     $('.item').each(function (index, item) {
    //         console.log('bbb')
    //         if ($(item).hasClass('item-checked')) {
    //             console.log('aaa')
    //             ele++
    //         }
    //     })
    //     console.log(ele)
    // if (ele) {
    //     $('.check-all').addClass('checkbox-checked')
    // } else {
    //     $('.check-all').removeClass('checkbox-checked')
    // }

    // }

    // 算勾选的商品的总价
    function priceAll() {
        let ele = $('.item').filter(function () {
            return $(this).hasClass('item-checked') == true
        })
        let total = 0
        let totalPrice = 0
        ele.each(function (index, item) {
            // console.log($(item).children('.check-product-info').find('.sum').text())
            // total += $(item).children('.check-product-info').find('.current-price').text() * $(item).children('.check-product-info').find('.reduce').next().val()

            totalPrice += $(item).children('.check-product-info').find('.sum').text() * 1

        })
        // $('.sum').val(total)
        $('.account-wrap .total').text(totalPrice.toFixed(2))
    }
    // function price() {

    // }

    // 加减按钮
    $('#prodListContainer').on('click', '.reduce', function () {
        let val = $(this).next().val() - 1
        if (val < 1) {
            val = 1
        }
        $(this).next().val(val)
        priceAll()

    })
    $('#prodListContainer').on('click', '.add', function () {
        let val = $(this).prev().val() * 1 + 1
        // console.log(val)
        $(this).prev().val(val)
        priceAll()
    })

})