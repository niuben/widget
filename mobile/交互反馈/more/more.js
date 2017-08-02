exports.init = function(ajaxUrl, selector) {
	if( !selector ) selector = ".list";
	var listObj = $(selector),
		moreObj = $("#addMore"),
		unitNum = 20, //一次性请求的个数
		handler = 0;


	function initScroll(callback) {

		window.onscroll = function(){
			
	       	var bodyObj = document.documentElement || document.body,
			browseHeight = bodyObj.clientHeight || window.innerHeight,
			currentScrollTop = window.pageYOffset;
			pageHeight = bodyObj.scrollHeight;

		   if(pageHeight - ( browseHeight + currentScrollTop) < 100){		     
		   		clearTimeout(handler);
		    	handler = setTimeout(function() {
		    		callback();
		    	}, 500);

		  	}
		}
		
	}  

	initScroll(function(){
		
		moreObj.html("正在加载...");
		var startNum = listObj.find("li").length;
		$.ajax({
			url: ajaxUrl + "/" + startNum,
			method: "get",
			success: function(msg){
				msg = $(msg);	
				if(msg.children().length < unitNum) {
					$("#addMore").hide();
				}
				listObj.append(msg);
				moreObj.html("点击加载");
			} 
		});
	});

}