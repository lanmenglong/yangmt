$(() => {

    $.ajax({
        url: "../json/jinriZhuye.json",

        dataType: 'json',
        success(data) {
            let date = new Date()
            let html = data.map((item) => {
                return `<div class="todaybuy-content active">
                <div class="banner">
                    <div class="banner-hd">
                        <div class="date">
                            <p class="day">${(date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)}/${(date.getMonth() + 1) >= 10 ? date.getData() : '0' + date.getDate()}</p>
                            <p class="week" id="week"></p>
                        </div>
                        <span class="title">${item.hdtitle}</span>
                        <em class="arrow-right"></em>
                    </div>
                    <div class="banner-bd">
                        <div class="banner-img">
                            <div class="blur"></div>
                        </div>
                        <div class="buy-product">
                            <div class="product-wrap">
                                <div class="product-img">
                                    <a href=""><img src="${item.logoImg}" alt=""></a>
                                </div>
                                <div class="product-info">
                                    <p class="country">
                                        <span class="flag">
                                            <img src="${item.flagImg}" alt="">
                                        </span>
                                        <span class="name">${item.flagName}</span>
                                    </p>
                                    <h3 class="title">${item.bdtitle}</h3>
                                    <p class="buy-price">
                                        原价
                                        <span class="price">
                                            <em class="nuit">¥</em>
                                            ${item.bdBuy_price ? item.bdBuy_price : ''}
                                        </span>
                                    </p>
                                    <p class="now-price">
                                        限时价¥
                                        <em class="unit">${item.bdNow_price}</em>
                                    </p>
                                    <p>
                                    <a class="buy-btn J-godetail"><i module_index sproductid="p1277084">立即购买</i></a></p>
                                </div>
                            </div>
                            <div class="timeout-wrap">
                                <span class="title">距离结束</span>
                                <span class="time t-hh"></span>
                                <span class="txt"></span>
                                <span class="time t-mm"></span>
                                <span class="txt"></span>
                                <span class="time t-ss"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            })

            setInterval(() => {
                let date = new Date()
                let starDate = date.getTime()
                let endDate = new Date(2020, 6, 6, 0, 0, 0)
                let thenDate = endDate.getTime()
                let time = (thenDate - starDate) / 1000
                let hours = parseInt(time / 3600)
                let minutes = parseInt((time % 3600) / 60)
                let second = parseInt(time % 3600 % 60)
                $('.t-hh').text(`${hours < 10 ? '0' + hours : hours}`)
                $('.t-mm').text(`${minutes < 10 ? '0' + minutes : minutes}`)
                $('.t-ss').text(`${second < 10 ? '0' + second : second}`)
            }, 1000)

            let box = $('<div>')
            box.addClass('todaybuy-content active').html(html)
            $('#J_todaybuyBody').append(box)
            console.log(date.getDay())
            switch (date.getDay()) {
                case 1:
                    $('.date .week').text('Monday')
                    break;
                case 2:
                    $('.date .week').text('Tuesday')
                    break;
                case 3:
                    $('.date .week').text('Wednesday')
                    break;
                case 4:
                    $('.date .week').text('Thursday')
                    break;
                case 5:
                    $('.date .week').text('Friday')
                    break;
                case 6:
                    $('.date .week').text('Saturday')
                    break;
                case 0:
                    $('.date .week').text('Sunday')
                    break;
            }
        }
    })


})
