'use strict';

class NavBarClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {isLoggedIn:null};
		this.getProfile();
	}

	getProfile(){
		fetch('/u/profile/api')
		  .then((response) => {
			return response.json();
		  })
		  .then((myJSON) => {
			if(myJSON.status === 500){
				this.state.isLoggedIn = false;
			}
			else {
				this.setState({ isLoggedIn:true, data:myJSON});
			}
		  });
	}

	render() {
		var userMessage = ( <a href="/u/login"> You are logged out, please login </a> );
		if(this.state.isLoggedIn) {
			userMessage = ( <a> Welcome {this.state.data.username} </a> );
		}
		return (
			<div>
				<a href="/"> Home </a>
				<a href="/p"> Portfolio </a>
				<a href="/u"> Users </a>
				{userMessage}
			</div>
		);
	}
}

let navbarDiv = document.querySelector('#navbar');
ReactDOM.render(<NavBarClass />, navbarDiv);
