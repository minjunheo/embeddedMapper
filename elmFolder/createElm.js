
const inputClone = new CreateElm(createHtmlElm("input"),"input","inputData",["resize","drag","alter","remove"]);
cloneFunc.cloneHtml(inputClone);
saveFunc.saveElm(inputClone).removeElm(inputClone);
updateFunc.updateSize(inputClone);
updateFunc.updateDrag(inputClone);


const htmlBoxClone = new CreateElm(createHtmlElm("div"),"box","boxData",["resize","drag","alter","remove"]);
cloneFunc.cloneHtmlBox(htmlBoxClone);
actionFunc.blueHoverHtml(htmlBoxClone);

saveFunc.saveElm(htmlBoxClone).removeElm(htmlBoxClone);
updateFunc.updateSize(htmlBoxClone);
updateFunc.updateDrag(htmlBoxClone);


const lineClone = new CreateSubmitElm(createSvgElm("line"),"line","lineData",["alter","drag","remove"]);
cloneFunc.cloneLine(lineClone);
actionFunc.blueHoverSvg(lineClone);
saveFunc.saveElm(lineClone)
.removeElm(lineClone);
updateFunc.updateLinePoints(lineClone).updateDrag(lineClone);

const quadClone = new CreateSubmitElm(createSvgElm("path"),"quad","quadData",["alter","drag","remove"]);
cloneFunc.cloneQuad(quadClone);
actionFunc.blueHoverSvg(quadClone);
saveFunc.saveElm(quadClone).removeElm(quadClone);
updateFunc.updateQuadPoints(quadClone).updateDrag(quadClone);

const textClone = new CreateElm(createHtmlElm("textarea"),"text","textData",["drag","convertDiv","convertTextArea","remove","borderOn","borderOff"]);
cloneFunc.cloneText(textClone);
saveFunc.saveElm(textClone).removeElm(textClone);
updateFunc.updateDrag(textClone);
actionFunc.blueHoverHtml(textClone);
updateFunc.updateBorder(textClone);


