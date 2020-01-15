export default class BaseClass{
    constructor(props){

    }
    on(eventName, func){
        if(this.events == undefined){
            this.events = {};
        }

        if(this.events[eventName] == undefined){
            this.events[eventName] = [];
        }
        this.events[eventName].push(func);
    }
    triggle(eventName, data){
        this.events && this.events[eventName] && this.events[eventName].map((func, index)=>{
            typeof func == "function"  && func(data);
        })
    }
    updateData(data){
        for (const key in data) {
            if (data.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                this[key] = data[key];                                
            }
        }
        this.triggle("updateData", data);
        this.render();
    }
    getData(){
        return this;
    }
}