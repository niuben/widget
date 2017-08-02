exports.init = function () {
	
	$(".icon-list").on("tap", function(e){
		$(".menutip").toggle();
	});

	$(".menutip, .icon-list").on("tap", function(e){
		e.stopPropagation();
	});
	
	$("iframe").on("tap", function(){
		var display = $(".menutip").css("display");
		if(display == "block") {
			$(".menutip").toggle();
		}
	})

	//不适用tap的原因是，preventDefault方法无法阻止后面click事件触发。
	document.querySelector(".icon-share").addEventListener("touchstart", function(e){
		e.preventDefault();

		if(navigator.userAgent.indexOf("iPhone") != -1 ) {
			require.async("index:widget/weixinshare/weixinshare.js", function(weixinshare) {
				weixinshare.init();
			});
		}else {
			require.async("index:widget/confirm/confirm.js", function(Confirm) {
                var _confirm = new Confirm.Confirm({
                    id: "confirmBox",
                    okTitle: "app下载",
                });

                _confirm.alert(
                    "保证您能更好的体验“满满”，请下载app客户端来进行分享",
                    function(){
                        location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.coolsoft.lightapp";                
                    }
                );
			});
		}
	});
};