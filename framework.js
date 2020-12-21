const body = document.querySelector("body");
const svg = document.querySelector("svg");
const svgNumberValue = (x,y)=>{
    let num = Number(x.getAttribute(y));
    return num;
  }
  
  const htmlNumberValue = (obj,property)=>{
    return Number(getComputedStyle(obj).getPropertyValue(property).replace("px",""))
  }
function createHtmlElm(elmName){
    let elm = document.createElement(elmName);
     elm.style.position = "absolute";
     body.appendChild(elm);
     return elm;
};


function establishStyle(elm,left,top,width,height){
    elm.style.left = left;
    elm.style.top = top;
    elm.style.width = width;
    elm.style.height = height;
}
function createSvgElm(elmName){
    let elm = document.createElementNS("http://www.w3.org/2000/svg",elmName);
    elm.setAttribute("stroke","black");
    svg.appendChild(elm);
    elm.setAttribute("stroke-width",3);
    elm.setAttribute("fill-opacity",0);
    return elm;
};
function createContextClone(){
    let clone = document.querySelector(".context-menu").cloneNode(true);
    body.appendChild(clone);
    return clone;
};

function dragElement(elmnt,status) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    if(status === null){
        elmnt.onmousedown = null;
    }
    else{
         elmnt.onmousedown = dragMouseDown;
    }
     
    
  
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      if(elmnt.style.position === "absolute"){
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
      else if(elmnt.hasAttribute("x1")){
          elmnt.setAttribute("x1",svgNumberValue(elmnt,"x1")-pos1);
          elmnt.setAttribute("x2",svgNumberValue(elmnt,"x2")-pos1);
          elmnt.setAttribute("y1",svgNumberValue(elmnt,"y1")-pos2);
          elmnt.setAttribute("y2",svgNumberValue(elmnt,"y2")-pos2);
      }
      else if(elmnt.hasAttribute("x")){
          elmnt.setAttribute("y",svgNumberValue(elmnt,"y") - pos2);
          elmnt.setAttribute("x",svgNumberValue(elmnt,"x")-pos1);

      }
      else if(elmnt.hasAttribute('cx')){
        elmnt.setAttribute("cy",svgNumberValue(elmnt,"cy") - pos2);
        elmnt.setAttribute("cx",svgNumberValue(elmnt,"cx")-pos1);
      }
      else if (elmnt.hasAttribute("startX")){
          elmnt.setAttribute("startX",svgNumberValue(elmnt,"startX")-pos1);
          elmnt.setAttribute("startY",svgNumberValue(elmnt,"startY")-pos2);
          elmnt.setAttribute("midX",svgNumberValue(elmnt,"midX")-pos1);
          elmnt.setAttribute("midY",svgNumberValue(elmnt,"midY")-pos2);
          elmnt.setAttribute("finalX",svgNumberValue(elmnt,"finalX")-pos1);
          elmnt.setAttribute("finalY",svgNumberValue(elmnt,"finalY")-pos2);

          elmnt.setAttribute("d",
          `M${elmnt.getAttribute("startX")},
          ${elmnt.getAttribute("startY")},
          Q${elmnt.getAttribute("midX")},
          ${elmnt.getAttribute("midY")},
          ${elmnt.getAttribute("finalX")},
          ${elmnt.getAttribute("finalY")}`
          
          );
      }
      


    };
  
    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  function toggleColor(elm,choice,color){
    let prevColor = elm.style[choice];
    elm.addEventListener("mouseover",()=>{
      elm.style[choice] = color
    });
    elm.addEventListener("mouseout",()=>{
      elm.style[choice] = prevColor;
    })
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
  obj.parent.style.zIndex = 2;
  return obj;
}

function actionContext(generalClass,menu,dataRef){

  let obj = {
      menu: menu,

      blueHover(){
          let target;
          window.addEventListener("mouseover",(e)=>{
              if(e.target.classList.contains(generalClass)){
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
      dragElm(){
          dragElm(this.menu);
          let target;
          let drag = this.menu.drag;
          drag.addEventListener("click",()=>{
              target = document.querySelector('.specific');
              target.addEventListener("mouseup",()=>{
                  dataRef.child(target.getAttribute("dataKey")).update({
                      left: htmlNumberValue(target,"left"),
                      top: htmlNumberValue(target,"top"),
                  });
              })
          })
          return this;
      },
      removeElm(){
          let target;
          this.menu.remove.addEventListener("click",()=>{
          target = document.querySelector(".specific");
          //target.remove();
          target.style.display = "none";
          dataRef.child(target.getAttribute("dataKey")).remove();
          })
          return this;
      },
      resizeElm(){
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
                  dataRef.child(target.getAttribute("dataKey")).update({
                  width: htmlNumberValue(target,"width"),
                  height: htmlNumberValue(target,"height"),
      
                  });
                 
              });
              
          })
          return this;
      }
  
  }
  obj.blueHover()
  .dragElm()
  .removeElm()
  .resizeElm()
  return obj;

}