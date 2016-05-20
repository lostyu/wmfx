$(function () {

    if (!window.app) {
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

        },

        // tabs切换
        tabs: function(oTabNav, oPanel){
            var $tabNav = oTabNav.find('.tabNav');
            var $panel = oPanel.find('.panel');

            $tabNav.click(function(){
                $(this).addClass('active').siblings().removeClass('active');
                $panel.eq($(this).index()).show().siblings().hide();
            });
        }
    };


    (function () {


        // 发送验证码计时
        var $sendCode = $('.j-sendCode');
        $sendCode.click(function () {
            app.ui.sendCode($(this));
        });


        // 导航菜单切换
        var bOpen = false;
        function toggleMenu() {
            bOpen = !bOpen;
            var $nav = $('.j-btnNav');
            $('.j-navList').stop().toggle();

            if (bOpen) {
                $nav.addClass('active');
            } else {
                $nav.removeClass('active');
            }
        }

        $('.j-btnNav').click(function (ev) {
            ev.stopPropagation();
            toggleMenu();
        });

        $(document).on('click', function(){
            bOpen = false;
            $('.j-navList').hide();
            $('.j-btnNav').removeClass('active');
        });



        // tabs切换
        var $tab = $('.j-tabs1');
        var $panel = $('.j-panel1');
        app.ui.tabs($tab, $panel);

    })();

});