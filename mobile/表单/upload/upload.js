(function($) {
  /**
 * @fileOverview 无线web端文件异步上传(支持android 2.2+,ios6+)
 * @author mxc
 * @mail   maxingchi@baidu.com
 * @version 0.1
 **/

function MFileUploader(option){
    this.fileEl = option.fileEl; //input element
    this.formEl = option.formEl||null; //option,needed if you want to use the uploader with andorid 3-
    this.action = option.action; //server url
    this.uploadEl = option.uploadEl;

    this.onFileSelect = option.onFileSelect;

    this.onFileUpload = option.onFileUpload;
    this.onFileUploading = option.onFileUploading;
    this.onFileUpLoaded = option.onFileUpLoaded;
    this.onFileUpLoadEnd = option.onFileUpLoadEnd;

    this.file = null;
    this._init();
}

MFileUploader._IRAMEURL = "upload_iframe";

//three class methods,format the size and speed to friendly value (codes from huangwei)
MFileUploader.formatUnits = function(baseNumber, unitDivisors, unitLabels, singleFractional) {
    var i, unit, unitDivisor, unitLabel;

    if (baseNumber === 0) {
        return "0 " + unitLabels[unitLabels.length - 1];
    }
    
    if (singleFractional) {
        unit = baseNumber;
        unitLabel = unitLabels.length >= unitDivisors.length ? unitLabels[unitDivisors.length - 1] : "";
        for (i = 0; i < unitDivisors.length; i++) {
            if (baseNumber >= unitDivisors[i]) {
                unit = (baseNumber / unitDivisors[i]).toFixed(2);
                unitLabel = unitLabels.length >= i ? " " + unitLabels[i] : "";
                break;
            }
        }
        
        return unit + unitLabel;
    } else {
        var formattedStrings = [];
        var remainder = baseNumber;
        
        for (i = 0; i < unitDivisors.length; i++) {
            unitDivisor = unitDivisors[i];
            unitLabel = unitLabels.length > i ? " " + unitLabels[i] : "";
            
            unit = remainder / unitDivisor;
            if (i < unitDivisors.length -1) {
                unit = Math.floor(unit);
            } else {
                unit = unit.toFixed(2);
            }
            if (unit > 0) {
                remainder = remainder % unitDivisor;
                
                formattedStrings.push(unit + unitLabel);
            }
        }
        
        return formattedStrings.join(" ");
    }
};

MFileUploader.formatBytes = function (baseNumber) {
    var sizeUnits = [1073741824, 1048576, 1024, 1], sizeUnitLabels = ["GB", "MB", "KB", "bytes"];
    return this.formatUnits(baseNumber, sizeUnits, sizeUnitLabels, true);
};

MFileUploader.formatBytePerSeconds = function(baseNumber) {
    var bpsUnits = [1073741824, 1048576, 1024, 1], bpsUnitLabels = ["GB/s", "MB/s", "KB/s", "B/s"];
    return this.formatUnits(baseNumber / 8, bpsUnits, bpsUnitLabels, true);
};

MFileUploader.prototype = {
    _init:function(){
        this._initListener();
    },
    _initListener:function(){
        var _this = this;                
        this.fileEl.addEventListener("change",function(e){
            var files = e.target.files;
            // we need to check whether user just cancel the select
            if(!files.length){
                return;
            }
            _this.file = files[0];
            _this.onFileSelect&&_this.onFileSelect(_this.file);
        },false);

        this.uploadEl.addEventListener("click", function(e){        
            if(!_this.file) {
                return false;
            }
            _this.onFileUpload && _this.onFileUpload(_this.file);
            _this.upload();
        }, false);

    },
    getFileInfo:function(file){
        return {
            name:file.name,
            size:file.size,
            type:file.type,
            lastModifiedDate:file.lastModifiedDate
        };
    },
    _buildIframe:function(){
        var _this = this;
        _this.cancel();
        _this.iframe = document.createElement("iframe");
        _this.iframe.setAttribute("id", MFileUploader._IRAMEURL);
        _this.iframe.setAttribute("name", MFileUploader._IRAMEURL);
        _this.iframe.setAttribute("style", "display:none; width: 0; height: 0; border: none;");
        this.formEl.parentNode.appendChild(_this.iframe);

        var eventHandler = function () {
            _this.iframe.removeEventListener("load", eventHandler, false);
            _this.onFileUpLoaded && _this.onFileUpLoaded();
            _this.cancel();
        }
        _this.iframe.addEventListener("load", eventHandler, true);
    },
    //add by houpeng, face upload
    cancel: function() {
        var me = this;
        me.iframe && me.iframe.parentNode.removeChild(me.iframe);
        me.iframe = null;
    },
    _buildForm:function(){        
        if(!this.formEl){
            throw Error("you must assign a Form element when uploading with iframe(andorid 3-)");
        }
        console.log(this.action);
        
        this.formEl.setAttribute("target", MFileUploader._IRAMEURL);
        this.formEl.setAttribute("action", this.action);
        this.formEl.setAttribute("method", "post");
        this.formEl.setAttribute("enctype", "multipart/form-data");
        this.formEl.setAttribute("encoding", "multipart/form-data");
    },
    uploadWithXHR:function(){
        var _this = this,
            formData = new FormData(),
            xhr = new XMLHttpRequest(),
            upload = xhr.upload,
            lastProgress,
            lastTime;
        formData.append('file',this.file);
        
	upload.addEventListener("progress",function(e){
            if(e.lengthComputable){
                var position = e.position||e.loaded,
                    total = e.totalSize||e.total;

                //baidu browser bug...
                if(total==0||position==0){
                    return;
                }
                var prog = position/total,
                    nowTime = new Date().getTime();

                var speed = (_this.file.size)*(prog-lastProgress)/((nowTime-lastTime)/1000);
                speed = MFileUploader.formatBytePerSeconds(speed);

                _this.onFileUploading && _this.onFileUploading(prog, speed, e);
                lastProgress = prog;
                lastTime = nowTime;
            }
            else{
                throw Error('lengthComputable not support on progress event!');
            }
        },false);

        // error
        upload.addEventListener("load",function(){
            //The XMLHttpRequest's upload load event handler is set trigger the progress event with 100%(to ensure the progress indicator actually reaches 100%, in case of granularity quirks during the process)
            _this.onFileUpLoadEnd && _this.onFileUpLoadEnd();
        },false);

        upload.addEventListener("error",function(msg){
            _this.onFileUploadError && _this.onFileUploadError(msg);
        },false);
        
        xhr.addEventListener("load",function(){
            _this.onFileUpLoaded && _this.onFileUpLoaded(xhr.responseText);
        },false);

        xhr.open("post", this.action, true);
        xhr.setRequestHeader("Cache-Control", "no-cache");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("filename", this.file.name);
        xhr.send(this.file);

        // event after upload start
        this.onFileStartUpload && this.onFileStartUpload();
        lastProgress = 0;
        lastTime = new Date().getTime();
    },
    uploadWithIframe:function(){
        this._buildForm();
        this._buildIframe();
        this.formEl.submit();
        // this.onFileStartUpload&&this.onFileStartUpload();
    },
    //to do ... just an occassional solution
    upload:function(){
        if(window.FormData){
           return this.uploadWithXHR();
        }
        return this.uploadWithIframe();
    }
}

$.uploader = MFileUploader;

})(Zepto);
