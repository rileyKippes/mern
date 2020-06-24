var fs = require('fs');
var config;
class utils{

static getHTMLHead()
{
	var html = '<head>\n';
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
	return html
}

//deprecated
/*static getHTMLTemplate(template,data){
	console.log("getHTMLTemplate("+template+","+data+");");
	var html = '';
	function makeTable(data){
		var html = '<table>';
		function tableRow(car){
			html+='<tr><td>'+car.make+'</td><td>'+car.model+'</td></tr>';
			console.log(car);
		}
		data.forEach(tableRow);
		html += '</table>';
		return html;
	}
	html += fs.readFileSync('./views/'+template);
	console.log(data);
	//html += makeTable(data);
	return html;
} */
//deprecated
/*
static getHTMLTemplate(template){
	return ""+fs.readFileSync('./views/'+template);
}*/

static getBetterHTMLTemplate(template){
	var html = this.getHTMLHead();
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
	console.log(' Now Listening at http://localhost:8080/ \n');
	console.log('    Date    |   Time   | Method | Route ');
}


static getPrettyRequest(req){
	var output = "";
	var method = req.method.toString().padEnd(4,' ');
	output = '|  ' + method + '  | ' + req.originalUrl;
	return output;
}

static debug(message){
	if(config.debug){
		console.log(message);
	}
}

static getPrettyLog(req){
	console.log(this.getPrettyTime() + ' ' + this.getPrettyRequest(req));
}

static loadConfig(){
	console.log("Loading Config File");
	config = ""+fs.readFileSync('./config.json');
	config = JSON.parse(config);
	console.log(config);
	console.log("Config file loaded");
	return config;
}

static getConfig(){
	return config;
}

}

module.exports = utils;
