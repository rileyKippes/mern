class Messages extends React.Component {
	constructor(props) {
		this.state = {
			ready: false,
			data: {},
			user: {}
		};
		this.setUser();
		this.getAPI(); //doesn't need to refresh like chat.js does
	}

	setUser() {
		fetch('/u/api')
			.then((response) => {
				return response.json();
			})
			.then((myJson) => {
				//part of initialization
				//so we can't use setState
				this.state = { ready: true, data: this.state.data, user: myJson };
			});
	}

	getAPI() {
		fetch('/p/messages/api')
			.then((response) => {
				return response.json();
			})
			.then((myJson) => {
				this.setState({ ready: true, data: myJson, user: this.state.user });
			});

	}



	postMessage() {
		const form = new FormData(document.getElementById("comment_box"));
		fetch('/p/messages/api', {
			method: 'POST',
			body: form
		}
		).then((response) => {
			return response.json();
		})
			.then((myJson) => {
				this.setState({ ready: true, data: myJson });
			});
	}

	render() {

		//needs css

		//first build senders list and messages
		//then build sender tabs with messages inserted
		//it's more modular that way
		if (this.state.ready) {
			var messages = [];
			var sendersList = [];
			var senderTabs = [];
			for (var data of this.state.data) {
				var currStyle = {
					borderColor: data.color
				};

				function checkSender(sender) {
					return sender === data.sender;
				}
				if (!sendersList.includes(data.sender)) {
					sendersList.push(data.sender);
					var index = sendersList.indexOf(data.sender);
					messages[index] = [];
					messages[index].push((
						<div className="message"
							key={data._id}
							style={currStyle}>
							{data.newMessage}
						</div>
					));
				}
				else {
					messages[sendersList.indexOf(data.sender)].push((
						<div className="message"
							key={data._id}
							style={currStyle}>
							{data.newMessage}
						</div>
					));
				}
			}
			
			for(var i = 0; i < sendersList.length; i++){
				senderTabs.push(
					<div key={sendersList[i]}
						className="senderTab">
						{sendersList[i]}
						{messages[i]}
					</div>
				);
			}


			return (
				<div id="messages_div">
					<form id="comment_box" onSubmit={this.postMessage.bind(this)}>
						<input id="comment_input"
							type="text"
							placeholder="Message Goes Here"
							name="newMessage">
						</input>
						<input id="reciever_input"
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
						{senderTabs}
					</div>
				</div>
			);
		}
		//does the following if ready is false. 
		return (
			<div id="messages_div">
				Loading. . .
			</div>
		);
	}
}

let MessageDomContainer = document.querySelector('#messages_container');
ReactDOM.render(<Messages />, MessageDomContainer);
