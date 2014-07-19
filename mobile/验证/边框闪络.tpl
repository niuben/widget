<textarea id="fbContent" placeholder="请留下您的宝贵意见"></textarea>
<script type="text/javascript">
	//输入框为空，则闪烁
	var fbContent = document.querySelector("#fbContent").value.replace(/(^\s*)|(\s*)/g, "");
	if(!fbContent.length){
        var fbContentObj = document.querySelector("#fbContent");
        var i = 0;
        var handler = setInterval(function(){
            var borderColor = i % 2 == 0 ? "#f00" : "#b3b3b3";
            fbContentObj.style.borderColor = borderColor;
            i++;
            if(i > 5) clearInterval(handler);
        }, 300);
        return;
	}
</script>