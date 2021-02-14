
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
.addImg("/proofImgFolder/subsetTree.PNG")
.addImg("/proofImgFolder/powerSetEx2.PNG")
.addImg("/proofImgFolder/poweSetEx3.jpg")
.addImg("/proofImgFolder/setOperationsEx.jpg")
.addImg("/proofImgFolder/setOperationsEx2.jpg")
.addImg("/proofImgFolder/setOperationsEx3.jpg")
.addImg("proofImgFolder/universalEx.jpg")
.addImg("proofImgFolder/truthTableAnd.PNG")
.addImg("proofImgFolder/TruthTableOr.PNG")
.addImg("proofImgFolder/negationTable.PNG")
.addImg("proofImgFolder/AndOrEx1.jpg")
.addImg("proofImgFolder/AndOrEx2.jpg")
.addImg("proofImgFolder/ifTable.PNG")
.addImg("proofImgFolder/ifTableEx.PNG")
.addImg("proofImgFolder/ifThenProblems.jpg")
.addImg("proofImgFolder/biconditional.PNG")
.addImg("proofImgFolder/truthStatementEx1.PNG")
.addImg("proofImgFolder/truthStatementEx2.PNG")
.addImg("proofImgFolder/logicalEqEx1.PNG")
.addImg("proofImgFolder/logicalEqEx2.PNG")
.addImg("proofImgFolder/deMorgan.PNG")
.addImg("proofImgFolder/quantifierEx.PNG")
.addImg("proofImgFolder/countingEx.PNG")
.addImg("proofImgFolder/countSolutionA.PNG")
.addImg("proofImgFolder/countSolutionB.PNG")
.addImg("proofImgFolder/countSolutionC.PNG")
.addImg("proofImgFolder/countSolutionD.PNG")
.addImg("proofImgFolder/symbolFactorial.PNG")
.addImg("proofImgFolder/factorialEx.PNG")
.addImg("proofImgFolder/factorialProblems.PNG")
.addImg("proofImgFolder/factorialSolutions.PNG")













const ideaClass = new IdeaClass("createIdea","ideaData","idea");
ideaClass
.setUp("ideaId","ideaSearchClassName")
.submitIdea()
.addSubContext()
.showIdea()
.addIdea("cartesianProduct")
.addIdea("subSet")
.addIdea("subSetExample")
.addIdea("powerSet")
.addIdea("powerSetExamples")
.addIdea("setOperations")
.addIdea("universalSet")
.addIdea("logic")
.addIdea("AndOr")
.addIdea("IfThen")
.addIdea("biconditional")
.addIdea("truthTableStatement")
.addIdea("LogicalEquivalence")
.addIdea("quantifiers")
.addIdea("counting")
.addIdea("factorials")
.addIdea("subSetCount")






const ideaButton = new IdeaButtonClass("createIdeaButton","ideaBtnData","ideaBtn");

ideaButton
.setUp("ideaBtnId","ideaSearchParentClass")
.submitIdea()
.addSubContext()
.addIdea("powerSet")
.addIdea("cartesianProduct")
.addIdea("setOperations")
.addIdea("universalSet")
.addIdea("AndOr")
.addIdea("ifThen")
.addIdea("biconditional")




