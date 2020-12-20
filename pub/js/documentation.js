"use strict";

const a = assemble();
let savedFolders
if(a.getFolders()) {
    savedFolders = a.getFolders()
}
a.createAssemblage({});
a.openDrawer("buttonClass");


window.onbeforeunload = function(){
    const savePrevious = assemble()
    a.reAssemblage({}, savedFolders)
    return null
};


/*for styling code using highlight.js library*/
hljs.initHighlightingOnLoad();
$(document).ready(function() {
    $('#myBlock').each(function(i, e) {hljs.highlightBlock(e)});
});