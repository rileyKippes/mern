var fs = require('fs');

class utils{
static getHTMLHead()
{
	var html = '<head>\n';
	html += '<title> Index </title>\n';
	html+= '<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>\n';
	html+= '<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>\n';
	html+= '<link rel="stylesheet" type="text/css" href="/style.css">';	
	html += '</head>\n';
	return html
}

static getHTMLTemplate(template,data){
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
}

static getHTMLTemplate(template){
	return ""+fs.readFileSync('./views/'+template);
}

static getPrettyTime(){
	var d = new Date();
	var date = d.getFullYear()+'-';
	date += d.getMonth().toString().padStart(2,'0')+'-';
	date += d.getDate().toString().padStart(2,'0');
	var time = d.getHours().toString().padStart(2,'0')+':';
	time += d.getMinutes().toString().padStart(2,'0')+':';
	time += d.getSeconds().toString().padStart(2,'0');
	return '| '+date + ' | ' + time;
}

static getPrettyRequest(req){
	var output = "";
	var method = req.method.toString().padEnd(4,' ');
	output = '|  ' + method + '  | ' + req.originalUrl;
	return output;
}

static getPrettyLog(req){
	console.log(this.getPrettyTime() + ' ' + this.getPrettyRequest(req));
}

}

module.exports = utils;
