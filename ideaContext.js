

class IdeaClass{
    constructor(contextName,databaseName,ideaClassName){
        this.context = mainContext.addContext(contextName);
        this.searchList = createDataListObj();

        this.showContext = mainContext.addContext("showIdea");
        this.showList = createDataListObj();
        this.dataRef = database.ref(databaseName);
        this.ideaClassName = ideaClassName;
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
        let ideaContextMenu = new ContextSubClass(className).activateSubMenu()
        .convertToContext(["drag"]);
        
        dragElm(ideaContextMenu);

        // showList setup
        this.showList.setUpDataId(dataId);
        this.showList.parent.addEventListener("mouseover",()=>{
            this.showList.parent.style.borderColor = "blue";
        });
        this.showList.parent.addEventListener("mouseout",()=>{
            this.showList.parent.style.borderColor = "black";
        })
        this.showContext.addEventListener("click",(e)=>{
            this.showList.parent.style.display = "block";
            this.showList.parent.style.top = e.pageY;
            this.showList.parent.style.left = e.pageX;
        });
        this.showList.exit.addEventListener("click",()=>{
            this.showList.parent.style.display = "none";
        });

        this.showList.parent.classList.add(className);
        let showContextMenu = new ContextSubClass(className).activateSubMenu()
        .convertToContext(["drag"]);
        
        dragElm(showContextMenu);


        return this;
    };
    addIdea(idea){
        this.searchList.addOption(idea);
        this.showList.addOption(idea);
        return this;
    };
    submitIdea(){
        this.searchList.submit.addEventListener("click",(e)=>{
            let idea = createHtmlElm("div");
            idea.classList.add(this.ideaClassName);
            
            idea.innerHTML = "<h3>" + this.searchList.search.value + "</h3>";
            
            idea.style.border = "solid black 5px";
            idea.style.left = e.pageX;
            idea.style.top = e.pageY + 100;

            idea.classList.add(this.searchList.search.value);
            idea.id = this.searchList.search.value;
        });

        this.searchList.submit.addEventListener("click",()=>{
            let ideaArr = document.querySelectorAll("." + this.ideaClassName);
            let elm = ideaArr[ideaArr.length-1];
             let saveData = {
                 left: htmlNumberValue(elm,"left"),
                 top: htmlNumberValue(elm,"top"),
                 text: elm.innerHTML,
                 class: elm.classList[0],
                 uniqueClass: elm.classList[1],
                 id: elm.id,
             }
             this.dataRef.push(saveData);
             this.dataRef.once("value",(e)=>{
                 let keys = Object.keys(e.val());
                 elm.setAttribute("dataKey",keys[keys.length -1]);
                 elm.classList.add(elm.classList[0] + keys.length);
                 this.dataRef.child(elm.getAttribute("dataKey")).update({
                     dataKey: elm.getAttribute("dataKey"),
                     uniqueClass2: elm.classList[0] + keys.length,
                });
             })
         });
         this.dataRef.once('value',(e)=>{
             if(e.val() !== null){
                 let values = Object.values(e.val());
                 let keys = Object.keys(e.val());
                     values.forEach((ele)=>{
                     let elm = createHtmlElm("div");
                     elm.style.left = ele.left;
                     elm.style.top = ele.top;
                     elm.classList.add(ele.class);
                     elm.classList.add(ele.uniqueClass);
                     elm.classList.add(ele.uniqueClass2);
                     elm.setAttribute("dataKey",ele.dataKey);
                     elm.style.border = "solid black 5px";
                     elm.innerHTML = ele.text;
                     elm.id = ele.id;
                     
                     })
             }
             
         });
         return this;
    }
    addSubContext(){
        this.ideaSubContext = new ContextSubClass(this.ideaClassName).activateSubMenu()
        .convertToContext(["resize","drag","remove"])


        actionContext(this.ideaClassName,this.ideaSubContext,this.dataRef);

        return this;
    }
    showIdea(){
        this.showList.submit.addEventListener("click",()=>{
            let elm = document.querySelector("#" + this.showList.search.value)
            document.querySelector("#" + this.showList.search.value).scrollIntoView(false);
            this.showList.parent.style.left = htmlNumberValue(elm,"left") - 50;
            this.showList.parent.style.top = htmlNumberValue(elm,"top") + 100;
        })
        return this;
    }
    
}

