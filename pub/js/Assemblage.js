/* Assemblage Library */
"use strict";
const log = console.log;

function assemble() {

    const LinkGrabber = {
        //https://stackoverflow.com/a/5372167
        textarea: null,

        folder: "",

        attach_ta: function(){
            if(LinkGrabber.textarea != null) return;

            const textarea = LinkGrabber.textarea = document.createElement("textarea");
            textarea.setAttribute("style", "position: absolute; height:100%; width: 100%; margin: 0; top: 0; bottom: 0; right: 0; left: 0; z-index: 99999999");
            textarea.style.opacity = "0.000000000000000001";
            $("#" + LinkGrabber.folder).append(textarea);

            textarea.addEventListener("dragover", LinkGrabber.evt_default, false);
            textarea.addEventListener("dragenter", LinkGrabber.evt_default, false);
            textarea.addEventListener("mouseup", LinkGrabber.evt_drag_out, false);
            textarea.addEventListener("dragleave", LinkGrabber.evt_drag_out, false);


        },

        detach_ta: function(){
            if(LinkGrabber.textarea == null) return;
            const textarea = LinkGrabber.textarea;

            textarea.parentNode.removeChild(textarea);
            LinkGrabber.textarea = null;
        },

        /* Event Handlers */

        evt_drag_over: function(e){
            e.stopPropagation();
            e.preventDefault();
            LinkGrabber.attach_ta(); //Create TA overlay
        },

        evt_got_link: function(link){
            // alert(link);
            if(LinkGrabber.isUrl(link)){
                displayNewSaveUrl(LinkGrabber.folder, link);
            } else {
                alert("not a url");
            }
            LinkGrabber.detach_ta();
        },

        evt_drag_out: function(e){
            e.stopPropagation();
            e.preventDefault();
            if(LinkGrabber.textarea == null) return;
            if(e.target == LinkGrabber.textarea) LinkGrabber.detach_ta();
        },

        evt_drop: function(e){
            e.stopPropagation();
            e.preventDefault();
            if(e.target == LinkGrabber.textarea) {
                LinkGrabber.evt_got_link(e.dataTransfer.getData('URL'));
                console.log(e.dataTransfer.getData('URL'))
            } else{
                LinkGrabber.detach_ta()
            }

        },

        isUrl:function (string)
        {
            const regex = /(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,63}(:[0-9]{1,5})?(\/.*)?/g;
            return regex.test(string) ? string.match(regex) : false;
        },

        /* Start/Stop */
        evt_default: function(e) {
            e.stopPropagation();
            e.preventDefault();
        },

        start: function(folder){
            LinkGrabber.folder = folder;
            document.addEventListener("dragover", LinkGrabber.evt_drag_over, false);
            document.addEventListener("drop", LinkGrabber.evt_drop, false);
        },

        /*stop: function(){
            document.removeEventListener("dragover", LinkGrabber.evt_drag_over);
            document.removeEventListener("dragenter", LinkGrabber.evt_drag_over);

            document.removeEventListener("mouseup", LinkGrabber.evt_drag_out);
            document.removeEventListener("dragleave", LinkGrabber.evt_drag_out);
            LinkGrabber.detach_ta();
        },*/
    };

    class Folder {
        constructor(name) {
            this.name = name;
            this.id = '_' + Math.random().toString(36).substr(2, 9); //random id generated
            this.items = [] //items saved
        }
    }

    class Item {
        /**
         * @param name  name of item
         * @param link  link to item
         * @param img   image used to show in DOM
         */
        constructor(name, link, img){
            this.name = name; //name of item, edited by user.
            this.id = 'item_' + Math.random().toString(36).substr(2, 9); //random id generated
            this.link = link;
            this.img = img;
        }
    }

    /*HELPER FUNCTIONS*************************************************************************************************/


    function openMainNav() {
        $('#mySidenav').css("width", "350px");
        $('#main').css("margin-left", "350px");
        $('#mySidenav').css("visibility", "visible");


    }

    /**
     * opens the folder drawer created
     */
    function openNav(id) {
        $('#' + id).css("visibility", "visible");
        $('#' + id).css("width", "350px");
        $('#main').css("margin-left", "350px");
    }

    /**
     * closes the drawer created
     */
    function closeNav() {
        $('.sidenav').css("visibility", "hidden");
        $('.sidenav').css("width", "0");
        $('#main').css("margin-left", "0");
    }

    function hideMainDrawer(){
        $('#mySidenav').css("visibility", "hidden");
        $('#mySidenav').css("width", "0");
        $('#main').css("margin-left", "0");

    }

    function createNewFolder(){
        const newFolder = new Folder("New folder");
        //add to folders
        _self.folders.push(newFolder);
        displayNewFolderPage(newFolder);
    }

    function displayNewFolderPage(newFolder){

        hideMainDrawer();
        //TODO: change id to created id
        //https://stackoverflow.com/questions/48239/getting-the-id-of-the-element-that-fired-an-event
        const newFolderPage = $('<div></div>', {id: `${newFolder.id}PAGE`, class: 'sidenav'});
        $('body').append(newFolderPage);
        addFolderHeader(newFolder.id, newFolder.name);
        openNav(newFolderPage.attr("id"));
        LinkGrabber.start(newFolderPage.attr("id"));
        displayNewFolder(newFolder);
    }

    function addFolderHeader(id, name) {
        //$("#").blur();
        const folderName = $('<input>', {id: `${id}NAME`, type: 'text', value:`${name}`});
        
        //edit css of folder name
        folderName.css({
            'padding' : '8px 8px 8px 0px',
            'text-decoration' : 'none',
            'font-size' : '18px',
            'font-weight' : 'bold',
            'color' : '#f1f1f1',
            'height' : '15px',
            'width' : '70%',
            'position' : 'absolute',
            'top' : '13px',
            'left' : '0',
            'margin-left' : '38px',
            'margin-top' : '0',
            'border-style' : 'hidden',
            'background' : 'transparent',
            'text-overflow' : 'ellipsis'
        });

        folderName.on( "mouseenter", function(){
            $(this).css("background", "#818181");
        })
        folderName.on( "mouseleave", function(){
            $(this).css("background", "transparent");
        })

        const backButton =  $('<a></a>', {href: "#", class: "backbtn"}).html('&#8249;');
        backButton.on("click", function() {closeNav(); openMainNav(); return false});

        const exitButton = $('<a></a>', {href: "javascript:void(0)", class: "closebtn"}).html('&times;');
        exitButton.on("click", function() {closeNav()});

        //TODO: implement add current page
        const savePage = $('<a></a>', {href: "#", id: "createFolder"}).html('&plus; Save current page');
        savePage.on("click", function(){
            displayNewSave(id);
            return false;
        })


        const header = $('<div></div>', {class: 'header'});
        header.append(backButton, folderName, exitButton, savePage);

        const savedItems = $('<div></div>', {class: 'savedItems'});

        //add header and saved items to current folder page
        $('#' + id +"PAGE").append(header, savedItems);


        //autofocus on name of folder to show user that they have ability to change folder name
        $( document ).ready(function() {
            $( "#" + $(folderName).attr("id")).focus();
        });
        $("#" + $(folderName).attr("id")).focus(function() {
            $(this).select();
        });

        //update folder name in _self.folders and DOM
        $("#" + $(folderName).attr("id")).on("input", function() {
            _self.folders.filter((f) => f.id === id)[0].name = this.value;
            $('#'+ id +' b').text(_self.folders.filter((f) => f.id === id)[0].name);
        });

    }

    /**
     * creates new folder in main drawer DOM
     * @param newFolder  Folder
     */
    function displayNewFolder(newFolder){
        const folder = $('<div></div>', {class: "folder", id: `${newFolder.id}`});
        $('.drawerBody').append(folder);

        const clickFolder = $('<a></a>', {href: "#"});

        clickFolder.on("click", function(){
            openFolder(newFolder.id + "PAGE");
            return false;
        })

        const folderInformation = $('<div></div>', {class: "folderInfo"});
        const folderName = $('<h4>').append($('<b>').text(`${newFolder.name}`));
        const numberOfItems = $('<p>').text(`${newFolder.items.length} items`);

        folderInformation.append(folderName);
        folderInformation.append(numberOfItems);

        clickFolder.append(folderInformation);
        folder.append(clickFolder)

    }

    function displayNewSave(folderID){
        //TODO: add ability to edit name


        //TODO: change this to actually save link, not hash

        //get first text and name the item this
        let name = $($(location).attr('hash').toString()).contents().first().text().toString();
        if(name === '') {
            name = 'Main Page';
        }

        const item = new Item(name,$(location).attr('hash').toString(), "");

        //console.log(_self.folders);
        //store image
        // $($(location).attr('hash').toString()+'img').first();

        const folder = $('<div></div>', {class: "folder", id: `${item.id}`});
        //console.log(folderID);
        $('#' + folderID + 'PAGE').find('.savedItems').append(folder);

        const clickFolder = $('<a></a>', {href: `${item.link}`});
        //check if link saved is not main page
        if(item.link !== "") {
            clickFolder.on("click", function(){
                //update this to show actual link not hash
                show(item.link);
            })
        } else {
            clickFolder.attr("href", '#');
            clickFolder.on("click", function(){
                //show main page
                show('');
            })
        }
        // console.log(item.link)
        // console.log($(item.link).contents().first().text().toString());
        // console.log(item.name);


        const folderInformation = $('<div></div>', {class: "folderInfo"});

        //update item name to first
        const folderName = $('<h4>').append($('<b>').text(`${item.name}`));


        folderInformation.append(folderName);
        clickFolder.append(folderInformation);
        folder.append(clickFolder)

        //save item to object
        const currentFolder =  _self.folders.filter((f) => f.id === folderID)[0]
        currentFolder.items.push(item);

        //console.log(_self.folders);

        //update length in main drawer
        $('#'+ folderID +' p').text(`${currentFolder.items.length} items`);

    }

    function displayNewSaveUrl(folderID, link) {
        //TODO: add ability to edit name


        //TODO: change this to actually save link, not hash

        //get url path name and use it as name
        const url = new URL(link);
        const name = url.pathname + url.hash;

        const item = new Item(name, link, link);



        const folder = $('<div></div>', {class: "folder", id: `${item.id}`});
        $('#' + folderID).find('.savedItems').append(folder);

        //check if link is image url {
        if(link.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            createImageModal(item.id, link); //create invisible modal of image saved and put it in folder
        }
        const clickFolder = $('<a></a>', {href: `${item.link}`});
        //check if link saved is not main page
        if(item.link !== "") {
            clickFolder.on("click", function(){
                //update this to show actual link not hash
                if(link.match(/\.(jpeg|jpg|gif|png)$/) != null){
                    //if image then show
                    $('#' + item.id + " .modal").css("display", "block");
                    return false;
                } else {
                    show(`${url.hash}`);
                    return true;
                }
            })
        } else {
            clickFolder.attr("href", '#');
            clickFolder.on("click", function(){
                //show main page
                show('');
            })
        }

        const folderInformation = $('<div></div>', {class: "folderInfo"});

        //update item name to first
        const folderName = $('<h4>').append($('<b>').text(`${item.name}`));


        folderInformation.append(folderName);
        clickFolder.append(folderInformation);
        folder.append(clickFolder)

        //save item to object
        const currentFolder =  _self.folders.filter((f) => f.id === folderID.slice(0, -4))[0]
        currentFolder.items.push(item);

        //update length in main drawer
        $('#'+ folderID +' p').text(`${currentFolder.items.length} items`);

    }

    function createImageModal(folderID, link){
        const modal = $('<div>', {class:"modal"});
        const closebtn = $('<span>', {class: "closebutton"}).html('&times;');
        closebtn.on("click", function(){
            modal.css("display", "none");
        })
        const image = $('<img>', {class:"modal-content"});
        image.attr("src", link);
        modal.append(closebtn, image);
        //console.log(folderID);
        $('#' + folderID).append(modal);
    }



    function openFolder(id) {
        hideMainDrawer();
        openNav(id);
        LinkGrabber.start(id);

    }

    function addHeader() {
        const header = $('<div></div>', {class: 'header'});
        const drawerBody = $('<div></div>', {class: 'drawerBody'});
        $('#mySidenav').append(header, drawerBody);

        const title = $('<h5></h5>', {id: 'title'}).text('Assemblage');

        const exitButton = $('<a></a>', {href: "javascript:void(0)", class: "closebtn"}).html('&times;');
        exitButton.on("click", function() {closeNav()});

        const createFolder = $('<a></a>', {href: "#", id: "createFolder"}).html('&plus; Create new folder');

        $('.header').append(title, exitButton, createFolder);
    }


    // this is for multiple pages in one html file.
    function show(elementID) {
        // try to find the requested page and alert if it's not found
        /*TODO: update library to handle multiple separate pages*/
        // var ele = document.getElementById(elementID);
        // if (!ele) {
        //     return;
        // }

        // get all pages, loop through them and hide them
        var pages = document.getElementsByClassName('page');
        for(var i = 0; i < pages.length; i++) {
            pages[i].style.display = 'none';
        }

        // then show the requested page
        $(elementID).css("display",'block');
    }


    /*allowed to use and access by developer***************************************************************************/
    const _self = {};
    _self.folders = [new Folder("Sample Folder")]

    //create first assemblage drawer to page
    _self.createAssemblage = function(){
        const drawer = $('<div></div>', {id: "mySidenav", class: 'sidenav'});
        $('body').append(drawer)
        addHeader();

        $('#createFolder').on("click", function() {createNewFolder(); return false;});
    }


    //TODO: add assemblage in another page
    /*_self.recreateAssemblage = function(){

    }*/

    /**
     * This will add the ability for the developer to open the drawer using the button they created
     * @param buttonClass the class name of the button created by developer
     */
    _self.openDrawer = function(buttonClass) {
        $("." + buttonClass).on("click", function() {closeNav(); openMainNav(); return false;});
    }

    //functions for handling dragging


    // _self.ondragover = function(event) {
    //     event.preventDefault();
    // };
    //
    // _self.onDrop = function (event) {
    //     const id = event
    //         .dataTransfer
    //         .getData('text');
    // };



    return _self;
}
//
// function allowDrop(ev) {
//     ev.preventDefault();
// }
//
// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }
//
// function drop(ev) {
//     ev.preventDefault();
//     const data = ev.dataTransfer.getData("text");
//     const nodeCopy = document.getElementById(data).cloneNode(true);
//     nodeCopy.id = "newId"; /* We cannot use the same ID */
//     ev.target.appendChild(nodeCopy);
// }


