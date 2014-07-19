<link rel="stylesheet" href="../../reset.css">
<style>
	#topnav {
		background-color: #FAFAFA;
		position: relative;
		height: 46px;
	}
	#topnav span {
		width: 33%;
		position: relative;
		float: left;
		text-align: center;
		height: 46px;
		line-height: 46px;
	} 
	#topnav span.cur{
		color: #FF7900;
	}
	#topnav span:after {
		width: 100%;
		bottom: 0px;
		height: 3px;
		left: 0px;
		background-color: #D8D8D8;
		position: absolute;
		content: "";
	}
	#topnav span.cur:after{
		background-color: #FF7900;
	}
</style>
<nav id="topnav">
	<span class="cur" data-type="recommend">精品</span> 
	<span data-type="category" class="">分类</span> 
	<span data-type="rank" class="">排行</span>
</nav>