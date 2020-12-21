function graphDesmos(ele){
    return Desmos.GraphingCalculator(ele);
}
function expressDesmos(ele,text){
    ele.setExpression({latex: text});
}
let calcContext = mainContext.addContext("createCalculator");
let calcDataBase = database.ref("calcData");

calcContext.addEventListener("click",(e)=>{
    // just create clone
    let frame = createHtmlElm("div");
    frame.classList.add("calc");
    frame.style.width = 750;
    frame.style.height = 500;
    frame.style.left = e.pageX;
    frame.style.top = e.pageY;
    frame.style.border = "solid black 5px";

    Desmos.GraphingCalculator(frame);
    /*
    frame.addEventListener("keypress",()=>{
        console.log("dooder");
    })
    */
   // save to database and add datakey
   calcDataBase.push({
       width: htmlNumberValue(frame,"width"),
       height: htmlNumberValue(frame,"height"),
       left: htmlNumberValue(frame,"left"),
       top : htmlNumberValue(frame,"top"),
       class: frame.classList[0],
       
   });
   calcDataBase.once("value",(e)=>{
       let keys = Object.keys(e.val());
       frame.setAttribute("dataKey",keys[keys.length -1]);
       frame.classList.add(frame.classList[0] + keys.length);
       calcDataBase.child(frame.getAttribute("dataKey")).update({
            dataKey: frame.getAttribute("dataKey"),
            uniqueClass: frame.classList[0] + keys.length,
       });
   })
});

//return saveData
calcDataBase.once('value',(e)=>{
    if(e.val() !== null){
        let values = Object.values(e.val());
        let keys = Object.keys(e.val());
            values.forEach((ele)=>{
            let elm = createHtmlElm("div");
            elm.style.width = ele.width;
            elm.style.height = ele.height;
            elm.style.left = ele.left;
            elm.style.top = ele.top;
            elm.classList.add(ele.class);
            elm.classList.add(ele.uniqueClass);
            elm.setAttribute("dataKey",ele.dataKey);
            elm.style.border = "solid black 5px";
            //Desmos.GraphingCalculator(elm);
            })
    }
    
});

//add subContext
let calcSubContext = new ContextSubClass("calc").activateSubMenu()
.convertToContext(["resize","drag","remove"])


actionContext("calc",calcSubContext,calcDataBase);

