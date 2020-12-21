// just number functions
function createNaturalArr(){
    return [1,2,3,4,5,6,7,8,9,10];
}
function createIntegerArr(){
    let arr1 = createNaturalArr().reverse().map(ele => ele *-1);
    let arr2 = createNaturalArr();
    return [...arr1,...[0],...arr2];
}
// setup
const specialSetText = createHtmlElm("label");
specialSetText.style.left = 50;
specialSetText.style.top = 50;
specialSetText.innerHTML = "special Set";

const naturalBtn = createHtmlElm("button");
naturalBtn.innerHTML = "N";
naturalBtn.style.left = htmlNumberValue(specialSetText,"left") + 0;
naturalBtn.style.top = htmlNumberValue(specialSetText,"top") + 50;

const integerBtn = createHtmlElm("button");
integerBtn.innerHTML = "Z";
integerBtn.style.left = htmlNumberValue(naturalBtn,"left");
integerBtn.style.top = htmlNumberValue(naturalBtn,"top") + 50;

const notationText = createHtmlElm("label");
notationText.innerHTML = ":"
notationText.style.left = htmlNumberValue(specialSetText,"left") + 100;
notationText.style.top = htmlNumberValue(specialSetText,"top")


const expressText = createHtmlElm("label");
expressText.innerHTML = "expression";
expressText.style.left = htmlNumberValue(notationText,"left") + 50;
expressText.style.top = htmlNumberValue(notationText,"top");

const expressInput = createHtmlElm("input");
transferHtmlPos(expressInput,expressText,0,50);

const expressBtn = createHtmlElm("button");
expressBtn.innerHTML = "submit";
transferHtmlPos(expressBtn,expressInput,222,0);

const calculateBtn = createHtmlElm("button");
calculateBtn.innerHTML = "calculate Expression";
transferHtmlPos(calculateBtn,expressInput,0,50);


const calculateText = createHtmlElm("label");
calculateText.innerHTML = "output";
transferHtmlPos(calculateText,calculateBtn,0,50);

const calculateEqBtn = createHtmlElm("button");
calculateEqBtn.innerHTML = "calculate Equation";
transferHtmlPos(calculateEqBtn,calculateBtn,150,0);

// action
naturalBtn.addEventListener("click",()=>{
    specialSetText.innerHTML = createNaturalArr();
    transferHtmlPos(notationText,specialSetText,150,0);
    transferHtmlPos(expressText,notationText,50,0);
});

integerBtn.addEventListener("click",()=>{
    specialSetText.innerHTML = createIntegerArr();
    transferHtmlPos(notationText,specialSetText,370,0);
    transferHtmlPos(expressText,notationText,50,0);
})

expressBtn.addEventListener("click",()=>{
    expressText.innerHTML = expressInput.value;
});
let expressArr;
calculateBtn.addEventListener("click",()=>{
    let finalArr = [];
    let text = expressText.innerHTML;
    specialSetText.innerHTML.split(",").forEach((ele,index,arr)=>{
        arr = text.replaceAll("x",ele);
        finalArr.push(arr)
        
    });
    finalArr.forEach((ele,index,arr)=>{
        arr[index] = eval(ele);
    });
    calculateText.innerHTML = finalArr;
    
    
/*
  expressText.innerHTML.split(" ").forEach((ele,index,arr)=>{
        if(["*","+","-","/"].includes(ele)){
          switch(ele){
              case "*":
               num = arr[index -1] * arr[index + 1];

                break;
                case "+":
               num =  arr[index -1] * arr[index + 1];
                break;
                case "-":
              num =  arr[index-1] - arr[index+1];
                case "/":
              num =  arr[index -1] + arr[index +1];
                break;
          }
        }
        else{
            arr[index] = Number(ele);
        }       
        
        expressArr = arr;
        
    })
    console.log(expressArr);
    console.log(num);
*/
});
calcDataBase.once('value').then(()=>{
    let calc1 = document.querySelector(".calc1");
    let actualCalc1 = graphDesmos(calc1);
    
    expressDesmos(actualCalc1,"y = [1<x<2]");
    expressDesmos(actualCalc1,"y = 2{1<x<2}");
    expressDesmos(actualCalc1,"x = {1<y<2}");
    expressDesmos(actualCalc1,"x = 2{1<y<2}");

    actualCalc1.setExpression( {parametricDomain: {min: "0", max: "1"},})
    
})
let imgObj1 = new ImgClass("showProofImg","imgData1")
.setUp("imgDataList1","imgMenu1")
.addImg("/proofFolder/setBuilderImg1.PNG")
.submitImg("actualImg")
.addSubContext("actualImg")