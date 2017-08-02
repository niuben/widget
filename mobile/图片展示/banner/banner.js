exports.init = function() {

	if(navigator.userAgent.indexOf("iPhone") != -1 ) {
		// return false;
	}

	if(sessionStorage && sessionStorage.getItem("banner") != "0" ) {
		$(".banner, .bannerTop").show();

	}
	$(".banner .close").click(function(){
		var bannerObj = $(this).parent();
		sessionStorage && sessionStorage.setItem("banner", "0");
		bannerObj.remove();
		$(".bannerTop").remove();
	});
}