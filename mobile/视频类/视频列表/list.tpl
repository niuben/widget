<link rel="stylesheet" href="../../../reset.css">
<style>
	.videoList {
		padding-right: 3px;
		min-height: 0;
		height: auto;
		overflow: hidden;
	}
	.videoList li{
		border-right: none;
		overflow: hidden;
		float: left;
		position: relative;
		width: 33.333333333%;
		border: none;
		border-right: 1px solid #222;
		box-sizing: border-box;
		-webkit-box-sizing: border-box;
	}
	.videoList li img {
		background: rgba(0, 0, 0, 0.4);
		max-height: 200px;
		float: left;
		width: 100%;
	}
	.videoList li em {
		background-color: rgba(0, 0, 0, 0.4);
		background-size: 42px 42px;
		background-position: center center;
		background-repeat: no-repeat;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 3px;
	}
	.icon_video, #searchDisp #videoAd a.icon_video {
		background-image: url(data:image/png;base64,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);
	}
</style>
<ul class="videoList queryList">
	<li class="query_video_item" style="width:50%">
		<img src="http://a.hiphotos.baidu.com/video/pic/item/6f061d950a7b02084b28fa5a60d9f2d3562cc8ac.jpg">
			<em class="icon_video"></em>
	</li>
	<li class="query_video_item" style="width:50%">
		<img src="http://f.hiphotos.baidu.com/video/pic/item/37d3d539b6003af3cd498add372ac65c1138b698.jpg">
		<em class="icon_video"></em>
	</li>
</ul>