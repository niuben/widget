exports.init = function () {
	$(".filter").on("tap", function(){
		$(".filterMenu").toggleClass("show");
	});
};