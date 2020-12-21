
// object components for element
function CreateElm(mainObj, className, dataRef,options) {
    let obj = {
        mainObj: mainObj,
        context: mainContext.addContext("create" + className),
        dataRef: database.ref(dataRef),
        className: className,
        elmContext: new ContextSubClass(className).activateSubMenu().convertToContext(options),
        saveObj: {},

    }
    mainObj.classList.add(className);
    mainObj.classList.remove(undefined);
    //mainObj.classList.add("general");
    return obj;
}
function CreateSubmitElm(mainObj, className, dataRef,options){
    let obj = {};
    Object.assign(obj,CreateElm(mainObj, className, dataRef,options));
    obj.submit = createButton("submit");
    return obj;
}

//behavior encapsulated in object 



let cloneFunc = {
    cloneObj:{
        circlePointer(){
            let circle = createCircle(8);
            circle.setAttribute("fill","white");


            let moveCircle = (e)=>{
                circle.setAttribute("cx",e.pageX -3);
                circle.setAttribute("cy",e.pageY -3);
                body.style.cursor = "pointer";
                
            }
            
                window.addEventListener("mousemove",moveCircle);

                 circle.addEventListener("click",()=>{
        
                circle.setAttribute("fill","red");
                window.removeEventListener("mousemove",moveCircle);
                body.style.cursor = "auto";
                });
            
            return circle;
           
        
        },
    },
    cloneLine({mainObj,context,submit,saveObj}){
        context.addEventListener("click",()=>{
            let circle1;
            let circle2;
            let exit;
            
            circle1 = this.cloneObj.circlePointer();
            exit = createButton("exit");

            circle1.addEventListener("click",()=>{
                circle2 = this.cloneObj.circlePointer();

                circle2.addEventListener("click",()=>{
                

                    submit.style.display = "block";

                    submit.style.left = (svgNumberValue(circle1,"cx") + svgNumberValue(circle2,"cx"))/2;
                    submit.style.top = (svgNumberValue(circle1,"cy") + svgNumberValue(circle2,"cy"))/2;
                    submit.style.display = "block";

                    exit.style.left = htmlNumberValue(submit,"left");
                    exit.style.top = htmlNumberValue(submit,"top") + 70;

                    submit.addEventListener("mouseup",()=>{

                        let line = createSvgElm("line");
                        
                        line.setAttribute("stroke","black");
                        line.setAttribute("stroke-width",4);
                        line.setAttribute("x1",svgNumberValue(circle1,"cx"));
                        line.setAttribute("x2",svgNumberValue(circle2,"cx"));
                        line.setAttribute("y1",svgNumberValue(circle1,"cy"));
                        line.setAttribute("y2",svgNumberValue(circle2,"cy"));

                        saveObj.x1 = line.getAttribute("x1");
                        saveObj.x2 = line.getAttribute("x2");
                        saveObj.y1 = line.getAttribute("y1");
                        saveObj.y2 = line.getAttribute("y2");
                        saveObj.class = "line";

                        

                        circle1.remove();
                        circle2.remove();
                        

                        submit.style.display = "none";
                        exit.remove();

                        

                        

                    });

                    exit.addEventListener("click",()=>{
                        circle1.remove();
                        circle2.remove();
                        submit.style.display = "none";
                        exit.remove();
                    });



                });

            });

            
        });
    },
    cloneQuad({mainObj,submit,context,saveObj}){
        context.addEventListener("click", () => {
            let circle1;
            let circle2;
            let circle3;
            let exit;
            circle1 = this.cloneObj.circlePointer();
            exit = createButton("exit");
            //submit.style.zIndex = "2";


            circle1.addEventListener("click",()=>{
                circle2 = this.cloneObj.circlePointer();
                
                circle2.addEventListener("click",()=>{
                    circle3 = this.cloneObj.circlePointer();
            
                
                    circle3.addEventListener("click",()=>{
                        submit.style.display = "block";

                        submit.style.left = (svgNumberValue(circle1,"cx") + svgNumberValue(circle2,"cx"))/2;
                        submit.style.top = (svgNumberValue(circle1,"cy") + svgNumberValue(circle2,"cy"))/2;

                        exit.style.left = htmlNumberValue(submit,"left");
                        exit.style.top = htmlNumberValue(submit,"top") + 70;
                    });
                });

            });

            submit.addEventListener("mouseup",()=>{
                let quad = mainObj.cloneNode(true);
                svg.appendChild(quad);
                quad.classList[0].replace(quad.classList[0],"quad");
                quad.setAttribute("startX",svgNumberValue(circle1,"cx"));
                quad.setAttribute("startY",svgNumberValue(circle1,"cy"));
                quad.setAttribute("midX",svgNumberValue(circle3,"cx"));
                quad.setAttribute("midY",svgNumberValue(circle3,"cy"));
                quad.setAttribute("finalX",svgNumberValue(circle2,"cx"));
                quad.setAttribute("finalY",svgNumberValue(circle2,"cy"));

                quad.setAttribute("d",
                `M${quad.getAttribute("startX")},
                ${quad.getAttribute("startY")},
                Q${quad.getAttribute("midX")},
                ${quad.getAttribute("midY")},
                ${quad.getAttribute("finalX")},
                ${quad.getAttribute("finalY")}`);

                saveObj.startX = quad.getAttribute("startX");
                saveObj.startY = quad.getAttribute("startY");
                saveObj.midX = quad.getAttribute("midX");
                saveObj.midY = quad.getAttribute("midY");
                saveObj.finalX = quad.getAttribute("finalX");
                saveObj.finalY = quad.getAttribute("finalY");
                saveObj.class = quad.classList[0];

                quad.setAttribute("fill-opacity",0);

                circle1.remove();
                circle2.remove();
                circle3.remove();
                        

                submit.style.display = "none";
                exit.remove();




            });
            exit.addEventListener("click",()=>{
                circle1.remove();
                circle2.remove();
                circle3.remove();
                submit.style.display = "none";
                exit.remove();
            });
            
             
        });
    },

    cloneHtml({mainObj,context}){
        context.addEventListener("click", (e) => {    
            let elm = mainObj.cloneNode(true);
            body.appendChild(elm);
            elm.style.position = "absolute";
            elm.style.left = e.pageX;
            elm.style.top = e.pageY ;
        });
    },
    cloneText({mainObj,context,saveObj,dataRef,elmContext,className}){
        context.addEventListener("click",(e)=>{
            //let target = document.querySelector(".specific");
            let text = createTextArea();
            //text.value = target.innerHTML;
            text.style.left = e.pageX;
            text.style.top = e.pageY;
        });
        elmContext.convertDiv.addEventListener("click",()=>{
            let target = document.querySelector(".specific");
            let div = createDiv();
            div.style.left = htmlNumberValue(target, "left");
            div.style.top = htmlNumberValue(target, "top");
            div.innerHTML = target.value;
            div.classList.add(className);
            div.classList.add("div");
            
            saveObj.innerHTML = div.innerHTML;
            saveObj.class = className;

            if(target.hasAttribute("dataKey")){
                div.setAttribute("dataKey",target.getAttribute("dataKey"));
                dataRef.child(target.getAttribute("dataKey")).update({innerHTML: div.innerHTML});
                
            }
            
            target.style.display = "none";
            target.remove();


        });

        elmContext.convertTextArea.addEventListener("click",()=>{
            let target = document.querySelector(".specific");
            if(target.classList.contains("div")){
                let text = createTextArea();
                text.style.left = htmlNumberValue(target,"left");
                text.style.top = htmlNumberValue(target,"top");

                text.value = target.innerHTML;


                if(target.hasAttribute("dataKey")){
                    text.setAttribute("dataKey", target.getAttribute("dataKey"));
                }
                //text.classList.add("edit");
                target.remove();


            }

        });
        
        

    },
    
};


