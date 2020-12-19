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
                displayNewItem(LinkGrabber.folder.slice(0, -4), link);
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
                //console.log(e.dataTransfer.getData('URL'))
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
        $('#mySidenav').css("width", set.width);

        if (set.value === "right"){
            $('#main').css("margin-right", set.width);
        } else{
            $('#main').css("margin-left", set.width);
        }

        $('#mySidenav').css("visibility", "visible");


    }

    /**
     * opens the folder drawer created
     */
    function openNav(id) {
        $('#' + id).css("visibility", "visible");
        $('#' + id).css("width", set.width);
        if (set.value === "right") {
            $('#main').css("margin-right", set.width);
        } else {
            $('#main').css("margin-left", set.width);
        }
    }

    /**
     * closes the drawer created
     */
    function closeNav() {
        $('.sidenav').css("visibility", "hidden");
        $('.sidenav').css("width", "0");
        if (set.value === "right") {
            $('#main').css("margin-right", "0");
        } else {
            $('#main').css("margin-left", "0");
        }
    }

    function hideMainDrawer(){
        $('#mySidenav').css("visibility", "hidden");
        $('#mySidenav').css("width", "0");
        if (set.value === "right") {
            $('#main').css("margin-right", "0");
        } else {
            $('#main').css("margin-left", "0");
        }

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

        newFolderPage.css( set.value,"0")

        $('body').append(newFolderPage);
        //if developer changed background color
        if(colorTheme.background){
            $('.sidenav').css("background-color", colorTheme.background)
        }
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

        if(colorTheme.titleFont){
            folderName.css("color", colorTheme.titleFont);
        }

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

        if(colorTheme.buttonColor && colorTheme.buttonHoverColor){
            exitButton.css("color", colorTheme.buttonColor)
            exitButton.on("mouseenter", function(){
                $(this).css("color", colorTheme.buttonHoverColor)
            }).on("mouseleave", function(){
                $(this).css("color",colorTheme.buttonColor)
            })
            backButton.css("color", colorTheme.buttonColor)
            backButton.on("mouseenter", function(){
                $(this).css("color", colorTheme.buttonHoverColor)
            }).on("mouseleave", function(){
                $(this).css("color",colorTheme.buttonColor)
            })
        }

        const savePage = $('<a></a>', {href: "#", id: "createFolder"}).html('&plus; Save current page');
        if(colorTheme.secondaryFont && colorTheme.hoverFont){
            savePage.css("color", colorTheme.secondaryFont)
            savePage.on("mouseenter", function(){
                $(this).css("color", colorTheme.hoverFont)
            }).on("mouseleave", function(){
                $(this).css("color",colorTheme.secondaryFont)
            })
        }
        savePage.on("click", function(){
            displayNewItem(id);
            return false;
        })


        const header = $('<div></div>', {class: 'header'});
        if(colorTheme.headerBackground){
            header.css("background-color", colorTheme.headerBackground)
        }
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

        //if developer changes folder background color
        if(colorTheme.folderBackground){
            folder.css("background-color", colorTheme.folderBackground)
        }
        $('.drawerBody').append(folder);

        const clickFolder = $('<a></a>', {href: "#"});

        clickFolder.on("click", function(){
            openFolder(newFolder.id + "PAGE");
            return false;
        })

        const folderInformation = $('<div></div>', {class: "folderInfo"});
        const folderName = $('<h4>').append($('<b>').text(`${newFolder.name}`));
        const numberOfItems = $('<p>').text(`${newFolder.items.length} items`);
        const deleteButton = $('<object></object>').append(
            $('<a></a>', {href: "javascript:void(0)", id: "deleteBtn"})
                .html('&#128465;'));

        if(colorTheme.secondaryButtonColor && colorTheme.secondaryHoverColor) {
            deleteButton.find('#deleteBtn').css("color", colorTheme.secondaryButtonColor)
            deleteButton.find('#deleteBtn').on("mouseenter", function () {
                $(this).css("color", colorTheme.secondaryHoverColor)
            }).on("mouseleave", function () {
                $(this).css("color", colorTheme.secondaryButtonColor)
            })
        }

        deleteButton.on("click",function(e){
            deleteFolder(newFolder)
            //stop click from propagating
            if (!e) {let e = window.event;
            e.cancelBubble = true;}
            if (e.stopPropagation) e.stopPropagation();
        })

        //if developer changes main font color
        if(colorTheme.mainFont){
            folderName.css("color", colorTheme.mainFont)
            numberOfItems.css("color",colorTheme.mainFont)
        }

        folderInformation.append(folderName);
        folderInformation.append(numberOfItems);

        clickFolder.append(deleteButton);
        clickFolder.append(folderInformation);
        deleteButton.css("display", "none")
        clickFolder.on("mouseenter", function(){
            deleteButton.css("display", "block")
        }).on("mouseleave", function(){
            deleteButton.css("display", "none")
        })
        folder.append(clickFolder)

    }

    function deleteFolder(folderObj){
        //remove folder page from DOM
        $('#' + folderObj.id + 'PAGE').remove();

        //remove folder from DOM
        $("#"+ folderObj.id).remove();

        _self.folders = _self.folders.filter( obj => obj.id !== folderObj.id);
    }

    /**
     * This is to show new saved item
     * @param folderID id of the folder to save new item to
     * @param link takes user to this link when saved item is clicked.
     */
    function displayNewItem(folderID, link){
        //TODO: add ability to edit name


        //TODO: change this to actually save link, not hash
        let item;
        //get url path name and use it as name
        if(link) {
            const url = new URL(link);
            const name = url.pathname + url.hash;

            item = new Item(name, link, link);

        } else {

            //get first text and name the item this
            let name = $($(location).attr('hash').toString()).contents().first().text().toString();
            if(name === '') {
                name = 'Main Page';
            }

            item = new Item(name,$(location).attr('hash').toString(), "");
            //console.log(_self.folders);
            //store image
            // $($(location).attr('hash').toString()+'img').first();
        }

        const folder = $('<div></div>', {class: "folder", id: `${item.id}`});
        //console.log(folderID);
        $('#' + folderID + 'PAGE').find('.savedItems').append(folder);
        //if developer changes folder background color
        if(colorTheme.folderBackground){
            folder.css("background-color", colorTheme.folderBackground)
        }

        if (link){
            if(link.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                createImageModal(item.id, link); //create invisible modal of image saved and put it in folder
            }
        }


        const clickFolder = $('<a></a>', {href: `${item.link}`});
        //check if link saved is not main page
        if(link){
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
        } else {
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

        }


        const folderInformation = $('<div></div>', {class: "folderInfo"});

        //update item name to first
        const folderName = $('<h4>').append($('<b>').text(`${item.name}`));
        //if developer changes main font color
        if(colorTheme.mainFont){
            folderName.css("color", colorTheme.mainFont)
        }

        const deleteButton = $('<object></object>').append(
            $('<a></a>', {href: "javascript:void(0)", id: "deleteBtn"})
                .html('&#128465;'));

        const editNameButton = $('<object></object>').append(
            $('<a></a>', {href: "javascript:void(0)", id: "editBtn"})
                .html('&#9998;'));

        //Change color of delete button and save button if developer sets default
        if(colorTheme.secondaryButtonColor && colorTheme.secondaryHoverColor) {
            deleteButton.find('#deleteBtn').css("color", colorTheme.secondaryButtonColor)
            deleteButton.find('#deleteBtn').on("mouseenter", function () {
                $(this).css("color", colorTheme.secondaryHoverColor)
            }).on("mouseleave", function () {
                $(this).css("color", colorTheme.secondaryButtonColor)
            })

            editNameButton.find('#editBtn').css("color", colorTheme.secondaryButtonColor);
            editNameButton.find('#editBtn').on("mouseenter", function () {
                $(this).css("color", colorTheme.secondaryHoverColor)
            }).on("mouseleave", function () {
                $(this).css("color", colorTheme.secondaryButtonColor)
            })
        }

        deleteButton.on("click",function(e){
            deleteItem(folderID, item.id)
            //stop click from propagating
            if (!e) {let e = window.event;
                e.cancelBubble = true;}
            if (e.stopPropagation) e.stopPropagation();
        })

        folderInformation.append(folderName);

        //when edit name button clicked, allow user to edit name
        editNameButton.on("click",function(e){
            const editName = $('<input>', {id: `${item.id}NAME`, type: 'text', value:`${item.name}`});

            //edit css of folder name
            editName.css({
                'padding' : '8px 8px 8px 0px',
                'text-decoration' : 'none',
                'font-weight' : 'bold',
                'color' : '#ff6768',
                'height' : '15px',
                'width' : '60%',
                'position' : 'absolute',
                'top' : '60px',
                'left' : '-6px',
                'margin-left' : '38px',
                'margin-top' : '0',
                'border-style' : 'hidden',
                'background' : '#313131',
                'text-overflow' : 'ellipsis',
                'display': 'block'
            });

            const saveButton = $('<button>', {href: "javascript:void(0)", id: "saveBtn"}).html('&#128190; SAVE');

            //if developer changes color
            if(colorTheme.secondaryFont){
                editName.css("color", colorTheme.secondaryFont)
                saveButton.css("color", colorTheme.secondaryFont)
            }
            if(colorTheme.headerBackground){
                editName.css("background",colorTheme.headerBackground)
            }

            editName.on("click", function(){
                if (!e) {let e = window.event;
                    e.cancelBubble = true;}
                if (e.stopPropagation) e.stopPropagation();
            })

            $( document ).ready(function() {
                editName.focus();
            });
            editName.focus(function() {
                $(this).select();
            });
            editName.blur(function(){

                _self.folders.filter((f) => f.id === folderID)[0].items
                    .filter((i)=>i.id === item.id)[0].name = $('#'+ item.id  +' input').val();
                //update DOM with new Saved Item Name
                $('#'+ item.id  +' b').text($('#'+ item.id  +' input').val());
                $('#'+ item.id  +' input').remove();
                $('#saveBtn').remove();
            })
            folder.append(editName);
            folder.append(saveButton);
            //stop click from propagating
            if (!e) {let e = window.event;
                e.cancelBubble = true;}
            if (e.stopPropagation) e.stopPropagation();

            saveButton.on("click", function(e){

                //update item object name
                _self.folders.filter((f) => f.id === folderID)[0].items
                    .filter((i)=>i.id === item.id)[0].name = $('#'+ item.id  +' input').val();
                //update DOM with new Saved Item Name
                $('#'+ item.id  +' b').text($('#'+ item.id  +' input').val());
                $('#'+ item.id  +' input').remove();
                $('#saveBtn').remove();
            })
        })


        clickFolder.append(deleteButton);
        clickFolder.append(editNameButton);
        clickFolder.append(folderInformation);
        deleteButton.css("display", "none")
        editNameButton.css("display", "none")

        clickFolder.on("mouseenter", function(){
            deleteButton.css("display", "inline")
            editNameButton.css("display", "inline")
        }).on("mouseleave", function(){
            deleteButton.css("display", "none")
            editNameButton.css("display", "none")
        })
        folder.append(clickFolder)

        //save item to object
        let currentFolder;
        currentFolder =  _self.folders.filter((f) => f.id === folderID)[0]
        currentFolder.items.push(item);

        //update length in main drawer
        $('#'+ folderID +' p').text(`${currentFolder.items.length} items`);

    }

    function deleteItem(folderID, itemID){
        //console.log(folderID + " " + itemID)
        $('#' + itemID).remove();

        //remove item from folder Objs
        const indexToDelete = _self.folders.findIndex(obj => obj.id === folderID);
        //console.log(indexToDelete);
        _self.folders[indexToDelete].items.splice(_self.folders[indexToDelete].items.findIndex(obj => obj.id === itemID),1)

        //update number of items in folder DOM
        $('#'+ folderID +' p').text(`${_self.folders[indexToDelete].items.length} items`);
    }

    function createImageModal(itemID, link){
        const modal = $('<div>', {class:"modal"});
        const closebtn = $('<span>', {class: "closebutton"}).html('&times;');
        closebtn.on("click", function(){
            modal.css("display", "none");
        })
        const image = $('<img>', {class:"modal-content"});
        image.attr("src", link);
        modal.append(closebtn, image);
        //console.log(folderID);
        $('#' + itemID).append(modal);
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

        const title = $('<h5></h5>', {id: 'title'}).text(`${set.title}`);

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
    _self.folders = []
    const set = {value: "left", title: "Assemblage", width: "350px"}

    //create first assemblage drawer to page
    /**
     *
     * @param settings Accepts the following settings: {position: "right", title: "Assemblage", width: "350px"}
     */
    _self.createAssemblage = function(settings){
        const drawer = $('<div></div>', {id: "mySidenav", class: 'sidenav'});

        if(settings.position === "right" ) {
            drawer.css(settings.position, 0);
            set.value = settings.position
        } else {
            drawer.css("left", 0)
        }

        if(settings.title){
            //accept only up to 22 characters
            if(settings.title.length > 22) {
                set.title = settings.title.slice(0, -(settings.title.length - 22));
            } else{
                set.title = settings.title
            }
        }
        if(settings.width){
            set.width = settings.width;
        }

        $('body').append(drawer)
        addHeader();

        $('#createFolder').on("click", function() {createNewFolder(); return false;});
    }

    //store colors received from developer
    const colorTheme = {};

    _self.changeBackgroundColor = function(background){
        if(background){
            $('.sidenav').css("background-color", background)
            colorTheme.background = background;
        }
    }

    _self.changeHeaderBackgroundColor = function(headerBackground){
        if(headerBackground){
            $('.header').css("background-color", headerBackground)
            colorTheme.headerBackground = headerBackground;
        }
    }

    _self.changeFolderBackgroundColor = function(folderBackground){
        if(folderBackground){
            $('.folder').css("background-color", folderBackground)
            colorTheme.folderBackground = folderBackground;
        }
    }

    /**
     * Change color of folder names and saved items names
     * @param mainFont color of main font
     */
    _self.changeMainFontColor = function(mainFont){
        if(mainFont){
            $('.folderInfo').find('b').css("color", mainFont)
            $('.folderInfo').find('p').css("color", mainFont)
            colorTheme.mainFont = mainFont;
        }
    }

    _self.changeTitleFontColor = function(titleFont){
        if(titleFont){
            $('#title').css("color", titleFont)
            colorTheme.titleFont = titleFont;
        }
    }

    _self.changeSecondaryFontColor = function(secondaryFont, hoverFont){
        if(secondaryFont && hoverFont){
            colorTheme.secondaryFont = secondaryFont;
            colorTheme.hoverFont = hoverFont;
            $('#createFolder').css("color", secondaryFont)
            $('#createFolder').on("mouseenter", function(){
                $(this).css("color", hoverFont)
            }).on("mouseleave", function(){
                $(this).css("color",secondaryFont)
            })

        }
    }

    _self.changeButtonColor = function(color, hoverColor){
        if(color && hoverColor){
            $('.closebtn').css("color", color)
            $('.closebtn').on("mouseenter", function(){
                $(this).css("color", hoverColor)
            }).on("mouseleave", function(){
                $(this).css("color", color)
            })
            colorTheme.buttonColor = color;
            colorTheme.buttonHoverColor = hoverColor;
        }
    }

    _self.changeSecondaryButtonColor = function(color, hoverColor){
            colorTheme.secondaryButtonColor = color;
            colorTheme.secondaryHoverColor = hoverColor;
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

    _self.getFolders = function(){
        return _self.folders;
    }


    return _self;
}