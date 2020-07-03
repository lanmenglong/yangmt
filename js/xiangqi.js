$(() => {


    $('#imageMenu').on('mouseenter', 'li', function () {
        let src = $(this).find('img').attr('src')
        $('#vertical').find('img').attr('src', src)
        $('#bigView').find('img').attr('src', src)
    })


    class Fdj {
        constructor(fang) {
            this.maxBox = document.querySelector(`${fang}`)
            this.box = document.querySelector(`${fang} #vertical`)
            this.span = document.querySelector(`${fang} #winSelector`)
            this.bigBox = document.querySelector(`${fang} #bigView`)
            this.img = document.querySelector(`${fang} #bigView img`)
            this.fangZhuang()
        }
        fangZhuang() {
            this.box.onmouseenter = () => {
                this.change('block')
            }
            this.box.onmouseleave = () => {
                this.change('none')
            }
            this.box.onmousemove = (e) => {
                e = e || window.event
                this.move(e)
            }
        }
        change(display) {
            this.span.style.display = display
            this.bigBox.style.display = display
        }
        move(e) {
            var left =
                e.pageX -
                this.maxBox.offsetLeft -
                this.box.offsetLeft -
                this.span.offsetWidth / 2
            var top =
                e.pageY -
                this.maxBox.offsetTop -
                this.box.offsetTop -
                this.span.offsetHeight / 2
            if (left < 0) left = 0
            if (left > this.box.offsetWidth - this.span.offsetWidth)
                left = this.box.offsetWidth - this.span.offsetWidth
            if (top < 0) top = 0
            if (top > this.box.offsetHeight - this.span.offsetHeight)
                top = this.box.offsetHeight - this.span.offsetHeight
            this.span.style.left = left + 'px'
            this.span.style.top = top + 'px'
            this.img.style.left = -2 * left + 'px'
            this.img.style.top = -2 * top + 'px'
        }
    }

    new Fdj('#xqFDJ')



})