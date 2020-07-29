var fs = require('fs');
var config;
class utils{

static getHTMLHead()
{
	var html = '<html>\n'
	html += '<head>\n';
	html += '<title> Index </title>\n';
	html+= '<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>\n';
	html+= '<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>\n';
	html+= '<link rel="stylesheet" type="text/css" href="/style.css">\n';	
	html+= '<link rel="icon" href="/logo.svg">\n';	
	html += '</head>\n';
	html += '<body>\n';
	html += '<div id="navbar"> Navbar </div>\n';
	html += '<script src="/navbar.js"></script>\n';
	html += '<div id="main_div_container">\n';
	html += '<div id="main_div">\n';
	return html;
}

static getCustomHTMLHead(data){
	var html = '<html>\n'
	html += '<head>\n';
	if(data.title === undefined){
		html += "<title> Riley Kippes' website </title>\n";
	}
	else{
		html += '<title> '+data.title+' </title>\n';
	}
	if(data.style != undefined){
		html += html+= '<link rel="stylesheet" type="text/css" href="'+data.style+'">\n';
	}
	html+= '<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>\n';
	html+= '<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>\n';
	html+= '<link rel="stylesheet" type="text/css" href="/style.css">\n';	
	html+= '<link rel="icon" href="/logo.svg">\n';	
	html += '</head>\n';
	html += '<body>\n';
	html += '<div id="navbar"> Navbar </div>\n';
	html += '<script src="/navbar.js"></script>\n';
	html += '<div id="main_div_container">\n';
	html += '<div id="main_div">\n';
	return html;
}

static getBetterHTMLTemplate(template, data){
	if(data === undefined){
		this.debug("Route still exists without custom title. Template requested was "+template);
		var html = this.getHTMLHead();
	}
	else{
		var html = this.getCustomHTMLHead(data);
	}
	html += fs.readFileSync('./views/'+template);
	html += "</div>";
	html += "</div>";
	html += "</body>";
	html += "</html>";
	return html;
}

static getPrettyTime(){
	var d = new Date();
	var date = d.getFullYear()+'-';
	date += d.getMonth().toString().padStart(2,'0')+'-';
	date += d.getDate().toString().padStart(2,'0');
	var time = d.getHours().toString().padStart(2,'0')+':';
	time += d.getMinutes().toString().padStart(2,'0')+':';
	time += d.getSeconds().toString().padStart(2,'0');
	return ' '+date + ' | ' + time;
}


static listen(){
	console.log(' Now Listening at http://localhost:'+config.port);

}

static debug(message){
	if(config.debug){
		console.log(message);
	}
}

static loadConfig(){
	config = ""+fs.readFileSync('./config.json');
	config = JSON.parse(config);
	this.debug("Config file loaded");
	this.debug(config);
	return config;
}

static getConfig(){
	return config;
}

}

module.exports = utils;
