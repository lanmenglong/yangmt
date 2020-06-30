// let divs = $0.querySelectorAll('.cw-item')
// let arr = []
// let a =  Array.from(divs)
//   let b = a.slice(0,-1)

// console.log(b)
// b.forEach(item=>{
//     let o = {}
//     o.title = item.querySelector('.cw-title').innerText
//     o.text1=item.querySelector('.cw-subtitle').children[
//         0
//     ].innerText
//     o.text2=item.querySelector('.cw-subtitle').children[
//         1
//     ].innerText
//     o.text3=item.querySelector('.cw-subtitle').children[
//         2
//     ].innerText
//     o.img = item.querySelector('.cw-img img').src
//     console.log(o)
//     arr.push(o)
// })
class Feilei {
    constructor(data) {
        this.data = data
    }
    init() {
        this.divUI()
    }
    divUI() {
        let divHtml = this.data.map(item => {
            return `<div class="cw-item">
            <a href="">
                <h3 class="cw-title">
                    <span>${item.title}</span>
                    <i class="glyphicon glyphicon-menu-right"></i>
                </h3>
                <div class="cw-subtitle">
                    <span>${item.text1}</span>
                    <span>${item.text2}</span>
                    <span>${item.text3}</span>
                </div>
                <span class="cw-img">
                    <img src="${item.img}" alt="">
                </span>
            </a>

        </div>`
        }).join('')
        $('.category-wrap').html(divHtml)
    }

}

// 今日限时轮播图
class JinriIMG {
    constructor(data) {
        this.data = data
        this.oDiv = null
        this.ul = null
        this.gray = null
        this.index = 0
        this.idx = this.data.length
    }
    init() {
        this.oBoxUI()
        this.oDivUI()
        this.prevBtn()
        this.nextBtn()
    }
    oBoxUI() {
        this.Gray()
        this.oDivUI()
        this.ULhtml()
        this.oDiv.appendChild(this.ul)
        this.oDiv.appendChild(this.gray)
        $('#mod-bd').html(this.oDiv)
    }
    oDivUI() {
        this.oDiv = document.createElement('div')
        this.oDiv.className = 'today-buying-wrap'
        this.oDiv.innerHTML = `<span class="swith-btn-prev"><i class="glyphicon glyphicon-menu-left"></i></span>;
        <span class="swith-btn-next"><i class="glyphicon glyphicon-menu-right"></i></span>`

    }
    ULhtml() {
        this.ul = document.createElement('ul')
        this.ul.className = 'swith-today-banner'
        this.ul.innerHTML = this.data.map((item, i) => {
            if (i == 1) {
                return `<li class="swith-img swith-img-active" data-id="${i}"><a href="javascript:;"><img src="${item.img}" alt=""></a></li>`
            }
            if (i == 2) {
                return `<li class="swith-img swith-img-prev" data-id="${i}"><a href="javascript:;"><img src="${item.img}" alt=""></a></li>`
            }
            if (i == 0) {
                return `<li class="swith-img swith-img-next" data-id="${i}"><a href="javascript:;"><img src="${item.img}" alt=""></a></li>`
            }
            return `<li class="swith-img" data-id="${i}"><a href="javascript:;"><img src="${item.img}" alt=""></a></li>`

        }).join('')
    }
    Gray() {
        this.gray = document.createElement('div')
        this.gray.className = 'gray'
    }
    prevBtn() {
        $('.swith-btn-prev').click(() => {
            this.index = $('.swith-img-active').attr('data-id')
            $('.swith-img').removeClass('swith-img-active swith-img-next swith-img-prev')
            $('.swith-img').eq(this.index).addClass('swith-img-next')
            $('.swith-img').eq(this.index - 1).addClass('swith-img-active')
            $('.swith-img').eq(this.index - 2).addClass('swith-img-prev')
        })
    }

    nextBtn() {

        $('.swith-btn-next').click(() => {
            this.index = $('.swith-img-active').attr('data-id')
            $('.swith-img').removeClass('swith-img-active swith-img-next swith-img-prev')
            this.index++
            if (this.index == this.idx) {
                this.index = 0
                $('.swith-img').eq(this.index - 1).addClass('swith-img-prev')
            }
            $('.swith-img').eq(this.index).addClass('swith-img-active').prev().addClass('swith-img-prev')
            $('.swith-img').eq(this.index).next().addClass('swith-img-next')
            if (this.index == this.idx - 1) {
                $('.swith-img').eq(0).addClass('swith-img-next')
            }
        })
    }
}
