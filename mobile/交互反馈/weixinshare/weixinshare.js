exports.init = function (seletor) {		
	$(".weixinshare").show();
	$(".weixinshare").on("tap", function(){
		$(this).hide();
	});
}  