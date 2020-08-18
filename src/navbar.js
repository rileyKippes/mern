'use strict';

class NavBarClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isLoggedIn:null};
		this.getProfile();
	}

	getProfile(){
		fetch('/u/api')
		  .then((response) => {
			return response.json();
		  })
		  .then((myJSON) => {
			if(myJSON.status == 401){
				this.setState({ isLoggedIn:false });
			}
			else {
				this.setState({ isLoggedIn:true, data:myJSON});
			}
		  }).catch((err) => {
			console.error(err);
		});
	}
	
	linkHandler(link) {
		window.location.href = link;
	}

	render() {
		var userMessage;
		if(this.state.isLoggedIn) {
			userMessage = ( <div className="navbar_item dropdown"> 
								<button className="dropBTN"
										onClick={this.linkHandler.bind(this, "/u/profile")}> 
									Welcome {this.state.data.username} 
								</button>
								<div className="dropdown-content">
									<button className="dropItem" onClick={this.linkHandler.bind(this, "/u/profile")}> Profile</button>
									<button className="dropItem" onClick={this.linkHandler.bind(this, "/u/logout")}> Logout </button>
								</div>
							 </div> );
		}
		else {
			userMessage = ( <div className="navbar_item dropdown">
								<button className="dropBTN"
										onClick={this.linkHandler.bind(this, "/u/login")}> 
									Login 
								</button> 
								<div className="dropdown-content">
									<button className="dropItem" onClick={this.linkHandler.bind(this, "/u/register")}> Register </button>
									<button className="dropItem" onClick={this.linkHandler.bind(this, "/u/login")}> Login </button>
								</div>
							</div>);
		}
		return (
			<div id="navbar_container">
				<div className="navbar_item">
					<button className="dropBTN"
    						onClick={this.linkHandler.bind(this, '/')}> Home </button>
				</div>
				<div className="navbar_item dropdown">
					<button className="dropBTN"
    					onClick={this.linkHandler.bind(this, '/p')}> Portfolio </button>
					<div className="dropdown-content">
						<button className="dropItem" onClick={this.linkHandler.bind(this, "/p/chat")}> Chat </button>
						<button className="dropItem" onClick={this.linkHandler.bind(this, "/p/aboutSite")}> About </button>
					</div>
				</div>
				{userMessage}
			</div>
		);
	}
}

let navbarDiv = document.querySelector('#navbar');
ReactDOM.render(<NavBarClass />, navbarDiv);
