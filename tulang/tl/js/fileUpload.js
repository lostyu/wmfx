var aSuccessItem = [];

function uploadInit(objBtn){
    var $this = $(objBtn);
    var fileUpload = $this.attr('data-uploadFile');
    var queue = $this.attr('data-uploadQueue');
    var nofile = $this.parents('.m-uploadFile').find('.nofile');
    var queueList = $this.parents('.m-uploadFile').find('.queue');
    aSuccessItem.length = 0;

    createFileUpload(fileUpload, queue);

    FileUpload(fileUpload, queue);

    layer.open({
        type: 1,
        area: ['780px', '450px'],
        title: '上传附件',
        content: $('.popup-upload-'+queue),
        btn: ['确定', '取消'],
        yes: function (index, layero) {
            $('#'+fileUpload).uploadify('cancel', '*');
            layer.close(index);
            closeLay();
        },
        cancel: function (index) { //或者使用btn2
            $('#'+fileUpload).uploadify('cancel', '*');
        }
    });

    function closeLay(){
        var $queueItem = queueList.children();

        if(aSuccessItem.length){
            nofile.hide();
            for(var i=0;i<aSuccessItem.length;i++){

                queueList.append(aSuccessItem[i]);

                var fileName1 = $(aSuccessItem[i][0]).find('.fileName').html();

                for(var j=0;j<$queueItem.length;j++){
                    var fileName2 = $queueItem.eq(j).find('.fileName').html();
                    if(fileName1 == fileName2){
                        aSuccessItem[i].insertBefore($queueItem.eq(j));
                        $queueItem.eq(j).remove();
                    }
                }

            }
        }
    }

}

function createFileUpload(fileUploadID, queueID){

    if(!$('#'+fileUploadID).length){
        var $html = $('<div class="popup popup-upload popup-upload-'+queueID+'">\
            <p>单个文件最大50MB，支持格式：jpg、doc、docx、xls、xlsx、ppt、pptx、pdf和zip、rar，其他格式请压缩后上传。</p>\
        <div class="btn-control">\
            <input id="'+ fileUploadID +'" class="file_upload" name="file_upload" type="file" multiple="true">\
            </div>\
            <div class="queue_box">\
            <div id="'+ queueID +'"></div>\
            <div class="clear"></div>\
            </div>\
            </div>');

        $('body').append($html);
    }
}

function FileUpload(fileUploadID, queueID) {

    var _file_upload = $('#'+fileUploadID);
    var _queueBox = $('#'+queueID);

    _file_upload.uploadify({
        queueID: queueID,
        queueSizeLimit: 100,
        buttonClass: "upload_button",
        width: 100,
        height: 40,
        auto: true,
        fileSizeLimit: 1024 * 10,// KB
        buttonText: "选择附件",
        swf: '../plugins/uploadify/js/uploadify.swf',
        removeCompleted: false,
        removeTimeout: 0,
        itemTemplate: '<div id="${fileID}" class="uploadify-queue-item">\
            <a class="upload_bg upload_close_bg j-closeFile" href="javascript:;" data-instanceID="${instanceID}" data-fileID="${fileID}"></a>\
            <div class="upload_bg upload_other_bg ${suffix}_bg"></div>\
            <div class="fileName">${fileName} （${fileSize}）</div>\
            <div class="uploadify-progress">\
            <div class="uploadify-progress-bar"><!--Progress Bar--></div>\
            <div class="upload_data"><span class="data"></span></div>\
            </div>\
            </div>',
        //后台地址
        uploader: '../js/success.json',
        method: "post",
        onSelect: onSelect,
        onSelectError: onSelectError,
        onUploadStart: onUploadStart,
        onUploadError: onUploadError,
        onUploadSuccess: onUploadSuccess,
        onQueueComplete: onQueueComplete
    });


    function onSelect() {
        //_upload_none_box.hide();
        _queueBox.find('.j-closeFile').unbind('click');
        _queueBox.find('.j-closeFile').bind('click', function(){

            onCloseFile($(this).attr('data-instanceID'), $(this).attr('data-fileID'));
        });
    }

    function onSelectError() {
        //notUploadQueue(this);
    }

    function onUploadStart() {

    }

    function onUploadError(file, errorCode, errorMsg, errorString) {
        alert('The file ' + file.name + ' could not be uploaded: ' + errorString);
    }

    function onUploadSuccess(file, data, response) {
        var _html = $('#'+file.id).html();
        var $tpl = $('<div class="uploadify-queue-item">'+ _html +'</div>');
        $tpl.find('.uploadify-progress').remove();

        $tpl.on('mouseenter', function(){
            $(this).addClass('active');
        });
        $tpl.on('mouseleave', function(){
            $(this).removeClass('active');
        });

        $tpl.find('.j-closeFile').on('click', function(){
            // do something
            ajaxRemoveFile($(this));
        });

        aSuccessItem.push($tpl);
        //console.log(file);
        //alert('The file ' + file.name + ' was successfully uploaded with a response of ' + response + ':' + data);
    }

    function onQueueComplete(queueData) {
        //layer.closeAll();
        //alert(queueData.uploadsSuccessful + ' files were successfully uploaded.');
    }

    function onCloseFile(instanceID, fileID) {

        layer.confirm('<div class="dialog_content"><i class="upload_bg upload_gt_bg"></i>亲，你真要删掉我吗？</div>', {
            skin: "dialog_layer",
            closeBtn: 0, //不显示关闭按钮
            shade: 0,
            title: "删除提示",
            area: ['567px', '211px'],
            btn: ['确定', '取消'] //按钮
        }, function (index) {
            _file_upload.uploadify('cancel', fileID);
            //notUploadQueue();

            for(var i=0;i<aSuccessItem.length;i++){
                if($(aSuccessItem[i]).find('.j-closeFile').attr('data-fileid') == fileID){
                    aSuccessItem.splice(i, 1);
                }
            }

            layer.close(index);
        }, function (index) {
            layer.close(index);
        });

    }

    _queueBox.on("mouseenter", ".uploadify-queue-item", function () {
        $(this).addClass("active");
    });

    _queueBox.on("mouseleave", ".uploadify-queue-item", function () {
        $(this).removeClass("active");
    });

    //function notUploadQueue(uploadify) {
    //    if (uploadify) {
    //        if (uploadify.queueData.filesQueued != 0) {
    //            _upload_none_box.hide();
    //        } else {
    //            _upload_none_box.show();
    //        }
    //    } else {
    //        if ($("#queue .uploadify-queue-item").length) {
    //            _upload_none_box.hide();
    //        } else {
    //            _upload_none_box.show();
    //        }
    //    }
    //
    //}

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


function ajaxRemoveFile(obj){

    var $this = $(obj);
    var $children = $this.parents('.queue').children();
    var $nofile = $this.parents('.m-uploadFile').find('.nofile');

    $this.parents('.uploadify-queue-item').remove();
    alert('ajax 删除文件');
    if($children.length == 1){
        $nofile.show();
    }
}