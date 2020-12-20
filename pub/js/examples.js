/* JS Library usage examples */
"use strict";

const e = assemble();

if (e.getFolders() === null) {
    const exampleFoldersList =
        [{"name":" Examples of Save Current Page","id":"_evpb4p6a5",
            "items":
                [{"name":"Main Page","id":"item_xup8jztm7","link":"https://protected-citadel-39083.herokuapp.com/index.html"}]},
            {"name":"URL dragged into folder","id":"_vd79bkqxi",
                "items":
                    [{"name":"/images/sample.jpg","id":"item_wsllsw2tw","link":"https://protected-citadel-39083.herokuapp.com/images/sample.jpg"},
                        {"name":"random image from google","id":"item_51qhgqtb6","link":"https://miro.medium.com/max/2400/1*MI686k5sDQrISBM6L8pf5A.jpeg"},
                        {"name":"Youtube Video","id":"item_fepe2mrgu","link":"https://www.youtube.com/watch?v=5qap5aO4i9A"},
                        {"name":"gif from Tenor","id":"item_vmfy0kl0l","link":"https://media1.tenor.com/images/806fa85fc55a55de66ab310e500b5f0f/tenor.gif"},
                        {"name":"MP4 Video","id":"item_nu875gu23","link":"https://protected-citadel-39083.herokuapp.com/images/sampleVideo.mp4"}]}];
    e.reAssemblage({}, exampleFoldersList)

} else {
    e.reAssemblage({}, e.getFolders())
}
e.openDrawer("openDrawer");
