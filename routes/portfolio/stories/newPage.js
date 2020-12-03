'use strict'

var express = require('express');
var router = express.Router();
var utils = require('../../../ts_built/utils');
var db = require('../../../ts_built/mongo_manager');
const collName = 'pages';

router.get('/',function (req,res) {
	res.send(utils.loadScript('/portfolio/stories/newpage.js', 'new_page_container', { title: "New Page" }));
});

function updateAllPages(storyID, pageID){
    //var story = await db.findByID('story',storyID);
    
}

router.post('/',function (req,res) {
    /*
    * pages are a doubly linked list
    * every page has a link to the story, first page, prev page, next page, and last page
    * every new page is auto added to the end of the list
    * this means that all pages associated with a story must be updated with the new link
    * */

    //todo: this
    console.log("post new page");
    var objectid = db.ObjectID();
    var pageID = objectid(Date.now());
    var currPageID = req.body.story.firstPageID;
    var StoryID = req.body.storyID;
    var newNumPages = 1;
    if(req.body.story.numPages){
        newNumPages = req.body.numPages++;
    }
    console.log("newNumPages = " + newNumPages);
    db.updateByID('stories',StoryID,{lastPageID: pageID, numPages: newNumPages})
    .catch((err) => {
		console.log(helpfulIDMessage);
		console.log(err);
    });

    if(newNumPages > 1){ 

    }

    /*this.findByID('stories', StoryID).then((ret) => { 
        return ret; 
    }).then((story) => {

    })
    var newPage = {
		_id:pageID,
		storyID:StoryID,
		firstPageID:pageID,
		prevPageID:null,
		nextPageID:pageID,
		lastPageID:pageID,
		text: req.body.storyText,
		pageNum: 0,
	};*/
    res.sendStatus(501); 
});

module.exports = router;