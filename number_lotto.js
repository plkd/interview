;

(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

function checkScrollLeft() {
    var box = document.querySelector('#cont');
    var content = document.querySelector('.zhanji-wrap');
    var boxWidth = box.offsetWidth;
    var textWidth = content.offsetWidth;
    // 判断文字长度是否大于盒子长度
    if (boxWidth > textWidth) {
        return false
    }
    box.innerHTML += box.innerHTML;
    toScrollLeft();
}

function toScrollLeft() {
    var box = document.querySelector('#cont');
    var content = document.querySelector('.zhanji-wrap');
    var textWidth = content.offsetWidth;

    //  如果文字长度大于滚动条距离，则递归拖动
    if (textWidth > box.scrollLeft) {
        box.scrollLeft += 1;
    } else {
        box.scrollLeft = 0;
    }
    window.requestAnimationFrame(toScrollLeft)
}

//  查询滚动的专家战绩
$.ajax({
    url: "//match.lottery.sina.com.cn/client/index/clientProxy",
    // The name of the callback parameter, as specified by the YQL service
    // Tell jQuery we're expecting JSONP
    dataType: "jsonp",
    jsonp: "callback",
    // Tell YQL what we want and that we want JSON
    data: {
        format: 'json',
        __caller__: 'web',
        __version__: 1,
        __verno__: 1,
        cat1: 'LottoExpertDocsZhanJi',
        page: 1,
        pageSize: 20,
    },
    // Work with the response
    success: function (response) {
        var res = response.result;
        var status = res.status
        if (status.code === 0) {
            var data = res.data
            var marqWrap = '<div class="zhanji-wrap">';
            data = data.slice(0, 5)
            data.forEach(function (item) {
                var temp = item.replace(/\S等奖\d+万/, function ($0) {
                    return '<span class="level-red">' + $0 + '</span>'
                })
                marqWrap += '<span class="zhanji-item">' + temp + '</span>'
            })
            marqWrap += '</div>'
            document.getElementById("cont").innerHTML = marqWrap
            checkScrollLeft()
        }
    }
});

getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]); return null;
}

var lottoType = getQueryString('lottoType')

var lottoMap = {
    ssq: 'ssq',
    dlt: 'dlt',
    '3d': 'fc3d',
    p3: 'pl3'
}

//   查询三篇专家推荐
if (lottoMap[lottoType]) {
    $('.more-recommend-btn').on('click', function () {
        window.open('https://lottery.sina.com.cn/number/lotto.shtml#/' + lottoMap[lottoType], '_blank')
    })
    $.ajax({
        url: "//match.lottery.sina.com.cn/client/index/clientProxy",
        // The name of the callback parameter, as specified by the YQL service
        jsonp: "callback",
        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",
        // Tell YQL what we want and that we want JSON
        data: {
            format: 'json',
            __caller__: 'web',
            __version__: 1,
            __verno__: 1,
            cat1: 'lottoExpertDocs',
            lastId: '',
            pageSize: 3,
            type: lottoMap[lottoType],
            online: 1,
        },
        // Work with the response
        success: function (response) {
            var res = response.result
            if (res.status.code === 0) {
                var list = res.data
                if (list.length) {
                    renderPlanItem(list, 1)
                } else {
                    $('.expert-recommend-wrap').hide()
                }
            }
        }
    });
} else {
    $('.more-recommend-btn').on('click', function () {
        window.open('https://lottery.sina.com.cn/number', '_blank')
    })
    $.ajax({
        url: "//match.lottery.sina.com.cn/client/index/clientProxy",
        // The name of the callback parameter, as specified by the YQL service
        jsonp: "callback",
        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",
        // Tell YQL what we want and that we want JSON
        data: {
            format: 'json',
            __caller__: 'web',
            __version__: 1,
            __verno__: 1,
            cat1: 'lottoExpertDocsIndex',
            lastId: '',
            pageSize: 3,
            lottoTypes: 'ssq,dlt',
            _t: new Date().getTime(),
        },
        // Work with the response
        success: function (response) {
            var res = response.result
            if (res.status.code === 0) {
                var list = res.data
                if (list.length) {
                    renderPlanItem(list, 2)
                } else {
                    $('.expert-recommend-wrap').hide()
                }
            }
        }
    });
}



function renderPlanItem(list, type) {
    var leftTitle = document.querySelector('.expert-recommend-wrap .left-title')
    var intervalList = []

    if (type == 1) {
        leftTitle.innerHTML = '专家推荐'
        
    } else if (type == 2) {
        leftTitle.innerHTML = '权威推荐'
    }
    var temp = ''
        list.forEach(function (item, index) {
            temp = '<a class="news-item" target="_blank" href="https://lottery.sina.com.cn/number/article.shtml?news_id=' + item.news_id + '"><div class="left"><i class="' + item.type + '-logo"></i><span class="episode">' +
                item.issue_no + '</span></div><div class="right"><div class="summary">' + item.title + '</div><div class="count-down">倒计时：' +
                '</div><div class="price"></div></div></a>'

            var timeSpan = document.createElement('span')
            $('.scheme-wrap').eq(0).append(temp)
            var price = item.price * 1 > 0 ? item.price + '炮弹' : '免费'
            $('.scheme-wrap').find('.price').eq(index).text(price)

            intervalList[index] = setInterval(() => {
                timeDown(timeSpan, item.sale_time, index)
                $('.scheme-wrap').find('.count-down').eq(index).append($(timeSpan))
            }, 500)
        })

    function format(time) {
        if (time >= 10) {
            return time
        } else {
            return '0' + time
        }
    }

    function timeDown(el, time, index) {
        var endTime = new Date(time.replace(/\-/g, '\/'))
        var nowTime = new Date()
        var leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
        var d = parseInt(leftTime / (24 * 60 * 60))
        var h = format(parseInt((leftTime / (60 * 60)) % 24))
        var m = format(parseInt((leftTime / 60) % 60))
        var s = format(parseInt(leftTime % 60))
        if (leftTime <= 0) {
            el.innerHTML = '已开奖'
            clearInterval(intervalList[index])
            return
        }
        el.innerHTML = '' + (d * 24 + h * 1) + ':' + m + ':' + s
    }

}

