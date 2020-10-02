var fs = require('fs');
var config;
class utils{

static getHTMLHead()
{
	//depreciated
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
	//this entire thing could be done with templates
	//will do that at a later date
	var html = '<!DOCTYPE html>'
	html += '<html lang="en">\n'
	html += '<head>\n';
	if(data.title === undefined){
		html += "<title> Riley Kippes' website </title>\n";
	}
	else{
		html += '<title> '+data.title+' </title>\n';
	}
	html += '<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>\n';
	html += '<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>\n';
	html += '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>';
	html += '<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>';
	html += '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>';
	html += '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">\n';
	html += '<link rel="icon" href="/logo.svg">\n';	
	html += '<meta name="viewport" content="width=device-width, initial-scale=1">';
	html += '<meta charset="utf-8">';
	html += '</head>\n';
	html += '<body class="bg-dark text-light">\n';
	html += '<nav class="navbar navbar-expand-sm bg-dark navbar-dark"> Navbar </nav>\n';
	html += '<script src="/navbar.js"></script>\n';
	html += '<div id="main_div_container" >\n';
	html += '<div id="main_div" class="px-3 pb-3">\n';
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
	this.debug(JSON.stringify(config,null,2));
	return config;
}

static getConfig(){
	return config;
}

}

module.exports = utils;
