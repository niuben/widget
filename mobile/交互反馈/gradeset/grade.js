exports.init = function () {
	$("#gradeSet em").each(function(index){
		$(this).click(function(){
			$("#gradeSet em").addClass("empty");
			for(var i = 0; i <= index; i++){
				$("#gradeSet em").eq(i).removeClass("empty")
			}
			$("#gradeSet").data("level", index + 1);
		});
	});
};