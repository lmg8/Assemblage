/* JS Library usage examples */
"use strict";
log('----------')
log('SCRIPT: Examples of using our libraries')

const e = assemble();
e.createAssemblage();
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
