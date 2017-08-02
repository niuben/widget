  function Confirm(options){
    this.id = options.id;
    this.title = options.title;

    this.maskClassName = options.maskClassName || "mask";
    this.closeClassName = options.closeClassName || "confirm-close";

    this.okTitle = options.okTitle || null;
    this.cancelTitle = options.cancelTitle || null;

    this.cancelCallback = options.cancelCallback || function() {};
    this.okCallback = options.okCallback || function(){};

    this.init();
  }

  Confirm.prototype = {

    init: function(){
      this.box = document.querySelector("#" + this.id);
      this.body = document.querySelector(".confirm-body");
      this.foot = document.querySelector(".confirm-foot");


      this.cancel = this.box.querySelector(".confirm-cancel");
      this.ok = this.box.querySelector(".confirm-ok");

      this.close = document.querySelector("." + this.closeClassName);
      this.mask = document.querySelector("." + this.maskClassName);
      
      this.body.innerHTML = this.title;
      
      if( this.okTitle != null ) {
        this.ok.innerHTML = this.okTitle;
      }

      if( this.cancelTitle != null) {
         this.cancel.innerHTML = this.cancelTitle;
      } 


      var that = this;
      this.mask.addEventListener("click", function(){
        that.cancelCallback && that.cancelCallback();
        that.hide();
      });

      this.close.addEventListener("click", function(){
        that.cancelCallback && that.cancelCallback();
        that.hide();
      });
      
      this.cancel.addEventListener("click", function(){
        that.cancelCallback && that.cancelCallback();
        that.hide();
      });

      this.ok.addEventListener("click", function(){
        that.okCallback && that.okCallback();
        that.hide();
      });

      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function (){
          that.setPosition();
      });

      // this.show();
      this.setPosition();    

    },
    alert: function(title, okCallback){
      document.querySelector(".confirm-foot").className = "confirm-foot alert-foot";
      this.show(title, okCallback);
    },
    confirm: function(title, okCallback, cancelCallback){
      document.querySelector(".confirm-foot").className = "confirm-foot";
      this.show(title, okCallback, cancelCallback);
    },
    show: function(title, okCallback, cancelCallback){
      
      var _height = document.body.scrollHeight;
      this.mask.style.display = "block";
      this.mask.style.height = _height + "px";
      
      this.box.style.display = "block";
      this.setPosition();

      this.addEvents();

      if(title) {
        this.body.innerHTML = title;
      }

      if(okCallback) {
        this.okCallback = okCallback;        
      }

      if(cancelCallback) {
        this.cancelCallback= cancelCallback;           
      }
    },

    hide: function(){
      this.mask.style.display = "none";
      this.box.style.display = "none";

      this.removeEvents();
    },
    addEvents: function() {
        document.addEventListener("touchmove", this.touchHandler, true);        
    },
    removeEvents: function() {
        document.removeEventListener("touchmove", this.touchHandler, true);
    },
    touchHandler: function(e) {
        e.preventDefault();
        return false;
    },
    scrollHandler: function(e) {
        e.preventDefault();
        return false;
    },
    setPosition: function(){      
      var top = (window.innerHeight - this.box.offsetHeight) /2;
      var left = (window.innerWidth - this.box.offsetWidth) /2;
      this.box.style.top = top + "px";
      this.box.style.left = left + "px";
    }
  };

