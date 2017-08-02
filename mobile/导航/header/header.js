exports.init = function(){
	
	//获取当前页面
	var path = location.pathname,
		pageName = "";
	if( path.length == 0 ) {
		pageName = "index";
	}else {
		urlArray = path.split("/");
		pageName = urlArray[1];
	}


	/* 搜索页面。如果有query，将query赋值给输入框 */
	if(pageName == "search" && urlArray.length == 3){
		var query = decodeURIComponent(urlArray[2]); 
		$(".searchText input").val(query);	
	}

	/*
	* 当输入框获取焦点时，判断是否是搜索页面。
	* 如果不是搜索页，跳转到搜索页。
	* 如果是的话，输入框向下移到，防止配微信安全提示挡住
	*/
	$(".searchText input").focus(function(){
		if(pageName != "search") {
			location.href = "/search";
			return false;
		}
		$(".top").css("marginTop", "45px");
	});

	//当输入框失去焦点时，输入框恢复原样
	$(".searchText input").blur(function(){
		$(".top").css("marginTop", "0px");
	});


	//如果不是搜索页面，点击搜索按钮跳转回搜索页面
	$(".top .search").on("tap", function(){
		
		if(pageName != "search") {
			location.href = "/search";
			return false;
		}

		var query = $(".top .searchText input").val();
		if(query.length == 0 ) {
			location.href = '/search';
			return false;
		}

		query = encodeURIComponent(query);
		location.href = '/search/' + query;			
		
	});
}