let actionFunc = {
    
    blueHover({mainObj}){


            window.addEventListener("mouseover",(e)=>{
                if(e.target.classList.contains(mainObj.classList[0])){
                    e.target.setAttribute("stroke","blue");
                }
            });
            window.addEventListener("mouseout",(e)=>{
                if(e.target.getAttribute('stroke') === "blue"){
                    e.target.setAttribute('stroke','black');
                }
            });

    },
    blueHoverText({mainObj}){
        window.addEventListener("mouseover",(e)=>{
            if(e.target.classList.contains("text")){
                e.target.style.borderColor = "blue";
            }
        });
        window.addEventListener("mouseout",(e)=>{
            if(e.target.classList.contains("text")){
                e.target.style.borderColor = "black";
            }
        })
    }

}

let saveFunc = {
    // i am using this obj to form bigger functions 
    saveElmObj:{
        //element I want to have saved
        lastElm(obj){
            let arr = [...document.querySelectorAll("." + obj.classList[0])];
            
            return arr[arr.length -1];
            
            
        },
        //save dataKey to database and element
        saveDataKey(ref,elm){
            ref.on('value',(e)=>{
                let elmKeys = Object.keys(e.val());
                elm.setAttribute("dataKey",elmKeys[elmKeys.length -1]);
                ref.child(elmKeys[elmKeys.length -1]).update({
                    dataKey:elmKeys[elmKeys.length -1],
                    uniqueClass: elm.classList[0] + elmKeys.length,
                });
                
            })
        },
        //argument for returnSave
        returnSave(dataRef,mainObj){
            function dataAdd(eleClone,ele){
                switch(mainObj.classList[0]){
                    case "line":
                    
                    svg.appendChild(eleClone);
                    eleClone.setAttribute("stroke","black");
                    eleClone.setAttribute("stroke-width",5);
                    eleClone.setAttribute("x1",ele.x1);
                    eleClone.setAttribute("x2",ele.x2);
                    eleClone.setAttribute("y1",ele.y1);
                    eleClone.setAttribute("y2",ele.y2);

                    break;
                    case "quad":
                        svg.appendChild(eleClone);
                        eleClone.setAttribute("stroke","black");
                        eleClone.setAttribute("stroke-width",5);
                        eleClone.setAttribute("startX",ele.startX);
                        eleClone.setAttribute("startY",ele.startY);
                        eleClone.setAttribute("midX",ele.midX);
                        eleClone.setAttribute("midY",ele.midY);
                        eleClone.setAttribute("finalX",ele.finalX);
                        eleClone.setAttribute("finalY",ele.finalY);

                        eleClone.setAttribute("d",
                            `M${eleClone.getAttribute("startX")},
                            ${eleClone.getAttribute("startY")},
                            Q${eleClone.getAttribute("midX")},
                            ${eleClone.getAttribute("midY")},
                            ${eleClone.getAttribute("finalX")},
                            ${eleClone.getAttribute("finalY")}`);
                        eleClone.setAttribute("fill-opacity",0);
                    
                    break;

                    case "text":
                        
                        body.appendChild(eleClone);

                        eleClone.innerHTML = ele.innerHTML;
                        eleClone.style.left = ele.left;
                        eleClone.style.top = ele.top;

                    break;
                    
                    default: 
                    body.appendChild(eleClone);
                    eleClone.style.position = "absolute";
                    eleClone.style.left = ele.left;
                    eleClone.style.top = ele.top;
                    break;
                }
            }
            dataRef.once('value', (e) => {
                
                if(e.val() !== null){
                    let elmObj = Object.values(e.val());
                    elmObj.forEach((ele, index) => {
                        let eleClone;
                        if(mainObj.classList.contains("text")){
                            eleClone = createDiv();
                        }
                        else if(ele.hasOwnProperty("left") === false){
                            eleClone = mainObj.cloneNode(true);
                            svg.appendChild(eleClone);
                        }
                        else{
                            eleClone = createHtmlElm(ele.class);
                        }
                        
                        eleClone.classList.add(ele.class);
                        eleClone.setAttribute("dataKey", ele.dataKey);
                        eleClone.classList.add(ele.uniqueClass);
                        //eleClone.classList.add("general");
                        dataAdd(eleClone,ele);
        
                        return eleClone;
        
                    
        
        
        
                    
        
                    })
                }
                else{
                    console.log("There's nothing");
                }
            }) 
        },
    },


    saveElm({context,mainObj,dataRef,submit,saveObj,elmContext}){
        this.saveElmObj.returnSave(dataRef,mainObj);
        switch(mainObj.classList[0]){
            case "line":
                submit.addEventListener("click",()=>{
                    let elm = this.saveElmObj.lastElm(mainObj);
                    saveObj.x1 = elm.getAttribute("x1");
                    saveObj.x2 = elm.getAttribute("x2");
                    saveObj.y1 = elm.getAttribute("y1");
                    saveObj.y2 = elm.getAttribute("y2");
                    saveObj.class = elm.classList[0];

                    dataRef.push(saveObj);
                    this.saveElmObj.saveDataKey(dataRef,elm);
                });
    
                
                break;
            case "quad":
                submit.addEventListener("click",()=>{
                    
                    
                        let elm = this.saveElmObj.lastElm(mainObj);
                        saveObj.class = elm.classList[0];
                        console.log(saveObj);
                        dataRef.push(saveObj);
                        this.saveElmObj.saveDataKey(dataRef,elm);
                
                   
                    
                    //elm.setAttribute("stroke","red");
                    
                   
                });
                break;
            
            case "text":
                
                elmContext.convertDiv.addEventListener("click",()=>{
                    let elm = this.saveElmObj.lastElm(mainObj);
                        if(elm.hasAttribute("dataKey") === false){
                            saveObj.left = htmlNumberValue(elm,"left");
                            saveObj.top = htmlNumberValue(elm,"top");
                            saveObj.class = elm.classList[0];

                            dataRef.push(saveObj);
                            this.saveElmObj.saveDataKey(dataRef,elm);
                            

                        }
                        
                            
                })
                break;

            default: 
                //html elems
                context.addEventListener("click",()=>{
                let elm = this.saveElmObj.lastElm(mainObj);
                saveObj.left = htmlNumberValue(elm,"left");
                saveObj.top = htmlNumberValue(elm,"top");
                saveObj.class = elm.classList[0];
                dataRef.push(saveObj);
                this.saveElmObj.saveDataKey(dataRef,elm);
                });                    
                break;
        }
        return this;
   },

   removeElm({mainObj,dataRef,elmContext}){
       

    
    
    
            
            elmContext.remove.addEventListener("click", () => {

                let target = document.querySelector(".specific");
                dataRef.child(target.getAttribute("dataKey")).remove();
                target.style.display = "none";
                target.remove();
                


            })
        
    
    
    
        

        return this;
   },
   
}

