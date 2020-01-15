import BaseClass from "../baseclass";
export default class Rule extends BaseClass{
    constructor(props) {
        super(props);

        this.checked = false;
        this.isUploadImg = false;
        this.init();
    }    
    init(){
        $(".checkbox").click(()=>{            
            this.updateData({
                checked: !this.checked
            });
        });
    
        $(".rule-down button").click(()=>{
            if(this.isUploadImg && this.checked){
                this.triggle("submit");                
            }
        });
    }
    render(){
        this.checked ? $(".checkbox").addClass("checkbox-active") : $(".checkbox").removeClass("checkbox-active");
        this.isUploadImg && this.checked ? $(".rule-down button").addClass("green-btn") : $(".rule-down button").removeClass("green-btn");
    }
    
}