class Chat extends React.Component {
	constructor(props) {
		super();
		this.state = {
			paused: false,
			ready: false,
			data: {},
		};
		this.getAPI();
	}

	getAPI() {
		if (this.state.paused) {
			return;
		}
		fetch('/p/chat/api')
			.then((response) => {
				return response.json();
			})
			.then((myJson) => {
				this.setState({ ready: true, data: myJson });
			});
	}

	postChat() {
		const form = new FormData(document.getElementById("comment_box"));
		fetch('/p/chat/api', {
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

	pauseChat() {
		this.setState({ paused: !this.state.paused });
	}

	render() {
		//refresh every 1.5 seconds
		setTimeout(this.getAPI.bind(this), 1500);

		if (this.state.ready) {
			var chat = [];
			for (var data of this.state.data) {
				var currStyle = {
					borderLeftStyle: "solid",
					borderColor: data.cookie
				};
				chat.push((
					<div id="comment" 
						className="border-bottom pl-1"
						key={data._id}
						style={currStyle}>
						{data.comment}
					</div>
				));
			}
			return (
				<div className="card bg-light text-dark">
					<form id="comment_box" className="card-header form-group row" onSubmit={this.postChat.bind(this)}>
						<input id="comment_input"
							className="form-control col-sm-10 mx-3"
							type="text"
							placeholder="Chat"
							name="comment">
						</input>
						<input id="post_chat_btn"
							className="btn btn-primary col-sm-1 mx-3"
							type="button"
							value=" > "
							onClick={this.postChat.bind(this)}>
						</input>
					</form>
					<div id="chat_box"
						className="card-body">
						{chat}
					</div>
					<div id="debug_buttons"
						className="card-footer">
						<button className="btn btn-primary"
							onClick={this.pauseChat.bind(this)}>
							{this.state.paused ? "Unpause" : "Pause"} Chat
				</button>
					</div>
				</div >
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
