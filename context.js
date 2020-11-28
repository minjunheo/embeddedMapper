class ContextClass{
    constructor(items){
        this.menu = this.createContext();
        //this.convertToContext(items);
        
    }
    createContext(){
        let clone = document.querySelector(".context-menu").cloneNode(true);
        body.appendChild(clone);
        return clone;
    }
    addContext(contextName){
        let div = document.createElement("div");
        let i = document.createElement("i");
        this.menu.appendChild(div);
        div.appendChild(i);
        div.classList.add("item");
        i.classList.add(contextName);
        i.innerHTML = contextName;
        return div;
    }
    convertToContext(arr){
        arr.forEach((ele)=>{
            this[ele] = this.addContext(ele);
        });
        return this;
    }
    
    activateMenu(){
        window.addEventListener("contextmenu", (e) => {

            e.preventDefault();
            body.appendChild(this.menu);
            this.menu.classList.add("active");
            this.menu.style.position = "absolute";
            this.menu.style.top = e.pageY - 20;
            this.menu.style.left = e.pageX + 20;
        
        });
        window.addEventListener("click", () => {
            this.menu.classList.remove("active");
        });
        return this;
    };

    
}
const mainContext = new ContextClass()
.activateMenu();

class ContextSubClass extends ContextClass{
    constructor(generalClass){
        super();
        this.generalClass = generalClass;
    }
    activateSubMenu(){
        let target;
        window.addEventListener("contextmenu",(e)=>{
            if(e.target.classList.contains(this.generalClass)){
                mainContext.menu.style.display = "none";
                this.activateMenu();
                target = e.target;
                target.classList.add("specific");
                this.menu.style.display = "block";
            }
            else{
                this.menu.style.display = "none";
            }
           
        });
        window.addEventListener("click",()=>{
            mainContext.menu.style.display = "block";
            if(target !== undefined){
                target.classList.remove("specific");
            }
            
        });
        return this;
    }
    classifyElm(elm){
        elm.classList.add(this.generalClass);
        return this;
    }
}

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
function createDataListObj(){
    let obj = {
        parent: createHtmlElm("div"),
        search: document.createElement("input"),
       datalist: createHtmlElm("datalist"),
       submit: document.createElement("button"),
       exit: document.createElement("button"),
        setUpDataId(id){
            
            this.datalist.id = id;
            this.search.setAttribute("list",id);
            return this;
        },
        addOption(value,text){
            let option = document.createElement("option");
            this.datalist.appendChild(option);
            option.value = value;
            //option.id = value;
            option.innerHTML = text || value;
            return this;
        },
    }
    obj.parent.style.width = 200;
    obj.parent.style.height = 100;
    obj.parent.style.border = "solid black 5px"
    obj.parent.appendChild(obj.search);
    obj.parent.appendChild(obj.submit);
    obj.parent.appendChild(obj.exit);

    obj.submit.innerHTML = "submit";
    obj.exit.innerHTML = "exit";
    toggleColor(obj.parent,"borderColor","blue");
    return obj;
}

function dragElm({drag}){
    let target;
    drag.addEventListener("click",()=>{
        if(drag.innerHTML !== "stop drag"){
            drag.innerHTML = "stop drag";
            target = document.querySelector(".specific");
            dragElement(target);
            target.style.cursor = "move";
        }
        else{
            drag.innerHTML = "drag";
            target.style.cursor = "auto";
            dragElement(target,null);

        }
    })
}

let embededDataList = createDataListObj().setUpDataId("embededList");
let showTags = mainContext.addContext("showTags");

class EmbeddedMap{
    constructor(src,width,height,text){
        this.dataTag = embededDataList;
        this.showTags = showTags;
        this.embedObj = new createEmbeddedObj().setUpEmbeded(src,width,height).setUpDiv(text);
        this.showAndHideDataTag();
    };
    addToDataList(option){
        this.dataTag.addOption(option);
        this.embedObj.parent.classList.add(option);
        return this;
    };
    showAndHideDataTag(){
        this.showTags.addEventListener("click",(e)=>{
            this.dataTag.parent.style.display = "block";
            this.dataTag.parent.style.left = e.pageX;
            this.dataTag.parent.style.top = e.pageY;
        });
        this.dataTag.exit.addEventListener("click",()=>{
            this.dataTag.parent.style.display = "none";

        })

        return this;
    };
    submitTag(option){
        this.addToDataList(option)
        this.dataTag.submit.addEventListener("click",(e)=>{
            let embededDiv = document.querySelector("." + embedder.dataTag.search.value);
            embededDiv.style.left = e.pageX - 300;
            embededDiv.style.top = e.pageY + 100;
        });
        return this;
    };

}
let embededContextMenu = new ContextSubClass("embededTag").activateSubMenu()
.convertToContext(["drag"])
.classifyElm(embededDataList.parent);
dragElm(embededContextMenu);

let embedder = new EmbeddedMap("proofFolder/set.html",500,500,"dooder");
embedder.submitTag("set");


let embedder2 = new EmbeddedMap("proofFolder/asser.html",300,300,"asser");
embedder2.submitTag("set2");



