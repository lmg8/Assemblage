# js-library-guintulu

Link to landing page: https://protected-citadel-39083.herokuapp.com/

Documentation: https://protected-citadel-39083.herokuapp.com/documentation.html
### Getting Started

Download the library from Github.

To use Assemblage Library, add the following stylesheet and scripts to your webpage:
```html
    <!--Library Style Sheet-->
    <link rel="stylesheet" type="text/css" href="Assemblage_styles.css">
    <!--Load jquery from Google CDN.-->
    <script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <!--Load Assemblage Library-->
    <script defer type="text/javascript" src='./js/Assemblage.js'></script>
```
##### Basic Functionality
This example shows how to initialize the library and the bare minimum to create an Assemblage drawer.
It also shows how to assign an onClick event on a button you created, which will open the Assemblage drawer.

```javascript
    const a = assemble();
    a.createAssemblage({});
    //buttonClass is the class name of the button you created to open Assemblage
    a.openDrawer("buttonClass");
   ```         
The following is an example of a button to open Assemblage:

```html
    <span class="buttonClass">&#9776; Click me to try it out</span>
```              
*Note: If you would like the Assemblage drawer to not overlay your webpage, but instead to push your page content like the main page example,
wrap your webpage body content in a div with id name "main" like so:
 ```html
 <body>
    <div id="main">
        <!--You're main content goes here-->
    </div>
    <div>
        <!--Assemblage drawer will go here-->
    </div>
 </body>
```
Currently, Assemblage saves to the clientside's localStorage.
The following code will show how to save the client's folders before they navigate away from your webpage.
```javascript
    const a = assemble();
    if (a.getFolders() === null) {
        a.createAssemblage({})

    } else {
        a.reAssemblage({}, e.getFolders())
    }
    a.openDrawer("buttonClass");
```
The following example shows how to customize Assemblage to your liking.

```javascript
    const a = assemble();
    a.createAssemblage({title: "Developer Title", width:"500px", position:"right"})
    a.changeHeaderBackgroundColor("#252A34");
    a.changeTitleFontColor("#ff2e63")
    a.changeSecondaryFontColor("white", "#C594C5");
    a.changeHeaderButtonColor("#eaeaea", "#FAC863")

    a.changeBackgroundColor("#667188")
    a.changeFolderBackgroundColor("#36485d");
    a.changeFolderButtonColor("#a9e9a4", "white")
    a.changeFolderFontColor("white");
    e.openDrawer("openDrawer");
```