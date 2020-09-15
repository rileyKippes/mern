class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {	ready: false,
					data: {},
					user: {}};
	this.setUser();
	this.getAPI();
  }

	setUser(){
		fetch('/u/api')
		  .then((response) => {
			return response.json();
		  })
		  .then((myJson) => {
			//part of initialization
			//so we can't use setState
			this.state = { ready: true, data:this.state.data, user: myJson};
		  });
	}

	getAPI(){
		fetch('/p/messages/api')
		  .then((response) => {
			return response.json();
		  })
		  .then((myJson) => {
			this.setState({ ready: true, data:myJson, user: this.state.user});
		  });
		
	}

	

	postMessage(){
		const form = new FormData(document.getElementById("comment_box"));
		fetch('/p/messages/api',  {
			  method: 'POST', 
			  body: form }
			).then((response) => {
			return response.json();
		  })
		  .then((myJson) => {
			this.setState({ ready: true, data:myJson});
		  });
	}

	render() {

	setTimeout(this.getAPI.bind(this),2000);
	if (this.state.ready) {
		var messages = [];
		for (var data of this.state.data) {
			console.log(data);
			var currStyle = {
				borderColor:data.color
			};
			messages.push( (
				<div 	className="message"
						key={data._id} 
						style={currStyle}> 
						{data.sender} :					
						{data.newMessage} 
				</div> 
			));
		}
	return (
		<div id="messages_div">
			<form id="comment_box" onSubmit={this.postMessage.bind(this)}>
				<input 	id="comment_input"
						type="text"
						placeholder="Message Goes Here"
						name="newMessage">
			  	</input>
				<input 	id="reciever_input"
						type="text"
						placeholder="Send to"
						name="reciever">
			  	</input>
				<input id="post_message_btn"	
						type="button"
						value=" > "
						onClick={this.postMessage.bind(this)}>
				</input>
			</form>
			<div id="message_box">
				{messages}
			</div>
		</div>
		);
    }
    return (
		<div id="messages_div">
		Loading. . .
		</div>
    );
  }
}

let MessageDomContainer = document.querySelector('#messages_container');
ReactDOM.render(<Messages />, MessageDomContainer);
