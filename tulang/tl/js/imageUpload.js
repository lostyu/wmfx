var ImageUploadMethod = {
    _file_upload: 'file_upload1',
    onSelect: function(file) {
        //console.log(this);
        //console.log(file);
        //console.log(file);
        //var _list = $("#queue .uploadify-queue-item");

        //if (settings.onSelect) settings.onSelect.apply(this, arguments);


        //if (_list.length > 1) {
        //    _list.eq(0).each(function () {
        //        var id = $(this).attr("id");
        //        //console.log(this);
        //        //ImageUpload.prototype.call(This._file_upload.uploadify('cancel', id));
        //    });
        //}
    },


    onSelectError: function () {
    },


    onUploadStart: function () {
    },

    onUploadSuccess: function (file, msg, status) {
        console.log(msg); //这里获得后台的图片路劲 自行赋值
        $(".upload_img_main").html('<img src="' + msg + '"/>').addClass("show");
    },


    onUploadError: function () {
    },


    onUploadComplete: function (file) {
        var _file = $("#" + file.id);
        if (_file.length) {
            _file.delay(1000).fadeOut(300);
        }
    },



    onCloseFile: function (instanceID, fileID) {
        layer.confirm('<div class="dialog_content"><i class="upload_bg upload_gt_bg"></i>亲，你真要删掉我吗？</div>', {
            skin: "dialog_layer",
            closeBtn: 0, //不显示关闭按钮
            shade: 0,
            title: "删除提示",
            area: ['567px', '211px'],
            btn: ['确定', '取消'] //按钮
        }, function () {
            $('#file_upload').uploadify('cancel', fileID);
            $(".upload_img_main").html("").removeClass("show");
            layer.closeAll();
        }, function () {
            layer.closeAll();
        });
    },


    layerConfirm: function (title, content, cb1, cb2) {
        layer.confirm(content, {
            skin: "dialog_layer",
            shade: 0,
            title: title,
            area: ['567px', '211px'],
            btn: ['确定', '取消'] //按钮
        }, function () {
            cb1 && cb1();
            layer.closeAll();
        }, function () {
            cb2 && cb2();
            layer.closeAll();
        });
    },


    layerAlert: function (title, content) {
        layer.alert(content, {
            skin: "dialog_layer",
            shade: 0,
            title: title,
            area: ['567px', '211px']
        });
    }

};

function ImageUpload(file_upload_id, opt) {
    var _defaults = {
        buttonClass: "upload_button",
        width: 77,
        height: 32,
        fileSizeLimit: 1024 * 2,// KB
        buttonText: "上传",
        swf: '../plugins/uploadify/js/uploadify.swf?'+new Date().getTime(),
        removeCompleted: false,
        removeTimeout: 0,
        fileTypeDesc: 'Image Files',
        fileTypeExts: '*.jpg;*.png',
        multi: false,
        scriptAccess: 'always',
        debug: true,


        itemTemplate: '<div id="${fileID}" class="uploadify-queue-item">\
        <div class="fileName">${fileName}</div>\
            <div class="fileSize">（${fileSize}）</div>\
            <div class="uploadify-progress">\
            <div class="uploadify-progress-bar"><!--Progress Bar--></div>\
            </div>\
            <a class="upload_img_close" href="javascript: window.ImageUploadMethod.onCloseFile(\'${instanceID}\', \'${fileID}\');">取消</a>\
            </div>',
        //后台地址
        uploader: 'uploadify.php',
        method: "post",
        onSelect: ImageUploadMethod.onSelect,
        onSelectError: ImageUploadMethod.onSelectError,
        onUploadStart: ImageUploadMethod.onUploadStart,
        onUploadComplete: ImageUploadMethod.onUploadComplete,
        onUploadError: ImageUploadMethod.onUploadError,
        onUploadSuccess: ImageUploadMethod.onUploadSuccess
    };

    this.options = $.extend({}, _defaults, opt);
    this._file_upload = $("#" + file_upload_id);
    this.init();
}

ImageUpload.prototype.init = function () {
    var This = this;
    This._file_upload.uploadify(This.options);
};





