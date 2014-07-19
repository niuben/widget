<link rel="stylesheet" href="popBox.css"/>
<link rel="stylesheet" href="../../reset.css"/>
<div id="feedbackBox"></div>
<div class="popBox" id="popBox">
  <div class="popBox-header clearfix">
    新增用户
    <div class="popBox-submit">提交</div>        
  </div>        
  <div class="popBox-content">      
    <form action="">      
      <p><textarea placeholder="请留下您的宝贵意见"></textarea></p>
      <p><input type="text" placeholder="QQ / Email: 方便我们及时给您回复"></p>
    </form>
  </div>
</div>
<div class="mask"></div>
<script type="text/javascript" src="popbox.js"></script>
<script type="text/javascript">
    var feedbackBox = new PopBox({
      id: "popBox",
      useMask: 1,
      // position: "left",
      maskClassName: "mask",
      autoClose: 1
    });

    feedbackBox.init();
    feedbackBox.show();
</script>
