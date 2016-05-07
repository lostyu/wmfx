function FileUpload(file_upload_id) {

    var _document = $(document);
    var _upload_none_box = $(".upload_none_box");
    var _file_upload = $("#"+file_upload_id);

    _file_upload.uploadify({
        queueID: "queue",
        queueSizeLimit: 100,
        buttonClass: "upload_button",
        width: 130,
        height: 42,
        fileSizeLimit: 1024 * 10,// KB
        buttonText: "选择文件",
        swf: '../plugins/uploadify/js/uploadify.swf',
        removeCompleted: false,
        removeTimeout: 0,
        itemTemplate: '<div id="${fileID}" class="uploadify-queue-item">\
            <a class="upload_bg upload_close_bg" href="javascript: onCloseFile(\'${instanceID}\', \'${fileID}\');"></a>\
            <div class="upload_bg upload_other_bg ${suffix}_bg"></div>\
            <div class="fileName">${fileName} （${fileSize}）</div>\
            <div class="uploadify-progress">\
            <div class="uploadify-progress-bar"><!--Progress Bar--></div>\
            <div class="upload_data"><span class="data"></span></div>\
            </div>\
            </div>',
        //后台地址
        uploader: 'uploadify.php',
        method: "post",
        onSelect: onSelect,
        onSelectError: onSelectError,
        onUploadStart: onUploadStart
    });


    function onSelect() {
        _upload_none_box.hide();
    }

    function onSelectError() {
        notUploadQueue(this);
    }

    function onUploadStart() {

    }

    function onCloseFile(instanceID, fileID) {

        layer.confirm('<div class="dialog_content"><i class="upload_bg upload_gt_bg"></i>亲，你真要删掉我吗？</div>', {
            skin: "dialog_layer",
            closeBtn: 0, //不显示关闭按钮
            shade: 0,
            title: "删除提示",
            area: ['567px', '211px'],
            btn: ['确定', '取消'] //按钮
        }, function () {
            _file_upload.uploadify('cancel', fileID);
            notUploadQueue();
            layer.closeAll();
        }, function () {
            layer.closeAll();
        });

    }

    _document.on("mouseenter", ".uploadify-queue-item", function () {
        $(this).addClass("active");
    });

    _document.on("mouseleave", ".uploadify-queue-item", function () {
        $(this).removeClass("active");
    });

    function notUploadQueue(uploadify) {
        if (uploadify) {
            if (uploadify.queueData.filesQueued != 0) {
                _upload_none_box.hide();
            } else {
                _upload_none_box.show();
            }
        } else {
            if ($("#queue .uploadify-queue-item").length) {
                _upload_none_box.hide();
            } else {
                _upload_none_box.show();
            }
        }

    }

    function layerConfirm(title, content, cb1, cb2) {
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
    }

    function layerAlert(title, content) {
        layer.alert(content, {
            skin: "dialog_layer",
            shade: 0,
            title: title,
            area: ['567px', '211px']
        });
    }
}