$(function(){
		
		var htabIdx=0;
		var htabLiIdx=0;
		var htabIndex=0;
		var htabLiIndex=0;
		if(htabIndex!=false){
			htabIdx=parseInt(htabIndex);
		}
		if(htabLiIndex!=false){
			htabLiIdx=parseInt(htabLiIndex);
		}
		$(".tab_bar_content >ul").filter(':eq('+htabIdx+')').show();
		$(".tab_bar li a").filter(':eq('+htabIdx+')').addClass("current");
		$(".tab_bar_content li a").filter(':eq('+htabLiIdx+')').addClass("current");
		$(".tab_bar li a").each(function(i){//点击横向主tab
			$(this).click(function(){
				$(".tab_bar li a").removeClass("current");
				$(this).addClass("current");
				$(".tab_bar_content >ul").hide();
				$(".tab_bar_content >ul").eq(i).show();
			})
		})
		$(".tab_bar_content li a").each(function(i){//点击tab下的横向子栏目
			$(this).click(function(){
				$(".tab_bar_content li a").removeClass("current");
				$(this).addClass("current");
				jQuery.jCookie('htabLiIndex',i.toString());
			})
		})
	})