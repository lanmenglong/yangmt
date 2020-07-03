let Cookie = (function () {
    // 取出某个cookie值
    function getItem(key) {
        // 先取出所有的cookie

        let cookieSting = document.cookie
        // 用一个数组来接收每个cookie存储的属性,用split来分割,分割;
        let cookies = cookieSting.split('; ')
        // 循环遍历每个到每组数组的属性,根据key属性拿到值,
        for (let i = 0; i < cookies.length; i++) {
            let xcookie = cookies[i]
            let fcookie = xcookie.split('=')
            if (fcookie[0] == key) {
                return fcookie[1]
            }
        }
    }

    // 添加设置cookie
    // 第一个是属性,第二个是名,第三个是天数
    function setItem(key, value, day) {
        if (typeof day == 'number' && day > 0) {
            let date = new Date()

            date.setDate(date.getDate() + day)
            document.cookie = `${key}=${value};expires=` + date
        } else {
            document.cookie = `${key}=${value}`
        }
    }

    function clear() {
        let keys = getkeys()
        keys.forEach((key) => removeItem(key))
    }
    function removeItem(key) {
        let date = new Date()
        date.setDate(date.getDate() - 1)
        document.cookie = `${key}="";expires=` + date
    }
    function getKeys(key) {
        let keys = []
        let cookieSting = document.cookie // "color=red; id=red2324"
        let cookies = cookieSting.split('; ') //["color=red","id=red2324"]
        for (let i = 0; i < cookies.length; i++) {
            let currentItem = cookies[i] //"color=red"
            let temp = currentItem.split('=') //["color","red"];
            keys.push(temp[0])
        }
        return keys
    }
    return { setItem, getItem, removeItem, getKeys, clear }
})()
