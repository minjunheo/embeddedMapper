function transferHtmlPos(ele1,ele2,leftPos,topPos){
    ele1.style.left = htmlNumberValue(ele2,"left") + leftPos || htmlNumberValue(ele2,"left") + 0;
    ele1.style.top = htmlNumberValue(ele2,"top") + topPos || htmlNumberValue(ele2,"top") + 0;
}
function sin(elm){
    return Math.sin(elm);
}
function cos(elm){
    return Math.cos(elm);
}
function tan(elm){
    return Math.tan(elm);
}
function cot(elm){
    return Math.tan
}

