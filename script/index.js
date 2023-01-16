$(".node input").on("keydown",updateHashTree);

function updateHashTree(){
    calcHash(7,8,3);
    calcHash(9,10,4);
    calcHash(11,12,5);
    calcHash(13,14,6);
    calcHash(3,4,1);
    calcHash(5,6,2);
    calcHash(1,2,0);
}

function calcHash(nodeOne,nodeTwo,finalNode){
    if(nodeOne>=7){
        var hashValueOne = document.getElementById("hash"+nodeOne).value;
        var hashValueTwo = document.getElementById("hash"+nodeTwo).value;
        var hashValueFinal = stringToHash(hashValueOne + hashValueTwo);
        document.getElementById("hash"+finalNode).innerHTML = hashValueFinal;  
    }
    else {
        var hashValueOne = document.getElementById("hash"+nodeOne).innerHTML;
        var hashValueTwo = document.getElementById("hash"+nodeTwo).innerHTML;
        var hashValueFinal = stringToHash(hashValueOne + hashValueTwo);      
        document.getElementById("hash"+finalNode).innerHTML = hashValueFinal;
    }
}

function stringToHash(string) {
             
    var hash = 0;
     
    if (string.length == 0) return hash;
     
    for (i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
     
    return hash;
}












var firstNodeAbs = 0;
var firstNodeOrd = 0;
var secondNodeAbs = 0;
var secondNodeOrd = 0;
var edgeAbs = 0;
var edgeOrd = 0;
var lineAngle = 0;
var lineLength = 0;

function joinNode (firstNode,secondNode,edgenum){
    var selectedEdge = ".edge"+edgenum;
    calculateCoordinates(firstNode,secondNode);
    determineLineAngle();
    determineEdgeLength();
    adjustEdgePosition();
    $(selectedEdge).css("width",lineLength+"px");
    $(selectedEdge).css("transform","rotate("+lineAngle+"deg)");
    $(selectedEdge).css("top",edgeOrd+"px");
    $(selectedEdge).css("left",edgeAbs+"px");
}

function adjustEdgePosition(){
    edgeAbs = firstNodeAbs - (lineLength/2) - ((firstNodeAbs-secondNodeAbs)/2);
    edgeOrd = firstNodeOrd + ((secondNodeOrd-firstNodeOrd)/2);
}

function determineEdgeLength (){
    var hgtSqr = (secondNodeOrd-firstNodeOrd)*(secondNodeOrd-firstNodeOrd);
    var baseSqr = (firstNodeAbs-secondNodeAbs)*(firstNodeAbs-secondNodeAbs);
    lineLength = Math.sqrt(hgtSqr+baseSqr);
}

function determineLineAngle (){
    var factor = -57.2957795;
    var ratio = (secondNodeOrd-firstNodeOrd)/(firstNodeAbs-secondNodeAbs);
    lineAngle = factor*Math.atan(ratio);
}

function calculateCoordinates (firstNode,secondNode){
    var ele = document.getElementsByClassName("node-container")[firstNode];
    var y = ele.offsetTop;
    var x = ele.offsetLeft;
    var h = ele.offsetHeight;
    var w = ele.offsetWidth;
    firstNodeOrd = y + (h/2);
    firstNodeAbs = x  + (w/2);

    ele = document.getElementsByClassName("node-container")[secondNode];
    y = ele.offsetTop;
    x = ele.offsetLeft;
    h = ele.offsetHeight;
    w = ele.offsetWidth;
    secondNodeOrd = y+(h/2);
    secondNodeAbs = x + (w/2);
}

function loadEdges (){

    joinNode(0,1,0);
    joinNode(0,2,1);

    joinNode(1,3,2);
    joinNode(1,4,3);

    joinNode(2,5,4);
    joinNode(2,6,5);

    joinNode(3,7,6);
    joinNode(3,8,7);

    joinNode(4,9,8);
    joinNode(4,10,9);

    joinNode(5,11,10);
    joinNode(5,12,11);

    joinNode(6,13,12);
    joinNode(6,14,13);
}


window.onload = function() {
    resizeNodes();
    loadEdges();
};

window.onresize = function() {
    resizeNodes();
    loadEdges();
};

function resizeNodes(){
    for(var i=0; i<document.getElementsByClassName("node-container").length;++i){
        
        var ele = document.getElementsByClassName("node-container")[i];
        var nodeEle = document.getElementsByClassName("node")[i];

        nodeEle.style.height= "0px";
        nodeEle.style.width= "0px";

        var h = ele.offsetHeight;
        var w = ele.offsetWidth;
        var str = getComputedStyle(ele).padding;
        var num = str.match(/(\d+)/)[0];
        ++num;
        h = h-2*num;
        w = w-2*num;

        if(h <= w){
            nodeEle.style.height= h+"px";
            nodeEle.style.width= h+"px";
        }
        else{
            nodeEle.style.height= w+"px";
            nodeEle.style.width= w+"px";
        }
    }
}