var fs = require('fs');

class utils{
static getHTMLHead()
{
	var html = '<head>\n';
	html += '<title> Index </title>\n';
	html+= '<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>\n';
	html+= '<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>\n';
	html+= '<link rel="stylesheet" type="text/css" href="style.css">';	
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
	return fs.readFileSync('./views/'+template);
}
}

module.exports = utils;
