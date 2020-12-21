function createOgContext(){
    let parent = createHtmlElm("div");
    let child = createHtmlElm("div");
    parent.classList.add("context-menu");
    child.classList.add("item");
    parent.appendChild(child);
    return parent;
};
createOgContext();
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

  




