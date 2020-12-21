function createEmbeddedObj(){
    let obj = {
        parent: createHtmlElm("div"),
        object: document.createElement("object"),
        divText: document.createElement("div"),
        embed: document.createElement("embed"),
        setUpEmbeded(src,width,height){
            this.object.appendChild(this.embed);
            this.embed.src = src;
            this.embed.width = width;
            this.embed.height = height;
            return this;
        },
        setUpDiv(text){
            this.parent.appendChild(this.divText);
            this.parent.appendChild(this.object);
            this.object.appendChild(this.embed);
            this.divText.innerHTML = text;
            this.divText.style.position = "absolute";
            this.divText.style.top = -20;
            this.parent.style.border = "solid black 5px";
            return this;
        },
    };
    return obj;
}

class EmbeddedMap{
    constructor(src,width,height,text){
        this.dataTag = embededDataList;
        this.showTags = showTags;
        this.embedObj = new createEmbeddedObj().setUpEmbeded(src,width,height).setUpDiv(text);
        this.dataRef = embedDataRef;
        
    };
    addToDataList(option){
        this.dataTag.addOption(option);
        this.embedObj.parent.classList.add(option);
        return this;
    };
    submitTag(option){
        this.addToDataList(option);
        this.embedObj.parent.style.display = "none";
        this.dataTag.submit.addEventListener("mousedown",(e)=>{
            let embededDiv = document.querySelector("." + this.dataTag.search.value);
            body.appendChild(embededDiv);
            embededDiv.classList.add("embed");
            embededDiv.style.left = e.pageX - 300;
            embededDiv.style.top = e.pageY + 100;
            this.embedObj.parent.style.display = "block";
        });
        return this;
    };
    modifyText(symbol){
        this.embedObj.divText.innerHTML = `<${symbol}>${this.embedObj.divText.innerHTML}</${symbol}>`;
        return this;
    };
    moveTextUp(top){
        this.embedObj.divText.style.top = htmlNumberValue(this.embedObj.divText,"top") + top;
        return this;
    }


}
function embedContext(){
    let obj = {
        menu: new ContextSubClass("embed").activateSubMenu().convertToContext(["drag","resize","remove"]),
        blueHover(){
            let target;
            window.addEventListener("mouseover",(e)=>{
                if(e.target.classList.contains(this.menu.generalClass)){
                    target = e.target;
                    target.style.borderColor = "blue";
                }
            });
            window.addEventListener("mouseout",()=>{
                //target.classList.remove("blueBorder");
                if(target !== undefined){
                    target.style.borderColor = "black";
                }
                
            });
            return this;
            
        },
        dragTag(){
            dragElm(this.menu);
            let target;
            let drag = this.menu.drag;
            drag.addEventListener("click",()=>{
                target = document.querySelector('.specific');
                target.addEventListener("mouseup",()=>{
                    embedDataRef.child(target.getAttribute("dataKey")).update({
                        left: htmlNumberValue(target,"left"),
                        top: htmlNumberValue(target,"top"),
                    });
                })
            })
            return this;
        },
        removeTag(){
            let target;
            this.menu.remove.addEventListener("click",()=>{
            target = document.querySelector(".specific");
            //target.remove();
            target.style.display = "none";
            embedDataRef.child(target.getAttribute("dataKey")).remove();
            })
            return this;
        },
        resizeTag(){
            let target;
            this.menu.resize.addEventListener("click",()=>{
                if(this.menu.resize.innerHTML !== "stop resize"){
                    this.menu.resize.innerHTML = "stop resize";
                    target = document.querySelector(".specific");
                    target.style.overflow = "auto";
                    target.style.resize = "both";
                }
                else{
                    this.menu.resize.innerHTML = "resize";
                    target.style.resize = "";
                }
                target.addEventListener("mouseup",()=>{
                    embedDataRef.child(target.getAttribute("dataKey")).update({
                       width: htmlNumberValue(target,"width"),
                       height: htmlNumberValue(target,"height"),

                    });
                    [...target.children][1].firstChild.setAttribute("width",htmlNumberValue(target,"width"));
                    [...target.children][1].firstChild.setAttribute("height",htmlNumberValue(target,"height"));

                });
                
            })
            return this;
        }


    }
    return obj;
}

function saveTag({submit,search},ref){
    submit.addEventListener("click",()=>{
    
        let elm = document.querySelectorAll("." + "embed")[document.querySelectorAll(".embed").length -1];
        let obj = {
            textName: [...elm.children][0].innerHTML,
            src: [...elm.children][1].firstChild.getAttribute("src"),
             width: [...elm.children][1].firstChild.getAttribute("width"),
             height: [...elm.children][1].firstChild.getAttribute("height"),
             top: htmlNumberValue(elm,"top"),
             left: htmlNumberValue(elm,"left"),
             
        }
        ref.push(obj);

        ref.once("value",(e)=>{
            let keys = Object.keys(e.val());
            elm.setAttribute("dataKey",keys[keys.length-1]);
            embedDataRef.child(elm.getAttribute("dataKey")).update({
                dataKey: elm.getAttribute("dataKey"),
            })
        })

     });
    ref.once('value',(e)=>{
        if(e.val() !== null){
            let values = Object.values(e.val());
            let keys = Object.keys(e.val());
            values.forEach((ele)=>{
            let elm = createEmbeddedObj();
            elm.setUpEmbeded(ele.src,ele.width,ele.height)
            .setUpDiv(ele.textName);
            elm.parent.setAttribute("dataKey",ele.dataKey);
            elm.parent.style.left = ele.left;
            elm.parent.style.top = ele.top;
            elm.parent.classList.add("embed");
        })
        }
        
    })
}




let embededDataList = createDataListObj().setUpDataId("embededList");
let showTags = mainContext.addContext("showTags");
let embedDataRef = database.ref("embedData");
saveTag(embededDataList,embedDataRef);

let searchTags = mainContext.addContext("searchTags");

// this is where I create searchTag context option so I could look up the embed source I created from show tags
let embedSearchList = createDataListObj();
embedSearchList.search.setAttribute("list",embededDataList.datalist.id);

searchTags.addEventListener("click",(e)=>{
    embedSearchList.parent.style.display = "block";
    embedSearchList.parent.style.left = e.pageX;
    embedSearchList.parent.style.top = e.pageY;
});
embedSearchList.submit.addEventListener("click",()=>{
    let embedDiv = document.querySelector("." + embedSearchList.search.value);
    embedDiv.scrollIntoView(false);
});
embedSearchList.exit.addEventListener("click",()=>{
    embedSearchList.parent.style.display = "none";
})

// this is where I add options 
let embededContextMenu = new ContextSubClass("embededTag").activateSubMenu()
.convertToContext(["drag"])
.classifyElm(embededDataList.parent)
.classifyElm(embedSearchList.parent)

// so I could drag the embed source
dragElm(embededContextMenu);

// this is where I add embed sub context
let embedContexter = embedContext().dragTag().blueHover().removeTag().resizeTag();

// this is where I create Show tags options
showTags.addEventListener("click",(e)=>{
    embededDataList.parent.style.display = "block";
    embededDataList.parent.style.left = e.pageX;
    embededDataList.parent.style.top = e.pageY;
});
embededDataList.exit.addEventListener("click",()=>{
    embededDataList.parent.style.display = "none";

})



