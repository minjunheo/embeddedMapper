// set value

let setNameInput = createHtmlElm("input");

let setNameBtn = createHtmlElm("button");


let setBtn = createHtmlElm('button');
establishStyle(setBtn,25,100,50,30);
setBtn.innerHTML = "submit"


let setInput = createHtmlElm('input');
setInput.style.left = htmlNumberValue(setBtn,"left");
setInput.style.top = htmlNumberValue(setBtn,"top") - 30;
setNameInput.style.left = htmlNumberValue(setInput,"left");
setNameInput.style.top = htmlNumberValue(setInput,"top") - 30;
setNameInput.style.width = 100;
setNameBtn.innerHTML = "setName";
setNameBtn.style.left = htmlNumberValue(setNameInput,"left") + 120;
setNameBtn.style.top = htmlNumberValue(setNameInput,"top");

let setText = createHtmlElm('div');
setText.innerHTML = "{}";

setText.style.left = htmlNumberValue(setInput,"left") + 300;
setText.style.top = htmlNumberValue(setInput,"top")

let setLine = createSvgElm("line");

setLine.setAttribute("x1",htmlNumberValue(setInput,"left") + 175);
setLine.setAttribute("x2",htmlNumberValue(setText,"left") - 10);
setLine.setAttribute("y1",htmlNumberValue(setInput,"top"));
setLine.setAttribute("y2",htmlNumberValue(setInput,"top"));


let introText = createHtmlElm("label");
introText.innerHTML = "Put the value in for a set";
introText.style.left = 25;

//element value 
let elementBtn = createHtmlElm("button");
elementBtn.innerHTML = "find the element of set";
elementBtn.style.left = htmlNumberValue(setText,"left") -50;
elementBtn.style.top = htmlNumberValue(setText,"top") + 150;

let elementInput = createHtmlElm("input");
elementInput.style.left = htmlNumberValue(elementBtn,"left");
elementInput.style.top = htmlNumberValue(elementBtn,"top") - 30;

let elementLine = createSvgElm("line");
elementLine.setAttribute("x1",htmlNumberValue(setText,"left"));
elementLine.setAttribute("x2",htmlNumberValue(setText,"left"));
elementLine.setAttribute("y1",htmlNumberValue(setText,"top") + 20);
elementLine.setAttribute("y2",htmlNumberValue(elementInput,"top")-10);

let elementText = createHtmlElm("label");
elementText.innerHTML = "element";
elementText.style.left = htmlNumberValue(elementBtn,"left");
elementText.style.top = htmlNumberValue(elementBtn,"top") + 30;

//cardinality value
let cardText = createHtmlElm("label");
cardText.innerHTML = "how many elements does this set have?";

cardBtn = createHtmlElm("button");
cardBtn.innerHTML = "find cardinality";

cardText.style.left = htmlNumberValue(setText,"left") + 150;
cardText.style.top = htmlNumberValue(setText,"top");
cardBtn.style.left = htmlNumberValue(cardText,"left");
cardBtn.style.top = htmlNumberValue(setText,"top") + 50;

//set Action

//set Name
setNameBtn.addEventListener("click",()=>{
    setNameBtn.innerHTML = setNameInput.value;
})
let setArr;
// establish set value
function establishSet(){
    setArr = setInput.value.split(",");
    /*
    arr.forEach((ele,index,arrr)=>{
         arrr[index] = `<span>${ele}</span>`
    });
    console.log(arr);
    */
     setText.innerHTML = `{${setInput.value}}`
 }
 setInput.addEventListener("change",establishSet);
 setBtn.addEventListener("click",establishSet);

 // set element of
elementBtn.addEventListener("click",()=>{
    if(setArr.includes(elementInput.value)){
       elementText.innerHTML = elementInput.value + "∈" + setNameBtn.innerHTML;
    }
    else{
        elementText.innerHTML = elementInput.value + "∉" + setNameBtn.innerHTML;
    }
});

//set cardinality

cardBtn.addEventListener("click",()=>{
    cardText.innerHTML = `|${setNameBtn.innerHTML}| = ${setArr.length}`
})
