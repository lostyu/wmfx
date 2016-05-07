$(function () {

    window.app = {};
    app.ui = {
        // 页面跳转
        changePage: function (url, time) {
            time = time || 3000;
            setTimeout(function () {
                window.location.href = url;
            }, time);
        },

        // 展开显示文字
        toggleText: function (toggleClass, togglePanelClass) {
            var $toggle = $('.' + toggleClass);
            var $togglePanelClass = $('.' + togglePanelClass);
            var iH = $togglePanelClass.height();
            var onOff = true;

            $toggle.click(function () {
                if (onOff) {
                    onOff = false;
                    $togglePanelClass.css('height', 'auto');
                } else {
                    onOff = true;
                    $togglePanelClass.css('height', iH);
                }

            });
        },

        // 发送验证码计时
        sendCode: function (objBtn) {

            var timer = null;
            var onOff = true;
            var curTime = 60;

            if (onOff) {
                onOff = false;
                objBtn.text(curTime + 'S后重发');
                objBtn.attr('disabled', true);

                timer = setInterval(function () {
                    curTime--;
                    if (curTime == 0) {
                        objBtn.text('发送验证码');
                        objBtn.attr('disabled', false);
                        curTime = 60;
                        onOff = true;
                        clearInterval(timer);
                    } else {
                        objBtn.text(curTime + 'S后重发');
                    }

                }, 1000);
            }

        },

        // 点击按钮文字变化
        changeBtnText: function(objBtn, callback) {
            var $btn = objBtn;
            var sOldText = $btn.text();
            var sNowText = $btn.attr('data-text');

            if(callback){
                callback();
            }

            // 还原
            var restore = function() {
                $btn.attr('disabled', false);
                $btn.text(sOldText);
            };

            // 改变文字
            var change = function(){
                $btn.attr('disabled', true);
                $btn.text(sNowText);
            };

            return {
                restore: restore,
                change: change
            }
        }
    };


    (function () {

        if ($.validationEngine) {


            // 表单验证
            var _dft = {
                promptPosition: 'inline',
                addPromptClass: 'formError-text',
                maxErrorsPerField: 1,
                showOneMessage: true,
                scroll: false,
                custom_error_messages: {
                    'required': {
                        'message': '此处不可空白'
                    }
                }
            };

            $.extend($.validationEngine.defaults, _dft);

            $.validationEngineLanguage.allRules.r_phone = {
                'regex': /^1\d{10}$/,
                'alertText': '手机号错误'
            };

            $.validationEngineLanguage.allRules.r_passWord = {
                'regex': /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/,
                'alertText': '密码至少8位，必须包含数字、字母'
            };

            $.validationEngineLanguage.allRules.r_phoneOrEmail = {
                'regex': /^((^[1][1234567890][0-9]{9}$)|(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/,
                'alertText': '请输入手机号或者邮箱'
            };

            $.validationEngineLanguage.allRules.r_ajaxCheckUname = {
                'url': 'phpajax/ajaxValidateFieldUser.php', /* 验证程序地址 */
                'extraData': '', /* 额外参数 */
                'alertTextOk': '验证通过时的提示信息',
                'alertText': '验证不通过时的提示信息',
                'alertTextLoad': '正在验证时的提示信息'
            };

            $.validationEngineLanguage.allRules.r_ajaxCode = {
                'url': 'phpajax/ajaxValidateFieldUser.php', /* 验证程序地址 */
                'extraData': '', /* 额外参数 */
                'alertTextOk': '验证通过时的提示信息',
                'alertText': '验证不通过时的提示信息',
                'alertTextLoad': '正在验证时的提示信息'
            };

            $.validationEngineLanguage.allRules.r_ajaxImgCode = {
                'url': 'phpajax/ajaxValidateFieldUser.php', /* 验证程序地址 */
                'extraData': '', /* 额外参数 */
                'alertTextOk': '验证通过时的提示信息',
                'alertText': '验证不通过时的提示信息',
                'alertTextLoad': '正在验证时的提示信息'
            };

        }


        // 城市级联
        //if ($('#city').length) {
        //    $("#city").citySelect({
        //        url: "plugins/jquery-city/city.min.js",
        //        prov: "重庆", //省份
        //        city: "渝中区", //城市
        //        nodata: "none" //当子集无数据时，隐藏select
        //    });
        //
        //    $('#city select').addClass('form-control');
        //}

        // 城市级联
        if (window.PCAS) {
            if($('[name=Province]').length && $('[name=City]').length){
                new PCAS("Province", "City");
            }

        }

        // 发送验证码计时
        var $sendCode = $('.j-sendCode');
        $sendCode.click(function () {
            app.ui.sendCode($(this));
        });


        // date
        if (window.laydate) {
            if ($('#start').length || $('#end').length) {
                var start = {
                    elem: '#start',
                    min: laydate.now(), //设定最小日期为当前日期
                    choose: function (datas) {
                        end.min = datas; //开始日选好后，重置结束日的最小日期
                        end.start = datas; //将结束日的初始值设定为开始日
                    }
                };
                var end = {
                    elem: '#end',
                    min: laydate.now(),
                    choose: function (datas) {
                        start.max = datas; //结束日选好后，重置开始日的最大日期
                    }
                };
                laydate(start);
                laydate(end);
            }
        }





         // icheck
        if($.fn.iCheck){
            $('input').iCheck({
                checkboxClass: 'icheckbox_flat-blue',
                radioClass: 'iradio_flat-blue',
                increaseArea: '' // optional
            });
        }



    })();


});

