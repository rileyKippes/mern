class Messages extends React.Component {
	constructor(props) {
		super();
		this.state = {
			ready: false,
			data: {},
			user: {}
		};

		this.setUser = this.setUser.bind(this);
		this.getAPI = this.getAPI.bind(this);
		this.postMessage = this.postMessage.bind(this);

		this.setUser();
		this.getAPI(); //doesn't need to refresh like chat.js does
	}

	setUser() {
		fetch('/u/api')
			.then((response) => {
				return response.json();
			}).then((myJson) => {
				//part of initialization
				//so we can't use setState
				this.state = { ready: true, data: this.state.data, user: myJson };
			}).catch((err) => {
				console.error(err);
			});
	}

	getAPI() {
		fetch('/p/messages/api')
			.then((response) => {
				return response.json();
			}).then((myJson) => {
				this.setState({ ready: true, data: myJson, user: this.state.user });
			}).catch((err) => {
				console.error(err);
			});;
	}

	postMessage(event) {
		event.preventDefault();
		const form = new FormData(event.target);
		fetch('/p/messages/api', {
			method: 'POST',
			body: form
		}).then((response) => {
			this.getAPI();
		}).catch((err) => {
			console.error(err);
		});;
	}

	render() {
		//first build senders list and messages
		//then build sender tabs with messages inserted
		//it's more modular that way
		if (this.state.ready) {
			var messages = [];
			var othersList = [];
			var otherTabs = [];
			for (var data of this.state.data) {
				var containerStyle;
				var messageStyle = { borderColor: data.color };

				function findOther(username) {
					if (data.sender === username) {
						containerStyle = {
							"display": "flex",
							"justifyContent": "right"
						};
						return data.reciever;
					}
					containerStyle = {
						"display": "flex",
						"justifyContent": "left"
					};
					return data.sender;
				}
				var other = findOther(this.state.user.username);

				function checkOther() {
					return othersList.includes(other);
				}
				var message = (<div style={containerStyle}
					key={data._id}>
					<div className="message"
						style={messageStyle}>
						{data.newMessage}
					</div>
				</div>);
				if (checkOther()) {
					messages[othersList.indexOf(other)].push(message);
				}
				else {
					othersList.push(other);
					var index = othersList.indexOf(other);
					messages[index] = [];
					messages[index].push(message);
				}
			}


			for (var i = 0; i < othersList.length; i++) {

				//somethings have trash data that hasn't been cleaned out
				//including my test data
				//so you run a sanity check or two.
				if (othersList[i] === "" || othersList[i] === null) {
					continue;
				}


				otherTabs.push(
					<div key={othersList[i]}
						className="senderTab card bg-light text-dark">
						<div className="card-header" >
							<a className="btn btn-primary" data-toggle="collapse" href={".hideable_" + othersList[i]} role="button">
								{othersList[i]}
							</a>
						</div>

						<div className={"collapse hideable_" + othersList[i]}>
							<div className="card-body">
								{messages[i]}
							</div>
							<form id={"message_form_" + othersList[i]}
								className="card-footer hideable_message_form"
								onSubmit={this.postMessage}>
								<div className="form-group row">
									<input id="message_input"
										type="text"
										className="form-control col-sm-10 mr-1"
										placeholder="Message Goes Here"
										name="newMessage">
									</input>
									<input id="reciever_input"
										type="text"
										value={othersList[i]}
										readOnly
										hidden
										name="reciever">
									</input>
									<input id="post_message_btn"
										type="submit"
										className="btn btn-primary col-sm-1"
										value=" > ">
									</input>
								</div>
							</form>
						</div>
					</div>
				);
			}

			return (
				<div id="messages_div px-3">
					<form className="w-100 p-1" id="message_form" onSubmit={this.postMessage}>
						<input id="message_input"
							className="w-75 mx-1 px-3"
							type="text"
							placeholder="Message Goes Here"
							name="newMessage"
							required>
						</input>
						<input id="reciever_input"
							className="mx-1 px-3"
							type="text"
							placeholder="Send to"
							name="reciever"
							required>
						</input>
						<input id="post_message_btn"
							className="mx-1 px-3"
							type="submit"
							value=" > ">
						</input>
					</form>
					<div id="message_box" className="card-columns p-1">
						{otherTabs}
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
