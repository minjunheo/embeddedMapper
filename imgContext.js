class ImgClass{
    constructor(contextName,databaseName){
        this.context = mainContext.addContext(contextName);
        this.searchList = createDataListObj();
        this.dataRef = database.ref(databaseName);
    }
    setUp(dataId,className){
        this.searchList.setUpDataId(dataId);
        this.searchList.parent.addEventListener("mouseover",()=>{
            this.searchList.parent.style.borderColor = "blue";
        });
        this.searchList.parent.addEventListener("mouseout",()=>{
            this.searchList.parent.style.borderColor = "black";
        })
        this.context.addEventListener("click",(e)=>{
            this.searchList.parent.style.display = "block";
            this.searchList.parent.style.top = e.pageY;
            this.searchList.parent.style.left = e.pageX;
        });
        this.searchList.exit.addEventListener("click",()=>{
            this.searchList.parent.style.display = "none";
        });

        this.searchList.parent.classList.add(className);
        let imgContextMenu = new ContextSubClass(className).activateSubMenu()
        .convertToContext(["drag"]);
        
        dragElm(imgContextMenu);
        return this;
    }
    addImg(img){
        this.searchList.addOption(img);
        return this;
    }
    submitImg(imgClassName){
        this.searchList.submit.addEventListener("click",(e)=>{
            let parent = createHtmlElm("div");
            let img = createHtmlElm("img");
            parent.classList.add(imgClassName);
            parent.appendChild(img);
            img.setAttribute("src",this.searchList.search.value)
            parent.style.border = "solid black 5px";
            parent.style.left = e.pageX;
            parent.style.top = e.pageY + 100;
            parent.style.width = 200;
            parent.style.height = 150;
            
            img.style.width = htmlNumberValue(parent,"width");
            img.style.height = htmlNumberValue(parent,"height");
        });
        this.searchList.submit.addEventListener("click",()=>{
           let imgArr = document.querySelectorAll("." + imgClassName);
           let elm = imgArr[imgArr.length-1];
            let saveData = {
                left: htmlNumberValue(elm,"left"),
                top: htmlNumberValue(elm,"top"),
                width: htmlNumberValue(elm,"width"),
                height: htmlNumberValue(elm,"height"),
                class: elm.classList[0],
                src: [...elm.children][0].getAttribute("src"),

            }
            this.dataRef.push(saveData);
            this.dataRef.once("value",(e)=>{
                let keys = Object.keys(e.val());
                elm.setAttribute("dataKey",keys[keys.length -1]);
                elm.classList.add(elm.classList[0] + keys.length);
                this.dataRef.child(elm.getAttribute("dataKey")).update({
                    dataKey: elm.getAttribute("dataKey"),
                    uniqueClass: elm.classList[0] + keys.length,
               });
            })
        });
        this.dataRef.once('value',(e)=>{
            if(e.val() !== null){
                let values = Object.values(e.val());
                let keys = Object.keys(e.val());
                    values.forEach((ele)=>{
                    let elm = createHtmlElm("div");
                    let child = createHtmlElm("img");
                    elm.appendChild(child);
                    elm.style.width = ele.width;
                    elm.style.height = ele.height;
                    elm.style.left = ele.left;
                    elm.style.top = ele.top;
                    elm.classList.add(ele.class);
                    elm.classList.add(ele.uniqueClass);
                    elm.setAttribute("dataKey",ele.dataKey);
                    elm.style.border = "solid black 5px";
                    child.setAttribute("src",ele.src);

                    child.style.width = ele.width;
                    child.style.height = ele.height;
                    
                    })
            }
            
        });
        return this;

       
        
    }
    addSubContext(imgClassName){
        this.imgSubContext = new ContextSubClass(imgClassName).activateSubMenu()
        .convertToContext(["resize","drag","remove"])


        actionContext(imgClassName,this.imgSubContext,this.dataRef);

        let resizeImg = this.imgSubContext.addContext("resizeImg");
        resizeImg.addEventListener("click",()=>{
            let target = document.querySelector(".specific");
            if(resizeImg.innerHTML !== "stop resizing img"){
                resizeImg.innerHTML = "stop resizing img"; 
                
                target.style.resize = "both";
                target.style.overflow = "auto";
                target.addEventListener("mouseup",()=>{
                    let child = [...target.children][0];
                    
                    child.style.width = htmlNumberValue(target,"width");
                    child.style.height = htmlNumberValue(target,"height");
                    this.dataRef.child(target.getAttribute("dataKey")).update({
                        width: htmlNumberValue(target,"width"),
                        height: htmlNumberValue(target,"height"),
            
                    });

                })
            }
            else{
                resizeImg.innerHTML = "resize Img";
                target.style.resize = "";

            }
            
        })

        return this; 
    }
}
/*
let imgObj1 = new ImgClass("showProofImg","imgData1")
.setUp("imgDataList1","imgMenu1")
.addImg("/proofFolder/setBuilderImg1.PNG")
.submitImg("actualImg")
.addSubContext("actualImg")
*/


