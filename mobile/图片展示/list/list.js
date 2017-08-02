exports.init = function (argument) {
	$(".app-list li a").click(function(e){
		e.preventDefault();
		var id = $(this).parent().attr("id"),
			isAdd = 1,
			url = $(this).attr("href");

		if(url.indexOf("http://") == -1) {
			return false;
		}

		//判断原来是否阅读过，如果阅读过则不在请求
		if(window.localStorage){
			if(localStorage.getItem(id) == "true") {
				isAdd = 0;
			}else{
				localStorage.setItem(id, true);
			}			
		};

		//如果原来没有阅读过则阅读量加一
		if(isAdd){
			$.ajax({
				url: "http://localhost/jianzhi/xinxizhanshi/manage/service/add.php",
				method: "get",
				dataType: "jsonp",
				data: "id=" + id,
				success: function (argument) {
					// alert("success");
					location.href = url; 
				}
			});
		}else {
			location.href = url; 
		}

			
	});
}