updateFunc = {
    updateText({mainObj,context,saveObj,dataRef,elmContext}){
        elmContext.convertTextArea.addEventListener("click",()=>{
            let target = document.querySelector(".specific");
            if(target.classList.contains("div")){
                let text = createTextArea();
                text.style.left = htmlNumberValue(target,"left");
                text.style.top = htmlNumberValue(target,"top");

                text.value = target.innerHTML;


                if(target.hasAttribute("dataKey")){
                    text.setAttribute("dataKey", target.getAttribute("dataKey"));
                }
                //text.classList.add("edit");
                target.remove();


            }

        })
        return this;
        
    },
    updateSize({dataRef,elmContext}){
        

        
            elmContext.resize.addEventListener("click", () => {
                let target = document.querySelector(".specific");


                if (elmContext.resize.innerHTML !== "stop resizing") {
                    elmContext.resize.innerHTML = "stop resizing";
                    target.style.resize = "both";
                    target.style.overflow = "auto";
                    target.addEventListener("mouseup", () => {
                        dataRef.child(target.getAttribute("dataKey")).update({
                            width: target.style.width
                        });
                        dataRef.child(target.getAttribute("dataKey")).update({
                            height: target.style.height
                        });
    
                    })
                } 
                else {
                    elmContext.resize.innerHTML = "resizeElement";
                    target.style.resize = "none";
                }
            })
        

        dataRef.once('value').then((e) => {
            let elmValues = Object.values(e.val());
            elmValues.forEach((ele) => {
                if (ele.hasOwnProperty("width") || ele.hasOwnProperty("height")) {
                    document.querySelector("." + ele.uniqueClass).style.width = ele.width;
                    document.querySelector("." + ele.uniqueClass).style.height = ele.height;

                }


            })

        })
        .catch(() => {
            console.log("no elements that need resizing");
        });



        return this;
    },
    updateLinePoints({elmContext,mainObj,dataRef}){
        
                

                
            elmContext.alter.addEventListener("click",()=>{
                
                    
                if(elmContext.alter.innerHTML !== "stop altering"){
                    
                    let target = document.querySelector(".specific");
                    elmContext.alter.innerHTML = "stop altering";
                    
                    
                    let point1 = createCircle(7);
                    let point2 = createCircle(7);

                    [point1,point2].map((ele)=>{
                        ele.classList.add("pointer");
                    })
                        
                    
                    
                    
                    point1.setAttribute("cx",target.getAttribute("x1"));
                    point1.setAttribute("cy",target.getAttribute("y1"));
                    point2.setAttribute("cx",target.getAttribute("x2"));
                    point2.setAttribute("cy",target.getAttribute("y2"));


                    function movePoint1(e){
                        point1.setAttribute("cx",e.pageX);
                        point1.setAttribute("cy",e.pageY);
                        target.setAttribute("x1",svgNumberValue(point1,"cx"));
                        target.setAttribute("y1",svgNumberValue(point1,"cy"));
                    }

                    function movePoint2(e){
                        point2.setAttribute("cx",e.pageX);
                        point2.setAttribute("cy",e.pageY);
                        target.setAttribute("x2",svgNumberValue(point2,"cx"));
                        target.setAttribute("y2",svgNumberValue(point2,"cy"));
                    }

                    point1.addEventListener("mousedown",()=>{
                        window.addEventListener("mousemove",movePoint1);
                    });
                    window.addEventListener("mouseup",()=>{
                        window.removeEventListener("mousemove",movePoint1);
                        dataRef.child(target.getAttribute("dataKey")).update({x1: target.getAttribute('x1')});
                        dataRef.child(target.getAttribute("dataKey")).update({y1: target.getAttribute('y1')});



                    });
                    point2.addEventListener("mousedown",()=>{
                        window.addEventListener("mousemove",movePoint2);
                    });
                    window.addEventListener("mouseup",()=>{
                        window.removeEventListener("mousemove",movePoint2);
                        dataRef.child(target.getAttribute("dataKey")).update({x2: target.getAttribute('x2')});
                        dataRef.child(target.getAttribute("dataKey")).update({y2: target.getAttribute('y2')});
                    });
                }
                    else {
                    

                        document.querySelectorAll(".pointer").forEach(ele=>ele.remove());

                        elmContext.alter.innerHTML = "alterPoints";

                    }
                
                
                   
    
            });
            return this;
                
        },

        updateQuadPoints({elmContext,dataRef}){
            elmContext.alter.addEventListener("click",()=>{
                
                    
                if(elmContext.alter.innerHTML !== "stop altering"){
                    
                    let target = document.querySelector(".specific");
                    elmContext.alter.innerHTML = "stop altering";

                    let point1 = createCircle(7);
                    let point2 = createCircle(7);
                    let point3 = createCircle(7);

                    [point1,point2,point3].map(ele => ele.classList.add("pointer"));
                    
                    
                    
                    point1.setAttribute("cx",target.getAttribute("startX"));
                    point1.setAttribute("cy",target.getAttribute("startY"));
                    point2.setAttribute("cx",target.getAttribute("midX"));
                    point2.setAttribute("cy",target.getAttribute("midY"));
                    point3.setAttribute("cx",target.getAttribute("finalX"));
                    point3.setAttribute("cy",target.getAttribute("finalY"));



                    function movePoint1(e){
                        point1.setAttribute("cx",e.pageX);
                        point1.setAttribute("cy",e.pageY);
                        target.setAttribute("startX",svgNumberValue(point1,"cx"));
                        target.setAttribute("startY",svgNumberValue(point1,"cy"));
                        target.setAttribute("d",
                        `M${target.getAttribute("startX")},
                        ${target.getAttribute("startY")},
                        Q${target.getAttribute("midX")},
                        ${target.getAttribute("midY")},
                        ${target.getAttribute("finalX")},
                        ${target.getAttribute("finalY")}`);
                        
                    }

                    function movePoint2(e){
                        point2.setAttribute("cx",e.pageX);
                        point2.setAttribute("cy",e.pageY);
                        target.setAttribute("midX",svgNumberValue(point2,"cx"));
                        target.setAttribute("midY",svgNumberValue(point2,"cy"));

                        target.setAttribute("d",
                        `M${target.getAttribute("startX")},
                        ${target.getAttribute("startY")},
                        Q${target.getAttribute("midX")},
                        ${target.getAttribute("midY")},
                        ${target.getAttribute("finalX")},
                        ${target.getAttribute("finalY")}`);
                    }
                    function movePoint3(e){
                        point3.setAttribute("cx",e.pageX);
                        point3.setAttribute("cy",e.pageY);
                        target.setAttribute("finalX",svgNumberValue(point3,"cx"));
                        target.setAttribute("finalY",svgNumberValue(point3,"cy"));

                        target.setAttribute("d",
                        `M${target.getAttribute("startX")},
                        ${target.getAttribute("startY")},
                        Q${target.getAttribute("midX")},
                        ${target.getAttribute("midY")},
                        ${target.getAttribute("finalX")},
                        ${target.getAttribute("finalY")}`);
                    }

                    point1.addEventListener("mousedown",()=>{
                        window.addEventListener("mousemove",movePoint1);
                    });
                    window.addEventListener("mouseup",()=>{
                        window.removeEventListener("mousemove",movePoint1);
                        dataRef.child(target.getAttribute("dataKey")).update({startX: target.getAttribute('startX')});
                        dataRef.child(target.getAttribute("dataKey")).update({startY: target.getAttribute('startY')});



                    });
                    point2.addEventListener("mousedown",()=>{
                        window.addEventListener("mousemove",movePoint2);
                    });
                    window.addEventListener("mouseup",()=>{
                        window.removeEventListener("mousemove",movePoint2);
                        dataRef.child(target.getAttribute("dataKey")).update({midX: target.getAttribute('midX')});
                        dataRef.child(target.getAttribute("dataKey")).update({midY: target.getAttribute('midY')});
                    });

                    point3.addEventListener("mousedown",()=>{
                        window.addEventListener("mousemove",movePoint3);
                    });
                    window.addEventListener("mouseup",()=>{
                        window.removeEventListener("mousemove",movePoint3);
                        dataRef.child(target.getAttribute("dataKey")).update({finalX: target.getAttribute('finalX')});
                        dataRef.child(target.getAttribute("dataKey")).update({finalY: target.getAttribute('finalY')});
                    });
                }
                
                else{
                    

                    document.querySelectorAll(".pointer").forEach(ele=>ele.remove());

                    elmContext.alter.innerHTML = "alterPoints";

                }
            
            
            });
            return this;
        },
        updateDrag({elmContext,className,dataRef}){
            elmContext.drag.addEventListener("click",()=>{
                let target = document.querySelector(".specific");

                if(elmContext.drag.innerHTML !== "stop Drag"){
                    elmContext.drag.innerHTML = "stop Drag";
                    dragElement(target);
                    target.style.cursor = "move";

                }
                else{
                    
                    target.style.cursor = "auto";
                    elmContext.drag.innerHTML = "dragElement";
                    dragElement(target,null);


                }

                target.addEventListener("mouseup",()=>{
                    switch(className){
                        
                        case "line":
                            dataRef.child(target.getAttribute("dataKey")).update({
                                x1: svgNumberValue(target,"x1"),
                                x2: svgNumberValue(target,"x2"),
                                y1: svgNumberValue(target,"y1"),
                                y2: svgNumberValue(target,"y2"),


                            })
                            break;
                        case "quad":
                            dataRef.child(target.getAttribute("dataKey")).update({
                                startX: svgNumberValue(target,"startX"),
                                startY: svgNumberValue(target,"startY"),
                                midX: svgNumberValue(target,"midX"),
                                midY: svgNumberValue(target,"midY"),
                                finalX: svgNumberValue(target,"finalX"),
                                finalY: svgNumberValue(target,"finalY"),


                            });
                            break;

                        default:
                            dataRef.child(target.getAttribute("dataKey")).update({
                                left: htmlNumberValue(target,"left"),
                                top: htmlNumberValue(target,"top"),


                            })
                            break;

                    }
                })

               
            })
            return this;
        },
        updateBorder({elmContext,dataRef}){
            elmContext.borderOff.addEventListener("click",()=>{
                let target = document.querySelector(".specific");
                target.style.border = "";
            })
        }
}




