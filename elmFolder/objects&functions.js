





let createRect = ()=>{
    let box= document.querySelector(".box").cloneNode(true);
    svg.appendChild(box);
    //box.style.position = "absolute";
    box.setAttribute("x",100);
    box.setAttribute("y",100);
    box.setAttribute("width",100);
    box.setAttribute("height",100);
    box.setAttribute("fill-opacity",0);
    box.setAttribute("stroke","black");
    box.classList.add("box");
    return box;
}

let createHtmlRect = ()=>{
  let rect = document.createElement("div");
  body.appendChild(rect);

  rect.classList.add("rect");

  rect.style.position = 'absolute';
  rect.style.border = "solid black";
  rect.style.width = 100;
  rect.style.height = 100;
  //rect.style.backgroundColor = "black";
  //rect.style.resize = "both";
  //rect.style.overflow = 'auto';
  //rect.style.borderRadius = "50%";
  return rect;
}
function createSvgElm(e,customClass){
  let elm = document.createElementNS("http://www.w3.org/2000/svg",e);

  elm.setAttribute("stroke","black");
  svg.appendChild(elm);
  if(e === "path"){
    elm.classList.add(customClass);

  }
  else{
    elm.classList.add(e);
  }
  return elm;
} 
let createLine = ()=>{
  let line = createSvgElm("line");
  return line;
}
let createQuad = ()=>{
  //let path = document.querySelector(".quad").cloneNode(true);
  let path = createSvgElm('path');
  path.setAttribute("fill-opacity",0);
  return path;
}
let createHtmlCircle = ()=>{
  let circle = document.createElement("div");
  body.appendChild(circle);

  circle.classList.add("htmlCircle");

  circle.style.position = "absolute";

  circle.style.borderRadius = "50%";

  circle.style.border = "solid black"

  return circle;
}

let createCircle = (r)=>{
  let circle = document.createElementNS("http://www.w3.org/2000/svg","circle");
  svg.appendChild(circle);
  circle.setAttribute("cx",100);
  circle.setAttribute("cy",100);
  circle.setAttribute("r",r || 50);
  circle.setAttribute("stroke","black");
  return circle;
  
}

let createQuadratic = (start,mid,final) =>{
  let path = document.querySelector(".path").cloneNode(true);
  svg.appendChild(path);
  path.setAttribute("fill-opacity",0);
  path.setAttribute("stroke","black");
  path.setAttribute("d","M 220 200 Q 300 100 400 200");

  path.setAttribute("midX",300);
  path.setAttribute("midY",100);
  return path;
}


let createDiv = (text) =>{
  let div = document.createElement("div");
  div.style.whiteSpace = "pre";
  //div.classList.add("div");
  div.classList.add("text")
  body.appendChild(div);
  div.style.position = "absolute";
  div.classList.add("general");
  div.style.border = "solid black 5px"
  div.innerHTML = "" || text;
  return div;
}


let createButton = (text)=>{
    let button = document.createElement("button");
    button.classList.add("button");
    button.classList.add("general");
    button.style.position = "absolute";
    body.appendChild(button);
    button.style.width = 50;
    button.style.height = 50;
    button.innerHTML = text || "";
    return button;
}

let createTextArea = ()=>{
  let text = document.createElement("textarea");
  body.appendChild(text);
  text.classList.add("text");
  text.style.position = "absolute";
  return text;
}

let createInput = (width,height)=>{
  let input = document.createElement("input");
  input.classList.add("input");
  input.style.position = "absolute";
  body.appendChild(input);
  input.style.width = width || 50;
  input.style.height = height || 30;
  return input;
}

let createSubmitField = () =>{
  let div = createDiv();
  let input = createInput();
  let button = createButton();
  let exitButton = createButton();
  button.style.height= 25;
  button.innerHTML = "submit";
  button.style.width = 60;
  input.style.width = 70;

  exitButton.style.height= 25;
  exitButton.innerHTML = "exit";
  exitButton.style.width = 60;
  
  div.appendChild(input);
  div.appendChild(button);
  div.appendChild(exitButton)
  input.style.top = htmlNumberValue(button,"top") -35;
  exitButton.style.top = htmlNumberValue(button,"top") + 35;
  return div;

}


//action functions
/*
const svgNumberValue = (x,y)=>{
  let num = Number(x.getAttribute(y));
  return num;
}

const htmlNumberValue = (obj,property)=>{
  return Number(getComputedStyle(obj).getPropertyValue(property).replace("px",""))
}

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
      // set the element's new position:
      /*
      switch(elmnt.hasAttribute(attr)){
        case "x1":
          elmnt.setAttribute("x1",svgNumberValue(elmnt,"x1")-pos1);
          elmnt.setAttribute("x2",svgNumberValue(elmnt,"x2")-pos1);
          elmnt.setAttribute("y1",svgNumberValue(elmnt,"y1")-pos2);
          elmnt.setAttribute("y2",svgNumberValue(elmnt,"y2")-pos2);

          break;
          case "startX":
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
            break;
          case "x":
            elmnt.setAttribute("y",svgNumberValue(elmnt,"y") - pos2);
            elmnt.setAttribute("x",svgNumberValue(elmnt,"x")-pos1);
          break;
        default:
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
          break;

      }
      
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
      /* stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
*/
 function toggleColor(elm,color){
   elm.addEventListener("mouseover",()=>{
      elm.classList.add(color);
   });
   elm.addEventListener("mouseout",()=>{
     elm.classList.remove(color);
   })
 }

 function setQuadAttr(quad){
  quad.setAttribute("d",
  `M${quad.getAttribute("startX")},
  ${quad.getAttribute("startY")},
  Q${quad.getAttribute("midX")},
  ${quad.getAttribute("midY")},
  ${quad.getAttribute("finalX")},
  ${quad.getAttribute("finalY")}`);
 }