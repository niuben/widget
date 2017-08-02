(function(){

  function PopBox(options){
    this.id = options.id;
    this.useMask = options.useMask;
    this.closeClassName = options.closeClassName;
    this.maskClassName = options.maskClassName;
    this.position = options.position || "centre";
    this.animate = options.animate || "none"; //slider, fade 
    this.speed = options.speed || 0;
  }

  PopBox.prototype = {

    init: function(){
      this.popBox = document.querySelector("#" + this.id);
      this.close = this.popBox.querySelector("." + this.closeClassName);
      this.mask = document.querySelector("." + this.maskClassName);
      this.setPosition();
      var that = this;
      this.mask.addEventListener("click", function(){
        that.hide();
      });
      // this.close.addEventListener("click", function(){
      //   that.hide();
      // });
    },

    show: function(){
      this.popBox.style.display = "block";
      this.mask.style.display = "block";
      this.setPosition();
    },

    hide: function(){
      this.popBox.style.display = "none";
      this.mask.style.display = "none";
    },

    setPosition:function(){
      switch(this.position){        
        case "left": 
          this.popBox.style.bottom = "0px";
          this.popBox.style.left = "0px";
        break;
        case "right":
          this.popBox.style.bottom = "0px";
          this.popBox.style.right = "0px";
        break;
        default:
          case "centre":
          var top=(window.innerHeight - this.popBox.offsetHeight) /2;
          var left=(window.innerWidth - this.popBox.offsetWidth) /2;      
          this.popBox.style.top = top + "px";
          this.popBox.style.left = left + "px";
        break;
      }  
    }

  };
  window.PopBox = PopBox;
})();
