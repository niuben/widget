import loadjs from "loadjs";
import BaseClass from "../baseclass";

export default class RangeSlider extends BaseClass{
    constructor(props){
        super(props);

        this.likes = 1;
        this.init();
    }    
    init(){
        loadjs(["https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/css/ion.rangeSlider.min.css", "https://cdnjs.cloudflare.com/ajax/libs/ion-rangeslider/2.3.1/js/ion.rangeSlider.min.js"], "rangeload");
        loadjs.ready("rangeload", ()=>{
            $(".js-range-slider").ionRangeSlider({
                min: 1,
                max: 100,
                from: this.likes,
                to: 120,
                hide_min_max: true,
                skin: "big",
                onChange: (obj)=>{
                    // store.dispatch(setLikes(obj.from));
                    this.updateData({
                        likes: obj.from
                    });                    
                }
            });
        })
    }
    render(){
        $("#likes").text(this.likes);
    }    
}
