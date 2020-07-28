class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 	paused: false,
					ready: false,
					data: {},};
	this.getAPI();
  }

	getAPI(){
		if(this.state.paused){
			return;
		}
		fetch('/p/chat/api')
		  .then((response) => {
			return response.json();
		  })
		  .then((myJson) => {
			this.setState({ ready: true, data:myJson});
		  });
		
	}

	postChat(){
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
		this.setState({paused:!this.state.paused});
	}

	render() {

	setTimeout(this.getAPI.bind(this),1500);

	if (this.state.ready) {
		var chat = [];
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
