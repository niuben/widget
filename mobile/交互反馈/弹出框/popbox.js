(function(){

  function PopBox(options){
    this.id = options.id;
    this.useMask = options.useMask;
    this.closeClassName = options.closeClassName;
    this.maskClassName = options.maskClassName;
    this.autoClose = options.autoClose || 0; 
  }

  PopBox.prototype = {

    init: function(){
      this.box = document.querySelector("#" + this.id);
      this.close = this.box.querySelector("." + this.closeClassName);
      this.mask = document.querySelector("." + this.maskClassName);
      this.setPosition();
      var that = this;
      this.mask.addEventListener("click", function(){
        that.hide();
      });
      
      window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function (){
        that.setPosition();
      });
    },

    show: function(){
      var that = this;
      if(this.useMask){
        this.mask.style.display = "block";
      };

      //自动关闭
      if(this.autoClose){
        setTimeout(function(){
          that.hide();
        }, 3000);
        // setTimeout(this.hide, 3000);
      };

      this.box.style.display = "block";
      this.setPosition();      
    },

    hide: function(){
      if(this.useMask){
        this.mask.style.display = "none";
      }
      this.box.style.display = "none";
    },

    setPosition:function(){      
      var top=(window.innerHeight - this.box.offsetHeight) /2;
      var left=(window.innerWidth - this.box.offsetWidth) /2;
      this.box.style.top = top + "px";
      this.box.style.left = left + "px";
    }

  };
  window.PopBox = PopBox;
})();
