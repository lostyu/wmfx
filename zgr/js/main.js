window.onload = function () {
    var oTxt1 = document.getElementById('iptText1');
    var oTxt2 = document.getElementById('iptText2');
    var oBtn1 = document.getElementById('btn1');
    var oBtn2 = document.getElementById('btn2');
    var oImg = document.getElementById('img1');

    var oPage1 = document.getElementById('page1');
    var oPage2 = document.getElementById('page2');

    var iNow = 0;

    var arrData = [
        {
            "geci": "我就是我 是颜色不一样的烟火",
            "bgUrl": "img/1.jpg"
        },
        {
            "geci": "人生路 美梦似路长 路里风霜 风霜扑面干",
            "bgUrl": "img/2.jpg"
        },
        {
            "geci": "没什么可以给你 但求凭这阙 谢谢你风雨内 都不退愿陪着我",
            "bgUrl": "img/3.jpg"
        },
        {
            "geci": "风继续吹 不忍远离 心里亦有泪 不愿流泪望着你",
            "bgUrl": "img/4.jpg"
        }
    ];

    var json = {
        name: '',
        geci: '',
        bgUrl: ''
    };

    init();

    function init() {
        oTxt2.value = arrData[0]["geci"];
    }

    function changeGeci() {
        iNow++;
        if (iNow == arrData.length) {
            iNow = 0;
        }
        oTxt2.value = arrData[iNow]["geci"];
    }

    oBtn1.onclick = function () {
        changeGeci();
    };

    oBtn2.onclick = function () {

        if (oTxt1.value == '') {
            alert('请输入姓名!');
        } else {
            oPage2.style.left = 0;
            json.name = oTxt1.value;
            json.geci = arrData[iNow]["geci"];
            json.bgUrl = arrData[iNow]["bgUrl"];

            console.log(json);
        }
    };
};