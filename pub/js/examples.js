/* JS Library usage examples */
"use strict";
log('----------')
log('SCRIPT: Examples of using our libraries')

const e = assemble();
//recommended min width is 300px
// e.createAssemblage({title: "Developer Title", width:"350px", position:"left"});
// e.openDrawer("openDrawer");


/*e.changeHeaderBackgroundColor("#202040");
e.changeTitleFontColor("#ff6363")
e.changeSecondaryFontColor("#ff6363", "white");
e.changeButtonColor("#543864", "white")

e.changeBackgroundColor("#543864")
e.changeFolderBackgroundColor("#202040");
e.changeMainFontColor("#ffbd69");

e.changeSecondaryButtonColor("#ffbd69", "white")*/

e.changeHeaderBackgroundColor("#252A34");
e.changeTitleFontColor("#ff2e63")
e.changeSecondaryFontColor("white", "#ff2e63");
e.changeHeaderButtonColor("#eaeaea", "#ff2e63")

e.changeBackgroundColor("#667188")
e.changeFolderBackgroundColor("#252a34");
e.changeFolderButtonColor("#ff2e63", "white")
e.changeFolderFontColor("#eaeaea");

if (e.getFolders() === null) {
    const exampleFoldersList =
        [{"name":"Save Current Page","id":"_evpb4p6a5",
            "items":
                [{"name":"page2","id":"item_ammkxh8my","link":null,"hash":"#Page2"},
                    {"name":"page1","id":"item_85m608t33","link":null,"hash":"#Page1"},
                    {"name":"page3","id":"item_v9asmhl0y","link":null,"hash":"#Page3"},
                    {"name":"Main Page","id":"item_g0s34k81z","link":null,"hash":""}]},
            {"name":"URL dragged into folder","id":"_vd79bkqxi",
                "items":
                    [{"name":"/images/sample.jpg","id":"item_wsllsw2tw","link":"http://localhost:5000/images/sample.jpg","hash":null},
                        {"name":"random image from google","id":"item_51qhgqtb6","link":"https://imgsv.imaging.nikon.com/lineup/dslr/df/img/sample/img_01.jpg","hash":null},
                        {"name":"random image from google 2","id":"item_gsicz4qzd","link":"https://miro.medium.com/max/2400/1*MI686k5sDQrISBM6L8pf5A.jpeg","hash":null},
                        {"name":"Youtube Video","id":"item_fepe2mrgu","link":"https://www.youtube.com/watch?v=5qap5aO4i9A","hash":null},
                        {"name":"gif","id":"item_vmfy0kl0l","link":"https://media1.tenor.com/images/806fa85fc55a55de66ab310e500b5f0f/tenor.gif","hash":null}]}];
    e.reAssemblage({title: "Developer Title", width:"350px", position:"left"}, exampleFoldersList)

} else {
    e.reAssemblage({title: "Developer Title", width:"350px", position:"left"}, e.getFolders())
}
e.openDrawer("openDrawer");




// show the given page, hide the rest... use only for multiple pages in one html
function show(elementID) {
    // try to find the requested page and alert if it's not found
    var ele = document.getElementById(elementID);
    if (!ele) {
        alert("no such element");
        return;
    }

    // get all pages, loop through them and hide them
    var pages = document.getElementsByClassName('page');
    for(var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }

    // then show the requested page
    ele.style.display = 'block';
}

hljs.initHighlightingOnLoad();
$(document).ready(function() {
    $('#myBlock').each(function(i, e) {hljs.highlightBlock(e)});
});