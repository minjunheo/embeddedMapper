
const setEmbed = new EmbeddedMap("proofFolder/set.html",500,500,"set");
setEmbed.submitTag("set")
.modifyText("h2")
.moveTextUp(-30);

const setBuilderEmbed = new EmbeddedMap("proofFolder/setBuilder.html",500,500,"setBuilder");
setBuilderEmbed.submitTag("setBuilder")
.modifyText("h2")
.moveTextUp(-10);

const imgObj1 = new ImgClass("showProofImg","imgData1")
.setUp("imgDataList1","imgMenu1")
.submitImg("actualImg")
.addSubContext("actualImg")
.addImg("/proofFolder/setBuilderImg1.PNG")
.addImg("/proofImgFolder/cartesianImg.PNG")
.addImg("/proofImgFolder/cartesianGraph.PNG")


const ideaClass = new IdeaClass("createIdea","ideaData","idea");
ideaClass
.setUp("ideaId","ideaSearchClassName")
.submitIdea()
.addSubContext()
.showIdea()
.addIdea("cartesianProduct")