/*

const ideaClass = new IdeaClass("createIdea","ideaData","idea");
ideaClass
.setUp("ideaId","ideaSearchClassName")
.addIdea("dooder")
.submitIdea()
.addSubContext()
*/

class IdeaButtonClass{
    constructor(contextName,databaseName,ideaClassName){
        this.context = mainContext.addContext(contextName);
        this.searchList = createDataListObj();
        this.dataRef = database.ref(databaseName);
        this.ideaClassName = ideaClassName;
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
        let ideaContextMenu = new ContextSubClass(className).activateSubMenu()
        .convertToContext(["drag"]);
        
        dragElm(ideaContextMenu);

        return this;
    };
    submitIdea(){
        this.searchList.submit.addEventListener("click",(e)=>{
            let idea = createHtmlElm("button");
            idea.classList.add(this.ideaClassName);
            
            idea.innerHTML = this.searchList.search.value;
            
            idea.style.border = "solid black 2px";
            idea.style.left = e.pageX;
            idea.style.top = e.pageY + 100;

            idea.classList.add(this.searchList.search.value);

            idea.addEventListener("click",()=>{
                document.querySelector("#" + idea.innerHTML).scrollIntoView(false);
            })
        });

        this.searchList.submit.addEventListener("click",()=>{
            let ideaArr = document.querySelectorAll("." + this.ideaClassName);
            let elm = ideaArr[ideaArr.length-1];
             let saveData = {
                 left: htmlNumberValue(elm,"left"),
                 top: htmlNumberValue(elm,"top"),
                 text: elm.innerHTML,
                 class: elm.classList[0],
                 uniqueClass: elm.classList[1],
             }
             this.dataRef.push(saveData);
             this.dataRef.once("value",(e)=>{
                 let keys = Object.keys(e.val());
                 elm.setAttribute("dataKey",keys[keys.length -1]);
                 elm.classList.add(elm.classList[0] + keys.length);
                 this.dataRef.child(elm.getAttribute("dataKey")).update({
                     dataKey: elm.getAttribute("dataKey"),
                     uniqueClass2: elm.classList[0] + keys.length,
                });
             })
         });
         this.dataRef.once('value',(e)=>{
             if(e.val() !== null){
                 let values = Object.values(e.val());
                 let keys = Object.keys(e.val());
                     values.forEach((ele)=>{
                     let elm = createHtmlElm("button");
                     elm.style.left = ele.left;
                     elm.style.top = ele.top;
                     elm.classList.add(ele.class);
                     elm.classList.add(ele.uniqueClass);
                     elm.classList.add(ele.uniqueClass2);
                     elm.setAttribute("dataKey",ele.dataKey);
                     elm.innerHTML = ele.text;
                     elm.style.border = "solid black 2px";

                     elm.addEventListener("click",()=>{
                        document.querySelector("#" + elm.innerHTML).scrollIntoView(false);
                    })
                     
                     })
             }
             
         });
         return this;
    }
    addIdea(idea){
        this.searchList.addOption(idea);
        return this;
    };
    addSubContext(){
        this.ideaSubContext = new ContextSubClass(this.ideaClassName).activateSubMenu()
        .convertToContext(["resize","drag","remove"])


        actionContext(this.ideaClassName,this.ideaSubContext,this.dataRef);

        return this;
    }

}

const ideaButton = new IdeaButtonClass("createIdeaButton","ideaBtnData","ideaBtn");

ideaButton
.setUp("ideaBtnId","ideaSearchParentClass")
.addIdea("powerSet")
.submitIdea()
.addSubContext()
