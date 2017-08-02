//初始化suggestion
$('#searchipt').autocomplete({
    dropdownStyle: {width: "300px", top: "45px"},
    onkeyPress: function(val){
        var query = $.trim(val);
        if(query.length != 0) {
            $(".iptbox").addClass("del");
        }else {
            $(".iptbox").removeClass("del");                      
        }
    },
    onEnter: function(val){
        var query = $.trim(val);
        amap.fwd("/search?" + $.param({
            query : query
        }));
    },
    onFocus: function(val) {
        var query = $.trim(val);
        if(query.length != 0) {
            $(".iptbox").addClass("del");
        }  
    },
    onBlur: function() {
        setTimeout(function(){
            $(".iptbox").removeClass("del");
        }, 200);
    },
    openOnFocus: true,
    appendMethod: "replace",
    source:[
        function(word, add){                
            $.ajax({
                url: "http://pan.opendev.autonavi.com:3100/service/poiTips?city=110000&words=" + word,
                method: 'get',
                success: function(msg){
                    if(!msg.data || !msg.data.tip_list) {
                        return false;
                    }

                    var tips = msg.data.tip_list,
                        messArray = [];
                    for(var i = 0; i < tips.length; i++){
                        messArray.push(tips[i].tip);
                    }
                    add(messArray);
                }
            });
        }
    ]
}); 

// $("#searchipt").autocomplete( amap.poiTipsUrl, {
//     minChars: 1,
//     queryParamName: "words",
//     extraParams: {
//         city: 110000,
//         // output: "json",
//     },
//     remoteDataType: "json",
//     beforeUseConverter: function(){
//         return $.trim($("#searchipt").val());
//     },
//     processData: function(msg){
        
//         //判断是否有返回值
//         if (!msg.data || msg.data.tip_list.length == 0) {
//             return [];
//         };

//         //获取信息列表
//         var tips = msg.data.tip_list,
//             jsonList = [],
//             query = $.trim($("#searchipt").val());
            
//         for(var i = 0; i < tips.length; i++) {            
            
//             //将返回结果相同字符高亮
//             var tip = tips[i].tip,
//             tipTpl = tip.replace(query, "<b>" + query + "</b>");
//             jsonList.push([tipTpl]);
//         }
//         return jsonList;
//     },
//     onKeyPress: function(msg) {
//         var query = $.trim(msg.value);
//         if(query.length != 0) {
//             $(".iptbox .icon-del").show();
//         }else {
//             $(".iptbox .icon-del").hide();                      
//         }
//     }, 
//     onItemSelect: function(msg){
//         var query = $.trim(msg.value);
//         amap.fwd("/search?" + $.param({
//             query : query
//         }));

//     },
//     onEnter: function(msg){
//         var query = $.trim(msg.value);
//         amap.fwd("/search?" + $.param({
//             query : query
//         }));        
//     }
// });

//点击删除按钮,清空输入框、删除按钮消失
$(".iptbox em").click(function(){
    if($(this).parent().hasClass("del")){
        $("#searchipt").val("");
        $(this).parent().removeClass("del")        
        $("#searchipt").focus();
    }
});

$(window).load(function(){
    $("#searchipt").focus();
})