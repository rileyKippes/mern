class Chat extends React.Component {
  constructor(props) {
	console.log("constructor");
    super(props);
    this.state = { 	paused: false,
					ready: false,
					i : 0,
					data: {key:'value'},
					color: false  };
	this.colors = [
	"#ff0000",
	"#ffff00",
	"#00ff00",
	"#00ffff",
	"#0000ff",
	"#ff00ff"
	];
	this.getAPI();
  }

	getAPI(){
		if(this.state.paused){
			return;
		}
		console.log("getAPI();\n i="+this.state.i);
		this.state.i++;
		fetch('/p/chat/api')
		  .then((response) => {
			return response.json();
		  })
		  .then((myJson) => {
			this.setState({ ready: true, data:myJson});
		  });
		
	}

	postChat(){
		//todo: actually post comments
		console.log("postChat()");
		const form = new FormData(document.getElementById("comment_box"));
		fetch('/p/chat/api',  {
			  method: 'POST', 
			  body: form }
			).then((response) => {
			return response.json();
		  })
		  .then((myJson) => {
			this.setState({ ready: true, data:myJson});
		  });
	}

	pauseChat(){
		console.log("pauseChat()");
		this.setState({paused:!this.state.paused});
	}

	setColor(){
		console.log('setColor()');
		var pick = Math.floor(Math.random() * this.colors.length);
		var color = this.colors[pick];
		document.cookie = "color="+color+";sameSite=strict";
		//document.getElementById("color_container").style.color = color;
		this.state.color=color;
		
	}
	getColor(){
		console.log('getColor()');
		console.log(document.cookie);
		return document.cookie;
	}

	
  render() {

	setTimeout(this.getAPI.bind(this),1500);

	if (!this.state.color) {
		this.getColor();
    }	

	if (this.state.ready) {
		var chat = [];
		console.log(this.state.data);
		for (var data of this.state.data) {
			var currStyle = {
				borderColor:data.cookie
			};
			chat.push( (
				<div 	className="comment"
						key={data._id} 
						style={currStyle}> 
					{data.comment} 
				</div> 
			));
		}
	return (
		<div id="chat_div">
			<form id="comment_box">
				<input 	id="comment_input"
						type="text"
						placeholder="chat"
						name="comment">
			  	</input>
				<input id="post_chat_btn"	
						type="button"
						value=" > "
						onClick={this.postChat.bind(this)}>
				</input>
			</form>
			<div id="chat_box">
				{chat}
			</div>
			<div id="debug_buttons">
				<button onClick={this.pauseChat.bind(this)}>
				{this.state.paused ? "Unpause" : "Pause"} Chat
				</button>
				<button onClick={this.setColor.bind(this) }>
		    	Reset color
		  		</button>
			</div>
		</div>
		);
    }
    return (
		<div id="chat_div">
		Loading. . .
		</div>
    );
  }
}

let ChatDomContainer = document.querySelector('#chat_container');
ReactDOM.render(<Chat />, ChatDomContainer);
