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
    console.log(prevColor);
    elm.addEventListener("mouseover",()=>{
      elm.style[choice] = color
    });
    elm.addEventListener("mouseout",()=>{
      elm.style[choice] = prevColor;
    })
  }