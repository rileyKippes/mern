'use strict';

class NavBarClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isLoggedIn: null };
		this.getProfile();
	}

	getProfile() {
		fetch('/u/api')
			.then((response) => {
				return response.json();
			})
			.then((myJSON) => {
				if (myJSON.status == 401) {
					this.setState({ isLoggedIn: false });
				}
				else {
					this.setState({ isLoggedIn: true, data: myJSON });
				}
			});
	}

	render() {
		var userMessage;
		if (this.state.isLoggedIn) {
			userMessage = (<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" 
						data-toggle="dropdown" 
						href="#" role="button" 
						aria-haspopup="true" 
						aria-expanded="false">Welcome {this.state.data.username}</a>
				<div className="dropdown-menu w-100 text-center">
					<a className="dropdown-item" href="/u/profile">Profile</a>
					<a className="dropdown-item" href="/u/logout">Logout</a>
					<a className="dropdown-item" href="/u/delete">Delete</a>
				</div>
			</li>);
		}
		else {
			userMessage = (<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle" 
					data-toggle="dropdown" 
					href="#"
					role="button" 
					aria-haspopup="true" 
					aria-expanded="false">Login</a>
				<div className="dropdown-menu w-100 text-center">
					<a className="dropdown-item" href="/u/register">Register</a>
					<a className="dropdown-item" href="/u/login">Login</a>
				</div>
			</li>);
		}
		return (
			<ul className="nav nav-tabs nav-justified w-100">
				<a className="navbar-brand" href="/">
					<img src="/white-logo.svg" alt="Logo" style={{"width":"30px"}}/>
				</a>
				<li className="nav-item">
					<a className="nav-link" href="/"> Home </a>
				</li>
				<li className="nav-item dropdown">
					<a className="nav-link dropdown-toggle" 
						data-toggle="dropdown" 
						href="#"
						role="button" 
						aria-haspopup="true" 
						aria-expanded="false"> Portfolio </a>
					<div className="dropdown-menu w-100 text-center">
						<a className="dropdown-item" href="/p/chat"> Chat </a>
						<a className="dropdown-item " href="/p/messages"> Messaging </a>
						<a className="dropdown-item" href="/p/calculator"> Calculator </a>
						<a className="dropdown-item" href="/p/aboutSite"> About </a>
					</div>
				</li>
				{userMessage}
			</ul>
		);
	}
}

let navbarDiv = document.querySelector('.navbar');
ReactDOM.render(<NavBarClass />, navbarDiv);
