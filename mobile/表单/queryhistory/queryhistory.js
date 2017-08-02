var queryHistory = {
	name: "query",
	init: function() {

		var query = this.get();
		if( query == null ) {
			return false;
		}
		
		//显示history query
		var queryArray = query.split("|"),
			tpl = "";
		for(var i = 0; i < queryArray.length; i++) {			
			tpl += '<li><a href="/search/' + encodeURIComponent(queryArray[i]) + '">' + queryArray[i] + '</a></li>';
		}
		$(".history-list").html(tpl);
		$(".history").show();

		//绑定删除按钮事件
		var _this = this;
		$(".history-delete").click( function() {
			if(confirm("确认要删除历史信息吗？")){
				_this.del();
				$(".history").hide();				
			}
		});

	},
	add: function (val) {
		var query = this.get();
		if(query == null) {
			this.set(val);
			return false;
		}

		//搜索过的query，
		if(query.indexOf(val) == -1) {
			query = val + "|" + query ;			
		}

		this.set(query);
	},
	set: function(val) {
		localStorage.setItem(this.name, val);	
	},
	get: function() {
		if(!localStorage) {
			return null;
		}
		return localStorage.getItem(this.name);
	},
	del: function() {
		localStorage.removeItem(this.name);
	}
}