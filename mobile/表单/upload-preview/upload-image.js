import BaseClass from "../baseclass";
export default class UploadImage extends BaseClass{
    constructor(props){
        super(props);
        this.width = 0;
        this.height = 0;
        this.src = null;

        this.init();
    }    
    init(){    
        $("#photo-input").change((e)=>{    
            if(!window.FileReader){
                return;
            }
            var file = e.target.files[0];        
            var fileReader = new FileReader();
            fileReader.onload = function(e){
                var result = e.target.result;
                $("#photo-preview").attr("src", result);
            }
            fileReader.readAsDataURL(file);
        })
        // 图片展示
        $("#photo-preview").load((e)=>{
            var {width, height} = e.target;
            
            this.updateData({
                width,
                height,
                src: e.target.src
            });                        
        });
        
        $(".photo-preview-delete").click(()=>{            
            this.updateData({
                width: null,
                height: null,
                src: null
            });            
        });
    }
    render(){
        this.src != null ? $(".photo-preview").show() : $(".photo-preview").hide();
    }
}