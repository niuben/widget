/*
    Add by zhangyao
 */
(function() {
    function Ad(options) {
        var me = this;
        //调起统一处理class

        me.container = options.container;
        /*广告是否可关闭*/
        me.enableclose = options.enableclose || false;

        /*是否记录关闭状态，如果为true，通过localStorage、cookie记录关闭状态，用户再次访问时不展示广告*/
        me.recordclose = options.recordclose || false;
        me.expire = options.expire || false;
        me.onclose = options.onclose || function() {};

        me.adHTMLTpl = '<a class="ad<%=pos%> adbody <%if(classname){%><%=classname%><%}%>" data-mon="<%=stat%>" href="<%=url%>"><img src="<%=iconurl%>" alt="<%=title%>" /><%if(enableclose){%><span class="adclosebtn"></span><%}%></a>';
        me.adID = options.data.pos;
        me.adStorageKey = "ad_" + me.adID;
        me.adClass = "ad" + me.adID;
        
        if(me.expire){
            me.adExpireStorageKey = "ad_" + me.adID + "_time"; 
        }
        me.classname = options.classname || "";
        me.stat = options.stat || "";
        if (me.isShow()) {
            me.render(options.data);
        } else {
            me.container.style.display = "none";
        }
    }
    Ad.prototype = {
        render: function(data) {
            var me = this;
            if (me.enableclose) {
                data.enableclose = true;
            } else {
                data.enableclose = false;
            }
            data.classname = me.classname;
            data.stat = me.stat + "&pos=" + data.pos;
            me.adHTMLStr = _.template(me.adHTMLTpl, data);
            me.pos = data.pos;

            me.container.appendChild($(me.adHTMLStr)[0]);
            me.container.style.display = "block";
            if (me.enableclose) {
                //add closebtn event
                var adCloseBtn = $("." + me.adClass + " " + ".adclosebtn")[0];
                adCloseBtn.addEventListener("click", function(e) {
                    me.close();
                    e.preventDefault();
                    e.stopPropagation();
                }, false);
            }
        },

        close: function() {
            var me = this;
            me.container.style.display = "none";
            if (me.recordclose) {
                //set no ad
                bd.storage.set(me.adStorageKey, 1);
            }
            if(me.expire){
                me.setExpire();
            }
            me.onclose();
            bd.state.p1({
                pos: me.pos,
                adclose: 1
            });
            return false;
        },

        getAd: function() {
            var me = this,
                adClass = ".ad" + me.adID;
            return $(adClass);
        },

        isShow: function() {
            var me = this;
            if (me.recordclose && bd.storage.get(me.adStorageKey) &&(me.expire &&!me.checkIsExpire())) {
                return false;
            }
            return true;
        },

        setExpire: function(){
            bd.storage.set(this.adExpireStorageKey, this.getCurrentTime());
        },

        checkIsExpire: function(){
            var storageTime = bd.storage.get(this.adExpireStorageKey);
            if(!storageTime) return false;
            var currentTime = this.getCurrentTime();
            if((currentTime - parseInt(storageTime)) > (this.expire * 24 * 60 * 60 * 1000)){
                return true;
            }
            return false;
        },

        getCurrentTime: function(){
            return new Date().getTime();
        }
    };

    window.Ad = Ad;
})();
