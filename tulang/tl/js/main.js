$(function () {


    (function () {
        // 表单提交默认设置
        if ($.validator) {
            $.validator.setDefaults({
                highlight: function (e) {
                    $(e).closest(".form-group").removeClass("has-success").addClass("has-error");
                },
                success: function (e) {
                    e.closest(".form-group").removeClass("has-error");
                },
                errorPlacement: function (e, r) {

                    if (r.parent().hasClass('input-group')) {
                        e.appendTo(r.parent().parent());
                    } else {
                        e.appendTo(r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent());
                    }

                },
                errorClass: "help-block",
                validClass: "",
                errorElement: 'p'
            });


            // 邮政编码验证
            jQuery.validator.addMethod("isPass", function(value, element) {
                var pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
                return this.optional(element) || (pass.test(value));
            }, "密码至少由8个字符组成，必须包含数字、字母，区分大小写");
        }

    })();

    // 登录
    (function () {

        if ($.validator) {
            var oForm = $('#f-form-login');
            oForm.validate({
                //debug: true,

                rules: {
                    uname: {required: !0},
                    upass: "required"
                },
                messages: {
                    uname: {
                        required: "请输入手机号/邮箱"
                    },
                    upass: "请输入密码"
                },

                //submitHandler: function (form) {
                //    console.log(form);
                //}
            });
        }

    })();


    // 手机找回密码
    (function () {
        if ($.validator) {
            var oForm = $('#f-form-getPass');
            oForm.validate({
                debug: true,

                errorPlacement: function (e, r) {

                    if (r.parent().hasClass('input-group')) {
                        e.appendTo(r.parent().parent());
                    } else {
                        e.appendTo(r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent());
                    }

                },

                rules: {
                    utel: {required: !0},
                    ucode: "required"
                },
                messages: {
                    utel: {
                        required: "请输入手机号"
                    },
                    ucode: "请输入验证码"
                }

                //submitHandler: function (form) {
                //    console.log(form);
                //}
            });
        }

    })();

    // 邮箱找回密码
    (function () {
        if ($.validator) {
            var oForm = $('#f-form-getPass2');
            oForm.validate({
                debug: true,

                errorPlacement: function (e, r) {

                    if (r.parent().hasClass('input-group')) {
                        e.appendTo(r.parent().parent());
                    } else {
                        e.appendTo(r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent());
                    }

                },

                rules: {
                    utel: {required: !0},
                    ucode: "required"
                },
                messages: {
                    utel: {
                        required: "请输入手机号"
                    },
                    ucode: "请输入验证码"
                }

                //submitHandler: function (form) {
                //    console.log(form);
                //}
            });
        }

    })();


    // 修改密码
    (function () {
        if ($.validator) {
            var oForm = $('#f-form-changePass');
            oForm.validate({
                debug: true,

                errorPlacement: function (e, r) {

                    if (r.parent().hasClass('input-group')) {
                        e.appendTo(r.parent().parent());
                    } else {
                        e.appendTo(r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent());
                    }

                },

                rules: {
                    upass: {required: !0, isPass: true},
                    upass2: {required: !0, equalTo: "#pass1"},
                    ucode: "required"
                },
                messages: {
                    upass: {required: "请输入密码"},
                    upass2: {required: "重复密码", equalTo: "两次密码不一致"},
                    ucode: "请输入验证码"
                }

                //submitHandler: function (form) {
                //    console.log(form);
                //}
            });
        }

    })();

    // 个人注册
    (function () {
        if ($.validator) {
            var oForm = $('#f-form-person');
            var container = $('.j-errBox');
            var aElements = oForm[0].elements;

            var validator = oForm.validate({
                debug: true,

                errorPlacement: function (e, r) {

                    if (r.parent().hasClass('input-group')) {
                        e.appendTo(r.parent().parent());
                    } else {
                        e.appendTo(r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent());
                    }

                },

                rules: {
                    uname: "required",
                    ucode: "required",
                    ucode2: "required",
                    upass: "required",
                    upass2: {required: !0, equalTo: "#pass1"},
                    ucheck: "required"
                },
                messages: {
                    uname: "请输入手机号或邮箱",
                    ucode: "请输入验证码",
                    ucode2: "请输入邀请码",
                    upass:  "请输入密码",
                    upass2: {required: "重复密码", equalTo: "两次密码不一致"},
                    ucheck: "同意图狼网用户协议"
                },


                errorLabelContainer: container,

                success: function (e) {
                    var _name = e.get(0).id.substring(0, e.get(0).id.indexOf('-'));

                    for(var i=0;i<aElements.length;i++){
                        if(aElements[i].id){
                            if(_name == aElements[i].id){
                                $(aElements[i]).parents('.form-group').removeClass('has-error');
                            }
                        }else{
                            if(_name == aElements[i].name){
                                $(aElements[i]).parents('.form-group').removeClass('has-error');
                            }
                        }
                    }
                }

            });
        }

    })();


});


//$.validator.setDefaults({
//    highlight: function (e) {
//        $(e).closest(".form-group").removeClass("has-success").addClass("has-error")
//    }, success: function (e) {
//        e.closest(".form-group").removeClass("has-error").addClass("has-success")
//    }, errorElement: "span", errorPlacement: function (e, r) {
//        e.appendTo(r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent())
//    }, errorClass: "help-block m-b-none", validClass: "help-block m-b-none"
//}), $().ready(function () {
//    $("#commentForm").validate();
//    var e = "<i class='fa fa-times-circle'></i> ";
//    $("#signupForm").validate({
//        rules: {
//            firstname: "required",
//            lastname: "required",
//            username: {required: !0, minlength: 2},
//            password: {required: !0, minlength: 5},
//            confirm_password: {required: !0, minlength: 5, equalTo: "#password"},
//            email: {required: !0, email: !0},
//            topic: {required: "#newsletter:checked", minlength: 2},
//            agree: "required"
//        },
//        messages: {
//            firstname: e + "请输入你的姓",
//            lastname: e + "请输入您的名字",
//            username: {required: e + "请输入您的用户名", minlength: e + "用户名必须两个字符以上"},
//            password: {required: e + "请输入您的密码", minlength: e + "密码必须5个字符以上"},
//            confirm_password: {required: e + "请再次输入密码", minlength: e + "密码必须5个字符以上", equalTo: e + "两次输入的密码不一致"},
//            email: e + "请输入您的E-mail",
//            agree: {required: e + "必须同意协议后才能注册", element: "#agree-error"}
//        }
//    }), $("#username").focus(function () {
//        var e = $("#firstname").val(), r = $("#lastname").val();
//        e && r && !this.value && (this.value = e + "." + r)
//    })
//});
