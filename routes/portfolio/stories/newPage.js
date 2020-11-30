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

    var objectid = db.ObjectID();
    var pageID = objectid(Date.now());
    var StoryID = req.body.storyID;
    console.log(req.body);
    console.log("/n/n\n\n");
    console.log(StoryID);

    console.log('updateAllPages');
    db.findByID('stories', StoryID).then((ret) => {
        console.log(ret);
        return ret;
    }).then((ret) => {

    }).catch((err) => {
		console.log(helpfulIDMessage);
		console.log(err);
		res.status(500).json({ _id: null, title: "server error" });
	});

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