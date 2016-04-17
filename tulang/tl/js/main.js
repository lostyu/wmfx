$(function () {

    var app = {};

    app.ui = {};
    //app.ui.preImg = function (iptFileId, endFn) {
    //
    //    $('#'+iptFileId).change(function() {
    //        $.post('url', {data: 1}, function(result){
    //            endFn();
    //        });
    //    });
    //
    //    //= function() {
    //    //    var prevDiv = document.getElementById(imgBoxId);
    //
    //
    //        //if (this.files && this.files[0]) {
    //        //    var reader = new FileReader();
    //        //    reader.onload = function (evt) {
    //        //        prevDiv.innerHTML = '<img src="' + evt.target.result + '" />';
    //        //    };
    //        //    reader.readAsDataURL(this.file.files[0]);
    //        //}
    //        //else {
    //        //    prevDiv.innerHTML = '<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + this.value + '\'"></div>';
    //        //}
    //    //};
    //
    //};

    (function () {
        // 表单验证
        var _dft = {
            promptPosition: 'centerRight',
            addPromptClass: 'formError-noArrow formError-small',
            maxErrorsPerField: 1,
            showOneMessage: true
        };

        $.extend($.validationEngine.defaults, _dft);

        $.validationEngineLanguage.allRules.r_phone = {
            'regex': /^[1][1234567890][0-9]{9}$/,
            'alertText': '* 请输入正确的手机号'
        };

        $.validationEngineLanguage.allRules.r_passWord = {
            'regex': /[\w\W]{6,22}/,
            'alertText': '* 字母、数字或者英文符号，最短6位'
        };

        $.validationEngineLanguage.allRules.r_phoneOrEmail = {
            'regex': /^((^[1][1234567890][0-9]{9}$)|(([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})))$/,
            'alertText': '* 请输入手机号或者邮箱'
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

                //submitHandler:function() {
                //    ajaxSubmitForm();
                //}
            });


            // 密码验证
            jQuery.validator.addMethod("isPass", function (value, element) {
                var pass = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
                return this.optional(element) || (pass.test(value));
            }, "密码至少由8个字符组成，必须包含数字、字母，区分大小写");
        }


        // 城市级联
        if ($('#city').length) {
            $("#city").citySelect({
                url: "plugins/jquery-city/city.min.js",
                prov: "重庆", //省份
                city: "渝中区", //城市
                nodata: "none" //当子集无数据时，隐藏select
            });

            $('#city select').addClass('form-control');
        }



        // icheck
        //$('input').iCheck({
        //    checkboxClass: 'icheckbox_minimal-blue',
        //    radioClass: 'iradio_minimal-blue',
        //    increaseArea: '20%' // optional
        //});
    })();

    // 登录
    (function () {

        $('#f-form-login').validationEngine();

        if ($.validator) {
            var oForm = $('#f-form-login');

            if (oForm.length) {
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

        }

    })();


    // 修改密码
    (function () {
        $('#f-form-changePass').validationEngine();

        if ($.validator) {
            var oForm = $('#f-form-changePass');

            if (oForm.length) {
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
        }

    })();


    // 手机找回密码
    (function () {
        $('#f-form-getPass').validationEngine();

        if ($.validator) {
            var oForm = $('#f-form-getPass');

            if (oForm.length) {
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
        }

    })();

    // 邮箱找回密码
    (function () {
        $('#f-form-getPass2').validationEngine();

        if ($.validator) {
            var oForm = $('#f-form-getPass2');

            if (oForm.length) {
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

        }

    })();


    // 个人注册
    (function () {
        $('#f-form-person').validationEngine();

        if ($.validator) {
            var oForm = $('#f-form-person');

            if (oForm.length) {
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
                        upass: "请输入密码",
                        upass2: {required: "重复密码", equalTo: "两次密码不一致"},
                        ucheck: "同意图狼网用户协议"
                    },


                    //errorLabelContainer: container,

                    success: function (e) {
                        var _name = e.get(0).id.substring(0, e.get(0).id.indexOf('-'));

                        for (var i = 0; i < aElements.length; i++) {
                            if (aElements[i].id) {
                                if (_name == aElements[i].id) {
                                    $(aElements[i]).parents('.form-group').removeClass('has-error');
                                }
                            } else {
                                if (_name == aElements[i].name) {
                                    $(aElements[i]).parents('.form-group').removeClass('has-error');
                                }
                            }
                        }
                    }

                });
            }

        }

    })();


    // 企业注册
    (function () {
        $('#f-form-qiye').validationEngine();

        if ($.validator) {
            var oForm = $('#f-form-qiye');

            if (oForm.length) {

                var validator = oForm.validate({
                    debug: true,

                    rules: {
                        uemail: {required: true, email: true},
                        upass: "required",
                        ucode: "required",
                        ucheck: "required"
                    },
                    messages: {
                        uemail: {required: "请输入邮箱地址", email: "请输入正确的邮箱"},
                        upass: "请输入密码",
                        ucode: "请输入验证码",
                        ucheck: "同意图狼网用户协议"
                    },

                    highlight: function (e) {
                        $(e).parent().find('.j-tips').hide();
                        //$(e).parent().find('.form-control-feedback').hide();
                        $(e).closest(".form-group").removeClass("has-success").addClass("has-error");
                    },

                    success: function (e) {
                        if (e.closest(".form-group").hasClass('has-feedback')) {
                            e.closest(".form-group").removeClass("has-error").addClass("success");
                            //$(e).parent().find('.form-control-feedback').show();
                        } else {
                            e.closest(".form-group").removeClass("has-error");
                        }

                        $(e).parent().find('.j-tips').show();

                    }

                });

            }
        }

    })();

    // 信息登记
    (function () {
        $('#f-form-xinxi').validationEngine({
            validateNonVisibleFields: true, // 验证隐藏表单
            binded: false,   // 提交时验证
            autoHidePrompt: true,   // 自动隐藏提示信息
            autoHideDelay: 5000,
            showOneMessage: false,
            scroll: false
        });


        // 图片上传
        var up1 = $('#j-upload1').Huploadify({
            auto: true,
            fileTypeExts: '*.jpg;*.png;*.exe;*.mp3;*.mp4;*.zip;*.doc;*.docx;*.ppt;*.pptx;*.xls;*.xlsx;*.pdf',
            multi: true,
            fileSizeLimit: 99999999,
            breakPoints: true,
            saveInfoLocal: true,
            showUploadedPercent: false,//是否实时显示上传的百分比，如20%
            showUploadedSize: false,
            removeTimeout: 9999999,
            buttonText: '上传图片',//上传按钮上的文字
            uploader: 'http://www.zcxf.com/admin/upload/upload',
            onUploadStart: function () {
                console.log('start');
                //up.settings('formData', {aaaaa:'1111111',bb:'2222'});
                up1.Huploadify('settings', 'formData', {aaaaa: '1111111', bb: '2222'});
            },
            onUploadSuccess: function (file) {
                alert('上传成功');
            },
            onUploadComplete: function () {
                //alert('上传完成');
            }
//        getUploadedSize: function (file) {
//            var data = {
//                data: {
//                    fileName: file.name,
//                    lastModifiedDate: file.lastModifiedDate.getTime()
//                }
//            };
//            var url = 'http://49.4.132.173:8080/admin/uploadfile/index/';
//            var uploadedSize = 0;
//            $.ajax({
//                url: url,
//                data: data,
//                async: false,
//                type: 'POST',
//                success: function (returnData) {
//                    returnData = JSON.parse(returnData);
//                    uploadedSize = returnData.uploadedSize;
//                }
//            });
//            return uploadedSize;
//        }
        });
        var up2 = $('#j-upload2').Huploadify({
            auto: true,
            fileTypeExts: '*.jpg;*.png;*.exe;*.mp3;*.mp4;*.zip;*.doc;*.docx;*.ppt;*.pptx;*.xls;*.xlsx;*.pdf',
            multi: true,
            fileSizeLimit: 99999999,
            breakPoints: true,
            saveInfoLocal: true,
            showUploadedPercent: false,//是否实时显示上传的百分比，如20%
            showUploadedSize: false,
            removeTimeout: 9999999,
            buttonText: '上传图片',//上传按钮上的文字
            uploader: 'http://www.zcxf.com/admin/upload/upload',
            onUploadStart: function () {
                console.log('start');
                //up.settings('formData', {aaaaa:'1111111',bb:'2222'});
                up2.Huploadify('settings', 'formData', {aaaaa: '1111111', bb: '2222'});
            },
            onUploadSuccess: function (file) {
                alert('上传成功');
            },
            onUploadComplete: function () {
                //alert('上传完成');
            }
//        getUploadedSize: function (file) {
//            var data = {
//                data: {
//                    fileName: file.name,
//                    lastModifiedDate: file.lastModifiedDate.getTime()
//                }
//            };
//            var url = 'http://49.4.132.173:8080/admin/uploadfile/index/';
//            var uploadedSize = 0;
//            $.ajax({
//                url: url,
//                data: data,
//                async: false,
//                type: 'POST',
//                success: function (returnData) {
//                    returnData = JSON.parse(returnData);
//                    uploadedSize = returnData.uploadedSize;
//                }
//            });
//            return uploadedSize;
//        }
        });

        if ($.validator) {
            var oForm = $('#f-form-xinxi');

            if (oForm.length) {
                var elements = oForm.get(0).elements;

                var container = $('.p-errContainer');

                var validator = oForm.validate({
                    debug: true,

                    errorLabelContainer: $('ul', container),
                    errorElement: 'span',
                    wrapper: 'li',


                    // 修改验证方式
                    onfocusout: false,
                    onkeyup: false,
                    onclick: false,
                    focusInvalid: false,


                    //rules: {
                    //    uemail: {required:true, email:true},
                    //    upass: "required",
                    //    ucode: "required",
                    //    ucheck: "required"
                    //},
                    //messages: {
                    //    uemail: {required:"请输入邮箱地址", email:"请输入正确的邮箱"},
                    //    upass: "请输入密码",
                    //    ucode: "请输入验证码",
                    //    ucheck: "同意图狼网用户协议"
                    //},
                    //
                    highlight: function (e) {
                        $(e).closest(".form-group").removeClass("has-success").addClass("has-error");
                        container.show();
                    },

                    success: function (e) {
                        var _name = e.get(0).id.substring(0, e.get(0).id.indexOf('-'));

                        for (var i = 0; i < elements.length; i++) {
                            if (elements[i].id) {
                                if (_name == elements[i].id) {
                                    $(elements[i]).parents('.form-group').removeClass('has-error');
                                }
                            } else {
                                if (_name == elements[i].name) {
                                    $(elements[i]).parents('.form-group').removeClass('has-error');
                                }
                            }
                        }


                    }

                });

            }
        }

    })();


    // 个人认证
    (function () {
        $('#f-form-grrz').validationEngine({
            validateNonVisibleFields: true, // 验证隐藏表单
            binded: false,   // 提交时验证
            autoHidePrompt: true,   // 自动隐藏提示信息
            autoHideDelay: 5000,
            showOneMessage: false,
            scroll: false
        });
    })();


    // 个人设置-基本资料
    (function () {
        var $form = $('#f-form-userSetting-base');


        //================= 修改头像 ==================
        var $btntx = $form.find('.j-uploadtx');
        var $btnSave = $('.j-btn-saveCrop');
        var $formCrop = $('#f-form-crop');
        var api;

        $btntx.change(function (ev) {

            //app.ui.preImg('j-fileImg', 'j-prevImgBox');
            $("#j-fileImg").uploadPreview({ Img: "j-prevImgBox", Width: 120, Height: 120 });
            //preImg('j-fileImg', 'j-prevImg');

            //var $content = $modal.find('.modal-content img');
            //
            //console.log(ev.target.files[0]);
            ////$content.attr('src',);
            ////var f =  $(this).get(0).files[0];
            ////var src = window.URL.createObjectURL(f);

            ////$(this).val('');
        });

        function preImg(sourceId, targetId) {
            var url = getFileUrl(sourceId);

            if (url) {
                var $modal = $('.j-txpopBox');

                //var imgPre = document.getElementById(targetId);
                //imgPre.src = url;

                $('#j-prevImg').Jcrop({
                    aspectRatio: 1,
                    boxHeight: 500,
                    onSelect: updateCoords
                }, function () {
                    api = this;
                });

                api.setImage(url);

                $modal.modal();
            }

        }

        $('.j-txpopBox').on('hidden.bs.modal', function (e) {
            api.destroy();
            $btntx.val('');
        });

        $btnSave.click(function () {
            //console.log(api.tellSelect());
            if (api.tellSelect().w > 0) {
                $.post('crop.php', {}, function (text) {
                    alert(text);
                });
            }
        });

        function updateCoords(c) {
            $('#x').val(Math.floor(c.x));
            $('#y').val(Math.floor(c.y));
            $('#w').val(Math.floor(c.w));
            $('#h').val(Math.floor(c.h));
        }


        function getFullPath(obj) {
            // 得到图片的完整路径
            if (obj) {
                // ie
                if (window.navigator.userAgent.indexOf("MSIE") >= 1) {
                    obj.select();
                    return document.selection.createRange().text;
                }
                // firefox
                else if (window.navigator.userAgent.indexOf("Firefox") >= 1) {
                    if (obj.files) {
                        return obj.files.item(0).getAsDataURL();
                    }
                    return obj.value;
                }
                return obj.value;
            }
        }

        //function getFileUrl(sourceId) {
        //    if (!document.getElementById(sourceId).value.match(/.jpg|.gif|.png|.bmp/i)) {
        //        alert('图片格式无效！');
        //        return false;
        //    }
        //    var url;
        //    if (navigator.userAgent.indexOf("MSIE") >= 1) { // IE
        //        url = document.getElementById(sourceId).value;
        //    } else if (navigator.userAgent.indexOf("Firefox") > 0) { // Firefox
        //        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
        //    } else if (navigator.userAgent.indexOf("Chrome") > 0) { // Chrome
        //        url = window.URL.createObjectURL(document.getElementById(sourceId).files.item(0));
        //    }
        //    return url;
        //}

        //================= / 修改头像 ==================


        // 添加标签
        var $tagBox = $form.find('.j-tagBox');
        var $tagBtn = $form.find('.j-addTag');
        var $tagIpt = $form.find('.j-tagIpt');
        var tagLen = 5;
        var curLen = 0;

        $tagBtn.click(function () {
            curLen = $tagBox.children().length;
            var _str = $.trim($tagIpt.val());

            if (_str.length > 0) {
                if (curLen < tagLen) {
                    var $label = $('<span class="label label-info">' + _str + '</span> ');
                    $tagBox.show().append($label);
                    $tagIpt.val('');
                }
            }
        });


        // 添加工作地
        var $placeBox = $form.find('.j-placeBox');
        var $placeBtn = $form.find('.j-addPlace');
        var $placeIpt = $form.find('.j-placeIpt');

        $placeBtn.click(function () {
            var _str = $.trim($placeIpt.val());
            if (_str.length > 0) {
                var $li = $('<li>' + _str + '</li>');
                $placeBox.show().append($li);
                $placeIpt.val('');
            }
        });


        // 职业经历
        var $liveBox = $form.find('.j-liveBox');
        var $liveBtn = $form.find('.j-addLive');
        var curLiveLen = 0;

        $liveBtn.click(function () {
            curLiveLen++;

            var _str = $('<li class="f-mb10">' +
                '<input name="lives[' + curLiveLen + '][company]" type="text" class="form-control" placeholder="公司或组织名称">' +
                '<input name="lives[' + curLiveLen + '][job]" type="text" class="form-control" placeholder="你的职位（选填）">' +
                '<a href="javascript:;"><span class="glyphicon glyphicon-remove"></span></a>' +
                '</li>');

            $liveBox.append(_str);

        });

        $liveBox.click(function (e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() == 'span') {
                $target.parents('li').remove();
            }
        });


        // 教育经历
        var $teachBox = $form.find('.j-teachBox');
        var $teachBtn = $form.find('.j-addTeach');
        var curTeachLen = 0;

        $teachBtn.click(function () {
            curTeachLen++;

            var _str = $('<li class="f-mb10">' +
                '<input name="teach[' + curTeachLen + '][school]" type="text" class="form-control" placeholder="学校或教育机构名称">' +
                '<input name="teach[' + curTeachLen + '][specialty]" type="text" class="form-control" placeholder="专业方向（选填）">' +
                '<a href="javascript:;"><span class="glyphicon glyphicon-remove"></span></a>' +
                '</li>');

            $teachBox.append(_str);

        });

        $teachBox.click(function (e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() == 'span') {
                $target.parents('li').remove();
            }
        });


        function getAllTags() {
            var sTags = '';
            $tagBox.children().each(function (index, elem) {
                sTags += $(this).html() + ',';
            });

            if (sTags.length > 0) {
                sTags = sTags.substring(0, sTags.length - 1);
            }
            return sTags;
        }


        var $btnSave = $('.j-btnSave');

        $btnSave.click(function () {
            var seri = $form.serialize();
            //console.log(getAllTags());
            console.log(seri);

            //$.post(
            //    // 接收数据的PHP页面
            //    url : 'action.php',
            //    // 传给PHP的数据，多个参数用&连接或者使用json格式数据：{a:'value1',b:'value2'}
            //    data : "a=value1&b=value2",
            //    function(msg){
            //        // 这里是请求发送成功后的回调函数。
            //        // msg是返回的数据，数据类型在type参数里定义！
            //    },
            //    // 默认返回字符串，设置值等于json则返回json数据
            //    type:'json',
            //)

            //$form.submit();
        });

    })();




    // 用户中心-帐号密码
    (function() {





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
