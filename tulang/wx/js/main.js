$(function(){

    if(!window.app){
        var app = {};
    }

    app.ui = {
        // 发送验证码计时
        sendCode: function (objBtn) {

            var timer = null;
            var onOff = true;
            var curTime = 60;

            if (onOff) {
                onOff = false;
                objBtn.text(curTime + 'S后重发');
                objBtn.attr('disabled', true);
                objBtn.addClass('weui_btn_disabled');

                timer = setInterval(function () {
                    curTime--;
                    if (curTime == 0) {
                        objBtn.text('发送验证码');
                        objBtn.attr('disabled', false);
                        objBtn.removeClass('weui_btn_disabled');

                        curTime = 60;
                        onOff = true;
                        clearInterval(timer);
                    } else {
                        objBtn.text(curTime + 'S后重发');
                    }

                }, 1000);
            }

        }
    };




    (function(){


        // 发送验证码计时
        var $sendCode = $('.j-sendCode');
        $sendCode.click(function () {
            app.ui.sendCode($(this));
        });



        // 导航菜单切换
        var bOpen = false;
        $('.j-btnNav').click(function(){
            bOpen = !bOpen;
            $('.j-navList').stop().slideToggle();

            if(bOpen){
                $(this).addClass('active');
            }else{
                $(this).removeClass('active');
            }
        });


    })();

});