/*
let buttonClone = new CreateElm(createButton(),"createButton","buttonData");
let lineClone = new CreateSubmitElm(createSvgElm("line"),"createLine","lineData");
let quadClone = new CreateSubmitElm(createSvgElm("path","quad"),"createQuad","quadData");
const textClone = new CreateSubmitElm(createTextArea(),"createText","textData");

cloneContext(quadClone);
cloneObj.cloneElm(quadClone);
saveObj.saveElm(quadClone).removeElm(quadClone);
actionObj.blueHover(quadClone);
updateObj.updatePoints(quadClone);


cloneContext(lineClone);
cloneObj.cloneElm(lineClone);
saveObj.saveElm(lineClone).removeElm(lineClone);

actionObj.blueHover(lineClone);

updateObj.updatePoints(lineClone).dragUpdate(lineClone)



cloneContext(buttonClone);
cloneObj.cloneElm(buttonClone);
saveObj.saveElm(buttonClone).removeElm(buttonClone);

updateObj.updateInnerHtml(buttonClone)
.updateSize(buttonClone)
.dragUpdate(buttonClone)
//actionElm().blueHover(buttonClone);


cloneContext(textClone);
cloneObj.cloneElm(textClone);
updateObj.updateText(textClone);
saveObj.saveElm(textClone).removeElm(textClone);


*/




//update elm's text
function updateInnerHtml({
    elmContext,
    dataRef
}) {
    addContextAction(elmContext, "submitText");
    let target;
    window.addEventListener("mousemove", (e) => {
        if (e.target.classList.contains("specific")) {
            target = e.target;

        }
    })
    document.querySelectorAll(".submitText").forEach((ele) => {
        ele.addEventListener("click", (e) => {

            let submitField = createSubmitField();
            htmlPos(submitField, e.pageX + 20, e.pageY + 20);
            console.log(target);
            [...submitField.children][1].addEventListener("click", () => {

                target.innerHTML = [...submitField.children][0].value;
                console.log(target.getAttribute("dataKey"));
                dataRef.child(target.getAttribute("dataKey")).update({
                    htmlText: [...submitField.children][0].value
                })

            });
            [...submitField.children][2].addEventListener("click", () => {
                submitField.remove();
            })
        })
    });



    dataRef.once('value').then((e) => {
            let elmValues = Object.values(e.val());
            elmValues.forEach((ele) => {
                if (ele.hasOwnProperty("htmlText")) {

                    document.querySelector("." + ele.uniqueClass).innerHTML = ele.htmlText;
                }

            })
        })
        .catch(() => {
            console.log("no text to update");
        })

}






